fetch('/db/db.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar o JSON: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const cardContainer = document.getElementById('card-container');
        cardContainer.innerHTML = ''; // Limpa o contêiner antes de adicionar os cartões

        // Função para criar e adicionar cartões ao contêiner
        function criarCartoes(carros) {
            cardContainer.innerHTML = ''; // Limpa o contêiner antes de adicionar os cartões
            carros.forEach(carro => {
                const card = document.createElement('div');
                card.className = 'col-md-4 mb-4';
                card.innerHTML = `
                    <div class="card" style="width: 18rem; height: fit-content;">
                        <img src="${carro.imagem}" class="card-img-top" alt="Imagem do ${carro.modelo}">
                        <div class="card-body">
                            <p class="card-text">${carro.marca} ${carro.modelo} <br> Ano: ${carro.ano} <br> Autonomia: ${carro.autonomia}</p>
                        </div>
                    </div>
                `;
                cardContainer.appendChild(card);

                card.querySelector('.card').addEventListener('click', function() {
                    const existingPopover = document.querySelector('.popover');
                    if (existingPopover) {
                        existingPopover.remove();
                    }

                    const popoverContent = `Preço: a partir de ${carro.preco}`;
                    const popover = new bootstrap.Popover(card.querySelector('.card'), {
                        trigger: 'manual',
                        content: popoverContent,
                        title: 'Informações adicionais',
                        placement: 'bottom',
                        html: true,
                    });
                    popover.show();
                    setTimeout(() => {
                        popover.hide();
                    }, 3000);
                });
            });
        }

        // Inicializa os cartões com todos os carros
        criarCartoes(data.carro);

        // Função para filtrar carros
        function filtroCarros(marca, ano, carros) {
            const carrosFiltrados = carros.filter(carro => {
                const filtroMarca = (marca === 'Marca' || marca === 'clear' || carro.marca.toUpperCase() === marca.toUpperCase());
                let filtroAno = true;

        // Filtra pelo ano, considerando o intervalo
        if (ano === 'Até 2020') {
            filtroAno = carro.ano <= 2020; // Até 2020
        } else if (ano === '2020-2023') {
            filtroAno = carro.ano >= 2020 && carro.ano <= 2023; // Intervalo entre 2020 e 2023
        } else if (ano === '2024') {
            filtroAno = carro.ano == 2024; // Ano exato 2024
        } else if (ano === '') {
            filtroAno = true; // Se não houver filtro de ano
        }

        return filtroMarca && filtroAno;
    });
            criarCartoes(carrosFiltrados);
        }

        // Adiciona eventos aos itens do dropdown de marca
        document.querySelectorAll('.dropdown-menu.marca .dropdown-item').forEach(item => {
            item.addEventListener('click', function() {
                const filtroMarca = this.textContent.trim();
                const filtroAno = document.querySelector('.dropdown-toggle.ano').textContent.trim();
                filtroCarros(filtroMarca, filtroAno, data.carro);
            });
        });

        // Adiciona eventos aos itens do dropdown de ano
        document.querySelectorAll('.dropdown-menu.ano .dropdown-item').forEach(item => {
            item.addEventListener('click', function() {
                const filtroAno = this.textContent.trim();
                const filtroMarca = document.querySelector('.dropdown-toggle.marca').textContent.trim();
                filtroCarros(filtroMarca, filtroAno, data.carro);
            });
        });

        // Adiciona evento ao botão de limpar filtro
        document.getElementById('clearFilter').addEventListener('click', function() {
            // Reseta os filtros para "Marca" e "Ano" e carrega todos os carros novamente
            document.querySelector('.dropdown-toggle.marca').textContent = 'Marca';
            document.querySelector('.dropdown-toggle.ano').textContent = 'Ano';
            criarCartoes(data.carro);
        });
    })
    .catch(error => console.error('Erro ao carregar o JSON:', error));
