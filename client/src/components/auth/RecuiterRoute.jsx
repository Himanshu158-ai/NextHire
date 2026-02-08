import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const RecruiterRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");

    if (!token) {
        toast.error("You are not authorized to create job!");
        return <Navigate to="/login" replace />;
    }

    if (role !== "recruiter") {
        toast.error("You are not authorized to create job!");
        return <Navigate to="/profile" replace />;
    }

    return children;
};

export default RecruiterRoute;
