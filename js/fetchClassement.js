const leagues = {
    'premier-league': 'PL',
    'la-liga': 'PD',
    'serie-a': 'SA',
    'bundesliga': 'BL1',
    'ligue-1': 'FL1'
};

function fetchStandings(leagueCode, containerId) {
    fetch(`http://serveur-4058.duckdns.org:7001/standings/${leagueCode}`)
        .then(response => response.json())
        .then(data => {
            const standings = data.standings[0].table;
            const container = document.getElementById(containerId);
            container.innerHTML = `
                <h3 class="league-title">${data.competition.name} - Saison ${data.season.startDate.split('-')[0]}</h3>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Équipe</th>
                            <th>Points</th>
                            <th>MJ</th>
                            <th>G</th>
                            <th>N</th>
                            <th>P</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${standings.map(team => `
                            <tr>
                                <td>${team.position}</td>
                                <td>${team.team.name}</td>
                                <td>${team.points}</td>
                                <td>${team.playedGames}</td>
                                <td>${team.won !== undefined ? team.won : 0}</td>
                                <td>${team.draw !== undefined ? team.draw : 0}</td>
                                <td>${team.lost !== undefined ? team.lost : 0}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        })
        .catch(error => console.log('Erreur:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    Object.keys(leagues).forEach(league => {
        fetchStandings(leagues[league], league);
    });
});
