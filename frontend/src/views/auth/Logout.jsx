import { useEffect } from 'react';
import { logout } from '../../utils/auth';
import { Link } from 'react-router-dom';
import './Logout.css';

const Logout = () => {
    useEffect(() => {
        logout();
    }, []);

    return (
        <div className="lo-page">

            {/* Decorative background lines */}
            <div className="lo-bg-lines" />

            <div className="lo-card">

                {/* Logo */}
                <Link to="/" className="lo-logo">
                    <span className="lo-logo__icon">◎</span>
                    <span className="lo-logo__text">TIMECRAFT</span>
                </Link>

                {/* Icon */}
                <div className="lo-icon-wrap">
                    <i className="fas fa-sign-out-alt lo-icon" />
                </div>

                {/* Text */}
                <p className="lo-eyebrow">Session Ended</p>
                <h1 className="lo-title">You've Been<br />Signed Out</h1>
                <p className="lo-sub">Thank you for visiting TimeCraft. Your session has been securely closed.</p>

                {/* Divider */}
                <div className="lo-divider" />

                {/* Actions */}
                <div className="lo-actions">
                    <Link to="/login" className="lo-btn lo-btn--gold">
                        Sign In <i className="fas fa-arrow-right" />
                    </Link>
                    <Link to="/register" className="lo-btn lo-btn--outline">
                        Create Account <i className="fas fa-user-plus" />
                    </Link>
                </div>

                {/* Browse */}
                <Link to="/" className="lo-browse">
                    or browse as guest <i className="fas fa-chevron-right" />
                </Link>

            </div>
        </div>
    );
};

export default Logout;