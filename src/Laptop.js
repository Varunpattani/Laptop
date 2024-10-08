import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Laptop() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const apiUrl = "http://localhost:4000/laptop";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('Failed to fetch data');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (item) => {
        const deleteUrl = `http://localhost:4000/laptop/${item}`;
        try {
            const response = await fetch(deleteUrl, { method: "DELETE" });
            if (!response.ok) throw new Error('Failed to delete');
            setData(data.filter(lap => lap.item !== item)); // Update local state
        } catch (error) {
            console.error("Error deleting laptop:", error);
        }
    };

    const handleEdit = (item) => {
        navigate(`/laptop/edit/${item}`);
    };

    if (loading) return <div className="text-center">Loading...</div>;

    return (
        <div className="container mt-4" style={{ background: 'linear-gradient(to right, #00c6ff, #0072ff)', borderRadius: '10px', padding: '20px' }}>
            <h2 className="text-center mb-4 text-white">Laptop Inventory</h2>
            <div className="row">
                {data.map((lap) => (
                    <div className="col-md-4 mb-4" key={lap.item}>
                        <div className="card shadow-sm fancy-card" style={{ background: 'linear-gradient(to bottom right, #ffedbc, #f0c3d1)', borderRadius: '15px', transition: 'transform 0.3s, box-shadow 0.3s' }}>
                            <img src={lap.avatar} className="card-img-top" alt={lap.name} style={{ height: '200px', objectFit: 'cover', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }} />
                            <div className="card-body">
                                <h5 className="card-title text-primary">{lap.name}</h5>
                                <p className="card-text">Brand: <strong>{lap.BrandName}</strong></p>
                                <p className="card-text"><small className="text-muted">RAM: {lap.RAM}</small></p>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-primary" onClick={() => navigate(`/laptop/${lap.item}`)}>Details</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(lap.item)}>Delete</button>
                                    <button className="btn btn-warning" onClick={() => handleEdit(lap.item)}>Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center">
                <button className="btn btn-success mt-3" onClick={() => navigate('/laptop/add')}>Add Laptop</button>
            </div>
            <style>
                {`
                    .fancy-card {
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                    }
                    .fancy-card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
                    }
                    .fancy-card img {
                        transition: transform 0.3s ease;
                    }
                    .fancy-card:hover img {
                        transform: scale(1.05);
                    }
                `}
            </style>
        </div>
    );
}
