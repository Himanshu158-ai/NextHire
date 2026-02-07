import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const RecruiterRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (role !== "recruiter") {
        toast.error("you are not recuiter!");
        return <Navigate to="/profile" replace />;
    }

    return children;
};

export default RecruiterRoute;
