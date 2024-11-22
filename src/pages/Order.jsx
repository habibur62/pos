import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import Invoice from '../components/Invoice'
import { FaRegTrashAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';

export default function Order() {
    const user = useSelector((state) => state?.user?.user);

    const [allProduct, setAllProduct] = useState([])
    var restuId = "";
    if(user?.restaurantId){
        restuId = user?.restaurantId;
   }else{
        restuId = user?._id
   }
   

   const fetchAllProduct = async () => {
       const dataResponse = await fetch(SummaryApi.allProduct.url, {
           method: SummaryApi.allProduct.method,
           credentials: 'include',
           headers: {
               "content-type" : "application/json"
           },
           body: JSON.stringify({ restaurantId: restuId })
       });

       const dataApi = await dataResponse.json();

       if (dataApi.success) {
           setAllProduct(dataApi.data);
       }
       if (dataApi.error) {
           toast.error(dataApi.error);
       }
   };

   useEffect(() => {
       fetchAllProduct();
   }, [restuId]);
    
    const [formData, setFormData] = useState({
        phone: "",
        customerName: "",
        restaurantId: "",
    });
    


    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            restaurantId: restuId
        });
    };

    const [orderItems, setOrderItems] = useState([]);
    const [orderTotal, setOrderTotal] = useState(0);
    const [orderTotalQty, setOrderTotalQty] = useState(0);

    const handleAddProduct = ()=>{
        setOrderItems([
            ...orderItems,
            {
                productId: '',
                productCategory: '',
                productName: '',
                productPrice: 0,
                quantity: 1,
                subtotal: 0
            }
        ]);
    }

    const productCategoryChange = (index, category) => {
        const selectedProduct = category
        const updatedOrderItems = [...orderItems];
        updatedOrderItems[index] = {
            ...updatedOrderItems[index],
            productCategory: category,
        };

        setOrderItems(updatedOrderItems);
        //updateOrderTotal(updatedOrderItems);
    };
    const productNameChange = (index, productName) => {
        const selectedProduct = allProduct.find(product => product.name === productName);

        if (!selectedProduct) return;

        const updatedOrderItems = [...orderItems];
        updatedOrderItems[index] = {
            ...updatedOrderItems[index],
            productId: selectedProduct._id,
            productName: selectedProduct.name,
            productPrice: selectedProduct.price,
            subtotal: selectedProduct.price * updatedOrderItems[index].quantity
        };

        setOrderItems(updatedOrderItems);
        updateOrderTotal(updatedOrderItems);
    };
    const handleQuantityChange = (index, quantity) => {
        const updatedOrderItems = [...orderItems];
        updatedOrderItems[index].quantity = quantity;
        updatedOrderItems[index].subtotal = quantity * updatedOrderItems[index].productPrice;

        setOrderItems(updatedOrderItems);
        updateOrderTotal(updatedOrderItems);
    };

    const updateOrderTotal = (items) => {
        const total = items.reduce((sum, item) => sum + item.subtotal, 0);
        setOrderTotal(total);
        const Qty = items.reduce((sum, item) => sum + item.quantity, 0);
        setOrderTotalQty(Qty)
    };
    
    const handleRemoveProduct = (index) => {
        const updatedOrderItems = orderItems.filter((_, i) => i !== index);
        setOrderItems(updatedOrderItems);
        updateOrderTotal(updatedOrderItems);
    };
    const [openInvoice, setOpenInvoice] = useState(false)


    //customer search by phone.........................
    const [customers, setCustomers] = useState()

    const fetchAllCustomers = async()=>{
        const dataResponse = await fetch(SummaryApi.customers.url,{
            method: SummaryApi.customers.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(formData)

        })
        
        const dataApi = await dataResponse.json()
       // console.log("phone", customers);
        if(dataApi.success){
            setCustomers(dataApi.data)
            setFormData((prevFormData) => ({
                ...prevFormData,  // Spread the previous state to retain other fields
                customerName: dataApi.data, // Update customerName field
            }));
        }
        if(dataApi.error){
          toast.error(dataApi.error);
        }
    }
    // useEffect(() => {
    //     fetchAllCustomers();
    // }, []);

    //order submit........................

    const  handleSubmitOrder = async () => {

        // Add form validation
        if (!orderItems.length) {
            toast.error("No product added");
            return;
        }

        setLoading(true);

        try {

            const dataResponse = await fetch(SummaryApi.orderProduct.url,{
                method: SummaryApi.orderProduct.method,
                credentials: "include",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    orderItems,
                    formData
                })    
            })

            const dataApi = await dataResponse.json()

          if(dataApi.success){
            toast.success(dataApi.message)
            setOpenInvoice(!openInvoice)


          }
          if(dataApi.error){
            toast.error(dataApi.message)
          }
            
        } catch (error) {
            console.error(error);
            toast.error("Failed to order create. Please try again later.");
        } finally {
            setLoading(false);
        }
    }


  return (
    <div className='flex justify-center my-4'>
        <div className='bg-white w-full max-w-[500px] h-auto p-2 rounded shadow-sm '>
        <div className="p-4">
            <h1 className="text-2xl mb-4">Create Order</h1>
            <div>
                
            </div>
            {orderItems.map((item, index) => (
                <div key={index} className="flex items-center mb-4 gap-4">
                    <select
                        className="border rounded w-1/3 p-2"
                        value={item.productCategory}
                        onChange={(e) => productCategoryChange(index, e.target.value)}
                        required
                    >
                        <option value="">Category</option>
                        {allProduct.map((product, idx) => (
                            <option value={product.category} key={idx}>
                                {product.category}
                            </option>
                        ))}
                    </select>

                    <select
                        className="border rounded w-1/3 p-2"
                        value={item.productName}
                        onChange={(e) => productNameChange(index, e.target.value)}
                    >
                        <option value="">Name</option>
                                    {
                                    allProduct
                                        .filter(product => product.category === orderItems[index].productCategory) // Only show products matching the selected category
                                        .map((product, index) => (
                                            <option value={product.name} key={index}>
                                                {product.name}
                                            </option>
                                        ))
                                    }
                            
                    </select>
                    
                    <input
                        type="number"
                        className="border rounded w-1/6 p-2"
                        value={item.quantity}
                        min="1"
                        onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                    />
                    <input
                        type="text"
                        className="border rounded w-1/6 p-2"
                        value={item.subtotal}
                        readOnly
                    />
                    <button
                        className="bg-red-500 text-white p-2 rounded"
                        onClick={() => handleRemoveProduct(index)}
                    >
                        <FaRegTrashAlt />

                    </button>
                </div>
            ))}
            <button
                className="bg-green-500 text-white p-2 rounded mb-4"
                onClick={handleAddProduct}
            >
                Add Product
            </button>
            <hr />
            <div className="mt-4">
                <h2 className="text-xl">Total: {orderTotal.toFixed(2)}</h2>
            </div>
                <div>
                    <label>Phone Number:</label>
                    <input
                        className='border rounded w-full'
                        type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={fetchAllCustomers}
                    />
                </div>
                <div>
                    <label>Customer Name:</label>
                    <input
                        className='border rounded w-full'
                        type="text"
                        name="customerName"
                        value={customers||formData.customerName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button onClick={handleSubmitOrder} type="submit" disabled={loading} className='my-2 bg-red-500 px-4 py-1 rounded w-full block items-center text-white hover:bg-red-600 transition-all ' >
                    {loading ? "Generating Invoice..." : "Generate Invoice"}
                </button>
             </div>
        

        </div>
    {
        openInvoice && (
            <Invoice onClose={()=>{
                setOpenInvoice(!openInvoice);
                setOrderItems([]);
                setCustomers("")
                setFormData({
                    phone: "",
                    customerName: "",
                });
                setOrderTotal(0);
                setOrderTotalQty(0);
            
            }}
             products={orderItems} total={orderTotal} qty={orderTotalQty} />
        )
    }
    </div>
  )
}
