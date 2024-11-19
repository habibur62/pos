import React, { useState } from 'react';
import { FaRegUserCircle, FaBars } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

export default function AdminPanel() {
    const user = useSelector((state) => state?.user?.user);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-[calc(100vh-120px)] flex">
            {/* Sidebar */}
            <aside
                className={`bg-white fixed top-0 left-0 h-full w-60 customShadow z-50 transition-transform duration-300 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-60'
                } lg:static lg:translate-x-0`}
            >
                <div className="h-32 bg-red-500 flex flex-col justify-center items-center">
                    {user?.profilePic ? (
                        <img
                            src={user?.profilePic}
                            className="w-20 h-20 rounded-full"
                            alt="User Profile"
                        />
                    ) : (
                        <FaRegUserCircle className="text-white text-4xl" />
                    )}
                    <p className="capitalize text-lg font-semibold text-white">
                        {user?.name}
                    </p>
                    <p className="capitalize text-sm text-gray-200">{user?.role}</p>
                </div>
                <div>
                    <nav className="grid p-4">
                        <Link
                            to="deshboard"
                            className="px-2 py-2 hover:bg-slate-100 rounded-md"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="all-users"
                            className="px-2 py-2 hover:bg-slate-100 rounded-md"
                        >
                            All Users
                        </Link>
                        <Link
                            to="all-product"
                            className="px-2 py-2 hover:bg-slate-100 rounded-md"
                        >
                            All Products
                        </Link>
                        <Link
                            to="all-orders"
                            className="px-2 py-2 hover:bg-slate-100 rounded-md"
                        >
                            Orders
                        </Link>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="w-full h-full">
                <div className="bg-gray-100 p-4 lg:hidden flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Admin Panel</h1>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="text-2xl p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                        <FaBars />
                    </button>
                </div>
                <Outlet />
            </main>
        </div>
    );
}
