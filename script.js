// Attend que toute la page HTML soit chargée
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Sélectionne tous les liens du menu
    const navLinks = document.querySelectorAll('.nav-link');

    // 2. Crée une fonction pour gérer le clic
    function handleNavClick(event) {
        
        // D'abord, enlève la classe 'active' de TOUS les liens
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Ensuite, ajoute la classe 'active' SEULEMENT au lien qui a été cliqué
        event.currentTarget.classList.add('active');
    }

    // 3. Ajoute un écouteur d'événement "clic" à chaque lien
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });


});

/* ======================================================= */
/* --- LOGIQUE D'ANIMATION AU DÉFILEMENT (Scroll Reveal) --- */
/* ======================================================= */

function scrollReveal() {
    
    // 1. Définir le "point de déclenchement" (à quelle hauteur l'effet doit se produire)
    // Ici, l'animation se déclenche quand l'élément est visible à 15% de la hauteur de la fenêtre
    const revealPoint = window.innerHeight * 0.15;
    
    // 2. Sélectionner tous les éléments à animer
    const elementsToReveal = document.querySelectorAll('.js-scroll');

    // 3. Parcourir tous les éléments
    elementsToReveal.forEach(element => {
        
        // Calculer la position de l'élément par rapport au haut de la fenêtre (viewport)
        const elementTop = element.getBoundingClientRect().top;
        
        // Calculer la position de l'élément par rapport au bas de la fenêtre
        const elementBottom = element.getBoundingClientRect().bottom;

        /* --- LOGIQUE D'ENTRÉE (Ajouter l'effet) --- */
        
        // Si le haut de l'élément est dans la fenêtre (moins de 85% de la hauteur)
        // ET que l'élément n'est pas déjà sorti par le bas
        if (elementTop < window.innerHeight - revealPoint && elementBottom > revealPoint) {
            element.classList.add('is-visible');
        } 
        
        /* --- LOGIQUE DE SORTIE (Retirer l'effet) --- */
        
        // Si l'élément est sorti par le bas (le haut de l'élément est au-dessus du bas de la fenêtre)
        // OU si l'élément est sorti par le haut (le bas de l'élément est au-dessus du haut de la fenêtre)
        else {
            element.classList.remove('is-visible');
        }
    });
}

// Lancer la fonction lors du chargement initial de la page
scrollReveal(); 

// Lancer la fonction à chaque fois que l'utilisateur fait défiler la page
window.addEventListener('scroll', scrollReveal);

// Lancer la fonction au redimensionnement de la fenêtre
window.addEventListener('resize', scrollReveal);
