import { useEffect, useState } from "react";
import api from "../api/api";
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [editContact, setEditContact] = useState(null);
  const navigate = useNavigate();

  const fetchContacts = async () => {
    const res = await api.get("/contacts");
    setContacts(res.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="container">
      <div className="dashboard-header">
        <h2>Contact Management</h2>
        <span className="logout-icon" onClick={logout} title="Logout">
          Logout
        </span>
      </div>

      <ContactForm
        refresh={fetchContacts}
        editContact={editContact}
        clearEdit={() => setEditContact(null)}
      />

      <ContactList
        contacts={contacts}
        refresh={fetchContacts}
        setEdit={setEditContact}
      />
    </div>
  );
}

export default Dashboard;
