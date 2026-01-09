import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "./signup.css";

export default function Signup() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
    await api.post("/auth/signup", form);
    navigate("/login");
  } catch (error) {
    console.log(error.response.data.message);
    alert(error.response.data.message || "Signup failed ");
  }
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Name" onChange={(e) => setForm({...form, name:e.target.value})} />
      <input placeholder="Email" onChange={(e) => setForm({...form, email:e.target.value})} />
      <input placeholder="Password" onChange={(e) => setForm({...form, password:e.target.value})} />
      <button>Signup</button>
      <p>Already have an account? <a href="/login">Login</a></p>
    </form>
  );
}

