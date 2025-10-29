// ----------------------------
// Variables pour stocker les réponses
// ----------------------------
const answers = {
    type: '',
    porosity: '',
    need: [] // tableau pour plusieurs besoins
};

// ----------------------------
// Base de données des produits
// (remplis avec tes données actuelles comme avant)
// ----------------------------
const products = {
    hydratation: {
        faible: [
            { name: "Crème hydratante légère", type: "Hydratation", description: "Hydrate sans alourdir les cheveux à faible porosité.", ingredients: "Aloe Vera, Huile de Jojoba" }
        ],
        moyenne: [
            { name: "Masque nourrissant", type: "Hydratation", description: "Restaure l’équilibre hydratation-nutrition.", ingredients: "Beurre de Karité, Huile de Coco" }
        ],
        haute: [
            { name: "Lait capillaire riche", type: "Hydratation", description: "Hydrate intensément et scelle l’humidité.", ingredients: "Miel, Huile de Ricin" }
        ]
    },
    definition: {
        faible: [
            { name: "Gel léger boucles", type: "Définition", description: "Définit sans résidus pour les cheveux peu poreux.", ingredients: "Gel d’Aloe, Huile de Jojoba" }
        ],
        moyenne: [
            { name: "Crème bouclante", type: "Définition", description: "Apporte brillance et définition durable.", ingredients: "Beurre de Karité, Huile de Macadamia" }
        ],
        haute: [
            { name: "Pudding boucles serrées", type: "Définition", description: "Hydrate et définit les boucles intensément.", ingredients: "Huile de Ricin, Beurre de Mangue" }
        ]
    },
    croissance: {
        faible: [
            { name: "Huile stimulante légère", type: "Croissance", description: "Active la pousse sans alourdir.", ingredients: "Menthe poivrée, Jojoba" }
        ],
        moyenne: [
            { name: "Sérum pousse équilibré", type: "Croissance", description: "Stimule les racines et fortifie les longueurs.", ingredients: "Huile de Ricin, Romarin" }
        ],
        haute: [
            { name: "Huile réparatrice", type: "Croissance", description: "Renforce les cheveux poreux et cassants.", ingredients: "Ricin, Avocat, Kératine" }
        ]
    },
    volume: {
        faible: [
            { name: "Spray volume doux", type: "Volume", description: "Apporte du corps aux cheveux fins et lisses.", ingredients: "Protéines de riz, Panthénol" }
        ],
        moyenne: [
            { name: "Mousse volume naturel", type: "Volume", description: "Légèreté et rebond garantis.", ingredients: "Aloe, Huile de coco légère" }
        ],
        haute: [
            { name: "Crème volume intense", type: "Volume", description: "Dynamise les cheveux épais et poreux.", ingredients: "Huile de ricin, Beurre de karité" }
        ]
    }
};

// ----------------------------
// Ajout d’un compteur dynamique pour les besoins
// ----------------------------
const counterDisplay = document.createElement('span');
counterDisplay.id = 'needCounter';
counterDisplay.textContent = '(0 besoin sélectionné)';
counterDisplay.style.marginLeft = '10px';
counterDisplay.style.fontSize = '0.9em';
counterDisplay.style.color = '#555';

// On l’ajoute juste après le bouton
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.btn');
    if (btn) {
        btn.insertAdjacentElement('afterend', counterDisplay);
    }
});

// ----------------------------
// Gestion des clics sur les options
// ----------------------------
document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', function() {
        const question = this.dataset.question;
        const value = this.dataset.value;

        if (question === 'need') {
            const isSelected = this.classList.contains('selected');

            if (isSelected) {
                this.classList.remove('selected');
                answers.need = answers.need.filter(v => v !== value);
            } else {
                this.classList.add('selected');
                if (!answers.need.includes(value)) {
                    answers.need.push(value);
                }
            }

            // Mise à jour du compteur
            const count = answers.need.length;
            if (count === 0) counterDisplay.textContent = '(0 besoin sélectionné)';
            else if (count === 1) counterDisplay.textContent = '(1 besoin sélectionné)';
            else counterDisplay.textContent = `(${count} besoins sélectionnés)`;

        } else {
            // SINGLE SELECT pour type & porosity
            document.querySelectorAll(`[data-question="${question}"]`).forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
            answers[question] = value;
        }
    });
});

// ----------------------------
// Fonction d’affichage des résultats
// ----------------------------
function showResults() {
    if (!answers.type || !answers.porosity) {
        alert('Veuillez répondre aux questions sur votre type et la porosité de vos cheveux.');
        return;
    }

    if (!answers.need || answers.need.length === 0) {
        alert('Veuillez choisir au moins un besoin (hydratation, définition, croissance, volume).');
        return;
    }

    const combined = [];
    answers.need.forEach(needKey => {
        const listForNeed = products[needKey] && products[needKey][answers.porosity];
        if (Array.isArray(listForNeed)) {
            listForNeed.forEach(prod => {
                if (!combined.some(p => p.name === prod.name)) {
                    combined.push(prod);
                }
            });
        }
    });

    const productList = document.getElementById('productList');
    if (combined.length === 0) {
        productList.innerHTML = '<p>Aucun produit trouvé pour cette combinaison. Essayez d’autres besoins.</p>';
    } else {
        productList.innerHTML = '';
        combined.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <span class="product-type">${product.type}</span>
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <div class="ingredients">
                    <h5>Ingrédients clés :</h5>
                    <p>${product.ingredients}</p>
                </div>
            `;
            productList.appendChild(card);
        });
    }

    // Passage en mode résultats (sans animation ni mouvement auto)
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('results').classList.add('show');
    window.scrollTo(0, 0); // défilement immédiat en haut
}
