import * as alunosRepository from "../repositories/alunos.repository";

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
  professor?: string;
  horario?: string;
  valorMensal: number;
  diaVencimento: number;
  senha: string;
}

export async function listarAlunos(filtros: FiltrosAlunos) {
  return alunosRepository.buscarAlunos(filtros);
}

export async function criarAluno(dados: CriarAluno) {
  if (!dados.nome) {
    throw new Error("Nome do aluno é obrigatório");
  }

  if (!dados.cpf) {
    throw new Error("CPF do aluno é obrigatório");
  }

  if (!dados.turma) {
    throw new Error("Turma do aluno é obrigatória");
  }

  if (dados.valorMensal <= 0) {
    throw new Error("O valor mensal deve ser maior que zero");
  }

  if (dados.diaVencimento < 1 || dados.diaVencimento > 31) {
    throw new Error("Dia de vencimento inválido");
  }

  return alunosRepository.criarAluno(dados);
}
