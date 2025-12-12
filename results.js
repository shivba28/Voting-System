// Mapping of salsa options to person names
const salsaNames = {
    'Salsa 1': 'Steven Nguyen',
    'Salsa 2': 'Andy Dang',
    'Salsa 3': 'Richard Ramich',
    'Salsa 4': 'Sylvia Wintrich',
    'Salsa 5': 'Bradley Robinson'
};

// Mapping of costume options to person names
const costumeNames = {
    'Costume 1': 'Steven Nguyen',
    'Costume 2': 'Sylvia Wintrich',
    'Costume 3': 'Chase Hunter',
    'Costume 4': 'Dane Yagi',
    'Costume 5': 'Bradley Robinson',
    'Costume 6': 'Richard Ramich',
    'Costume 7': 'Jennie Kennedy',
    'Costume 8': 'David Godoy',
    'Costume 9': 'Carlos Larios',
    'Costume 10': 'Andy Dang'
};

// Function to get display name (person name for salsa/costume, original for others)
function getDisplayName(option, competition) {
    if (competition === 'salsa' && salsaNames[option]) {
        return salsaNames[option];
    }
    if (competition === 'costume' && costumeNames[option]) {
        return costumeNames[option];
    }
    return option;
}

// Load and display results from Firebase
async function loadResults() {
    try {
        const results = await getResults();
        displayResults(results);
    } catch (error) {
        console.error('Error loading results:', error);
        const resultsContainer = document.getElementById('results');
        if (resultsContainer) {
            resultsContainer.innerHTML = 
                '<div class="error">Error loading results. Please check your Firebase configuration.</div>';
        }
    }
}

// Get results from Firebase
async function getResults() {
    // Get both documents separately
    const salsaDoc = await db.collection('votes').doc('salsa').get();
    const costumeDoc = await db.collection('votes').doc('costume').get();
    
    let allVotes = {
        salsa: {
            tastiest: {},
            spiciest: {},
            presentation: {}
        },
        costume: {
            creative: {},
            jumper: {},
            humor: {}
        }
    };
    
    // Get salsa data from salsa document
    if (salsaDoc.exists) {
        const salsaData = salsaDoc.data();
        if (salsaData && salsaData.salsa) {
            allVotes.salsa = salsaData.salsa;
        }
    }
    
    // Get costume data from costume document
    if (costumeDoc.exists) {
        const costumeData = costumeDoc.data();
        if (costumeData && costumeData.costume) {
            allVotes.costume = costumeData.costume;
        }
    }
    
    // Calculate winners for each category
    function getWinner(categoryVotes) {
        let maxVotes = 0;
        let winners = [];
        
        for (const [option, count] of Object.entries(categoryVotes)) {
            if (count > maxVotes) {
                maxVotes = count;
                winners = [option];
            } else if (count === maxVotes && maxVotes > 0) {
                winners.push(option);
            }
        }
        
        return { winners, votes: maxVotes };
    }

    return {
        salsa: {
            tastiest: getWinner(allVotes.salsa.tastiest),
            spiciest: getWinner(allVotes.salsa.spiciest),
            presentation: getWinner(allVotes.salsa.presentation),
            allVotes: allVotes.salsa
        },
        costume: {
            creative: getWinner(allVotes.costume.creative),
            jumper: getWinner(allVotes.costume.jumper),
            humor: getWinner(allVotes.costume.humor),
            allVotes: allVotes.costume
        }
    };
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    if (!resultsContainer) return;
    
    let html = `
        <div class="results-section">
            <h2>🌶️ Salsa Competition Results</h2>
            
            <div class="category-result">
                <h3>1. The Tastiest – best tasting dip</h3>
                ${formatCategoryResult(results.salsa.tastiest, results.salsa.allVotes.tastiest, 'salsa')}
            </div>
            
            <div class="category-result">
                <h3>2. 🔥 The Spiciest – the best spicy flavor</h3>
                ${formatCategoryResult(results.salsa.spiciest, results.salsa.allVotes.spiciest, 'salsa')}
            </div>
            
            <div class="category-result">
                <h3>3. 🎁 Best Presentation – the best-looking dish presentation</h3>
                ${formatCategoryResult(results.salsa.presentation, results.salsa.allVotes.presentation, 'salsa')}
            </div>
        </div>
        
        <div class="results-section">
            <h2>🎄 Jolly Costume Contest Results</h2>
            
            <div class="category-result">
                <h3>1. 🎨 Most Creative – the costume that wows with originality</h3>
                ${formatCategoryResult(results.costume.creative, results.costume.allVotes.creative, 'costume')}
            </div>
            
            <div class="category-result">
                <h3>2. 🧶 Jolliest Jumper – the sweater that radiates pure holiday cheer</h3>
                ${formatCategoryResult(results.costume.jumper, results.costume.allVotes.jumper, 'costume')}
            </div>
            
            <div class="category-result">
                <h3>3. 😄 Holiday Humor – the costume that makes everyone laugh out loud</h3>
                ${formatCategoryResult(results.costume.humor, results.costume.allVotes.humor, 'costume')}
            </div>
        </div>
    `;
    
    resultsContainer.innerHTML = html;
}

function formatCategoryResult(winnerData, allVotes, competition = null) {
    // Check if allVotes is valid
    if (!allVotes || typeof allVotes !== 'object' || Object.keys(allVotes).length === 0) {
        return '<div class="no-votes">No votes yet</div>';
    }

    let html = '';
    
    // Check if winnerData is valid and has winners
    if (winnerData && winnerData.winners && Array.isArray(winnerData.winners) && winnerData.winners.length > 0 && winnerData.votes > 0) {
        html += '<div class="winner">';
        html += '<div class="winner-label">🏆 Winner' + (winnerData.winners.length > 1 ? 's (Tie)' : '') + ':</div>';
        winnerData.winners.forEach(winner => {
            const displayName = getDisplayName(winner, competition);
            html += `<div>${displayName}</div>`;
        });
        html += `<div class="vote-count">${winnerData.votes} vote${winnerData.votes !== 1 ? 's' : ''}</div>`;
        html += '</div>';
    }

    // Display all vote counts
    html += '<div class="all-votes">';
    html += '<h4>All Votes:</h4>';
    
    // Sort by vote count (descending)
    const sortedVotes = Object.entries(allVotes)
        .filter(([option, count]) => count > 0) // Only show options with votes
        .sort((a, b) => b[1] - a[1]);
    
    if (sortedVotes.length === 0) {
        html += '<div class="no-votes">No votes yet</div>';
    } else {
        sortedVotes.forEach(([option, count]) => {
            const isWinner = winnerData && winnerData.winners && winnerData.winners.includes(option) && count === winnerData.votes;
            const displayName = getDisplayName(option, competition);
            html += `
                <div class="vote-item ${isWinner ? 'winner-item' : ''}">
                    <span class="vote-item-name">${displayName}</span>
                    <span class="vote-item-count">${count} vote${count !== 1 ? 's' : ''}</span>
                </div>
            `;
        });
    }
    
    html += '</div>';
    
    return html;
}

function refreshResults() {
    const resultsContainer = document.getElementById('results');
    if (resultsContainer) {
        resultsContainer.innerHTML = '<div class="loading">Loading results...</div>';
    }
    loadResults();
}

// Load results when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadResults);
} else {
    loadResults();
}
