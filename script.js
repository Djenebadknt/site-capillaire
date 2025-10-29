// Variables pour stocker les réponses
// MODIFICATION : answers.need devient un tableau pour accepter plusieurs besoins
const answers = {
    type: '',
    porosity: '',
    need: [] // <- maintenant tableau
};

// Base de données des produits (inchangée)
const products = {
    hydratation: { /* ... (comme avant) ... */ },
    definition: { /* ... */ },
    croissance: { /* ... */ },
    volume: { /* ... */ }
};

/* ---------------------------
   Gestion des clics sur les options
   ---------------------------
   Comportement :
   - Pour les questions "type" et "porosity" : comportement single-select (comme avant)
   - Pour la question "need" : comportement multi-select (toggle)
*/

// Sélectionne toutes les options (comme avant)
document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', function() {
        const question = this.dataset.question;
        const value = this.dataset.value;

        if (question === 'need') {
            // MULTI-SELECT : toggle la classe et mettre à jour answers.need (tableau)
            const isSelected = this.classList.contains('selected');

            if (isSelected) {
                // désélectionner cet élément
                this.classList.remove('selected');
                // retirer la valeur du tableau
                answers.need = answers.need.filter(v => v !== value);
            } else {
                // sélectionner cet élément
                this.classList.add('selected');
                // ajouter la valeur si elle n'est pas déjà présente
                if (!answers.need.includes(value)) {
                    answers.need.push(value);
                }
            }
        } else {
            // SINGLE-SELECT (type, porosity) - même comportement que tu avais avant
            // Désélectionner toutes les options de cette question
            document.querySelectorAll(`[data-question="${question}"]`).forEach(opt => {
                opt.classList.remove('selected');
            });

            // Sélectionner l'option cliquée
            this.classList.add('selected');
            answers[question] = value;
        }

        // (optionnel) Debug console — tu peux enlever la ligne si tu veux
        // console.log('Réponses actuelles :', answers);
    });
});

/* ---------------------------
   Fonction pour afficher les résultats
   ---------------------------
   - Vérifie que type et porosity sont choisis (single-select toujours obligatoires)
   - Vérifie qu'au moins un need est choisi (tableau non vide)
   - Combine les produits pour tous les besoins sélectionnés en évitant les doublons
*/

function showResults() {
    // Vérifier que type et porosity sont choisis
    if (!answers.type || !answers.porosity) {
        alert('Veuillez répondre aux questions sur votre type et la porosité de vos cheveux.');
        return;
    }

    // Vérifier qu'au moins un besoin a été choisi
    if (!answers.need || answers.need.length === 0) {
        alert('Veuillez choisir au moins un besoin (hydratation, définition, croissance, volume).');
        return;
    }

    // Combiner les produits recommandés pour tous les besoins choisis
    const combined = [];
    answers.need.forEach(needKey => {
        const listForNeed = products[needKey] && products[needKey][answers.porosity];
        if (Array.isArray(listForNeed)) {
            listForNeed.forEach(prod => {
                // éviter les doublons par nom (ou autre critère)
                if (!combined.some(p => p.name === prod.name)) {
                    combined.push(prod);
                }
            });
        }
    });

    // Si pour une raison quelconque aucun produit trouvé
    if (combined.length === 0) {
        const productList = document.getElementById('productList');
        productList.innerHTML = '<p>Aucun produit trouvé pour cette combinaison. Essayez d\'autres besoins.</p>';
    } else {
        // Afficher les cartes de produits
        const productList = document.getElementById('productList');
        productList.innerHTML = '';

        combined.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <span class="product-type">${product.type}</span>
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <div class="ingredients">
                    <h5>Ingrédients clés:</h5>
                    <p>${product.ingredients}</p>
                </div>
            `;
            productList.appendChild(card);
        });
    }

    // Afficher les résultats et cacher le quiz
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('results').classList.add('show');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
