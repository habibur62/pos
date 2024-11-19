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
const [weeklySales, setWeeklySales] = useState(0);
const [monthlySales, setMonthlySales] = useState(0);

useEffect(() => {
    // Get today's date
    const today = new Date();
    const todayISO = today.toISOString().slice(0, 10); // Format as "YYYY-MM-DD"
    
    // Calculate the start of the week (Sunday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday of the current week
    const startOfWeekISO = startOfWeek.toISOString().slice(0, 10);

    // Calculate the start of the month (1st day)
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // First day of the current month
    const startOfMonthISO = startOfMonth.toISOString().slice(0, 10);

    // Calculate daily, weekly, and monthly sales
    const totalSales = allOrders.reduce((total, order) => {
        const orderTotal = order.items?.reduce((sum, item) => {
            return sum + (item.productPrice * item.quantity);
        }, 0) || 0;

        // Check if the order is today, this week, or this month
        const orderDate = order.createdAt?.slice(0, 10);

        if (orderDate === todayISO) {
            total.daily += orderTotal;
        }
        if (orderDate >= startOfWeekISO) {
            total.weekly += orderTotal;
        }
        if (orderDate >= startOfMonthISO) {
            total.monthly += orderTotal;
        }

        return total;
    }, { daily: 0, weekly: 0, monthly: 0 });

    setDailySales(totalSales.daily);
    setWeeklySales(totalSales.weekly);
    setMonthlySales(totalSales.monthly);

}, [allOrders]);


  return (
    <div className="flex flex-wrap justify-center items-center gap-4 min-h-[calc(100vh-120px)] bg-slate-50">
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Daily Sales</h2>
        <p className="text-gray-600 mt-2">Total Sales:</p>
        <p className="text-3xl font-bold text-green-500 mt-4">{dailySales}</p>
    </div>
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Weekly Sales</h2>
        <p className="text-gray-600 mt-2">Total Sales:</p>
        <p className="text-3xl font-bold text-green-500 mt-4">{weeklySales}</p>
    </div>
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Monthly Sales</h2>
        <p className="text-gray-600 mt-2">Total Sales:</p>
        <p className="text-3xl font-bold text-green-500 mt-4">{monthlySales}</p>
    </div>
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Today Cost</h2>
        <p className="text-gray-600 mt-2">Total cost:</p>
        <p className="text-3xl font-bold text-green-500 mt-4">854</p>
    </div>
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Monthly Cost</h2>
        <p className="text-gray-600 mt-2">Total cost:</p>
        <p className="text-3xl font-bold text-green-500 mt-4">12532</p>
    </div>
</div>

  )
}

export default Dashboard