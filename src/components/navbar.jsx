import "../App.css";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Navbar({ toggleSidebar }) {
  const navigate = useNavigate();

  const logout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Do you really want to logout?",
      icon: "warning",
      showCancelButton: true,
      background: "#111",
      color: "#fff",
      confirmButtonColor: "#33ff00",
      cancelButtonColor: "#ff4500",
      confirmButtonText: "Yes, Logout",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await signOut(auth);

        await Swal.fire({
          title: "Logged Out!",
          text: "Successfully logged out ✅",
          icon: "success",
          background: "#111",
          color: "#fff",
          confirmButtonColor: "#33ff00",
        });

        navigate("/");
      }
    });
  };

  return (
    <div className="navbar-container">

      {/* TOGGLE */}
      <div className="menu-btn" onClick={toggleSidebar}>
        ☰
      </div>

      {/* LOGO */}
      <div className="logo">
        <h1><span>Complain</span> Portal</h1>
      </div>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>

    </div>
  );
}