import type { Request, Response } from "express";
import { ZodError } from "zod";
import * as alunosService from "../services/alunos.service";
import { alunoIdSchema, atualizarAlunoSchema } from "../schemas/aluno.schema";

export async function listarAlunos(req: Request, res: Response) {
  try {
    const { nome, cpf, turma, professor, status } = req.query;

    const filtros = {
      ...(nome && { nome: String(nome) }),
      ...(cpf && { cpf: String(cpf) }),
      ...(turma && { turma: String(turma) }),
      ...(professor && { professor: String(professor) }),
      ...(status && { status: String(status) }),
    };

    const alunos = await alunosService.listarAlunos(filtros);

    return res.json(alunos);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensagem: "Erro ao buscar alunos",
    });
  }
}

export async function buscarAlunoPorId(req: Request, res: Response) {
  try {
    const { id } = alunoIdSchema.parse(req.params);

    const aluno = await alunosService.buscarAlunoPorId(id);

    return res.json(aluno);
  } catch (error) {
    console.error(error);

    if (error instanceof ZodError) {
      return res.status(400).json({
        mensagem: "ID do aluno inválido",
        erros: error.issues,
      });
    }

    if (error instanceof Error && error.message === "Aluno não encontrado") {
      return res.status(404).json({
        mensagem: error.message,
      });
    }

    return res.status(500).json({
      mensagem: "Erro ao buscar aluno",
    });
  }
}

export async function criarAluno(req: Request, res: Response) {
  try {
    const novoAluno = await alunosService.criarAluno(req.body);

    return res.status(201).json(novoAluno);
  } catch (error) {
    console.error(error);

    if (error instanceof ZodError) {
      const erros: Record<string, string> = {};

      for (const erro of error.issues) {
        const campo = erro.path[0];

        if (typeof campo === "string") {
          erros[campo] = erro.message;
        }
      }

      return res.status(400).json({
        mensagem: "Dados inválidos",
        erros,
      });
    }

    if (error instanceof Error) {
      if (error.message === "CPF já cadastrado") {
        return res.status(409).json({
          mensagem: error.message,
        });
      }

      return res.status(400).json({
        mensagem: error.message,
      });
    }

    return res.status(500).json({
      mensagem: "Erro interno do servidor",
    });
  }
}

export async function atualizarAluno(req: Request, res: Response) {
  try {
    const { id } = alunoIdSchema.parse(req.params);

    const dados = atualizarAlunoSchema.parse(req.body);

    const aluno = await alunosService.atualizarAluno(id, dados);

    return res.json(aluno);
  } catch (error) {
    console.error(error);

    if (error instanceof ZodError) {
      return res.status(400).json({
        mensagem: "Dados inválidos",
        erros: error.issues,
      });
    }

    if (error instanceof Error && error.message === "Aluno não encontrado") {
      return res.status(404).json({
        mensagem: error.message,
      });
    }

    return res.status(500).json({
      mensagem: "Erro ao atualizar aluno",
    });
  }
}
