document.getElementById('search-btn').addEventListener('click', function() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();

    const teamElements = document.querySelectorAll('td'); 
    let found = false;

    teamElements.forEach(teamElement => {
        const teamName = teamElement.textContent.toLowerCase();

        if (teamName.includes(searchTerm)) {
            teamElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            teamElement.style.backgroundColor = 'yellow';
            found = true;
        } else {
            teamElement.style.backgroundColor = ''; 
        }
    });

    if (!found) {
        alert('Équipe non trouvée');
    }
});

