import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  addContact,
  getContacts,
  updateContact,
  deleteContact,
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/", protect, addContact);

router.get("/", protect, getContacts);

router.put("/:id", protect, updateContact);

router.delete("/:id", protect, deleteContact);

export default router;
