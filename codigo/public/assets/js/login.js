document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const apiUrl = 'http://localhost:3000/usuarios';

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('password').value.trim();

        try {
            const response = await fetch(apiUrl);
            const users = await response.json();

            // Verifica se há um usuário com o email e senha fornecidos
            const user = users.find(user => user.email === email && user.senha === senha);

            if (user) {
                localStorage.setItem('userEmail', email);
                alert('Login realizado com sucesso!');
                window.location.href = '../../editar.html'; 
            } else {
                alert('Email ou senha inválidos!');
            }
        } catch (error) {
            console.error('Erro ao verificar login:', error);
            alert('Erro ao processar o login. Tente novamente mais tarde.');
        }
    });
});
