import Navbar from "../components/navbar"; // RESTORED
import Slider from "../components/slider"; // RESTORED
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";
import Profile from "../assets/profile.jpg";

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "complaints"), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComplaints(list);
    });
    return () => unsub();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateDoc(doc(db, "complaints", id), { status });
      Swal.fire({
        icon: "success",
        title: "Status Updated ✅",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#33ff00",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error ❌",
        text: "Could not update status",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#33ff00",
      });
    }
  };

  const total = complaints.length;
  const completed = complaints.filter(c => c.status === "completed").length;
  const pending = complaints.filter(c => c.status === "pending").length;
  const inProgress = complaints.filter(c => c.status === "progress").length;

  return (
    <div className="dashboard">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="layout">
        <Slider active={sidebarOpen} />

        <main className="main">

          {/* TOPBAR */}
          <div className="topbar-modern">
            <input className="search" placeholder="🔍 Search complaints..." />

            <div className="profile-modern">
              <img src={Profile} alt="profile" />
              <div>
                <p>Admin</p>
                <span>Super User</span>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="stats-grid">
            <div className="stat-card glow">
              <h4>Total</h4>
              <p>{total}</p>
            </div>

            <div className="stat-card success">
              <h4>Completed</h4>
              <p>{completed}</p>
            </div>

            <div className="stat-card warning">
              <h4>Pending</h4>
              <p>{pending}</p>
            </div>

            <div className="stat-card info">
              <h4>Progress</h4>
              <p>{inProgress}</p>
            </div>
          </div>

          {/* CIRCLE STATS SECTION */}
          <div className="circle-section">
            <div className="circle-card">
              <div className="circle total">
                <svg>
                  <circle cx="60" cy="60" r="50"></circle>
                  <circle cx="60" cy="60" r="50" style={{ strokeDashoffset: 0 }}></circle>
                </svg>
                <div className="number"><h3>{total}</h3></div>
              </div>
              <p>Total Complaints</p>
            </div>

            <div className="circle-card">
              <div className="circle completed">
                <svg>
                  <circle cx="60" cy="60" r="50"></circle>
                  <circle cx="60" cy="60" r="50" style={{ strokeDashoffset: total === 0 ? 314 : 314 - (314 * completed) / total }}></circle>
                </svg>
                <div className="number"><h3>{completed}</h3></div>
              </div>
              <p>Completed</p>
            </div>

            <div className="circle-card">
              <div className="circle pending">
                <svg>
                  <circle cx="60" cy="60" r="50"></circle>
                  <circle cx="60" cy="60" r="50" style={{ strokeDashoffset: total === 0 ? 314 : 314 - (314 * pending) / total }}></circle>
                </svg>
                <div className="number"><h3>{pending}</h3></div>
              </div>
              <p>Pending</p>
            </div>

            <div className="circle-card">
              <div className="circle progress">
                <svg>
                  <circle cx="60" cy="60" r="50"></circle>
                  <circle cx="60" cy="60" r="50" style={{ strokeDashoffset: total === 0 ? 314 : 314 - (314 * inProgress) / total }}></circle>
                </svg>
                <div className="number"><h3>{inProgress}</h3></div>
              </div>
              <p>In Progress</p>
            </div>
          </div>

          {/* TABLE */}
          <div className="table-modern">
            <h2>📋 Complaints Overview</h2>

            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {complaints.map(c => (
                  <tr key={c.id}>
                    <td>
                      <div className="user-cell">
                        <img src={Profile} alt="" />
                        <div>
                          <p>{c.name}</p>
                          <span>{c.email}</span>
                        </div>
                      </div>
                    </td>

                    <td>{c.title}</td>

                    <td>
                      <span className={`badge ${c.status}`}>
                        {c.status}
                      </span>
                    </td>

                    <td>
                      <select
                        className="status-select"
                        value={c.status}
                        onChange={(e) =>
                          handleStatusChange(c.id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </main>
      </div> {/* RESTORED */}
    </div>
  );
}
