import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiInstance from '../../utils/axios';
import { useAuthStore } from '../../store/auth';
import Cookies from 'js-cookie';

// Build an axios instance with the auth token from cookies
const getAuthAxios = () => {
    const access_token = Cookies.get('access_token');
    const { default: axios } = { default: apiInstance };
    if (!access_token) return null;
    const instance = require('axios').default.create({
        baseURL: 'http://127.0.0.1:8000/api/v1/',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`,
        },
    });
    return instance;
};

function Subscription() {
    const [plans, setPlans] = useState([]);
    const [mySubscription, setMySubscription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [subscribing, setSubscribing] = useState(null); // plan id being subscribed
    const [cancelling, setCancelling] = useState(false);
    const [toast, setToast] = useState(null);

    const [isLoggedIn] = useAuthStore((state) => [state.isLoggedIn]);
    const navigate = useNavigate();

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 4000);
    };

    const fetchPlans = async () => {
        try {
            const res = await apiInstance.get('subscription/plans/');
            setPlans(res.data);
        } catch (e) {
            console.error('Plans fetch error', e);
        } finally {
            setLoading(false);
        }
    };

    const fetchMySubscription = async () => {
        if (!isLoggedIn()) return;
        const auth = getAuthAxios();
        if (!auth) return;
        try {
            const res = await auth.get('subscription/my-subscription/');
            if (res.data.has_subscription) {
                setMySubscription(res.data);
            } else {
                setMySubscription(null);
            }
        } catch (e) {
            setMySubscription(null);
        }
    };

    useEffect(() => {
        fetchPlans();
        fetchMySubscription();
    }, []);

    const handleSubscribe = async (planId, planName) => {
        if (!isLoggedIn()) { navigate('/login'); return; }
        const auth = getAuthAxios();
        if (!auth) { navigate('/login'); return; }
        setSubscribing(planId);
        try {
            await auth.post('subscription/subscribe/', { plan_id: planId });
            showToast(`🎉 Welcome to ${planName}! Your discount is now active.`);
            fetchMySubscription();
        } catch (e) {
            showToast(e.response?.data?.error || 'Could not complete subscription.', 'error');
        } finally {
            setSubscribing(null);
        }
    };

    const handleCancel = async () => {
        if (!window.confirm('Cancel your subscription? Your discount will be removed at the end of the billing period.')) return;
        const auth = getAuthAxios();
        if (!auth) return;
        setCancelling(true);
        try {
            await auth.post('subscription/cancel/');
            showToast('Subscription cancelled.', 'info');
            fetchMySubscription();
        } catch (e) {
            showToast('Could not cancel subscription.', 'error');
        } finally {
            setCancelling(false);
        }
    };

    const tierConfig = {
        Silver: {
            icon: '◈',
            color: '#8a9aa8',
            glow: 'rgba(138,154,168,0.3)',
            bg: 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 100%)',
            badge: 'STARTER',
            scale: 1,
            accent: '#6c757d',
        },
        Gold: {
            icon: '◆',
            color: '#c9963a',
            glow: 'rgba(201,150,58,0.35)',
            bg: 'linear-gradient(145deg, #fefdf8 0%, #fdf3dc 100%)',
            badge: 'POPULAR',
            scale: 1.04,
            accent: '#9a7b3a',
        },
        Platinum: {
            icon: '✦',
            color: '#7c5cbf',
            glow: 'rgba(124,92,191,0.35)',
            bg: 'linear-gradient(145deg, #faf8ff 0%, #ede8f9 100%)',
            badge: 'BEST VALUE',
            scale: 1.08,
            accent: '#5b3fa0',
        },
    };

    const isCurrentPlan = (plan) =>
        mySubscription?.plan_name === plan.name && mySubscription?.status === 'active';

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Barlow:wght@300;400;500;600&display=swap');

                .sub-page {
                    min-height: 80vh;
                    background: #f5f2ee;
                    font-family: 'Barlow', sans-serif;
                    padding-bottom: 80px;
                }

                /* ── Toast ── */
                .sub-toast {
                    position: fixed;
                    top: 90px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 9999;
                    padding: 12px 28px;
                    border-radius: 2px;
                    font-size: 0.88rem;
                    font-weight: 500;
                    letter-spacing: 0.03em;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.15);
                    animation: toastIn 0.3s ease;
                }
                .sub-toast--success { background: #1a1710; color: #c9aa72; }
                .sub-toast--error   { background: #9b2626; color: #fff; }
                .sub-toast--info    { background: #333; color: #ddd; }
                @keyframes toastIn {
                    from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
                    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
                }

                /* ── Hero banner (no subscription) ── */
                .sub-hero {
                    background: #1a1710;
                    padding: 64px 24px 56px;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                    margin-bottom: 60px;
                }
                .sub-hero::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(ellipse 60% 80% at 50% 100%, rgba(201,150,58,0.12) 0%, transparent 70%);
                    pointer-events: none;
                }
                .sub-hero__eyebrow {
                    font-family: 'Barlow', sans-serif;
                    font-size: 0.7rem;
                    letter-spacing: 0.25em;
                    text-transform: uppercase;
                    color: #c9aa72;
                    margin-bottom: 16px;
                }
                .sub-hero__title {
                    font-family: 'Playfair Display', serif;
                    font-size: clamp(2rem, 5vw, 3.2rem);
                    font-weight: 700;
                    color: #f5f2ee;
                    line-height: 1.15;
                    margin-bottom: 16px;
                }
                .sub-hero__sub {
                    font-size: 1rem;
                    color: #8a8178;
                    font-weight: 300;
                    max-width: 420px;
                    margin: 0 auto;
                    line-height: 1.6;
                }

                /* ── Section heading ── */
                .sub-section-head {
                    text-align: center;
                    margin-bottom: 48px;
                }
                .sub-section-head__eyebrow {
                    font-size: 0.68rem;
                    letter-spacing: 0.22em;
                    text-transform: uppercase;
                    color: #9a7b3a;
                    margin-bottom: 10px;
                }
                .sub-section-head__title {
                    font-family: 'Playfair Display', serif;
                    font-size: clamp(1.6rem, 3vw, 2.2rem);
                    color: #1a1710;
                    font-weight: 700;
                }
                .sub-divider {
                    width: 40px;
                    height: 1px;
                    background: #c9aa72;
                    margin: 16px auto 0;
                }

                /* ── My Subscription card ── */
                .sub-status-card {
                    background: #1a1710;
                    border-radius: 3px;
                    padding: 36px 40px;
                    margin-bottom: 60px;
                    position: relative;
                    overflow: hidden;
                    color: #f5f2ee;
                }
                .sub-status-card::before {
                    content: '';
                    position: absolute;
                    top: -40px; right: -40px;
                    width: 200px; height: 200px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(201,150,58,0.15) 0%, transparent 70%);
                    pointer-events: none;
                }
                .sub-status-card__eyebrow {
                    font-size: 0.65rem;
                    letter-spacing: 0.25em;
                    text-transform: uppercase;
                    color: #c9aa72;
                    margin-bottom: 8px;
                }
                .sub-status-card__plan {
                    font-family: 'Playfair Display', serif;
                    font-size: 2rem;
                    font-weight: 700;
                    color: #f5f2ee;
                    margin-bottom: 4px;
                }
                .sub-status-badge {
                    display: inline-block;
                    font-size: 0.62rem;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    padding: 3px 10px;
                    border-radius: 1px;
                    font-weight: 600;
                    margin-bottom: 24px;
                }
                .sub-status-badge--active    { background: rgba(40,167,69,0.2); color: #7ddb96; border: 1px solid rgba(40,167,69,0.3); }
                .sub-status-badge--cancelled { background: rgba(220,53,69,0.2); color: #f98a95; border: 1px solid rgba(220,53,69,0.3); }
                .sub-status-badge--expired   { background: rgba(255,193,7,0.2); color: #ffe082; border: 1px solid rgba(255,193,7,0.3); }
                .sub-status-meta {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                    gap: 20px;
                    margin-bottom: 28px;
                }
                .sub-status-meta__item label {
                    display: block;
                    font-size: 0.62rem;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: #5a5348;
                    margin-bottom: 4px;
                }
                .sub-status-meta__item span {
                    font-size: 1.05rem;
                    font-weight: 600;
                    color: #f5f2ee;
                }
                .sub-status-meta__item span.highlight { color: #c9aa72; }
                .sub-cancel-btn {
                    background: transparent;
                    border: 1px solid #3a3530;
                    color: #8a8178;
                    font-size: 0.75rem;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    padding: 8px 20px;
                    border-radius: 1px;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .sub-cancel-btn:hover { border-color: #9b2626; color: #f98a95; }

                /* ── Plan cards grid ── */
                .sub-plans-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 24px;
                    align-items: end;
                    max-width: 980px;
                    margin: 0 auto 60px;
                    padding: 0 16px;
                }
                @media (max-width: 768px) {
                    .sub-plans-grid { grid-template-columns: 1fr; }
                }

                /* ── Individual plan card ── */
                .plan-card {
                    background: #fff;
                    border-radius: 3px;
                    border: 1px solid #e0d9d0;
                    overflow: hidden;
                    transition: box-shadow 0.25s, transform 0.25s;
                    position: relative;
                }
                .plan-card:hover {
                    box-shadow: 0 16px 48px rgba(0,0,0,0.1);
                }
                .plan-card--gold {
                    border-color: #c9963a;
                    transform: scale(1.04);
                    box-shadow: 0 8px 32px rgba(201,150,58,0.15);
                }
                .plan-card--platinum {
                    border-color: #7c5cbf;
                    transform: scale(1.08);
                    box-shadow: 0 12px 40px rgba(124,92,191,0.18);
                }
                .plan-card--current {
                    border-width: 2px;
                }

                .plan-card__header {
                    padding: 28px 28px 20px;
                    border-bottom: 1px solid #f0ebe4;
                    position: relative;
                }
                .plan-card__badge {
                    font-size: 0.58rem;
                    letter-spacing: 0.22em;
                    text-transform: uppercase;
                    font-weight: 700;
                    padding: 4px 10px;
                    border-radius: 1px;
                    display: inline-block;
                    margin-bottom: 14px;
                }
                .plan-card__badge--silver   { background: #f0f0f0; color: #6c757d; }
                .plan-card__badge--gold     { background: #fdf3dc; color: #9a7b3a; }
                .plan-card__badge--platinum { background: #ede8f9; color: #5b3fa0; }

                .plan-card__name {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.5rem;
                    font-weight: 700;
                    letter-spacing: 0.04em;
                    color: #1a1710;
                    margin-bottom: 2px;
                }
                .plan-card__price {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #1a1710;
                    line-height: 1;
                    margin-top: 8px;
                }
                .plan-card__price sup { font-size: 1rem; vertical-align: super; font-weight: 600; }
                .plan-card__price span { font-size: 0.8rem; font-weight: 400; color: #8a8178; }

                .plan-card__icon {
                    position: absolute;
                    top: 20px; right: 20px;
                    font-size: 1.5rem;
                    opacity: 0.25;
                }

                .plan-card__features {
                    padding: 24px 28px;
                    list-style: none;
                    margin: 0;
                }
                .plan-card__features li {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 0.87rem;
                    color: #3a3530;
                    padding: 7px 0;
                    border-bottom: 1px solid #f5f2ee;
                    line-height: 1.4;
                }
                .plan-card__features li:last-child { border-bottom: none; }
                .feat-yes { color: #2d8a47; font-size: 0.8rem; }
                .feat-no  { color: #c4bdb5; font-size: 0.8rem; }

                .plan-card__footer {
                    padding: 20px 28px 28px;
                }
                .plan-btn {
                    width: 100%;
                    padding: 12px 0;
                    border-radius: 2px;
                    font-size: 0.78rem;
                    font-weight: 600;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: all 0.2s;
                    border: none;
                    position: relative;
                    overflow: hidden;
                }
                .plan-btn:disabled { opacity: 0.6; cursor: default; }
                .plan-btn--silver {
                    background: #1a1710;
                    color: #f5f2ee;
                }
                .plan-btn--silver:hover:not(:disabled) {
                    background: #2d2920;
                }
                .plan-btn--gold {
                    background: #9a7b3a;
                    color: #fff;
                }
                .plan-btn--gold:hover:not(:disabled) {
                    background: #7d6330;
                }
                .plan-btn--platinum {
                    background: #5b3fa0;
                    color: #fff;
                }
                .plan-btn--platinum:hover:not(:disabled) {
                    background: #4a3285;
                }
                .plan-btn--current {
                    background: transparent;
                    border: 1px solid #2d8a47;
                    color: #2d8a47;
                }
                .plan-btn--loading {
                    opacity: 0.7;
                }

                .plan-current-ribbon {
                    position: absolute;
                    top: 12px; right: -22px;
                    background: #2d8a47;
                    color: #fff;
                    font-size: 0.55rem;
                    font-weight: 700;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    padding: 3px 28px;
                    transform: rotate(35deg);
                }

                /* ── Promo section (upsell when not subscribed) ── */
                .sub-upsell {
                    text-align: center;
                    padding: 0 16px 48px;
                    max-width: 520px;
                    margin: 0 auto;
                }
                .sub-upsell__text {
                    font-size: 0.85rem;
                    color: #8a8178;
                    line-height: 1.7;
                }
                .sub-upsell__savings {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: #f9f7f4;
                    border: 1px solid #e0d9d0;
                    border-radius: 2px;
                    padding: 10px 20px;
                    margin-top: 16px;
                    font-size: 0.82rem;
                    color: #1a1710;
                    font-weight: 500;
                }
                .sub-upsell__savings span { color: #9a7b3a; font-weight: 700; }
            `}</style>

            <div className="sub-page">
                {/* Toast */}
                {toast && (
                    <div className={`sub-toast sub-toast--${toast.type}`}>
                        {toast.msg}
                    </div>
                )}

                {/* Hero — shown when no subscription */}
                {!mySubscription && (
                    <div className="sub-hero">
                        <p className="sub-hero__eyebrow">TimeCraft Membership</p>
                        <h1 className="sub-hero__title">
                            Save on Every<br />Watch You Love
                        </h1>
                        <p className="sub-hero__sub">
                            Join thousands of collectors who save up to 15% on every purchase with a TimeCraft membership.
                        </p>
                    </div>
                )}

                <div className="container">
                    {/* My Subscription Status Card */}
                    {isLoggedIn() && mySubscription && (
                        <div className="sub-status-card">
                            <p className="sub-status-card__eyebrow">Your Membership</p>
                            <h2 className="sub-status-card__plan">{mySubscription.plan_name} Member</h2>
                            <div>
                                <span className={`sub-status-badge sub-status-badge--${mySubscription.status}`}>
                                    {mySubscription.status}
                                </span>
                            </div>
                            <div className="sub-status-meta">
                                <div className="sub-status-meta__item">
                                    <label>Days Remaining</label>
                                    <span className="highlight">{mySubscription.days_remaining} days</span>
                                </div>
                                <div className="sub-status-meta__item">
                                    <label>Product Discount</label>
                                    <span>{mySubscription.product_discount_percent}% off all watches</span>
                                </div>
                                {mySubscription.service_discount_percent > 0 && (
                                    <div className="sub-status-meta__item">
                                        <label>Service Discount</label>
                                        <span>{mySubscription.service_discount_percent}% off service fees</span>
                                    </div>
                                )}
                                <div className="sub-status-meta__item">
                                    <label>Renews</label>
                                    <span>{new Date(mySubscription.end_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                </div>
                            </div>
                            {mySubscription.status === 'active' && (
                                <button
                                    className="sub-cancel-btn"
                                    onClick={handleCancel}
                                    disabled={cancelling}
                                >
                                    {cancelling ? 'Cancelling…' : 'Cancel Membership'}
                                </button>
                            )}
                        </div>
                    )}

                    {/* Section heading */}
                    <div className="sub-section-head">
                        <p className="sub-section-head__eyebrow">Membership Plans</p>
                        <h2 className="sub-section-head__title">
                            {mySubscription ? 'Change Your Plan' : 'Choose Your Membership'}
                        </h2>
                        <div className="sub-divider" />
                    </div>

                    {/* Plan Cards */}
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '60px', color: '#8a8178' }}>
                            <i className="fas fa-spinner fa-spin me-2" />
                            Loading plans…
                        </div>
                    ) : (
                        <div className="sub-plans-grid">
                            {plans.map((plan) => {
                                const cfg = tierConfig[plan.name] || tierConfig.Silver;
                                const isCurrent = isCurrentPlan(plan);
                                const tierKey = plan.name.toLowerCase();
                                const isLoading = subscribing === plan.id;

                                return (
                                    <div
                                        key={plan.id}
                                        className={`plan-card plan-card--${tierKey} ${isCurrent ? 'plan-card--current' : ''}`}
                                        style={isCurrent ? { borderColor: cfg.color } : {}}
                                    >
                                        {isCurrent && (
                                            <div className="plan-current-ribbon">Active</div>
                                        )}

                                        <div className="plan-card__header">
                                            <span className={`plan-card__icon`} style={{ color: cfg.color }}>
                                                {cfg.icon}
                                            </span>
                                            <div className={`plan-card__badge plan-card__badge--${tierKey}`}>
                                                {cfg.badge}
                                            </div>
                                            <div className="plan-card__name">{plan.name}</div>
                                            <div className="plan-card__price" style={{ color: cfg.accent }}>
                                                <sup>$</sup>{parseFloat(plan.price).toFixed(2)}
                                                <span>/{plan.billing_cycle === 'monthly' ? 'mo' : 'yr'}</span>
                                            </div>
                                        </div>

                                        <ul className="plan-card__features">
                                            <li>
                                                <i className="fas fa-tag feat-yes" />
                                                {parseFloat(plan.product_discount_percent).toFixed(0)}% off all watches
                                            </li>
                                            <li>
                                                {plan.service_discount_percent > 0 ? (
                                                    <><i className="fas fa-tools feat-yes" />{parseFloat(plan.service_discount_percent).toFixed(0)}% service fee discount</>
                                                ) : (
                                                    <><i className="fas fa-times feat-no" /><span style={{ color: '#c4bdb5' }}>No service discount</span></>
                                                )}
                                            </li>
                                            <li>
                                                {plan.includes_vendor_coupons ? (
                                                    <><i className="fas fa-ticket-alt feat-yes" />Exclusive brand coupon codes</>
                                                ) : (
                                                    <><i className="fas fa-times feat-no" /><span style={{ color: '#c4bdb5' }}>No partner coupons</span></>
                                                )}
                                            </li>
                                            <li>
                                                <i className="fas fa-shield-alt feat-yes" />
                                                Priority customer support
                                            </li>
                                        </ul>

                                        <div className="plan-card__footer">
                                            {isCurrent ? (
                                                <button className="plan-btn plan-btn--current" disabled>
                                                    <i className="fas fa-check me-2" />Current Plan
                                                </button>
                                            ) : (
                                                <button
                                                    className={`plan-btn plan-btn--${tierKey} ${isLoading ? 'plan-btn--loading' : ''}`}
                                                    onClick={() => handleSubscribe(plan.id, plan.name)}
                                                    disabled={isLoading}
                                                >
                                                    {isLoading ? (
                                                        <><i className="fas fa-spinner fa-spin me-2" />Processing…</>
                                                    ) : isLoggedIn() ? (
                                                        `Subscribe — ${plan.name}`
                                                    ) : (
                                                        'Login to Subscribe'
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Upsell note */}
                    {!mySubscription && !loading && (
                        <div className="sub-upsell">
                            <p className="sub-upsell__text">
                                Discounts are applied automatically at checkout on every order.
                                Cancel anytime — no long-term commitment required.
                            </p>
                            <div className="sub-upsell__savings">
                                <i className="fas fa-crown" style={{ color: '#9a7b3a' }} />
                                Platinum members save up to <span>15% + 10% service fee</span> on every order
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Subscription;