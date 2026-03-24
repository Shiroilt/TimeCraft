import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import apiInstance from "../../utils/axios";
import UserData from "../plugin/UserData";
import Swal from "sweetalert2";
import moment from "moment";
import "./noty.css";
const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

function CustomerNotification() {
  const [notifications, setNotifications] = useState([]);
  const userData = UserData();
  const [loading, setLoading] = useState(true);

  const fetchNotifications = () => {
    apiInstance
      .get(`/customer/notification/${userData?.user_id}/`)
      .then((res) => {
        setNotifications(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch notifications:", error);
      });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markNotificationAsSeen = (notiId) => {
    apiInstance
      .get(`/customer/notification/${userData?.user_id}/${notiId}/`)
      .then((res) => {
        fetchNotifications();
        Toast.fire({
          icon: "success",
          title: "Notification marked as seen",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <main className="mt-5">
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar Here */}
          <Sidebar />
          <div className="col-lg-9 col-md-12 mt-1">
            <div className="container px-4">
              {/* Notifications Header */}
              <section className="mb-5">
                <h3 className="mb-4 fw-bold text-primary">
                  <i className="fas fa-bell me-2"></i> Notifications
                </h3>
              </section>

              {/* Notifications List */}
              <section>
                <div className="card shadow-lg">
                  <div className="card-body">
                    {loading ? (
                      <div className="text-center py-4">
                        <h5 className="text-info">
                          Loading Notifications...{" "}
                          <i className="fas fa-spinner fa-spin"></i>
                        </h5>
                      </div>
                    ) : (
                      <>
                        {notifications.length === 0 ? (
                          <h4 className="p-4 text-center text-muted">
                            No New Notifications Available
                          </h4>
                        ) : (
                          <div className="list-group">
                            {notifications?.map((n, index) => (
                              <div
                                key={n.id}
                                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center p-4"
                              >
                                <div>
                                  <h5 className="mb-1 fw-bold">Order Confirmed</h5>
                                  <p className="mb-1">
                                    Your order has been confirmed
                                  </p>
                                  <small className="text-muted">
                                    {moment(n.date).format("MMM Do YYYY")}
                                  </small>
                                </div>
                                <button
                                  className="btn btn-success btn-sm"
                                  onClick={() => markNotificationAsSeen(n.id)}
                                >
                                  <i className="fas fa-eye"></i> Mark as Seen
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CustomerNotification;