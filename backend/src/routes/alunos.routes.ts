import { Router } from "express";
import {
  listarAlunos,
  criarAluno,
  buscarAlunoPorId,
  atualizarAluno,
} from "../controllers/alunos.controller";

const router = Router();

router.get("/", listarAlunos);
router.post("/", criarAluno);
router.get("/:id", buscarAlunoPorId);
router.patch("/:id", atualizarAluno);

export default router;
