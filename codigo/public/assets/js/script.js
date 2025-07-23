const data = {
    "electric_cars": [
        {
            "id": "b08b046c-743f-4e26-b833-c3b9a5d7a731",
            "type": "Electric",
            "model": "Tesla Model 3",
            "year": 2024,
            "range_km": 550,
            "acceleration_0_100_kmh": 3.3,
            "torque_nm": 660,
            "displacement": null,
            "engine_type": "Electric motor",
            "image_url": "https://www.motortrend.com/uploads/2023/10/LEAD-144-2024-Tesla-Model-3-RWD-Short-Range-front-three-quarter-view.jpg"
        },
        {
            "id": "e6d00b49-13cb-4f0b-a14f-fdf4e71bdf45",
            "type": "Electric",
            "model": "Nissan Leaf",
            "year": 2025,
            "range_km": 385,
            "acceleration_0_100_kmh": 7.9,
            "torque_nm": 320,
            "displacement": null,
            "engine_type": "Electric motor",
            "image_url": "https://www.nissanusa.com/content/dam/Nissan/us/vehicles/leaf/2025/common/2025-nissan-leaf-black-beach.jpg"
        },
        {
            "id": "7d86c1c2-720b-40d0-80bb-58af7971f6eb",
            "type": "Electric",
            "model": "Chevrolet Bolt",
            "year": 2025,
            "range_km": 416,
            "acceleration_0_100_kmh": 6.5,
            "torque_nm": 360,
            "displacement": null,
            "engine_type": "Electric motor",
            "image_url": "https://t.ctcdn.com.br/PqD4d_9gKcsqOJS-qEHiHzYjA4I=/1024x576/smart/i623670.jpeg"
        }
    ],
    "combustion_cars": [
        {
            "id": "5412dc4b-7e98-4fa0-812e-74920cf3a1ab",
            "type": "Combustion",
            "model": "Ford Mustang GT",
            "year": 2024,
            "range_km": 600,
            "acceleration_0_100_kmh": 4.3,
            "torque_nm": 529,
            "displacement": 5000,
            "engine_type": "V8",
            "image_url": "https://cdn.motor1.com/images/mgl/mMPmzP/s1/2024-ford-mustang-gt-exterior-front-quarter.webp"
        },
        {
            "id": "c4e4a1fb-8406-4c49-84cf-5f646fc94b90",
            "type": "Combustion",
            "model": "Chevrolet Camaro",
            "year": 2024,
            "range_km": 550,
            "acceleration_0_100_kmh": 4.0,
            "torque_nm": 617,
            "displacement": 6200,
            "engine_type": "V8",
            "image_url": "https://cdn.motor1.com/images/mgl/MNAn4/s1/chevrolet-camaro-performance.webp"
        },
        {
            "id": "a7c9bc57-c9e1-4c39-97a0-9f4c83bb55f9",
            "type": "Combustion",
            "model": "BMW M3",
            "year": 2025,
            "range_km": 450,
            "acceleration_0_100_kmh": 4.1,
            "torque_nm": 550,
            "displacement": 3000,
            "engine_type": "V6",
            "image_url": "https://s2-autoesporte.glbimg.com/S0heBrR8jsfCo1bUWf2k6-7-uZY=/149x138:1796x1234/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2021/g/N/KVPu7ORGKIUGTOinItfg/bmw-m3-competition-4397.jpeg"
        }
    ]
};

function populateSelect(selectId, cars) {
    const select = document.getElementById(selectId);
    cars.forEach(car => {
        const option = document.createElement("option");
        option.value = car.id;
        option.textContent = car.model;
        select.appendChild(option);
    });
}

function displayCarDetails(carId, cars, detailsContainerId, imageContainerId) {
    const car = cars.find(car => car.id === carId);
    const detailsContainer = document.getElementById(detailsContainerId);
    const imageContainer = document.getElementById(imageContainerId);
    if (car) {
        detailsContainer.innerHTML = `
            <p>Modelo: ${car.model}</p>
            <p>Autonomia: ${car.range_km} km</p>
            <p>0-100 km/h: ${car.acceleration_0_100_kmh} s</p>
            <p>Torque: ${car.torque_nm} Nm</p>
            <p>Motor: ${car.engine_type}</p>
            ${car.displacement ? `<p>Deslocamento: ${car.displacement} cc</p>` : ''}
        `;
        imageContainer.src = car.image_url;
    } else {
        detailsContainer.innerHTML = "";
        imageContainer.src = "";
    }
}

function getUniqueYears(cars) {
    const years = cars.map(car => car.year);
    return [...new Set(years)].sort();
}

function populateYearSelect(selectId, years) {
    const select = document.getElementById(selectId);
    years.forEach(year => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        select.appendChild(option);
    });
}

function filterCarsByYear(year, cars) {
    return cars.filter(car => car.year === parseInt(year, 10));
}

document.getElementById("yearSelect").addEventListener("change", function () {
    const selectedYear = this.value;

    let filteredElectricCars = data.electric_cars;
    let filteredCombustionCars = data.combustion_cars;

    if (selectedYear) {
        filteredElectricCars = filterCarsByYear(selectedYear, data.electric_cars);
        filteredCombustionCars = filterCarsByYear(selectedYear, data.combustion_cars);
    }

    document.getElementById("electricSelect").innerHTML = "<option value=''>Elétrico</option>";
    document.getElementById("combustionSelect").innerHTML = "<option value=''>Combustão</option>";
    populateSelect("electricSelect", filteredElectricCars);
    populateSelect("combustionSelect", filteredCombustionCars);

    displayCarDetails("", [], "electricCarDetails", "electricCarImage");
    displayCarDetails("", [], "combustionCarDetails", "combustionCarImage");
});

document.getElementById("electricSelect").addEventListener("change", function () {
    displayCarDetails(this.value, data.electric_cars, "electricCarDetails", "electricCarImage");
});

document.getElementById("combustionSelect").addEventListener("change", function () {
    displayCarDetails(this.value, data.combustion_cars, "combustionCarDetails", "combustionCarImage");
});

const allYears = getUniqueYears([...data.electric_cars, ...data.combustion_cars]);
populateYearSelect("yearSelect", allYears);
populateSelect("electricSelect", data.electric_cars);
populateSelect("combustionSelect", data.combustion_cars);

document.addEventListener("DOMContentLoaded", function() {
    fetch('navBar.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').innerHTML = data;
        })
        .catch(error => console.error('Error loading navbar:', error));
});