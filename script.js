// Основные данные
const CONFIG = {
    startDate: "2025-05-03",
    partnerBirthday: "2004-03-14",
    partnerName: "Моя булочка",
    yourName: "Я"
};

document.addEventListener('DOMContentLoaded', function() {
    updateDateInfo();
    showPage('home');
    loadMessages();
    createBackgroundHearts();

    document.title = `${CONFIG.yourName} + ${CONFIG.partnerName} ❤️`;
    setInterval(updateDateInfo, 60000); // обновление каждую минуту
});

// Переключение страниц
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

// Обновление информации о дате и днях вместе
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

    // Сколько дней вместе
    const startDate = new Date(CONFIG.startDate);
    const daysTogether = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));

    // Обновляем главную страницу
    const daysTogetherEl = document.getElementById('days-together');
    if (daysTogetherEl) daysTogetherEl.textContent = daysTogether;

    // Обновляем вкладку "Наши даты"
    const togetherCounter = document.getElementById('together-counter');
    if (togetherCounter) {
        togetherCounter.innerHTML = `
            <div style="font-size: 2.5em">${daysTogether}</div>
            <div style="font-size: 0.8em">дней вместе!</div>
        `;
    }

    // Обновляем счётчик до дня рождения
    updateBirthdayCounter();
}

// Счётчик до дня рождения
function updateBirthdayCounter() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const birthday = new Date(CONFIG.partnerBirthday);

    birthday.setFullYear(currentYear);
    if (birthday < now) birthday.setFullYear(currentYear + 1);

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

// Сохранение секретного сообщения
function saveMessage() {
    const messageInput = document.getElementById('secret-message');
    const message = messageInput.value.trim();
    if (!message) return alert('Напиши сообщение сначала!');

    const messages = JSON.parse(localStorage.getItem('loveMessages') || '[]');
    messages.push({
        text: message,
        date: new Date().toLocaleString('ru-RU'),
        from: CONFIG.yourName
    });

    localStorage.setItem('loveMessages', JSON.stringify(messages));
    messageInput.value = '';
    loadMessages();
    alert('Сообщение сохранено! 💌');
}

// Загрузка сохранённых сообщений
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('loveMessages') || '[]');
    const container = document.getElementById('saved-messages');

    if (!container) return;

    if (messages.length === 0) {
        container.innerHTML = '<p>Пока нет сообщений. Будь первым!</p>';
        return;
    }

    container.innerHTML = messages.map(msg => `
        <div class="memory">
            <p>${msg.text}</p>
            <small>От: ${msg.from} • ${msg.date}</small>
        </div>
    `).join('');
}

/* ===== Фоновые падающие сердечки ===== */
function createBackgroundHearts() {
    const container = document.createElement("div");
    container.className = "falling-hearts";
    document.body.appendChild(container);

    const colors = [
        "rgba(255, 255, 255, 0.49)",
        "rgba(226, 158, 168, 0.57)",
        "rgba(255, 105, 180, 0.52)",
        "rgba(255, 80, 121, 0.47)"
    ];

    for (let i = 0; i < 40; i++) {
        const heart = document.createElement("div");
        heart.className = "falling-heart";
        heart.innerHTML = "❤";

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (Math.random() * 18 + 10) + "px";
        heart.style.animationDuration = (Math.random() * 15 + 15) + "s";
        heart.style.animationDelay = Math.random() * 10 + "s";
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(heart);
    }
}

/* ===== Кастомный музыкальный плеер ===== */
const tracks = [
    { name: "1", src: "music/1.mp3" },
    { name: "2", src: "music/2.mp3" }
];

let currentTrack = 0;
const audio = document.getElementById("audio-player");

function loadTrack(index) {
    audio.src = tracks[index].src;
    document.getElementById("track-name").textContent = tracks[index].name;
}

function togglePlayer() {
    const player = document.getElementById("custom-player");
    if (player.style.display === "flex") {
        player.style.display = "none";
        audio.pause();
    } else {
        player.style.display = "flex";
        loadTrack(currentTrack);
    }
}

