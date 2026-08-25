import type { Request, Response } from "express";
import * as alunosService from "../services/alunos.service";

export async function listarAlunos(req: Request, res: Response) {
  try {
    const { nome, cpf, turma, professor, status } = req.query;

    const alunos = await alunosService.listarAlunos({
      nome: nome ? String(nome) : undefined,
      cpf: cpf ? String(cpf) : undefined,
      turma: turma ? String(turma) : undefined,
      professor: professor ? String(professor) : undefined,
      status: status ? String(status) : undefined,
    });

    return res.json(alunos);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensagem: "Erro ao buscar alunos",
    });
  }
}

export async function criarAluno(req: Request, res: Response) {
  try {
    const {
      nome,
      cpf,
      turma,
      professor,
      horario,
      valorMensal,
      diaVencimento,
      senha,
    } = req.body;

    const novoAluno = await alunosService.criarAluno({
      nome,
      cpf,
      turma,
      professor,
      horario,
      valorMensal,
      diaVencimento,
      senha,
    });

    return res.status(201).json(novoAluno);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensagem: "Erro ao criar aluno",
    });
  }
}
