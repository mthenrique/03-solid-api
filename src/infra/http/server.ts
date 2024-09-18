import { app } from "./app";
import { env } from "../../envs";

app.listen({ 
    port: env.PORT,
    host: '0.0.0.0'
}).then(() => {
    console.log(`Server running on port ${env.PORT}`)
});