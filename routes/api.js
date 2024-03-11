import express from "express";
import dataController from "../controllers/dataController.js";

const router = express.Router();

router.get("/:latitude/:longitude", dataController.getData);
router.get("/:hours/:latitude/:longitude", dataController.getDataHours);

export default router;