function togglePlay() {
    const btn = document.getElementById("play-btn");
    if (audio.paused) {
        audio.play();
        btn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audio.pause();
        btn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function nextTrack() {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
    audio.play();
    document.getElementById("play-btn").innerHTML = '<i class="fas fa-pause"></i>';
}

function prevTrack() {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrack);
    audio.play();
    document.getElementById("play-btn").innerHTML = '<i class="fas fa-pause"></i>';
}

audio.addEventListener("ended", nextTrack);
// ===== Плавающее сердечко-замочек =====
const lockHeart = document.getElementById('lock-heart');
const dateCalc = document.getElementById('date-calculator');
const display = document.getElementById('display');
const hintBox = document.getElementById('hint-box');
const messageDisplay = document.getElementById('message-display');
const celebrationOverlay = document.getElementById('celebration-overlay');
const celebrationText = document.getElementById('celebration-text');
const celebrationAudio = new Audio('music/1.mp3'); // музыка для праздника
let inputDate = '';

// Появление/скрытие панели калькулятора
lockHeart.addEventListener('click', () => {
    dateCalc.style.display = dateCalc.style.display === 'flex' ? 'none' : 'flex';
    inputDate = '';
    display.textContent = 'дд/мм/гггг';
    hintBox.style.display = 'none';
});

// Нажатие цифр
function pressDigit(digit) {
    if (inputDate.length >= 10) return; // Максимум "дд/мм/гггг"
    if (inputDate.length === 2 || inputDate.length === 5) inputDate += '/';
    inputDate += digit;
    display.textContent = inputDate;
}

// Показать/скрыть подсказку
function toggleHint() {
    hintBox.style.display = hintBox.style.display === 'block' ? 'none' : 'block';
}

// Вспомогательная функция для вывода сообщений в дисплей
function showMessage(msg, duration = 2000) {
    messageDisplay.textContent = msg;
    messageDisplay.style.display = 'block';
    setTimeout(() => {
        messageDisplay.style.display = 'none';
    }, duration);
}

// Подтверждение даты
function confirmDate() {
    if (inputDate === '01/03/2025') {
        // Правильная дата → запуск праздника
        inputDate = '';
        display.textContent = 'дд/мм/гггг';
        hintBox.style.display = 'none';
        dateCalc.style.display = 'none';
        startCelebration();
    } else {
        // Неправильная дата → вывод в message-display
        showMessage('Неверная дата. Попробуй ещё раз!');
        // Очищаем ввод
        inputDate = '';
        display.textContent = 'дд/мм/гггг';
    }
}


// Функция праздника
async function startCelebration() {
    // Настройка overlay и музыка
    celebrationOverlay.style.display = 'flex';
    celebrationOverlay.style.opacity = 0;
    celebrationText.style.opacity = 0;
    celebrationAudio.currentTime = 0;
    celebrationAudio.volume = 1;
    celebrationAudio.play();

    // Плавное появление overlay
    await fadeElement(celebrationOverlay, 0, 1, 2000); // 2 секунды

    const phrases = [
        "Привет моя булочка…",
        "Я очень сильно тебя люблю…",
        "Каждый день с тобой особенный…",
        "Я очень скучаю по тебе…",
        "Но ничего…",
        "Скоро мы снова будем вместе…",
        "С праздником тебя…",
        "Ты мое счастье…"
    ];

    for (let phrase of phrases) {
        celebrationText.textContent = phrase;
        // Ждём небольшой паузы, чтобы браузер завершил перерисовку
        await delay(50);
        // Плавное появление текста
        await fadeElement(celebrationText, 0, 1, 2000);
        // Текст виден 4 секунды
        await delay(2000);
        // Плавное исчезновение текста
        await fadeElement(celebrationText, 1, 0, 2000);

    }

    // Плавное исчезновение overlay и музыка
    await Promise.all([
        fadeElement(celebrationOverlay, 1, 0, 4000),
        fadeAudio(celebrationAudio, 1, 0, 4000)
    ]);

    celebrationOverlay.style.display = 'none';
    celebrationAudio.pause();
}

// Плавная анимация opacity через JS
function fadeElement(element, from, to, duration) {
    return new Promise(resolve => {
        const startTime = performance.now();
        function animate(time) {
            let elapsed = time - startTime;
            let progress = Math.min(elapsed / duration, 1);
            element.style.opacity = from + (to - from) * progress;
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                resolve();
            }
        }
        requestAnimationFrame(animate);
    });
}

// Плавное уменьшение громкости аудио
function fadeAudio(audio, from, to, duration) {
    return new Promise(resolve => {
        const startTime = performance.now();
        function animate(time) {
            let elapsed = time - startTime;
            let progress = Math.min(elapsed / duration, 1);
            audio.volume = from + (to - from) * progress;
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                resolve();
            }
        }
        requestAnimationFrame(animate);
    });
}

// Простая пауза
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}






