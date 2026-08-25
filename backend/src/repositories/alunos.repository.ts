import { PrismaClient } from "../generated/prisma";

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
