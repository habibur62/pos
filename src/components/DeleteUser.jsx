import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';

function DeleteUser({ userId, callProduct, onCancelDelete }) {
    useEffect(() => {
        const deleteProduct = async () => {
            if (!userId) return;

            const isConfirmed = window.confirm('Are you sure you want to delete this user?');

            if (!isConfirmed) {
                onCancelDelete(); // Cancel and reset state if user rejects
                return;
            }

            try {
                const response = await fetch(SummaryApi.deleteStaff.url, {
                    method: SummaryApi.deleteStaff.method,
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userId: userId._id }), // Send only the ID
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    toast.success(result.message || "User deleted successfully");
                    callProduct(); // Trigger the callback to refresh data
                } else {
                    toast.error(result.message || "Error deleting user");
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error("Failed to delete user. Please try again later.");
            } finally {
                onCancelDelete(); // Clear the state regardless of success or error
            }
        };

        deleteProduct();
    }, [userId, callProduct, onCancelDelete]);

    return null; // Render nothing for this component
}

export default DeleteUser;
