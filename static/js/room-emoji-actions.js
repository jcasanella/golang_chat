// Emoji data organized by categories
const emojiData = {
    smileys: [
        '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩',
        '😘', '😗', '😚', '😙', '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐',
        '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕'
    ],
    people: [
        '👶', '🧒', '👦', '👧', '🧑', '👨', '👩', '🧓', '👴', '👵', '👱', '👨‍🦰', '👩‍🦰', '👨‍🦱', '👩‍🦱', '👨‍🦲',
        '👩‍🦲', '👨‍🦳', '👩‍🦳', '🧔', '👤', '👥', '👪', '👨‍👩‍👧‍👦', '👨‍👨‍👧', '👩‍👩‍👦', '👨‍👧', '👩‍👦', '🤰', '🤱', '👶', '🧑‍🍼',
        '👨‍🍼', '👩‍🍼', '🙇', '💁', '🙅', '🙆', '🙋', '🧏', '🤦', '🤷', '💆', '💇', '🚶', '🧍', '🧎', '🏃'
    ],
    animals: [
        '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🙈',
        '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴',
        '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟', '🦗', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑'
    ],
    food: [
        '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝',
        '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🫑', '🌽', '🥕', '🫒', '🧄', '🧅', '🥔', '🍠', '🥐',
        '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🧈', '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔'
    ],
    activities: [
        '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍',
        '🏏', '🪃', '🥅', '⛳', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛷', '⛸️', '🥌', '🎿',
        '⛷️', '🏂', '🪂', '🏋️', '🤼', '🤸', '⛹️', '🤺', '🤾', '🏌️', '🧘', '🏄', '🏊', '🤽', '🚣', '🧗'
    ],
    travel: [
        '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚', '🚛', '🚜', '🏍️', '🛵',
        '🚲', '🛴', '🛺', '🚨', '🚔', '🚍', '🚘', '🚖', '🚡', '🚠', '🚟', '🚃', '🚋', '🚞', '🚝', '🚄',
        '🚅', '🚈', '🚂', '🚆', '🚇', '🚊', '🚉', '✈️', '🛫', '🛬', '🛩️', '💺', '🛰️', '🚀', '🛸', '🚁'
    ],
    objects: [
        '💡', '🔦', '🕯️', '🪔', '🧯', '🛢️', '💸', '💵', '💴', '💶', '💷', '🪙', '💰', '💳', '💎', '⚖️',
        '🪜', '🧰', '🔧', '🔨', '⚒️', '🛠️', '⛏️', '🪚', '🔩', '⚙️', '🪤', '🧱', '⛓️', '🧲', '🔫', '💣',
        '🧨', '🪓', '🔪', '⚔️', '🛡️', '🚬', '⚰️', '🪦', '⚱️', '🏺', '🔮', '📿', '🧿', '💈', '⚗️', '🔭'
    ],
    symbols: [
        '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖',
        '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈',
        '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '🆔', '⚛️', '🉑', '☢️', '☣️', '📴', '📳'
    ]
};

class EmojiPicker {
    constructor() {
        this.input = document.getElementById('room-icon');
        this.trigger = document.getElementById('emojiTrigger');
        this.picker = document.getElementById('emojiPicker');
        this.search = document.getElementById('emojiSearch');
        this.tabs = document.querySelectorAll('.emoji-tab');
        this.categories = document.querySelectorAll('.emoji-category');
        this.currentCategory = 'smileys';
        
        if (!this.input || !this.trigger || !this.picker) {
            console.error('Required elements not found:', {
                input: this.input,
                trigger: this.trigger,
                picker: this.picker
            });
            return;
        }
        
        
        this.init();
    }

    init() {
        this.populateEmojis();
        this.bindEvents();
    }

    populateEmojis() {
        Object.keys(emojiData).forEach(category => {
            const grid = document.getElementById(`${category}-grid`);
            if (grid) {
                emojiData[category].forEach(emoji => {
                    const emojiElement = document.createElement('div');
                    emojiElement.className = 'emoji-item';
                    emojiElement.textContent = emoji;
                    emojiElement.onclick = () => this.insertEmoji(emoji);
                    grid.appendChild(emojiElement);
                });
            }
        });
    }

    bindEvents() {
        // Toggle picker
        this.trigger.addEventListener('click', (e) => {
            e.preventDefault();
            this.togglePicker();
        });

        // Close picker when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.picker.contains(e.target) && e.target !== this.trigger) {
                this.closePicker();
            }
        });

        // Tab switching
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.dataset.category;
                this.switchCategory(category);
            });
        });

        // Search functionality
        this.search.addEventListener('input', (e) => {
            this.searchEmojis(e.target.value);
        });

        // Prevent picker from closing when clicking inside
        this.picker.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    togglePicker() {
        if (this.picker.classList.contains('active')) {
            this.closePicker();
        } else {
            this.openPicker();
        }
    }

    openPicker() {
        this.picker.classList.add('active');
        this.search.value = '';
        this.switchCategory('smileys');
    }

    closePicker() {
        this.picker.classList.remove('active');
    }

    switchCategory(category) {
        // Update tabs
        this.tabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.category === category) {
                tab.classList.add('active');
            }
        });

        // Update categories
        this.categories.forEach(cat => {
            cat.classList.remove('active');
            if (cat.dataset.category === category) {
                cat.classList.add('active');
            }
        });

        this.currentCategory = category;
        this.search.value = '';
    }

    searchEmojis(query) {
        if (!query.trim()) {
            this.showAllEmojis();
            return;
        }

        const allEmojis = Object.values(emojiData).flat();
        const filteredEmojis = allEmojis.filter(emoji => {
            // Simple emoji matching - you could enhance this with emoji names/descriptions
            return true; // For now, show all emojis when searching
        });

        this.showSearchResults(filteredEmojis);
    }

    showAllEmojis() {
        this.categories.forEach(category => {
            category.style.display = category.dataset.category === this.currentCategory ? 'block' : 'none';
        });
    }

     showSearchResults(emojis) {
        // Hide all categories
        this.categories.forEach(category => {
            category.style.display = 'none';
        });

        // Show first category with search results
        const firstCategory = this.categories[0];
        firstCategory.style.display = 'block';
        
        const grid = firstCategory.querySelector('.emoji-grid');
        grid.innerHTML = '';
        
        emojis.forEach(emoji => {
            const emojiElement = document.createElement('div');
            emojiElement.className = 'emoji-item';
            emojiElement.textContent = emoji;
            emojiElement.onclick = () => this.insertEmoji(emoji);
            grid.appendChild(emojiElement);
        });
    }

    insertEmoji(emoji) {
        const cursorPosition = this.input.selectionStart;
        const textBefore = this.input.value.substring(0, cursorPosition);
        const textAfter = this.input.value.substring(cursorPosition);
        
        this.input.value = textBefore + emoji + textAfter;
        this.input.focus();
        this.input.setSelectionRange(cursorPosition + emoji.length, cursorPosition + emoji.length);
        
        // Optional: close picker after selection
        // this.closePicker();
    }
}

// Make EmojiPicker available globally
window.EmojiPicker = EmojiPicker;

// Initialize the emoji picker when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize emoji picker immediately
    window.currentEmojiPicker = new EmojiPicker();
});