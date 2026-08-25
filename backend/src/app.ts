import express from "express";
import cors from "cors";
import alunosRoutes from "./routes/alunos.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rota de teste
app.get("/status", (req, res) => {
  return res.json({
    mensagem: "API da Escola de Natação está rodando com sucesso!",
  });
});

app.use("/alunos", alunosRoutes);

export default app;
