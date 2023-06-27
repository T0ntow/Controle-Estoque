const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

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

// Rota GET para /produtos
router.get('/produtos', (req, res) => {
  // Consulta SQL para obter os produtos
  const sql = 'SELECT * FROM produtos';

  // Executa a consulta
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao obter os produtos:', err);
      res.status(500).json({ error: 'Erro ao obter os produtos' });
      return;
    }

    // Retorna os produtos como resposta
    res.json(results);
  });
});

module.exports = router;
