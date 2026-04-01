import Navbar from "../components/navbar"; // RESTORED
import Slider from "../components/slider"; // RESTORED
import { db, auth } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Profile from "../assets/profile.jpg";

/* ================= CARD COMPONENT ================= */
function ComplaintCard({ complaint }) {
  const getStatus = () => {
    switch (complaint.status) {
      case "completed":
        return { text: "Completed", class: "completed" };
      case "pending":
        return { text: "Pending", class: "pending" };
      case "progress":
        return { text: "In Progress", class: "progress" };
      default:
        return { text: complaint.status, class: "default" };
    }
  };

  const status = getStatus();

  return (
    <div className="complaint-card-modern">
      <div className="card-glow"></div>

      <div className="card-content">
        <h4>{complaint.title}</h4>

        <p className="desc">{complaint.description}</p>

        <div className="card-footer">
          <span className={`status ${status.class}`}>
            {status.text}
          </span>

          <span className="date">
            📅{" "}
            {complaint.createdAt?.toDate?.().toLocaleDateString() || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ================= MAIN PAGE ================= */
export default function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* GET USER */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  /* FETCH COMPLAINTS */
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "complaints"),
      where("uid", "==", user.uid)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComplaints(list);
    });

    return () => unsub();
  }, [user]);

  return (
    <div className="dashboard">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="layout">
        <Slider active={sidebarOpen} />

        <main className="main">
          {/* TOPBAR */}
          <div className="topbar-modern">
            <input
              className="search"
              placeholder="🔍 Search complaints..."
            />

            <div className="profile-modern">
              <img src={Profile} alt="profile" />
              <div>
                <p>{user?.email === "admin@gmail.com" ? "Admin" : (user?.displayName || "User")}</p>
                <span>My Account</span>
              </div>
            </div>
          </div>

          <h2 className="my-complain">My Complaints</h2>

          {/* GRID */}
          <div className="complaints-grid">
            {complaints.length === 0 && (
              <p className="no-complaints">No complaints found.</p>
            )}

            {complaints.map((complaint) => (
              <ComplaintCard
                key={complaint.id}
                complaint={complaint}
              />
            ))}
          </div>
        </main>
      </div> {/* RESTORED */}
    </div>
  );
}