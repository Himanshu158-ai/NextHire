import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../config/api";

function VerifyEmail() {

  const { token } = useParams();

  useEffect(() => {

    axios.get(
      `${API_URL}/api/auth/verify-email/${token}`
    );

  }, []);

  return <h1>Verifying...</h1>;
}

export default VerifyEmail;