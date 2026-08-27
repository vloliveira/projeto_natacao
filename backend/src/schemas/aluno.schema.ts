import { z } from "zod";

export const criarAlunoSchema = z.object({
  nome: z.string().trim().min(1, "Nome é obrigatório"),

  cpf: z
    .string()
    .trim()
    .regex(/^\d{11}$/, "CPF deve possuir exatamente 11 dígitos"),

  turma: z.string().trim().min(1, "Turma é obrigatória"),

  professor: z.string().trim().min(1, "Professor é obrigatório"),

  horario: z.string().trim().min(1, "Horário é obrigatório"),

  valorMensal: z.number().min(0, "Valor mensal não pode ser negativo"),

  diaVencimento: z
    .number()
    .int("Dia de vencimento deve ser um número inteiro")
    .min(1, "Dia de vencimento deve ser entre 1 e 31")
    .max(31, "Dia de vencimento deve ser entre 1 e 31"),

  senha: z.string().min(6, "Senha deve possuir pelo menos 6 caracteres"),
});
export type CriarAluno = z.infer<typeof criarAlunoSchema>;

export const atualizarAlunoSchema = z.object({
  nome: z.string().trim().min(1).optional(),
  turma: z.string().trim().min(1).optional(),
  professor: z.string().trim().min(1).optional(),
  horario: z.string().trim().min(1).optional(),
  valorMensal: z.number().min(0).optional(),
  diaVencimento: z.number().int().min(1).max(31).optional(),
  statusMatricula: z.string().trim().min(1).optional(),
  fotoUrl: z.string().trim().optional(),
});

export const alunoIdSchema = z.object({
  id: z.string().uuid("ID do aluno inválido"),
});
