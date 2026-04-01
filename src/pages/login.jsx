import "../App.css";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import LoginVideo from "../assets/login.mp4";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
export default function Login() {
useEffect(() => {
  AOS.init({
    duration: 1200,
    once: true,
  });
}, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const loginbtn = async () => {

    if (!email || !password) {
      Swal.fire("Error", "Fill all fields", "warning");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      Swal.fire({
        title: "Welcome 🎉",
        text: "Login Successful!",
        icon: "success",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#33ff00"
      }).then(()=>navigate("/dashboard"));

    } catch (error) {
      Swal.fire("Login Failed ❌", error.message, "error");
    }
  };

  return (
    <div className="auth-container" >

      <div className="auth-card"  data-aos="flip-left">

        {/* LEFT SIDE */}
        <div className="auth-left">

          <h1><span className="span">W</span>elcome <span className="span">B</span>ack</h1>
          <p className="subtitle">
            Login to continue your dashboard experience
          </p>

          <form autoComplete="new-password">

            {/* EMAIL */}
            <div className="input-group">
              {/* <FaEnvelope className="input-icon"/> */}
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                autoComplete="new-password"
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>

            {/* PASSWORD */}
            <div className="input-group">
              {/* <FaLock className="input-icon"/> */}
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                autoComplete="new-password"
              />

              <span
                className="eye-icon"
                onClick={()=>setShowPass(!showPass)}
              >
                {/* {showPass ? <FaEyeSlash/> : <FaEye/>} */}
              </span>
            </div>

            <button type="button" onClick={loginbtn}>
              Login
            </button>

          </form>

          <p>
            Don’t have an account?
            <span onClick={()=>navigate("/signup")}>
              Create Account
            </span>
          </p>

        </div>


        {/* RIGHT SIDE VIDEO */}
        <div className="auth-right">

          <video autoPlay loop muted className="auth-video">
            <source src={LoginVideo} type="video/mp4"/>
          </video>

        </div>

      </div>

    </div>
  );
}