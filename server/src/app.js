import Fastify from "fastify";
import cors from "@fastify/cors";
import authRoutes from "./routes/authRoutes.js";

const app = Fastify({
  logger: true,
});

await app.register(authRoutes, {
  prefix: "/api/auth",
});

app.get("/", async (request, reply) => {
  return { message: "API Running" };
});

export default app;


