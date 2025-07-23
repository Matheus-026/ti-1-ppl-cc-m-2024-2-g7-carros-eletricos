async function loadFAQ() {
    const response = await fetch('/faq');
    const faqData = await response.json();
    generateAccordion(faqData);
}

function generateAccordion(faqData) {
    const accordionContainer = document.getElementById('accordionFlushExample');

    faqData.forEach(item => {
        const accordionItem = document.createElement('div');
        accordionItem.className = 'accordion-item';
        
        accordionItem.innerHTML = `
            <h2 class="accordion-header" id="heading-${item.id}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${item.id}" aria-expanded="false" aria-controls="collapse-${item.id}">
                    <strong>${item.question}</strong>
                </button>
            </h2>
            <div id="collapse-${item.id}" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">${item.answer}</div>
            </div>
        `;
        
        accordionContainer.appendChild(accordionItem);
    });
}

window.onload = loadFAQ;

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keyup', function() {
    const searchTerm = searchInput.value.toLowerCase();
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const headerText = item.querySelector('.accordion-button strong').textContent.toLowerCase();
        item.style.display = headerText.includes(searchTerm) ? '' : 'none'; // Mostra ou oculta o item com base na pesquisa
    });
});