import { useState, useEffect } from "react";
import api from "../api/api";

function ContactForm({ refresh, editContact, clearEdit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    if (editContact) setForm(editContact);
  }, [editContact]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editContact) {
      await api.put(`/contacts/${editContact._id}`, form);
      clearEdit();
    } else {
      await api.post("/contacts", form);
    }

    setForm({ name: "", email: "", phone: "", message: "" });
    refresh();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" required />
      <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" />
      <button>{editContact ? "Update" : "Add"} Contact</button>
    </form>
  );
}

export default ContactForm;
