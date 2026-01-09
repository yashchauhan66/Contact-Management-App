import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "./login.css"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try  {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  } catch (error) {
    console.log(error.response.data.message);
    alert(error.response.data.message || "Login failed ");
  }
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button>Login</button>
      <p>Don't have an account? <a href="/signup">Signup</a></p>
    </form>
  );
}

