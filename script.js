// Основные данные (настройте под себя!)
const CONFIG = {
    startDate: "2025-05-03", // Дата начала отношений
    partnerBirthday: "2004-03-14", // День рождения второй половинки
    partnerName: "Моя любимая", // Имя второй половинки
    yourName: "Я" // Ваше имя
};

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    updateDateInfo();
    showPage('home');
    loadMessages();
    
    // Установите заголовок с именем
    document.title = `${CONFIG.yourName} + ${CONFIG.partnerName} ❤️`;
    
    // Обновляем счетчики каждую минуту
    setInterval(updateDateInfo, 60000);
});

// Переключение между страницами
function showPage(pageId) {
    // Скрыть все страницы
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Показать выбранную страницу
    document.getElementById(pageId).classList.add('active');
}

// Обновление дат и счетчиков
function updateDateInfo() {
    const now = new Date();
    
    // Текущая дата
    document.getElementById('current-date').textContent = 
        now.toLocaleDateString('ru-RU', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    
    // Дней вместе
    const startDate = new Date(CONFIG.startDate);
    const daysTogether = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    document.getElementById('days-together').textContent = daysTogether;
    
    // Счетчик для дней отношений
    const togetherCounter = document.getElementById('together-counter');
    if (togetherCounter) {
        togetherCounter.innerHTML = `
            <div style="font-size: 2.5em">${daysTogether}</div>
            <div style="font-size: 0.8em">дней счастья!</div>
        `;
    }
    
    // Счетчик до дня рождения
    updateBirthdayCounter();
}

// Счетчик до дня рождения
function updateBirthdayCounter() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const birthday = new Date(CONFIG.partnerBirthday);
    
    // Устанавливаем день рождения на текущий год
    birthday.setFullYear(currentYear);
    
    // Если день рождения уже прошел в этом году, берем следующий год
    if (birthday < now) {
        birthday.setFullYear(currentYear + 1);
    }
    
    const diffTime = birthday - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const birthdayCounter = document.getElementById('birthday-counter');
    if (birthdayCounter) {
        birthdayCounter.innerHTML = `
            <div style="font-size: 2.5em">${diffDays}</div>
            <div style="font-size: 0.8em">дней осталось!</div>
        `;
    }
}

// Работа с секретными сообщениями
function saveMessage() {
    const message = document.getElementById('secret-message').value.trim();
    if (!message) {
        alert('Напиши сообщение сначала!');
        return;
    }
    
    // Сохраняем в localStorage
    const messages = JSON.parse(localStorage.getItem('loveMessages') || '[]');
    messages.push({
        text: message,
        date: new Date().toLocaleString('ru-RU'),
        from: CONFIG.yourName
    });
    
    localStorage.setItem('loveMessages', JSON.stringify(messages));
    document.getElementById('secret-message').value = '';
    loadMessages();
    
    alert('Сообщение сохранено! 💌');
}

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('loveMessages') || '[]');
    const container = document.getElementById('saved-messages');
    
    if (messages.length === 0) {
        container.innerHTML = '<p>Пока нет сообщений. Будь первым!</p>';
        return;
    }
    
    container.innerHTML = messages.map((msg, index) => `
        <div class="memory">
            <p>${msg.text}</p>
            <small>От: ${msg.from} • ${msg.date}</small>
        </div>
    `).join('');
}

// Музыкальный плеер
function toggleMusic() {
    const audio = document.getElementById('our-song');
    const musicText = document.getElementById('music-text');
    
    if (audio.paused) {
        audio.play();
        musicText.textContent = 'Выключить музыку';
    } else {
        audio.pause();
        musicText.textContent = 'Включить нашу песню';
    }
}

// Функция для добавления фото (пример)
function addPhoto() {
    // В реальном сайте здесь будет загрузка фото
    const gallery = document.querySelector('.gallery-grid');
    const newPhoto = document.createElement('div');
    newPhoto.className = 'gallery-item';
    newPhoto.textContent = '📷 Новое фото!';
    gallery.appendChild(newPhoto);
}

// Показываем случайную фразу любви
function showLoveQuote() {
    const quotes = [
        "Любовь — это когда ты смотришь на человека и видишь целый мир.",
        "Ты делаешь меня лучше, чем я есть.",
        "В каждом дне есть момент, когда я думаю о тебе.",
        "Наша любовь — моя самая большая история.",
        "Ты — лучшее, что со мной случилось."
    ];
    
    return quotes[Math.floor(Math.random() * quotes.length)];
}

// Добавляем случайную фразу на главную страницу при загрузке
window.onload = function() {
    const homePage = document.getElementById('home');
    const quoteElement = document.createElement('p');
    quoteElement.className = 'love-quote';
    quoteElement.innerHTML = `<i class="fas fa-quote-left"></i> ${showLoveQuote()} <i class="fas fa-quote-right"></i>`;
    quoteElement.style.cssText = 'font-style: italic; color: #666; text-align: center; margin: 20px 0;';
    homePage.appendChild(quoteElement);
};