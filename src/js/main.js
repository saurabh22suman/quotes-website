document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    const newQuoteBtn = document.getElementById('newQuoteBtn');
    const romanticBtn = document.getElementById('romanticBtn');
    const motivationalBtn = document.getElementById('motivationalBtn');
    const favoritesBtn = document.getElementById('favoritesBtn');
    const favoriteBtn = document.getElementById('favoriteBtn');
    const favCount = document.getElementById('favCount');
    const petalContainer = document.getElementById('petalContainer');
    const favoritesContainer = document.getElementById('favoritesContainer');
    const favoritesList = document.getElementById('favoritesList');
    
    // State
    let quotes = {};
    let currentCategory = 'romantic';
    let currentQuote = null;
    let favorites = [];
    
    // Load favorites from localStorage
    function loadFavorites() {
        const storedFavorites = localStorage.getItem('quotesFavorites');
        if (storedFavorites) {
            favorites = JSON.parse(storedFavorites);
            updateFavoritesCount();
        }
    }
    
    // Save favorites to localStorage
    function saveFavorites() {
        localStorage.setItem('quotesFavorites', JSON.stringify(favorites));
        updateFavoritesCount();
    }
    
    // Update favorites count
    function updateFavoritesCount() {
        favCount.textContent = `(${favorites.length})`;
    }
    
    // Check if current quote is favorited
    function isCurrentQuoteFavorited() {
        if (!currentQuote) return false;
        
        return favorites.some(fav => 
            fav.text === currentQuote.text && 
            fav.author === currentQuote.author
        );
    }
    
    // Update favorite button state
    function updateFavoriteButton() {
        const heartIcon = favoriteBtn.querySelector('i');
        
        if (isCurrentQuoteFavorited()) {
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
        } else {
            heartIcon.classList.remove('fas');
            heartIcon.classList.add('far');
        }
    }
    
    // Toggle favorite status of current quote
    function toggleFavorite() {
        if (!currentQuote) return;
        
        const isFavorited = isCurrentQuoteFavorited();
        
        if (isFavorited) {
            // Remove from favorites
            favorites = favorites.filter(fav => 
                !(fav.text === currentQuote.text && fav.author === currentQuote.author)
            );
        } else {
            // Add to favorites
            favorites.push({
                text: currentQuote.text,
                author: currentQuote.author,
                category: currentCategory
            });
        }
        
        saveFavorites();
        updateFavoriteButton();
        renderFavoritesList();
    }
    
    // Render favorites list
    function renderFavoritesList() {
        favoritesList.innerHTML = '';
        
        if (favorites.length === 0) {
            favoritesList.innerHTML = '<div class="empty-favorites">You have no favorite quotes yet.</div>';
            return;
        }
        
        favorites.forEach((fav, index) => {
            const favoriteItem = document.createElement('div');
            favoriteItem.classList.add('favorite-item');
            
            const favoriteText = document.createElement('div');
            favoriteText.classList.add('favorite-text');
            favoriteText.textContent = fav.text;
            
            const favoriteAuthor = document.createElement('div');
            favoriteAuthor.classList.add('favorite-author');
            favoriteAuthor.textContent = fav.author ? `- ${fav.author}` : '';
            
            const removeButton = document.createElement('button');
            removeButton.classList.add('remove-favorite');
            removeButton.innerHTML = '<i class="fas fa-times"></i>';
            removeButton.addEventListener('click', () => {
                favorites.splice(index, 1);
                saveFavorites();
                renderFavoritesList();
                updateFavoriteButton();
            });
            
            favoriteItem.appendChild(favoriteText);
            favoriteItem.appendChild(favoriteAuthor);
            favoriteItem.appendChild(removeButton);
            
            favoritesList.appendChild(favoriteItem);
        });
    }
    
    // Fetch quotes
    async function fetchQuotes() {
        try {
            const response = await fetch('data/quotes.json');
            quotes = await response.json();
            displayRandomQuote();
        } catch (error) {
            console.error('Error fetching quotes:', error);
            quoteText.textContent = 'Could not load quotes. Please try again later.';
        }
    }
    
    // Display random quote from current category
    function displayRandomQuote() {
        if (!quotes[currentCategory] || quotes[currentCategory].length === 0) return;
        
        const randomIndex = Math.floor(Math.random() * quotes[currentCategory].length);
        currentQuote = quotes[currentCategory][randomIndex];
        
        // Fade out
        quoteText.style.opacity = 0;
        quoteAuthor.style.opacity = 0;
        
        setTimeout(() => {
            quoteText.textContent = currentQuote.text;
            quoteAuthor.textContent = currentQuote.author ? `- ${currentQuote.author}` : '';
            
            // Fade in
            quoteText.style.opacity = 1;
            quoteAuthor.style.opacity = 1;
            
            updateFavoriteButton();
        }, 300);
    }
    
    // Create falling petals
    function createPetals() {
        // Clear existing petals
        petalContainer.innerHTML = '';
        
        // Only show petals for romantic category
        if (currentCategory !== 'romantic') return;
        
        const petalCount = 20;
        
        for (let i = 0; i < petalCount; i++) {
            const petal = document.createElement('div');
            petal.classList.add('petal');
            
            // Random properties
            const size = Math.random() * 15 + 10;
            const left = Math.random() * 100;
            const delay = Math.random() * 10;
            const duration = Math.random() * 10 + 10;
            
            // Apply styles
            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;
            petal.style.left = `${left}%`;
            petal.style.animationDelay = `${delay}s`;
            petal.style.animationDuration = `${duration}s`;
            
            petalContainer.appendChild(petal);
        }
    }
    
    // Show quotes view
    function showQuotesView() {
        favoritesContainer.style.display = 'none';
        quoteText.parentElement.style.display = 'block';
        newQuoteBtn.style.display = 'inline-block';
        
        romanticBtn.classList.remove('active');
        motivationalBtn.classList.remove('active');
        favoritesBtn.classList.remove('active');
        
        if (currentCategory === 'romantic') {
            romanticBtn.classList.add('active');
        } else {
            motivationalBtn.classList.add('active');
        }
    }
    
    // Show favorites view
    function showFavoritesView() {
        quoteText.parentElement.style.display = 'none';
        newQuoteBtn.style.display = 'none';
        favoritesContainer.style.display = 'block';
        
        romanticBtn.classList.remove('active');
        motivationalBtn.classList.remove('active');
        favoritesBtn.classList.add('active');
        
        renderFavoritesList();
    }
    
    // Event listeners
    newQuoteBtn.addEventListener('click', displayRandomQuote);
    
    favoriteBtn.addEventListener('click', toggleFavorite);
    
    romanticBtn.addEventListener('click', function() {
        currentCategory = 'romantic';
        showQuotesView();
        createPetals();
        displayRandomQuote();
    });
    
    motivationalBtn.addEventListener('click', function() {
        currentCategory = 'motivational';
        showQuotesView();
        createPetals(); // This will clear petals
        displayRandomQuote();
    });
    
    favoritesBtn.addEventListener('click', showFavoritesView);
    
    // Initialize
    loadFavorites();
    fetchQuotes();
    createPetals();
});
