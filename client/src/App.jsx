import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/editprofile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
        <Route path="/jobs/:id" element={<JobDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
