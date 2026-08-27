import { PrismaClient } from "../generated/prisma";
import type { z } from "zod";
import { atualizarAlunoSchema } from "../schemas/aluno.schema";

const prisma = new PrismaClient();

interface FiltrosAlunos {
  nome?: string;
  cpf?: string;
  turma?: string;
  professor?: string;
  status?: string;
}

interface CriarAluno {
  nome: string;
  cpf: string;
  turma: string;
  professor: string;
  horario: string;
  valorMensal: number;
  diaVencimento: number;
  senha: string;
}

export async function buscarAlunos(filtros: FiltrosAlunos) {
  const where: any = {};

  if (filtros.nome) {
    where.nome = {
      contains: filtros.nome,
    };
  }

  if (filtros.cpf) {
    where.cpf = filtros.cpf;
  }

  if (filtros.turma) {
    where.turma = filtros.turma;
  }

  if (filtros.professor) {
    where.professor = {
      contains: filtros.professor,
    };
  }

  if (filtros.status) {
    where.statusMatricula = filtros.status;
  }

  return prisma.aluno.findMany({
    where,
    orderBy: {
      nome: "asc",
    },
  });
}

export async function buscarPorId(id: string) {
  return prisma.aluno.findUnique({
    where: {
      id,
    },
  });
}

export async function buscarPorCpf(cpf: string) {
  return prisma.aluno.findUnique({
    where: {
      cpf,
    },
  });
}

export async function criarAluno(dados: CriarAluno) {
  return prisma.aluno.create({
    data: {
      nome: dados.nome,
      cpf: dados.cpf,
      turma: dados.turma,
      professor: dados.professor,
      horario: dados.horario,
      valorMensal: dados.valorMensal,
      diaVencimento: dados.diaVencimento,

      usuario: {
        create: {
          cpf: dados.cpf,
          senha: dados.senha,
          role: "ALUNO",
        },
      },
    },
  });
}

export async function atualizarAluno(
  id: string,
  dados: z.infer<typeof atualizarAlunoSchema>,
) {
  return prisma.aluno.update({
    where: {
      id,
    },
    data: {
      ...(dados.nome !== undefined && { nome: dados.nome }),
      ...(dados.turma !== undefined && { turma: dados.turma }),
      ...(dados.professor !== undefined && { professor: dados.professor }),
      ...(dados.horario !== undefined && { horario: dados.horario }),
      ...(dados.valorMensal !== undefined && {
        valorMensal: dados.valorMensal,
      }),
      ...(dados.diaVencimento !== undefined && {
        diaVencimento: dados.diaVencimento,
      }),
      ...(dados.statusMatricula !== undefined && {
        statusMatricula: dados.statusMatricula,
      }),
      ...(dados.fotoUrl !== undefined && {
        fotoUrl: dados.fotoUrl,
      }),
    },
  });
}
