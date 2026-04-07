import { useEffect, useState } from 'react';
import { login } from '../../utils/auth';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isLoggedIn()) navigate('/');
    }, []);

    const resetForm = () => {
        setUsername('');
        setPassword('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const { error } = await login(username, password);
        if (error) {
            alert(error);
        } else {
            navigate('/');
            resetForm();
        }
        setIsLoading(false);
    };

    return (
        <div className="lg-page">

            {/* ── Left Panel — Image ── */}
            <div className="lg-panel lg-panel--image">
                <div className="lg-panel__overlay" />
                <div className="lg-panel__content">
                    <Link to="/" className="lg-logo">
                        <span className="lg-logo__icon">◎</span>
                        <span className="lg-logo__text">TIMECRAFT</span>
                    </Link>
                    <div className="lg-panel__quote">
                        <p className="lg-eyebrow">Member Access</p>
                        <h2 className="lg-panel__heading">The World's Finest<br />Timepieces Await</h2>
                        <p className="lg-panel__sub">Sign in to access exclusive collections, track your orders, and manage your watchlist.</p>
                    </div>
                    <div className="lg-panel__badges">
                        <div className="lg-badge"><i className="fas fa-certificate" /><span>Certified Authentic</span></div>
                        <div className="lg-badge"><i className="fas fa-shield-alt" /><span>Secure & Encrypted</span></div>
                    </div>
                </div>
            </div>

            {/* ── Right Panel — Form ── */}
            <div className="lg-panel lg-panel--form">
                <div className="lg-form-wrap">

                    {/* Mobile logo */}
                    <Link to="/" className="lg-logo lg-logo--mobile">
                        <span className="lg-logo__icon">◎</span>
                        <span className="lg-logo__text">TIMECRAFT</span>
                    </Link>

                    <p className="lg-eyebrow">Welcome Back</p>
                    <h1 className="lg-form__title">Sign In</h1>
                    <p className="lg-form__sub">Enter your credentials to access your account.</p>

                    <form className="lg-form" onSubmit={handleLogin}>

                        {/* Email */}
                        <div className="lg-field">
                            <label className="lg-label" htmlFor="username">Email Address</label>
                            <div className="lg-input-wrap">
                                <i className="fas fa-envelope lg-input-icon" />
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="lg-input"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="lg-field">
                            <div className="lg-label-row">
                                <label className="lg-label" htmlFor="password">Password</label>
                                <Link to="/forgot-password" className="lg-forgot">Forgot password?</Link>
                            </div>
                            <div className="lg-input-wrap">
                                <i className="fas fa-lock lg-input-icon" />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="lg-input"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    className="lg-eye-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                    tabIndex={-1}
                                >
                                    <i className={`fas fa-${showPassword ? 'eye-slash' : 'eye'}`} />
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button className="lg-submit" type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>Processing <i className="fas fa-spinner fa-spin" /></>
                            ) : (
                                <>Sign In <i className="fas fa-arrow-right" /></>
                            )}
                        </button>

                        {/* Divider */}
                        <div className="lg-divider"><span>or</span></div>

                        {/* Register */}
                        <p className="lg-register-text">
                            Don't have an account?&nbsp;
                            <Link to="/register" className="lg-register-link">Create Account</Link>
                        </p>

                    </form>
                </div>
            </div>

        </div>
    );
};

export default Login;