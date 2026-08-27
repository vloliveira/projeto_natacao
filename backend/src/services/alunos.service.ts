import * as alunosRepository from "../repositories/alunos.repository";
import {
  criarAlunoSchema,
  type CriarAluno,
  atualizarAlunoSchema,
} from "../schemas/aluno.schema";
import type { z } from "zod";

interface FiltrosAlunos {
  nome?: string;
  cpf?: string;
  turma?: string;
  professor?: string;
  status?: string;
}

export async function listarAlunos(filtros: FiltrosAlunos) {
  return alunosRepository.buscarAlunos(filtros);
}

export async function criarAluno(dados: CriarAluno) {
  const dadosValidados = criarAlunoSchema.parse(dados);

  const alunoExistente = await alunosRepository.buscarPorCpf(
    dadosValidados.cpf,
  );

  if (alunoExistente) {
    throw new Error("CPF já cadastrado");
  }

  return alunosRepository.criarAluno(dadosValidados);
}

export async function buscarAlunoPorId(id: string) {
  const aluno = await alunosRepository.buscarPorId(id);

  if (!aluno) {
    throw new Error("Aluno não encontrado");
  }

  return aluno;
}

export async function atualizarAluno(
  id: string,
  dados: z.infer<typeof atualizarAlunoSchema>,
) {
  const aluno = await alunosRepository.buscarPorId(id);

  if (!aluno) {
    throw new Error("Aluno não encontrado");
  }

  return alunosRepository.atualizarAluno(id, dados);
}
