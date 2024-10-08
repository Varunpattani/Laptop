import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaLaptop, FaTag, FaMemory, FaImage } from "react-icons/fa";

function EditItem() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { item } = useParams();

    useEffect(() => {
        const apiUrl = `http://localhost:4000/laptop/${item}`;
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('Failed to fetch data');
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [item]);

    const handleInputChange = (field, value) => {
        setData(prevData => ({ ...prevData, [field]: value }));
    };

    const handleSubmit = async () => {
        if (!data.name || !data.avatar || !data.BrandName || !data.RAM || !data.item) {
            setError("All fields are required.");
            return;
        }

        const apiUrl = `http://localhost:4000/laptop/${item}`;
        try {
            const response = await fetch(apiUrl, {
                method: "PATCH",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) throw new Error('Failed to update data');
            await response.json();
            navigate("/laptop");
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center text-danger">Error: {error}</div>;

    return (
        <div className="container" style={{  background: 'linear-gradient(to right, #00c6ff, #0072ff)', padding: '20px' }}>
            <div className="card shadow-lg" style={{ borderRadius: '15px', padding: '20px', backgroundColor: '#ffffff' }}>
                <h2 className="text-center mb-4 text-primary">Edit Laptop Details</h2>
                <form>
                    <div className="form-group row mb-3">
                        <label className="col-4 col-form-label text-info">Enter Name</label>
                        <div className="col-8 input-group">
                            <span className="input-group-text"><FaLaptop /></span>
                            <input
                                value={data.name || ''}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                type="text"
                                className="form-control"
                                placeholder="Enter laptop name"
                                style={{ borderColor: '#0072ff' }}
                            />
                        </div>
                    </div>
                    <div className="form-group row mb-3">
                        <label className="col-4 col-form-label text-info">Brand Name</label>
                        <div className="col-8 input-group">
                            <span className="input-group-text"><FaTag /></span>
                            <input
                                value={data.BrandName || ''}
                                onChange={(e) => handleInputChange('BrandName', e.target.value)}
                                type="text"
                                className="form-control"
                                placeholder="Enter brand name"
                                style={{ borderColor: '#0072ff' }}
                            />
                        </div>
                    </div>
                    <div className="form-group row mb-3">
                        <label className="col-4 col-form-label text-info">RAM</label>
                        <div className="col-8 input-group">
                            <span className="input-group-text"><FaMemory /></span>
                            <input
                                value={data.RAM || ''}
                                onChange={(e) => handleInputChange('RAM', e.target.value)}
                                type="text"
                                className="form-control"
                                placeholder="Enter RAM size"
                                style={{ borderColor: '#0072ff' }}
                            />
                        </div>
                    </div>
                    <div className="form-group row mb-3">
                        <label className="col-4 col-form-label text-info">Avatar URL</label>
                        <div className="col-8 input-group">
                            <span className="input-group-text"><FaImage /></span>
                            <input
                                value={data.avatar || ''}
                                onChange={(e) => handleInputChange('avatar', e.target.value)}
                                type="text"
                                className="form-control"
                                placeholder="Enter image URL"
                                style={{ borderColor: '#0072ff' }}
                            />
                        </div>
                    </div>
                    <div className="form-group row mb-3">
                        <div className="offset-4 col-4 d-flex justify-content-center"> {/* Center the button */}
                            <button 
                                type="button" 
                                onClick={handleSubmit} 
                                className="btn btn-primary w-100 rounded-pill" 
                                style={{ backgroundColor: '#0072ff', borderColor: '#0056b3' }}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                </form>
            </div>
            <style>
                {`
                    .card {
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                    }
                    .card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
                    }
                    .form-control:focus {
                        border-color: #0072ff;
                        box-shadow: 0 0 5px rgba(0, 114, 255, 0.5);
                    }
                `}
            </style>
        </div>
    );
}

export default EditItem;
