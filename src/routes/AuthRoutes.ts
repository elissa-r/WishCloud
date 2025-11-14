import { Router } from "express";
import { admin } from "../config/FirebaseAdmin";

const router = Router();

// Register user
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await admin.auth().createUser({ email, password });
    res.json({ uid: user.uid });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // check if user exists
  try {
    const user = await admin.auth().getUserByEmail(email);
    res.json({ uid: user.uid });
  } catch (err: any) {
    res.status(400).json({ error: "Invalid email or password" });
  }
});

export { router as authRouter };
