// Handle Salsa Competition form submission
const salsaForm = document.getElementById('salsaForm');
if (salsaForm) {
    salsaForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const votes = {
            tastiest: formData.get('tastiest'),
            spiciest: formData.get('spiciest'),
            presentation: formData.get('presentation')
        };

        try {
            // Submit votes to Firebase
            await submitVotes('salsa', votes);
            showMessage('Salsa votes submitted successfully!', 'success');
            e.target.reset();
        } catch (error) {
            showMessage('Error submitting votes. Please try again.', 'error');
            console.error('Error:', error);
        }
    });
}

// Handle Costume Competition form submission
const costumeForm = document.getElementById('costumeForm');
if (costumeForm) {
    costumeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const votes = {
            creative: formData.get('creative'),
            jumper: formData.get('jumper'),
            humor: formData.get('humor')
        };

        try {
            // Submit votes to Firebase
            await submitVotes('costume', votes);
            showMessage('Costume votes submitted successfully!', 'success');
            e.target.reset();
        } catch (error) {
            showMessage('Error submitting votes. Please try again.', 'error');
            console.error('Error:', error);
        }
    });
}

// Submit votes to Firebase
async function submitVotes(competition, votes) {
    const votesRef = db.collection('votes').doc(competition);
    
    // Use Firestore transaction to safely increment vote counts
    return db.runTransaction(async (transaction) => {
        const doc = await transaction.get(votesRef);
        
        if (!doc.exists) {
            // Initialize if document doesn't exist
            const initialData = {
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
            transaction.set(votesRef, initialData);
        }
        
        const currentData = doc.exists ? doc.data() : {
            salsa: { tastiest: {}, spiciest: {}, presentation: {} },
            costume: { creative: {}, jumper: {}, humor: {} }
        };
        
        // Update vote counts
        if (competition === 'salsa') {
            if (votes.tastiest) {
                currentData.salsa.tastiest[votes.tastiest] = (currentData.salsa.tastiest[votes.tastiest] || 0) + 1;
            }
            if (votes.spiciest) {
                currentData.salsa.spiciest[votes.spiciest] = (currentData.salsa.spiciest[votes.spiciest] || 0) + 1;
            }
            if (votes.presentation) {
                currentData.salsa.presentation[votes.presentation] = (currentData.salsa.presentation[votes.presentation] || 0) + 1;
            }
        } else if (competition === 'costume') {
            if (votes.creative) {
                currentData.costume.creative[votes.creative] = (currentData.costume.creative[votes.creative] || 0) + 1;
            }
            if (votes.jumper) {
                currentData.costume.jumper[votes.jumper] = (currentData.costume.jumper[votes.jumper] || 0) + 1;
            }
            if (votes.humor) {
                currentData.costume.humor[votes.humor] = (currentData.costume.humor[votes.humor] || 0) + 1;
            }
        }
        
        transaction.set(votesRef, currentData);
    });
}

// Show message to user
function showMessage(message, type) {
    const messageEl = document.getElementById('message');
    if (messageEl) {
        messageEl.textContent = message;
        messageEl.className = `message ${type}`;
        
        setTimeout(() => {
            messageEl.className = 'message';
            messageEl.textContent = '';
        }, 3000);
    }
}
