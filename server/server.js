const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');

// Configuração da conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'WPP102315tom@',
  database: 'controle_etoque',
});

// Conectando ao banco de dados MySQL
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar-se ao MySQL:', err);
    return;
  }
  console.log('Conexão com o MySQL estabelecida!');
});

// Configurar o CORS
app.use(cors());

// Rota GET para obter os dados de uma tabela específica
app.get('/tabela/:nomeTabela', (req, res) => {
  const { nomeTabela } = req.params;

  // Consulta SQL para obter os dados da tabela
  const sql = `SELECT * FROM ${nomeTabela}`;

  // Executa a consulta
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(`Erro ao obter os dados da tabela ${nomeTabela}:`, err);
      res.status(500).json({ error: `Erro ao obter os dados da tabela ${nomeTabela}` });
      return;
    }

    // Retorna os dados da tabela como resposta
    res.json(results);
  });
});

// Rota de erro para lidar com rotas não correspondentes
app.get('*', (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(3001, () => {
  console.log('Servidor iniciado na porta 3001');
});
