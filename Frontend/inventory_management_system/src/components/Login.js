import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

export default function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("*Please fill in all the required fields.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await res.json();

            if (res.status === 200) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                if (onLoginSuccess) {
                    onLoginSuccess();
                }
                navigate("/products", { replace: true });
            } else {
                setError(data.message || "Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid p-5" style={{ minHeight: '90vh' }}>
            <div className="row justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <div className="col-lg-5 col-md-7 col-12">
                    <div className="card-custom">
                        {/* Header */}
                        <div className="text-center mb-4">
                            <div className="mb-3">
                                <i className="fas fa-user-circle fa-4x" style={{ color: '#6366f1' }}></i>
                            </div>
                            <h1 className="mb-2">Welcome Back</h1>
                            <p className="text-secondary">Login to access your inventory</p>
                        </div>

                        <form onSubmit={handleLogin}>
                            {/* Email Field */}
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label">
                                    <i className="fas fa-envelope me-2"></i>Email Address
                                </label>
                                <input
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            {/* Password Field */}
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label">
                                    <i className="fas fa-lock me-2"></i>Password
                                </label>
                                <div className="position-relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-link position-absolute end-0 top-50 translate-middle-y"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                    </button>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="alert alert-danger d-flex align-items-center mb-4">
                                    <i className="fas fa-exclamation-circle me-2"></i>
                                    <div>{error}</div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="btn btn-primary w-100 mb-3"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Logging in...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-sign-in-alt me-2"></i>
                                        Login
                                    </>
                                )}
                            </button>

                            {/* Cancel Button */}
                            <NavLink to="/" className="btn btn-outline-secondary w-100 mb-4">
                                <i className="fas fa-arrow-left me-2"></i>
                                Back to Home
                            </NavLink>

                            {/* Sign Up Link */}
                            <div className="text-center">
                                <p className="text-secondary mb-0">
                                    Don't have an account?{" "}
                                    <NavLink to="/signup" className="fw-bold" style={{ color: '#6366f1', textDecoration: 'none' }}>
                                        Sign Up Now
                                    </NavLink>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}