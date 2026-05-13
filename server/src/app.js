import Fastify from "fastify";
import cors from "@fastify/cors";

const app = Fastify({
  logger: true,
});

await app.register(cors, {
  origin: true,
});

app.get("/", async (request, reply) => {
  return { message: "API Running" };
});

export default app;


