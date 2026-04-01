import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../App.css";

export default function Slider({ active }) {

  const navigate = useNavigate();

  const handleAdmin = () => {
    Swal.fire({
      title: "Admin Login 🔐",
      html: `
        <input type="email" id="admin-email" autocomplete="new-password" class="swal2-input" placeholder="Enter Email" autocomplete="off">
        <input type="password" id="admin-pass" autocomplete="new-password" class="swal2-input" placeholder="Enter Password" autocomplete="off">
      `,
      confirmButtonText: "Login",
      background:"#111",
      color:"#fff",
      confirmButtonColor:"#33ff00",

      preConfirm: () => {
        const email =
          document.getElementById("admin-email").value.trim();
        const pass =
          document.getElementById("admin-pass").value.trim();

        if (email === "admin@gmail.com" && pass === "123456") {
          return true;
        } else {
          Swal.showValidationMessage("Invalid Admin Credentials ❌");
          return false;
        }
      },
    }).then((result) => {
      if (result.isConfirmed) navigate("/admin");
    });
  };

  return (
    <div className={`sidebar ${active ? "active" : ""}`}>
      <ul>
        <NavLink to="/dashboard"><li>Dashboard</li></NavLink>
        <NavLink to="/new-complaint"><li>New Complaint</li></NavLink>
        <NavLink to="/my-complaints"><li>My Complaint</li></NavLink>
        <li onClick={handleAdmin}>Admin Panel</li>
      </ul>
    </div>
  );
}