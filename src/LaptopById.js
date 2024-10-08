import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const LaptopById = () => {
    const { item } = useParams();
    const apiURL = `http://localhost:4000/laptop/${item}`;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiURL);
                if (!response.ok) throw new Error('Failed to fetch data');
                const result = await response.json();
                setData(result.data || result); // Accessing the data from the response object
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [apiURL]);

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center text-danger">Error: {error}</div>;

    return (
        <div className="bg-light" style={{ minHeight: '100vh', background: 'linear-gradient(to right, #00c6ff, #0072ff)', padding: '20px' }}>
            <Link to="/laptop" className="btn btn-outline-secondary mb-4">Back</Link>
            <div className="py-5">
                <div className="container">
                    <div className="card mb-4 shadow-lg" style={{ borderRadius: '15px' }}>
                        <img 
                            src={data.avatar} 
                            className="card-img-top" 
                            alt={data.name} 
                            style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px', height: '200px', objectFit: 'contain', margin: '0 auto', display: 'block' }} 
                        />
                        <div className="card-body text-center">
                            <h2 className="text-danger">{data.name}</h2>
                            <p className="main-info">Brand: <strong>{data.BrandName}</strong></p>
                            <p className="main-info">RAM: <strong>{data.RAM}</strong></p>
                            <p className="main-info">Item Number: <strong>{data.item}</strong></p>
                        </div>
                    </div>
                </div>
            </div>
            <style>
                {`
                    .bg-light {
                        background: linear-gradient(to right, #e0f7fa, #80deea);
                    }
                    .card {
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                    }
                    .card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
                    }
                `}
            </style>
        </div>
    );
};

export default LaptopById;
