import {
  register,
  login,
} from "../controllers/authController.js";

const authRoutes = async (app) => {
  app.post("/register", register);

  app.post("/login", login);
};

export default authRoutes;
