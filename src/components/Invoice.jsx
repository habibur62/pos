import React from 'react'
import { Link } from 'react-router-dom';

function Invoice({onClose, products, total, qty}) {

   // console.log(products);

    const now = new Date().toLocaleString(); 
    const handlePrint = () => {
        window.print();
    };

  return (
    <div className='bg-red-400 fixed w-full h-full left-0 top-0 flex justify-center items-center'>
        <div className='bg-white w-full max-w-[400px] h-auto p-2 rounded shadow-sm '>
            <div className='flex justify-center items-end '>
                <h2 className='font-semibold text-4xl italic '>EASY</h2>
                <p>FASHION LTD</p>
            </div>
            <hr />
            <div>
                <p className='text-sm mt-2 '>Tamiz Uddin Market, Shop No. 23-25, N.s Road, Kushtia Sadar, Kushtia.</p>
            </div>
            <h4 className='text-center bg-black rounded-full  text-white '>Showroom Number: 01773769080</h4>
            <div>
                <p>Date and Time: {now}</p>
                <div className='flex justify-between '>
                <p>Served By: Polash</p>
                <p>Bill No: HM558654</p>
                </div>
            </div>
                <hr />
            <table className='w-[100%] '>
                <thead className='text-left'>
                    <tr>
                    <th>Product Name</th>
                    <th>Qty</th>
                    <th>U.Price</th>
                    <th>Amount</th>
                    </tr>
                </thead>
                <tbody >
                    {
                        products.map((product,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{product.productName}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.productPrice}</td>
                                    <td>{product.subtotal}</td>
                                </tr>
                            )
                        })
                    }


                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="4">
                             <hr />
                        </td>
                    </tr>
                    <tr>
                    <td>Total Qunatity</td>
                    <td>{qty}</td>
                    <td>Total Amount =</td>
                    <td>{total}</td>
                    </tr>
                </tfoot>
            </table>
            <br /><br />
            <hr />
            <div>
                <p>Exchange is not applicable without this receipt. Items may be exchange subject to Easy sales policies within 10 days. If you have any query please contact us.</p>
                <h4 className='text-center bg-black text-white rounded-full  '>Email: habibur.vendabari@gmail.com</h4>
                <p className='text-sm text-center'>Software Solution By: habibur</p>
            </div>

             {/* Print Button */}
             <div className="flex justify-center mt-4 print:hidden">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={handlePrint}
                    >
                        Print Invoice
                    </button>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 ml-2"
                        onClick={onClose}
                    >
                        Next Order
                    </button>
                    
                </div>
        </div>
    </div>
  )
}

export default Invoice