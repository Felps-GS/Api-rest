const express = require('express');

const limiter = require('./config/rateLimit');
const connectDatabase = require('./config/database');
const Aluno = require('./models/Aluno');

const app = express();
const PORT = 3000;

app.use(limiter);
app.use(express.json());


app.get('/', (req, res) => {
  res.json({ mensagem: 'API REST em Node.js com Express.' });
});

app.get('/alunos', async (req, res) => {
  try {
    const alunos = await Aluno.find();
    res.status(200).json(alunos);
  } catch (error) {
    res.status(500).json({
      mensagem: 'Erro ao buscar alunos.',
      erro: error.message,
    });
  }
});

app.post('/alunos', async(req, res) =>{
  try{
    const {nome, RA} = req.body;
    if(!nome || !RA){
      return res.status(400).json({
        mensagem: 'Os campos nome e curso sao obrigatorios.'
      });
    }
    const novosAlunos = await Aluno.create({nome, RA});
    res.status(201).json(novosAlunos);
  } catch(error){

  }
});

app.put('/alunos/:id', async(req,res) =>{
  try{
    const {id} = req.params
    const{nome, RA} = req.body;
    const aluno = await Aluno.findByIdAndUpdate(id, {nome, RA}, {new: true, runValidators: true});
    if(!aluno){
      return res.status(404).json({
        mensagem: "Não foi encotrado o aluno"
      });
    }
    res.status(200).json(aluno); 
  }catch(error){
    res.status(500).json({
      mensagem: 'Erro ao atualizar aluno.',
      erro: error.message
    });
  }
});

app.delete('/alunos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const aluno = await Aluno.findById(id);
    if (!aluno) {
      return res.status(404).json({
        mensagem: 'Aluno não encontrado.'
      });
    }
    await Aluno.findByIdAndDelete(id);
    res.status(200).json({
      mensagem: 'Aluno removido com sucesso.'
    });
  } catch (error) {
    res.status(500).json({
      mensagem: 'Erro ao remover aluno.',
      erro: error.message
    });
  }
});

async function startServer() {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Nao foi possivel iniciar a aplicacao.', error.message);
  }
}

startServer();