import express from "express";
import cors from "cors";
// Router imports here
import accommodationRouter from "./controllers/accommodation.controller";
import destinationsRouter from "./controllers/destinations.controller";
import registerRouter from "./controllers/register.controller";
import loginRouter from "./controllers/login.controller";

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/register", registerRouter)
app.use("/login", loginRouter)
app.use("/accommodation", accommodationRouter)
app.use("/destinations", destinationsRouter)

export { app }