// backend/routes/api.js
import express from "express";
import dataController from "../controllers/dataController.js";

const router = express.Router();
// Ruta para manejar la solicitud de datos
router.get("/:latitude/:longitude", dataController.getData);
router.get("/:hours", dataController.getDataHours);

export default router;
