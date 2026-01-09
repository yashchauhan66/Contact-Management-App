import api from "../api/api";

     function ContactList({ contacts, refresh, setEdit }) {
  const deleteContact = async (id) => {
    await api.delete(`/contacts/${id}`);
    refresh();
  };

           return (
       <table className="table">
      <thead>  
        <tr>
          <th>Name</th><th>Email</th><th>Phone</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((c) => (
          <tr key={c._id}>
            <td>{c.name}</td>
            <td>{c.email}</td>
            <td>{c.phone}</td>
            <td>
              <button onClick={() => setEdit(c)}>Edit</button>
              <button className="danger" onClick={() => deleteContact(c._id)}>
                Delete
              </button>
            </td>
          </tr>
          
        ))}
           </tbody>
    </table>
  );
}

export default ContactList;
