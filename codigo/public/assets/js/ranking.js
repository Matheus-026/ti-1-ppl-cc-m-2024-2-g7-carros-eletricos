async function loadCars() {
    const response = await fetch('http://localhost:3000/carros');
    const cars = await response.json();
    const container = document.getElementById('rankingContainer');
    container.innerHTML = '';

    cars.forEach(car => {
        const carElement = document.createElement('div');
        carElement.classList.add('car-item', 'mb-4', 'd-flex', 'flex-column', 'align-items-center');
        carElement.innerHTML = `
            <img src="${car.imagem}" alt="${car.modelo}" class="img-fluid" style="max-width: 300px;">
            <h4>${car.marca} - ${car.modelo}</h4>
            <p>Ano: ${car.ano}</p>
            <p>Autonomia: ${car.autonomia}</p>
            <p>Preço: ${car.preco}</p>
        `;
        container.appendChild(carElement);
    });
}

// Load cars when the page is ready
loadCars();

// Handle form submission to add a new car
document.getElementById('addCarForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const newCar = {
        imagem: document.getElementById('carImage').value,
        marca: document.getElementById('carBrand').value,
        modelo: document.getElementById('carModel').value,
        ano: document.getElementById('carYear').value,
        autonomia: document.getElementById('carAutonomy').value,
        preco: document.getElementById('carPrice').value
    };

    const response = await fetch('http://localhost:3000/carros', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCar)
    });

    if (response.ok) {
        alert('Carro adicionado com sucesso!');
        loadCars(); // Reload the car list after adding a new car
    } else {
        alert('Erro ao adicionar o carro.');
    }
});