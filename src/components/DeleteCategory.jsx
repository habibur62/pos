import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';

function DeleteCategory({ productId, callProduct, onCancelDelete }) {
    useEffect(() => {
        const deleteProduct = async () => {
            const isConfirmed = window.confirm('Are you sure you want to delete this category?');

            if (!isConfirmed) {
                onCancelDelete(); // Reset deleteProduct in parent if user cancels
                return;
            }

            try {
                const dataResponse = await fetch(SummaryApi.deleteCategory.url, {
                    method: SummaryApi.deleteCategory.method,
                    credentials: "include",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({ _id: productId._id })
                });

                const dataApi = await dataResponse.json();

                if (dataApi.success) {
                    toast.success(dataApi.message);
                    callProduct(); // Refresh product list
                } else {
                    toast.error(dataApi.message || "Error deleting product");
                }
                onCancelDelete(); // Clear the deleteProduct state
            } catch (error) {
                console.error(error);
                toast.error("Failed to delete product. Please try again later.");
                onCancelDelete(); // Clear the deleteProduct state on error
            }
        };

        deleteProduct();
    }, [productId, callProduct, onCancelDelete]);

    return null; // Render nothing while deletion is in progress
}

export default DeleteCategory;
