document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'http://localhost:3000/usuarios';
    let editingUserId;

    if (document.getElementById('usersCards')) {
        loadUsers();
    }

    async function loadUsers() {
        try {
            const response = await fetch(apiUrl);
            const users = await response.json();
            const usersCards = document.getElementById('usersCards');
            usersCards.innerHTML = '';

            users.forEach(user => {
                const card = document.createElement('div');
                card.classList.add('cards');
                card.innerHTML = `
                    <h3>${user.nome}</h3>
                    <p>${user.email}</p>
                    <button class="edit-btn" data-id="${user.id}">Editar</button>
                    <button class="delete-btn" data-id="${user.id}">Excluir</button>
                `;
                usersCards.appendChild(card);
            });

            document.querySelectorAll('.edit-btn').forEach(button => {
                button.addEventListener('click', () => editUser(button.getAttribute('data-id')));
            });

            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', () => deleteUser(button.getAttribute('data-id')));
            });

        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
        }
    }

    async function editUser(id) {
        editingUserId = id;
        try {
            const response = await fetch(`${apiUrl}/${id}`);
            const user = await response.json();
            document.getElementById('editNome').value = user.nome;
            document.getElementById('editEmail').value = user.email;
            $('#editModal').modal('show');
        } catch (error) {
            console.error('Erro ao carregar usuário:', error);
        }
    }

    document.getElementById('saveEdit')?.addEventListener('click', async function () {
        const nome = document.getElementById('editNome').value;
        const email = document.getElementById('editEmail').value;

        try {
            const response = await fetch(`${apiUrl}/${editingUserId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, email })
            });

            if (response.ok) {
                alert('Usuário atualizado com sucesso!');
                $('#editModal').modal('hide');
                loadUsers();
            } else {
                alert('Erro ao atualizar usuário');
            }
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
        }
    });

    async function deleteUser(id) {
        if (confirm('Tem certeza que deseja excluir este usuário?')) {
            try {
                const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
                if (response.ok) {
                    alert('Usuário excluído com sucesso!');
                    loadUsers();
                } else {
                    alert('Erro ao excluir usuário');
                }
            } catch (error) {
                console.error('Erro ao excluir usuário:', error);
            }
        }
    }
});
