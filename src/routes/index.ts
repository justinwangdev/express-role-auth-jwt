import express from "express";
import api from "./api";
import exaample from "./example"

const router = express.Router();

router.use("/api", api);
router.use("/example", exaample);

export default router;
