import Navbar from "../components/navbar"; // RESTORED
import Slider from "../components/slider"; // RESTORED
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Swal from "sweetalert2";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import Profile from "../assets/profile.jpg";

export default function NewComplaint() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      Swal.fire({
        icon: "error",
        title: "Oops 😅",
        text: "Please fill all fields!",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#33ff00",
      });
      return;
    }

    try {
      await addDoc(collection(db, "complaints"), {
        title,
        description,
        status: "pending",
        createdAt: serverTimestamp(),
        uid: user.uid,
        name: user.displayName || user.email.split("@")[0],
        email: user.email,
      });

      Swal.fire({
        icon: "success",
        title: "Complaint Submitted 🎉",
        text: "Your complaint has been sent!",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#33ff00",
      });

      setTitle("");
      setDescription("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error ❌",
        text: "Something went wrong!",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#33ff00",
      });
    }
  };

  return (
    <div className="dashboard">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="layout">
        <Slider active={sidebarOpen} />

        <main className="main">
          {/* TOPBAR */}
          <div className="topbar-modern">
            <div className="profile-modern">
              <img src={user?.photoURL || Profile} alt="profile" />
              <div>
                <p>{user?.email === "admin@gmail.com" ? "Admin" : (user?.displayName || "User")}</p>
                <span>Create Complaint</span>
              </div>
            </div>
          </div>

          {/* 🔥 HEADING */}
          <h1 className="modern-heading">
            Submit Your Complaint
          </h1>

          {/* FORM */}
          <form className="modern-form" onSubmit={handleSubmit}>

            <div className="input-group">
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label>Complaint Title</label>
            </div>

            <div className="input-group">
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <label>Description</label>
            </div>

            <button className="submit-btn">
              🚀 Submit Complaint
            </button>

          </form>

        </main>
      </div> {/* RESTORED */}
    </div>
  );
}
