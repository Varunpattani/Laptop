import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLaptop, FaTag, FaMemory, FaImage } from "react-icons/fa";

export default function AddLaptop() {
    const [data, setData] = useState({
        name: '',
        avatar: '',
        BrandName: '',
        RAM: '',
        item: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = () => {
        const apiUrl = "http://localhost:4000/laptop/add";
        fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(() => {
            navigate("/laptop");
        })
        .catch(err => {
            console.error("Error adding laptop:", err);
            alert("Failed to add laptop. Please try again.");
        });
    };

    return (
        <div className="container" style={{  background: 'linear-gradient(to right, #00c6ff, #0072ff)', padding: '20px' }}>
            <div className="card shadow-lg" style={{ borderRadius: '15px', padding: '20px', backgroundColor: '#ffffff' }}>
                <h2 className="text-center mb-4 text-primary">Add New Laptop</h2>
                <form>
                    {[
                        { label: "Enter Name", name: "name", icon: <FaLaptop /> },
                        { label: "Enter Avatar URL", name: "avatar", icon: <FaImage /> },
                        { label: "Enter Brand Name", name: "BrandName", icon: <FaTag /> },
                        { label: "Enter RAM", name: "RAM", icon: <FaMemory /> },
                        { label: "Enter Item Number", name: "item", icon: null },
                    ].map((field, index) => (
                        <div className="form-group row mb-3" key={index}>
                            <label htmlFor={field.name} className="col-4 col-form-label text-info">{field.label}</label>
                            <div className="col-8 input-group">
                                {field.icon && <span className="input-group-text">{field.icon}</span>}
                                <input
                                    name={field.name}
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control"
                                    placeholder={field.label}
                                    style={{ borderColor: '#0072ff' }}
                                />
                            </div>
                        </div>
                    ))}
                    <div className="form-group row">
                        <div className="offset-4 col-4 d-flex justify-content-center"> {/* Center the button */}
                            <button 
                                type="button" 
                                onClick={handleSubmit} 
                                className="btn btn-primary w-100 rounded-pill" 
                                style={{ backgroundColor: '#0072ff', borderColor: '#0056b3' }}
                            >
                                Add Laptop
                            </button>
                        </div>
                    </div>
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
