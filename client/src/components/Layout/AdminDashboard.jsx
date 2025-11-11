import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      window.location.href = "/admin/login";
      return;
    }
    fetchBookings();
    // eslint-disable-next-line
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data.data);
      setFiltered(res.data.data);
    } catch (error) {
      setMessage("❌ Error fetching bookings or unauthorized access");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/admin/bookings/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(`✅ Booking ${status} successfully`);
      fetchBookings();
    } catch (err) {
      setMessage("❌ Failed to update booking");
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("🗑️ Booking deleted successfully");
      fetchBookings();
    } catch (err) {
      setMessage("❌ Failed to delete booking");
    }
  };

  const handleFilterChange = (status) => {
    setStatusFilter(status);
    if (status === "All") setFiltered(bookings);
    else setFiltered(bookings.filter((b) => b.status === status));
  };

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">🐾 PetCare Admin Dashboard</h1>
      {message && <div className="admin-msg">{message}</div>}

      <div className="filter-bar">
        <label>Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Email</th>
            <th>Service</th>
            <th>Type</th>
            <th>Price</th>
            <th>Status</th>
            <th>Booked At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="9" className="no-data">
                No bookings found
              </td>
            </tr>
          ) : (
            filtered.map((b, index) => (
              <tr key={b._id}>
                <td>{index + 1}</td>
                <td>{b.userId?.fullName || "N/A"}</td>
                <td>{b.userId?.email || "N/A"}</td>
                <td>{b.serviceName}</td>
                <td>{b.serviceType}</td>
                <td>{b.servicePrice}</td>
                <td>
                  <span
                    className={`status-badge ${
                      b.status === "Confirmed"
                        ? "confirmed"
                        : b.status === "Rejected"
                        ? "rejected"
                        : "pending"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td>{new Date(b.bookedAt).toLocaleString()}</td>
                <td className="action-buttons">
                  <button
                    className="approve-btn"
                    onClick={() => updateStatus(b._id, "Confirmed")}
                  >
                    Approve
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => updateStatus(b._id, "Rejected")}
                  >
                    Reject
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteBooking(b._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
