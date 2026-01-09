import Contact from "../models/Contact.js";

export const addContact = async (req, res) => {
  const contact = await Contact.create({
    ...req.body,
       user: req.userId,
              });
                res.json(contact);
};

export const getContacts = async (req, res) => {
  const contact = await Contact.find({ user: req.userId });
  res.json(contact);
};

export const updateContact = async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
              req.params.id,
              {user:req.userId},
              req.body,
              { new: true }
              );
  res.json(contact);
};

export const deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete({
    _id:req.params.id,
    user:req.userId
});


  res.json({ message: "Deleted Successfully" });
};
