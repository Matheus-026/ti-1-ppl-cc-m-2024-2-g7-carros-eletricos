document.addEventListener('DOMContentLoaded', function () {
    const cadastroForm = document.getElementById('cadastroForm');
    const apiUrl = 'http://localhost:3000/usuarios';

    cadastroForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const nome = document.getElementById('cadastroNome').value.trim();
        const email = document.getElementById('cadastroEmail').value.trim();
        const senha = document.getElementById('cadastroSenha').value.trim();

        try {
            const response = await fetch(apiUrl);
            const users = await response.json();

            // Verifica se o email já está cadastrado
            if (users.some(user => user.email === email)) {
                alert('Este email já está cadastrado. Tente outro.');
                return;
            }

            // Gera um novo ID com base nos IDs existentes
            const newId = users.length > 0 ? Math.max(...users.map(user => parseInt(user.id))) + 1 : 1;

            const newUser = { id: newId.toString(), nome, email, senha };

            const createResponse = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            });

            if (createResponse.ok) {
                alert('Usuário cadastrado com sucesso!');
                cadastroForm.reset();
            } else {
                alert('Erro ao cadastrar usuário');
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            alert('Erro ao processar o cadastro. Tente novamente mais tarde.');
        }
    });
});
