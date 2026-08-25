import { Router } from "express";
import {
  listarAlunos,
  criarAluno,
  buscarAlunoPorId,
} from "../controllers/alunos.controller";

const router = Router();

router.get("/", listarAlunos);
router.post("/", criarAluno);
router.get("/:id", buscarAlunoPorId);

export default router;
