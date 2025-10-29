// Variables pour stocker les réponses
const answers = {
    type: '',
    porosity: '',
    need: ''
};

// Base de données des produits
const products = {
    hydratation: {
        faible: [
            {
                name: "Shampoing clarifiant doux",
                type: "Shampoing",
                description: "Élimine l'accumulation de produits pour permettre une meilleure pénétration de l'hydratation.",
                ingredients: "Aloe vera, thé vert, acide citrique"
            },
            {
                name: "Après-shampoing léger protéiné",
                type: "Après-shampoing",
                description: "Hydrate sans alourdir et renforce la cuticule.",
                ingredients: "Protéines de soie, huile de jojoba, glycérine"
            },
            {
                name: "Leave-in à base d'eau",
                type: "Leave-in",
                description: "Formule légère qui pénètre facilement.",
                ingredients: "Eau de rose, glycérine, panthénol"
            }
        ],
        moyenne: [
            {
                name: "Shampoing hydratant sans sulfates",
                type: "Shampoing",
                description: "Nettoie en douceur tout en maintenant l'hydratation.",
                ingredients: "Beurre de karité, huile de coco, miel"
            },
            {
                name: "Masque hydratant profond",
                type: "Masque",
                description: "Pénètre en profondeur pour une hydratation durable.",
                ingredients: "Avocat, huile d'olive, aloe vera"
            },
            {
                name: "Crème définissante hydratante",
                type: "Crème",
                description: "Définit les boucles tout en apportant de l'hydratation.",
                ingredients: "Beurre de mangue, huile d'argan, lin"
            }
        ],
        haute: [
            {
                name: "Co-wash crémeux",
                type: "Co-wash",
                description: "Nettoie sans décaper pour retenir l'hydratation.",
                ingredients: "Huile de ricin, beurre de cacao, glycérine"
            },
            {
                name: "Masque protéiné intense",
                type: "Masque",
                description: "Répare et scelle l'hydratation dans la fibre capillaire.",
                ingredients: "Protéines de blé, huile de baobab, kératine"
            },
            {
                name: "Beurre capillaire riche",
                type: "Beurre",
                description: "Scelle l'hydratation et protège contre la sécheresse.",
                ingredients: "Beurre de karité brut, huile de ricin, vitamine E"
            }
        ]
    },
    definition: {
        faible: [
            {
                name: "Gel léger définissant",
                type: "Gel",
                description: "Définit sans alourdir ni créer de résidus.",
                ingredients: "Lin, aloe vera, panthénol"
            },
            {
                name: "Mousse légère volumisante",
                type: "Mousse",
                description: "Apporte définition et tenue aérienne.",
                ingredients: "Protéines de riz, glycérine, extrait de bambou"
            }
        ],
        moyenne: [
            {
                name: "Crème définissante medium hold",
                type: "Crème",
                description: "Tenue parfaite pour boucles bien définies.",
                ingredients: "Beurre de mangue, huile de pépins de raisin, cire d'abeille"
            },
            {
                name: "Gel crème hybride",
                type: "Gel-Crème",
                description: "Combine hydratation et définition optimale.",
                ingredients: "Aloe vera, huile d'argan, gomme de xanthane"
            }
        ],
        haute: [
            {
                name: "Custard définissante riche",
                type: "Custard",
                description: "Texture crémeuse qui définit et hydrate intensément.",
                ingredients: "Beurre de karité, huile de coco, gel de lin"
            },
            {
                name: "Gel strong hold hydratant",
                type: "Gel",
                description: "Tenue forte avec hydratation pour éviter la casse.",
                ingredients: "Gel d'aloe vera, glycérine, huile de ricin"
            }
        ]
    },
    croissance: {
        faible: [
            {
                name: "Shampoing stimulant cuir chevelu",
                type: "Shampoing",
                description: "Active la circulation pour favoriser la pousse.",
                ingredients: "Menthe poivrée, romarin, biotine"
            },
            {
                name: "Sérum de croissance léger",
                type: "Sérum",
                description: "Pénètre rapidement pour nourrir le follicule.",
                ingredients: "Huile de ricin jamaïcain, pépins de courge, caféine"
            }
        ],
        moyenne: [
            {
                name: "Huile de massage fortifiante",
                type: "Huile",
                description: "Stimule le cuir chevelu et renforce les racines.",
                ingredients: "Ricin noir, romarin, gingembre"
            },
            {
                name: "Masque fortifiant aux protéines",
                type: "Masque",
                description: "Renforce la fibre pour réduire la casse.",
                ingredients: "Protéines de riz, biotine, kératine"
            }
        ],
        haute: [
            {
                name: "Traitement intensif croissance",
                type: "Traitement",
                description: "Formule concentrée pour maximiser la pousse.",
                ingredients: "Huile de ricin noir, huile de moutarde, vitamines B"
            },
            {
                name: "Baume protecteur des pointes",
                type: "Baume",
                description: "Protège les longueurs pour éviter la casse.",
                ingredients: "Beurre de karité, huile d'amande douce, vitamine E"
            }
        ]
    },
    volume: {
        faible: [
            {
                name: "Shampoing volumisant clarifiant",
                type: "Shampoing",
                description: "Nettoie en profondeur pour alléger les cheveux.",
                ingredients: "Argile blanche, thé vert, menthe"
            },
            {
                name: "Spray volumisant léger",
                type: "Spray",
                description: "Apporte du corps sans alourdir.",
                ingredients: "Eau de riz, protéines de soie, panthénol"
            }
        ],
        moyenne: [
            {
                name: "Mousse volumisante medium hold",
                type: "Mousse",
                description: "Volume durable avec définition naturelle.",
                ingredients: "Protéines végétales, glycérine, extrait de quinoa"
            },
            {
                name: "Après-shampoing volumisant",
                type: "Après-shampoing",
                description: "Démêle sans alourdir pour un volume optimal.",
                ingredients: "Protéines de blé, aloe vera, huile de jojoba"
            }
        ],
        haute: [
            {
                name: "Gel léger aérien",
                type: "Gel",
                description: "Définit avec du volume sans effet carton.",
                ingredients: "Gel de lin, glycérine, protéines de riz"
            },
            {
                name: "Mousse hydratante volumisante",
                type: "Mousse",
                description: "Combine volume et hydratation pour cheveux poreux.",
                ingredients: "Aloe vera, panthénol, protéines de soie"
            }
        ]
    }
};

// Gestion des clics sur les options
document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', function() {
        const question = this.dataset.question;
        const value = this.dataset.value;
        
        // Désélectionner toutes les options de cette question
        document.querySelectorAll(`[data-question="${question}"]`).forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Sélectionner l'option cliquée
        this.classList.add('selected');
        answers[question] = value;
    });
});

// Fonction pour afficher les résultats
function showResults() {
    // Vérifier que toutes les questions ont une réponse
    if (!answers.type || !answers.porosity || !answers.need) {
        alert('Veuillez répondre à toutes les questions');
        return;
    }

    // Récupérer les produits recommandés
    const recommendedProducts = products[answers.need][answers.porosity];
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    // Créer les cartes de produits
    recommendedProducts.forEach(product => {
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

    // Afficher les résultats et cacher le quiz
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('results').classList.add('show');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}