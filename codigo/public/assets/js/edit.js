document.addEventListener('DOMContentLoaded', async function () {
    const editForm = document.getElementById('editForm');
    const apiUrl = 'http://localhost:3000/usuarios'; // URL base do JSON Server

    // Obter o email do usuário do sessionStorage/localStorage
    const userEmail = localStorage.getItem('userEmail');

    if (!userEmail) {
        alert('Email de usuário não encontrado!');
        return;
    }

    let userId = null; // Variável para armazenar o ID do usuário

    // Função para buscar e preencher dados do usuário com base no email
    async function loadUserData() {
        try {
            const response = await fetch(`${apiUrl}?email=${encodeURIComponent(userEmail)}`);
            const users = await response.json();

            if (users.length === 0) throw new Error('Usuário não encontrado');

            const userData = users[0]; // Pega o primeiro resultado
            userId = userData.id; // Armazena o ID do usuário para futuras operações

            // Preenche os campos do formulário
            document.getElementById('editNome').value = userData.nome || '';
            document.getElementById('editEmail').value = userData.email || '';
            document.getElementById('editSenha').value = userData.senha || '';
        } catch (error) {
            console.error('Erro ao carregar os dados do usuário:', error);
            alert('Erro ao carregar os dados do usuário!');
        }
    }

    // Carrega os dados do usuário ao iniciar
    loadUserData();

    // Função para enviar os dados atualizados do formulário
    editForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const nome = document.getElementById('editNome').value;
        const email = document.getElementById('editEmail').value;
        const senha = document.getElementById('editSenha').value;

        try {
            const updatedUser = { nome, email, senha };

            const response = await fetch(`${apiUrl}/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUser),
            });

            if (response.ok) {
                alert('Usuário atualizado com sucesso!');
                editForm.reset();
            } else {
                throw new Error('Erro ao atualizar usuário');
            }
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            alert('Erro ao atualizar usuário!');
        }
    });

    // Função para excluir o usuário
    async function deleteUser() {
        const confirmation = confirm('Tem certeza de que deseja excluir este usuário?');
        if (!confirmation) return;

        try {
            const response = await fetch(`${apiUrl}/${userId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Usuário excluído com sucesso!');
                window.location.href = '/index.html'; // Redireciona após exclusão
            } else {
                throw new Error('Erro ao excluir usuário');
            }
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            alert('Erro ao excluir usuário!');
        }
    }

    // Adiciona o evento de clique ao botão de exclusão
    const deleteButton = document.getElementById('deleteButton');
    deleteButton.addEventListener('click', deleteUser);
});
