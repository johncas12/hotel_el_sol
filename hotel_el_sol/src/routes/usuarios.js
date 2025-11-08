import { Router } from "express";
import { getUsuarios, createUsuario } from "../controllers/usuariosController.js";

const router = Router();

// Definición de la ruta GET /api/usuarios
router.get("/", getUsuarios); 

// Definición de la ruta POST /api/usuarios
router.post("/", createUsuario);

export default router;