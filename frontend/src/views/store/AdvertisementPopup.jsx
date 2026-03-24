import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdvertisementPopup = () => {
  const [advertisement, setAdvertisement] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // React Router navigation

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/advertisement/active/')
      .then(response => {
        if (response.data && response.data.length > 0) {
          setAdvertisement(response.data[0]); // Assuming one active ad
          setShowModal(true);
        }
      })
      .catch(error => {
        console.error('Error fetching ad:', error);
      });
  }, []);

  const handleRedirect = () => {
    if (advertisement?.product_slug) {
      setShowModal(false); // Close modal before navigating
      navigate(`/detail/${advertisement.product_slug}/`);
    }
  };

  return (
    <>
      {showModal && advertisement && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{advertisement.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>{advertisement.description}</p>
                <button onClick={handleRedirect} style={{ border: 'none', background: 'none' }}>
                  <img src={advertisement.image} alt="Advertisement" className="img-fluid" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdvertisementPopup;
