const carsApiUrl = 'http://localhost:3000/carro';

// Função para carregar carros
async function loadCars() {
    try {
        const response = await fetch(carsApiUrl);
        const cars = await response.json();
        const carsContainer = document.getElementById('carsCards');
        carsContainer.innerHTML = '';

        cars.forEach(car => {
            const card = document.createElement('div');
            card.classList.add('cards');
            card.innerHTML = `
                <h3>${car.marca} - ${car.modelo}</h3>
                <p><strong>Ano:</strong> ${car.ano}</p>
                <p><strong>Autonomia:</strong> ${car.autonomia}</p>
                <p><strong>Preço:</strong> ${car.preco}</p>
                <button class="edit-btn" data-id="${car.id}">Editar</button>
                <button class="delete-btn" data-id="${car.id}">Excluir</button>
            `;
            carsContainer.appendChild(card);
        });

        // Adicionar eventos para editar e excluir
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', () => editCar(button.getAttribute('data-id')));
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', () => deleteCar(button.getAttribute('data-id')));
        });

    } catch (error) {
        console.error('Erro ao carregar carros:', error);
    }
}

// Função para editar carro
async function editCar(id) {
    try {
        const response = await fetch(`${carsApiUrl}/${id}`);
        const car = await response.json();
        document.getElementById('editCarId').value = car.id;
        document.getElementById('editCarMarca').value = car.marca;
        document.getElementById('editCarModelo').value = car.modelo;
        document.getElementById('editCarAno').value = car.ano;
        document.getElementById('editCarAutonomia').value = car.autonomia;
        document.getElementById('editCarPreco').value = car.preco;
        $('#editModal').modal('show');
    } catch (error) {
        console.error('Erro ao carregar carro:', error);
    }
}

// Função para salvar alterações no carro
document.getElementById('saveCarEdit')?.addEventListener('click', async function () {
    const id = document.getElementById('editCarId').value;
    const marca = document.getElementById('editCarMarca').value;
    const modelo = document.getElementById('editCarModelo').value;
    const ano = document.getElementById('editCarAno').value;
    const autonomia = document.getElementById('editCarAutonomia').value;
    const preco = document.getElementById('editCarPreco').value;

    try {
        const response = await fetch(`${carsApiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ marca, modelo, ano, autonomia, preco })
        });

        if (response.ok) {
            alert('Carro atualizado com sucesso!');
            $('#editModal').modal('hide');
            loadCars();
        } else {
            alert('Erro ao atualizar carro');
        }
    } catch (error) {
        console.error('Erro ao atualizar carro:', error);
    }
});

// Função para excluir carro
async function deleteCar(id) {
    if (confirm('Tem certeza que deseja excluir este carro?')) {
        try {
            const response = await fetch(`${carsApiUrl}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Carro excluído com sucesso!');
                loadCars();
            } else {
                alert('Erro ao excluir carro');
            }
        } catch (error) {
            console.error('Erro ao excluir carro:', error);
        }
    }
}

// Inicializar carregamento dos carros
addEventListener('DOMContentLoaded', loadCars);
