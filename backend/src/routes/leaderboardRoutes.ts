import { postLeaderboardEntry } from "@Controllers/leaderboardController";
import express from "express";
import { authenticate } from "src/middlewares/authenticate";

const leaderboardRouter = express.Router();

leaderboardRouter.post("/", authenticate, postLeaderboardEntry);

export default leaderboardRouter;