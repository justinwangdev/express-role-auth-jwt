require("module-alias/register");

import express from "express";
import routes from "./routes";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN!,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
