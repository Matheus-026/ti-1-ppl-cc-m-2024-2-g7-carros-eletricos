const pontosDeRecargaApiUrl = 'http://localhost:3000/pontosDeRecarga';

// Função para carregar pontos de recarga
async function loadPontosDeRecarga() {
    try {
        const response = await fetch(pontosDeRecargaApiUrl);
        const pontosDeRecarga = await response.json();
        const pontosContainer = document.getElementById('pontosDeRecargaCards');
        pontosContainer.innerHTML = '';

        pontosDeRecarga.forEach(ponto => {
            const card = document.createElement('div');
            card.classList.add('cards');
            card.innerHTML = `
                <h3>${ponto.nome}</h3>
                <p>Endereço: ${ponto.endereco}</p>
                <p>Potência: ${ponto.informacoesAdicionais.potencia}</p>
                <button class="edit-btn" data-id="${ponto.id}">Editar</button>
                <button class="delete-btn" data-id="${ponto.id}">Excluir</button>
            `;
            pontosContainer.appendChild(card);
        });

        // Adicionar eventos para editar e excluir
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', () => editPonto(button.getAttribute('data-id')));
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', () => deletePonto(button.getAttribute('data-id')));
        });

    } catch (error) {
        console.error('Erro ao carregar pontos de recarga:', error);
    }
}

// Função para editar ponto de recarga
async function editPonto(id) {
    try {
        const response = await fetch(`${pontosDeRecargaApiUrl}/${id}`);
        const ponto = await response.json();
        
        // Preencher os campos do formulário com os dados do ponto de recarga
        document.getElementById('editPontoName').value = ponto.nome;
        document.getElementById('editPontoAddress').value = ponto.endereco;
        document.getElementById('editPontoPower').value = ponto.informacoesAdicionais.potencia;
        document.getElementById('editPontoHours').value = ponto.informacoesAdicionais.horarioFuncionamento;
        
        // Exibir o modal
        $('#editModal').modal('show');
    } catch (error) {
        console.error('Erro ao carregar ponto de recarga:', error);
    }
}


// Função para salvar alterações no ponto de recarga
document.getElementById('savePontoEdit')?.addEventListener('click', async function () {
    const id = document.getElementById('editPontoId').value;
    const nome = document.getElementById('editPontoName').value;
    const endereco = document.getElementById('editPontoAddress').value;
    const potencia = document.getElementById('editPontoPower').value;
    const horarioFuncionamento = document.getElementById('editPontoHours').value;

    try {
        const response = await fetch(`${pontosDeRecargaApiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome,
                endereco,
                informacoesAdicionais: { potencia, horarioFuncionamento }
            })
        });

        if (response.ok) {
            alert('Ponto de recarga atualizado com sucesso!');
            $('#editModal').modal('hide');
            loadPontosDeRecarga();
        } else {
            alert('Erro ao atualizar ponto de recarga');
        }
    } catch (error) {
        console.error('Erro ao atualizar ponto de recarga:', error);
    }
});

// Função para excluir ponto de recarga
async function deletePonto(id) {
    if (confirm('Tem certeza que deseja excluir este ponto de recarga?')) {
        try {
            const response = await fetch(`${pontosDeRecargaApiUrl}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Ponto de recarga excluído com sucesso!');
                loadPontosDeRecarga();
            } else {
                alert('Erro ao excluir ponto de recarga');
            }
        } catch (error) {
            console.error('Erro ao excluir ponto de recarga:', error);
        }
    }
}

// Carregar os pontos de recarga quando a página for carregada
addEventListener('DOMContentLoaded', loadPontosDeRecarga);
