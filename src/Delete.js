import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteItem = () => {
    const { item} = useParams();
    const navigate = useNavigate();
    const apiURL = `http://localhost:4000/laptop/${item}`; 

    useEffect(() => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (!confirmDelete) {
            navigate('/laptop');
            return;
        }

        const deleteItem = async () => {
            try {
                const response = await fetch(apiURL, { method: 'DELETE' });
                if (!response.ok) {
                    throw new Error('Failed to delete item');
                }
                await response.json(); // Handle the response if necessary
                navigate('/laptop'); // Navigate to Home after deletion
            } catch (error) {
                console.error(error);
                alert('Error deleting item: ' + error.message); // Notify the user
                navigate('/laptop'); // Redirect to Home on error
            }
        };

        deleteItem();
    }, [apiURL, navigate]);

    return null; // No UI to display
};

export default DeleteItem;