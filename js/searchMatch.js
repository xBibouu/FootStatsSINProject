function searchMatches() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();

    const matchElements = document.querySelectorAll('.match-teams');
    let found = false;

    matchElements.forEach(matchElement => {
        const matchText = matchElement.textContent.toLowerCase();

        if (matchText.includes(searchTerm)) {
            matchElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            matchElement.style.backgroundColor = 'yellow'; 
            found = true;
        } else {
            matchElement.style.backgroundColor = ''; 
        }
    });

    if (!found) {
        alert('Match non trouvé');
    }
}

document.getElementById('search-btn').addEventListener('click', searchMatches);
