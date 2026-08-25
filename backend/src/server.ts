import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Rota de teste
app.get("/status", (req, res) => {
  return res.json({
    mensagem: "API da Escola de Natação está rodando com sucesso!",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
