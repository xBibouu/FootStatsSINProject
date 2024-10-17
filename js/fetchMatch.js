const leagues = {
    'premier-league': 'PL',
    'la-liga': 'PD',
    'serie-a': 'SA',
    'bundesliga': 'BL1',
    'ligue-1': 'FL1'
};

function fetchUpcomingMatches(leagueCode, containerId) {
    fetch(`http://serveur-4058.duckdns.org:7001/upcoming-matches/${leagueCode}`)
        .then(response => response.json())
        .then(data => {
            const matches = data.matches || [];
            const uniqueMatches = new Set();
            const matchList = []; 

            matches.forEach(match => {
                const homeTeam = match.homeTeam.name;
                const awayTeam = match.awayTeam.name;
                const journee = match.matchday;
                let jours = match.utcDate;
                const jour = jours.substring(8,10);
                let moi = match.utcDate;
                const mois = moi.substring(5,7);
                let heuress = match.utcDate;
                let heures = heuress.substring(11,13);
                let heure = parseInt(heures);
                const heureFinal = heure +2;

                let minutes = match.utcDate;
                const minute = minutes.substring(14,16);
                const imgHomeTeam = match.homeTeam.crest;
                const imgAwayTeam = match.awayTeam.crest;
                const matchKey = `${homeTeam} vs ${awayTeam}`;

                if (!uniqueMatches.has(matchKey)) {
                    uniqueMatches.add(matchKey);
                    matchList.push({
                        homeTeam,
                        awayTeam,
                        journee,
                        jour,
                        mois,
                        heureFinal,
                        minute,
                        imgAwayTeam,
                        imgHomeTeam
                    });
                }
            });

            const nextMatches = [];
            const teamSeen = new Set(); 

            matchList.forEach(match => {
                if (!teamSeen.has(match.homeTeam) && !teamSeen.has(match.awayTeam)) {
                    nextMatches.push(match);
                    teamSeen.add(match.homeTeam);
                    teamSeen.add(match.awayTeam);
                    teamSeen.add(match.journee);
                    teamSeen.add(match.jour);
                    teamSeen.add(match.mois);
                    teamSeen.add(match.heureFinal);
                    teamSeen.add(match.minute);
                    teamSeen.add(match.imgAwayTeam);
                    teamSeen.add(match.imgHomeTeam);
                }
            });

            const container = document.getElementById(containerId);
            container.innerHTML = `
                <h3 class="league-title">${data.competition.name}</h3>
                <div class="match-list">
                    ${nextMatches.map(match => `
                        <div class="match-container">
                            <img class="img-home" src="${match.imgHomeTeam}" alt="Match de Football 5">
                        <span class="match-teams">Journée n°${match.journee} <br/>
                            ${match.homeTeam} vs ${match.awayTeam}<br/>
                            Le ${match.jour}/${match.mois} à ${match.heureFinal}h${match.minute}
                        </span>
                        <img class="img-away" src="${match.imgAwayTeam}" alt="Match de Football 5">
                        </div>
                    `).join('') || '<p>Aucun match programmé</p>'}
                </div>
            `;
            })
        .catch(error => console.log('Erreur:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    Object.keys(leagues).forEach(league => {
        fetchUpcomingMatches(leagues[league], league);
    });
});
