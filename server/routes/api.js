import express from 'express';

const router= express.Router();
import Form from '../models/Form.js';

router.post("/save-form", async (req, res) => {
  try {
    const formData = new Form(req.body);
    const savedFormData = await formData.save();
    res.json(savedFormData);
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ error: "Failed to save form data" });
  }
});

export default router;
