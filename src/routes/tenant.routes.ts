import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Tenant routes working!");
});

export default router; 
