import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

export default function Signup({ onSignupSuccess }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!username || !email || !password || !confirmPassword) {
            setError("*Please fill in all the required fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("*Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setError("*Password must be at least 6 characters long.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch("http://localhost:3001/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword,
                }),
            });

            const data = await res.json();

            if (res.status === 201) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                if (onSignupSuccess) {
                    onSignupSuccess();
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
                                <i className="fas fa-user-plus fa-4x" style={{ color: '#6366f1' }}></i>
                            </div>
                            <h1 className="mb-2">Create Account</h1>
                            <p className="text-secondary">Join us and start managing your inventory</p>
                        </div>

                        <form onSubmit={handleSignup}>
                            {/* Username Field */}
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">
                                    <i className="fas fa-user me-2"></i>Username
                                </label>
                                <input
                                    type="text"
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                    className="form-control"
                                    id="username"
                                    placeholder="Choose a username"
                                    required
                                />
                            </div>

                            {/* Email Field */}
                            <div className="mb-3">
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
                            <div className="mb-3">
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
                                        placeholder="Create a password"
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
                                <small className="text-secondary">Minimum 6 characters</small>
                            </div>

                            {/* Confirm Password Field */}
                            <div className="mb-4">
                                <label htmlFor="confirmPassword" className="form-label">
                                    <i className="fas fa-lock me-2"></i>Confirm Password
                                </label>
                                <div className="position-relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        value={confirmPassword}
                                        className="form-control"
                                        id="confirmPassword"
                                        placeholder="Confirm your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-link position-absolute end-0 top-50 translate-middle-y"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
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
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-user-plus me-2"></i>
                                        Sign Up
                                    </>
                                )}
                            </button>

                            {/* Cancel Button */}
                            <NavLink to="/" className="btn btn-outline-secondary w-100 mb-4">
                                <i className="fas fa-arrow-left me-2"></i>
                                Back to Home
                            </NavLink>

                            {/* Login Link */}
                            <div className="text-center">
                                <p className="text-secondary mb-0">
                                    Already have an account?{" "}
                                    <NavLink to="/login" className="fw-bold" style={{ color: '#6366f1', textDecoration: 'none' }}>
                                        Login Now
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