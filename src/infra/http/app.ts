import fastify from "fastify";
import { appRoutes } from "./routes/app-routes";

export const app = fastify();

app.register(appRoutes)