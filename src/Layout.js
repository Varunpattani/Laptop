import { Link, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="container">
            <style>
                {`
                    .navbar-custom {
                        background-color: #00796b; /* Custom teal color */
                        transition: background-color 0.3s ease; /* Smooth transition for background color */
                    }
                    .navbar-custom:hover {
                        background-color: #005b4f; /* Darker teal on hover */
                    }
                    .navbar-nav .nav-link {
                        color: #ffffff; /* White text for links */
                        transition: color 0.3s ease, transform 0.3s ease; /* Smooth transition for text color and scaling */
                    }
                    .navbar-nav .nav-link:hover {
                        color: #e0f7fa; /* Light cyan on hover */
                        transform: scale(1.1); /* Slightly scale up on hover */
                    }
                    .navbar-toggler {
                        border-color: rgba(255, 255, 255, 0.5); /* Light border for toggler */
                    }
                    .navbar-toggler:hover {
                        background-color: rgba(255, 255, 255, 0.2); /* Light background on hover */
                    }
                    .navbar-toggler-icon {
                        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30' fill='white'%3E%3Cpath stroke='white' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
                    }
                `}
            </style>
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-lg navbar-custom">
                        <div className="container-fluid">
                            <Link className="navbar-brand text-white" to="/">Navbar</Link>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link active text-white" aria-current="page" to="/">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/laptop">Laptops</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/about">About</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/contact">Contact</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8 p-3">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
