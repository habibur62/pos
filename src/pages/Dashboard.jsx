import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';
import { toast } from 'react-toastify';

function Dashboard() {
    const [allOrders, setAllOrders] = useState([]);
 
    const fetchAllOrders = async () => {
        const dataResponse = await fetch(SummaryApi.allOrders.url, {
            method: SummaryApi.allOrders.method,
            credentials: 'include'
        });

        const dataApi = await dataResponse.json();

        if (dataApi.success) {
            setAllOrders(dataApi.data);
        }
        if (dataApi.error) {
            toast.error(dataApi.error);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const [dailySales, setDailySales] = useState(0);
    useEffect(() => {
        // Calculate daily sales
        const today = new Date().toISOString().slice(0, 10); // Format as "YYYY-MM-DD"
        const totalSales = allOrders
            .filter(order => order.createdAt?.slice(0, 10) === today) // Filter by today's date
            .reduce((total, order) => {
                
                const orderTotal = order.items?.reduce((sum,item)=>{
                    return sum + (item.productPrice * item.quantity);
                },0)||0;
                    return total + orderTotal ;
            }, 0);
        setDailySales(totalSales);

    }, [allOrders]);


   // console.log(dailySales)



  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-120px)] bg-slate-50 gap-4 ">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm text-center">
                <h2 className="text-2xl font-bold text-gray-800">Daily Sales</h2>
                <p className="text-gray-600 mt-2">Total Sales:</p>
                <p className="text-3xl font-bold text-green-500 mt-4">{dailySales}</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm text-center">
                <h2 className="text-2xl font-bold text-gray-800">Weekly Sales</h2>
                <p className="text-gray-600 mt-2">Total Sales:</p>
                <p className="text-3xl font-bold text-green-500 mt-4">$fsa</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm text-center">
                <h2 className="text-2xl font-bold text-gray-800">Monthly Sales</h2>
                <p className="text-gray-600 mt-2">Total Sales:</p>
                <p className="text-3xl font-bold text-green-500 mt-4">$fsa</p>
            </div>
    </div>
  )
}

export default Dashboard