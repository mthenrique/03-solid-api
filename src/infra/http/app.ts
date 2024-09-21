import fastify from "fastify";
import { appRoutes } from "./routes/app-routes";
import { globalErrors } from "./middlewares/global-errors";

export const app = fastify();

app.register(appRoutes)
app.setErrorHandler(globalErrors)