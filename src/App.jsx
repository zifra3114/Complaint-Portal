import { Routes, Route } from "react-router-dom";
import { useState } from "react";

// Pages
import Intro from "./pages/intro";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import MyComplaints from "./pages/mycomplain";
import NewComplaint from "./pages/newcomplain";
import Admin from "./pages/admin";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro ? (
        <Intro onFinish={() => setShowIntro(false)} />
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-complaints" element={<MyComplaints />} />
          <Route path="/new-complaint" element={<NewComplaint />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      )}
    </>
  );
}

export default App;