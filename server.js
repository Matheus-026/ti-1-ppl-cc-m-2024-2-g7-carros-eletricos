const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'codigo', 'public')));

const dbFilePath = path.join(__dirname, 'codigo', 'db', 'db.json');

app.get('/', (req, res) => {
    res.send('Bem-vindo ao servidor! Acesse /faq, /register ou /login.');
});

function readDB() {
    const data = fs.readFileSync(dbFilePath);
    return JSON.parse(data);
}

function writeDB(data) {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
}

app.get('/faq', (req, res) => {
    const db = readDB();
    res.json(db.faq);
});

app.get('/carros', (req, res) => {
    const db = readDB();
    const carrosOrdenados = db.carro.sort((a, b) => a.modelo.localeCompare(b.modelo));
    res.json(carrosOrdenados);
});

app.post('/carros', (req, res) => {
    const { imagem, marca, modelo, ano, autonomia, preco } = req.body;
    const db = readDB();
    const newCar = {
        id: (db.carro.length + 1).toString(),
        imagem,
        marca,
        modelo,
        ano,
        autonomia,
        preco
    };
    db.carro.push(newCar);
    writeDB(db);
    res.status(201).json({ message: 'Carro adicionado com sucesso' });
});

app.get('/register', (req, res) => {
    res.send('Use POST para registrar um novo usuário.');
});

app.get('/login', (req, res) => {
    res.send('Use POST para fazer login.');
});

app.post('/register', (req, res) => {
    const { nome, email, senha } = req.body;
    const db = readDB();
    const newUser = {
        id: (db.usuarios.length + 1).toString(),
        nome,
        email,
        senha
    };
    db.usuarios.push(newUser);
    writeDB(db);
    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
});

app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    const db = readDB();
    const user = db.usuarios.find(u => u.email === email && u.senha === senha);
    if (user) {
        res.status(200).json({ message: 'Login bem-sucedido', user });
    } else {
        res.status(401).json({ message: 'Email ou senha incorretos' });
    }
});

app.get('/db/db.json', (req, res) => {
    res.sendFile(dbFilePath);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});