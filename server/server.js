const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

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

// ==================================
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/enviar-dados', (req, res) => {
  const { Codigo, Produto, Marca, Data, Estoque, Saida, Entrada } = req.body;

  const sql = `INSERT INTO produtos (Codigo, Produto, Marca, Data, Estoque, Saida, Entrada) VALUES (?, ?, ?, ?, ?, ?, ?);`;

  connection.query(sql, [Codigo, Produto, Marca, Data, Estoque, Saida, Entrada], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados no banco de dados:', err);
      res.status(500).json({ error: 'Erro ao inserir dados no banco de dados' });
      return;
    }

    console.log('Dados inseridos com sucesso no banco de dados');
    res.status(200).json({ message: 'Dados inseridos com sucesso' });
  });
});

// ====================================

app.delete('/remover-item/:codigo', (req, res) => {
  const codigo = req.params.codigo;

  // Query para remover o item no banco de dados
  const sql = `DELETE FROM produtos WHERE Codigo = '${codigo}'`;

  // Executa a query no banco de dados
  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Erro ao remover item:', error);
      res.status(500).json({ message: 'Erro ao remover item' });
    } else {
      console.log('Item removido com sucesso!');
      res.status(200).json({ message: 'Item removido com sucesso!' });
    }
  });
});

// ====================================

app.put('/atualizar-item/:codigo', (req, res) => {
  const codigo = req.params.codigo;
  const quantidade = req.body.quantidade;
  const operacao = req.body.operacao; // 'entrada' ou 'saida'

  // Executa a query de atualização
  let query;
  if (operacao === 'entrada') {
    query = `UPDATE produtos SET Entrada = Entrada + ${quantidade}, Estoque = Estoque + ${quantidade} WHERE Codigo = ${codigo}`;

  } else if (operacao === 'saida') {
    query = `UPDATE produtos SET Saida = Saida + ${quantidade}, Estoque = Estoque - ${quantidade} WHERE Codigo = ${codigo}`;
  }

  //paramentros     ?           ?
  const values = [quantidade, codigo];

  connection.query(query, values, (error, result) => {
    if (error) {
      console.error('Erro ao atualizar item:', error);
      res.status(500).json({ error: 'Erro ao atualizar item' });
    } else {
      console.log('Item atualizado com sucesso!');
      res.status(200).json({ success: 'Item atualizado com sucesso' });
    }
  });
});



// Rota de erro para lidar com rotas não correspondentes
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.listen(3001, () => {
  console.log('Servidor iniciado na porta 3001');
});
