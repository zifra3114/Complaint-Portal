import { useState, useEffect } from "react"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import AOS from "aos";
import "aos/dist/aos.css";
import "../App.css"
import LoginVideo from "../assets/login.mp4"

export default function Signup() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate()

  const handleSignup = async () => {

    if (!name || !email || !password || !confirmPassword) {
      Swal.fire({
        title: "Oops 😅",
        text: "All fields required!",
        icon: "warning",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#33ff00"
      })
      return
    }

    if (password !== confirmPassword) {
      Swal.fire({
        title: "Error ❌",
        text: "Passwords do not match!",
        icon: "error",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#33ff00"
      })
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      await updateProfile(userCredential.user, {
        displayName: name
      })

      Swal.fire({
        title: "Account Created 🎉",
        text: "Now login!",
        icon: "success",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#33ff00"
      }).then(() => {
        navigate("/")
      })

    } catch (error) {
      Swal.fire({
        title: "Error ❌",
        text: error.message,
        icon: "error",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#33ff00"
      })
    }
  }

  return (
    <div className="auth-container">

      <div className="auth-card" data-aos="flip-right">

        {/* LEFT SIDE IMAGE */}
        <div className="auth-left-media">
      <video autoPlay loop muted className="auth-video">
                  <source src={LoginVideo} type="video/mp4"/>
                </video>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="auth-right-form">

          <h1><span className="span">C</span>reate <span className="span">A</span>ccount</h1>
      

          <div className="input-group">
            <input type="text" placeholder="Enter Name"
              onChange={(e)=>setName(e.target.value)} />
          </div>

          <div className="input-group">
            <input type="email" placeholder="Enter Email"
              onChange={(e)=>setEmail(e.target.value)} />
          </div>

          <div className="input-group">
            <input type="password" placeholder="Enter Password"
              onChange={(e)=>setPassword(e.target.value)} />
          </div>

          <div className="input-group">
            <input type="password" placeholder="Confirm Password"
              onChange={(e)=>setConfirmPassword(e.target.value)} />
          </div>

          <button onClick={handleSignup}>
            Create Account
          </button>

          <p>
            Already have an account?
            <span onClick={()=>navigate("/")}> Login</span>
          </p>

        </div>

      </div>

    </div>
  )
}