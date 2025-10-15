import express from "express";
import { subscribe } from "../controllers/NewsController.js";

const NewsRouter = express.Router();

// POST request to subscribe
NewsRouter.post("/subscribe", subscribe);

export { NewsRouter };
