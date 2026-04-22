import { useEffect, useState } from 'react';
import { register } from '../../utils/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import Swal from 'sweetalert2';
import './Register.css';

function Register() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn()) navigate('/');
    }, []);

    const resetForm = () => {
        setFullname(''); setEmail('');
        setPhone(''); setPassword(''); setPassword2('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const { error } = await register(fullname, email, phone, password, password2);
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Registration Error',
                text: error,
            });
        } else {
            navigate('/');
            resetForm();
        }
        setIsLoading(false);
    };

    const passwordsMatch = password2 === '' || password === password2;

    return (
        <div className="rg-page">

            {/* ── Left Panel — Form ── */}
            <div className="rg-panel rg-panel--form">
                <div className="rg-form-wrap">

                    {/* Mobile logo */}
                    <Link to="/" className="rg-logo rg-logo--mobile">
                        <span className="rg-logo__icon">◎</span>
                        <span className="rg-logo__text">TIMECRAFT</span>
                    </Link>

                    <p className="rg-eyebrow">New Member</p>
                    <h1 className="rg-form__title">Create Account</h1>
                    <p className="rg-form__sub">Join TimeCraft and access the world's finest luxury timepieces.</p>

                    <form className="rg-form" onSubmit={handleSubmit}>

                        {/* Full Name */}
                        <div className="rg-field">
                            <label className="rg-label" htmlFor="fullname">Full Name</label>
                            <div className="rg-input-wrap">
                                <i className="fas fa-user rg-input-icon" />
                                <input
                                    id="fullname"
                                    type="text"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    className="rg-input"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="rg-field">
                            <label className="rg-label" htmlFor="email">Email Address</label>
                            <div className="rg-input-wrap">
                                <i className="fas fa-envelope rg-input-icon" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="rg-input"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="rg-field">
                            <label className="rg-label" htmlFor="phone">Mobile Number</label>
                            <div className="rg-input-wrap">
                                <i className="fas fa-phone rg-input-icon" />
                                <input
                                    id="phone"
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="rg-input"
                                    placeholder="+91 98765 43210"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password row — side by side */}
                        <div className="rg-field-row">
                            <div className="rg-field">
                                <label className="rg-label" htmlFor="password">Password</label>
                                <div className="rg-input-wrap">
                                    <i className="fas fa-lock rg-input-icon" />
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="rg-input"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button type="button" className="rg-eye-btn" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                                        <i className={`fas fa-${showPassword ? 'eye-slash' : 'eye'}`} />
                                    </button>
                                </div>
                            </div>
                            <div className="rg-field">
                                <label className="rg-label" htmlFor="confirm-password">Confirm Password</label>
                                <div className="rg-input-wrap">
                                    <i className="fas fa-lock rg-input-icon" />
                                    <input
                                        id="confirm-password"
                                        type={showPassword2 ? 'text' : 'password'}
                                        value={password2}
                                        onChange={(e) => setPassword2(e.target.value)}
                                        className={`rg-input ${!passwordsMatch ? 'rg-input--error' : ''}`}
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button type="button" className="rg-eye-btn" onClick={() => setShowPassword2(!showPassword2)} tabIndex={-1}>
                                        <i className={`fas fa-${showPassword2 ? 'eye-slash' : 'eye'}`} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Password mismatch error */}
                        {!passwordsMatch && (
                            <p className="rg-error">
                                <i className="fas fa-exclamation-circle" /> Passwords do not match
                            </p>
                        )}

                        {/* Submit */}
                        <button
                            className="rg-submit"
                            type="submit"
                            disabled={isLoading || !passwordsMatch}
                        >
                            {isLoading ? (
                                <>Processing <i className="fas fa-spinner fa-spin" /></>
                            ) : (
                                <>Create Account <i className="fas fa-arrow-right" /></>
                            )}
                        </button>

                        {/* Divider */}
                        <div className="rg-divider"><span>or</span></div>

                        {/* Login link */}
                        <p className="rg-login-text">
                            Already have an account?&nbsp;
                            <Link to="/login" className="rg-login-link">Sign In</Link>
                        </p>

                    </form>
                </div>
            </div>

            {/* ── Right Panel — Image ── */}
            <div className="rg-panel rg-panel--image">
                <div className="rg-panel__content">
                    <Link to="/" className="rg-logo">
                        <span className="rg-logo__icon">◎</span>
                        <span className="rg-logo__text">TIMECRAFT</span>
                    </Link>
                    <div className="rg-panel__quote">
                        <p className="rg-eyebrow rg-eyebrow--light">Member Benefits</p>
                        <h2 className="rg-panel__heading">Your Journey into<br />Horological Excellence</h2>
                        <p className="rg-panel__sub">Join thousands of collectors and enthusiasts who trust TimeCraft for authenticated luxury timepieces.</p>
                    </div>
                    <div className="rg-panel__perks">
                        <div className="rg-perk">
                            <div className="rg-perk__icon"><i className="fas fa-crown" /></div>
                            <div>
                                <p className="rg-perk__title">Exclusive Access</p>
                                <p className="rg-perk__desc">Priority access to rare drops and private auction events.</p>
                            </div>
                        </div>
                        <div className="rg-perk">
                            <div className="rg-perk__icon"><i className="fas fa-certificate" /></div>
                            <div>
                                <p className="rg-perk__title">Verified Authenticity</p>
                                <p className="rg-perk__desc">Every piece certified by master horologists.</p>
                            </div>
                        </div>
                        <div className="rg-perk">
                            <div className="rg-perk__icon"><i className="fas fa-shield-alt" /></div>
                            <div>
                                <p className="rg-perk__title">Secure Transactions</p>
                                <p className="rg-perk__desc">Escrow-protected payments for complete peace of mind.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Register;