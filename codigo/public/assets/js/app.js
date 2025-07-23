const apiURL = 'http://localhost:3000/usuarios';

// Função para cadastrar usuário
document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    const response = await fetch(apiURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });
    const user = await response.json();
    alert('Cadastro realizado com sucesso!');
});

// Função para login de usuário
document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch(apiURL);
    const users = await response.json();
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem('userId', user.id);
        alert('Login realizado com sucesso!');
    } else {
        alert('Email ou senha incorretos!');
    }
});

// Função para editar perfil
document.getElementById('editProfileForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('Usuário não logado.');
        return;
    }

    const name = document.getElementById('editName').value;
    const email = document.getElementById('editEmail').value;

    await fetch(`${apiURL}/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
    });
    alert('Perfil atualizado com sucesso!');
});
