import express from "express";
import * as authController from "../controllers/auth.controllers.js";
import * as validationRules from "../middlewares/validation.middlewares.js";
import passport from "passport";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post(
  "/register",
  upload.single("picture"),
  validationRules.registerValidationRules,
  authController.register
);

router.post(
  "/login",
  validationRules.loginValidationRules,
  authController.login
);

// Route to initiate Google OAuth flow
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route that Google will redirect to after authentication
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authController.googleOAuthCallback
);

router.get("/profile", authController.getProfile);

router.post("/logout", authController.logout);

export default router;
