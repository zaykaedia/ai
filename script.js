// Данные криптовалют
const cryptoData = [
    {
        name: 'Bitcoin',
        symbol: 'BTC',
        price: 45230,
        change24h: 5.2,
        marketCap: '890 млрд'
    },
    {
        name: 'Ethereum',
        symbol: 'ETH',
        price: 2580,
        change24h: 3.8,
        marketCap: '310 млрд'
    },
    {
        name: 'Ripple',
        symbol: 'XRP',
        price: 0.52,
        change24h: 2.1,
        marketCap: '28 млрд'
    },
    {
        name: 'Litecoin',
        symbol: 'LTC',
        price: 185.45,
        change24h: -1.5,
        marketCap: '14 млрд'
    },
    {
        name: 'Cardano',
        symbol: 'ADA',
        price: 0.95,
        change24h: 4.2,
        marketCap: '34 млрд'
    },
    {
        name: 'Solana',
        symbol: 'SOL',
        price: 142.30,
        change24h: 6.8,
        marketCap: '62 млрд'
    }
];

// Новости блога
const blogPosts = [
    {
        title: 'Биткоин достиг новых высот в 2026 году',
        excerpt: 'Криптовалюта номер один продолжает преодолевать исторические рекорды...',
        date: '23.05.2026',
        emoji: '📈',
        tag: 'Новости'
    },
    {
        title: 'Будущее блокчейна: Web3 и децентрализация',
        excerpt: 'Эксперты обсуждают роль блокчейна в будущем интернета...',
        date: '22.05.2026',
        emoji: '🔗',
        tag: 'Технология'
    },
    {
        title: 'Как выбрать криптовалютный кошелек?',
        excerpt: 'Полное руководство по выбору безопасного хранилища для ваших активов...',
        date: '21.05.2026',
        emoji: '🔐',
        tag: 'Гайд'
    },
    {
        title: 'Стейкинг Ethereum: заработок на NFT',
        excerpt: 'Узнайте как зарабатывать пассивный доход через стейкинг...',
        date: '20.05.2026',
        emoji: '⭐',
        tag: 'Заработок'
    },
    {
        title: 'Регуляция криптовалют в 2026',
        excerpt: 'Анализ новых законодательных инициатив в разных странах...',
        date: '19.05.2026',
        emoji: '⚖️',
        tag: 'Новости'
    },
    {
        title: 'NFT рынок: тренды и перспективы',
        excerpt: 'Изучаем развитие рынка цифровых активов и коллекционирования...',
        date: '18.05.2026',
        emoji: '🎨',
        tag: 'Тренды'
    }
];

// Портфель пользователя
let userPortfolio = [];
let currentCurrency = 'USD';

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    loadRates();
    loadBlog();
    setupMobileMenu();
    setupProfileModal();
});

// Загрузка курсов криптовалют
function loadRates() {
    const tableBody = document.getElementById('ratesTableBody');
    tableBody.innerHTML = '';

    cryptoData.forEach(crypto => {
        const row = document.createElement('tr');
        const changeClass = crypto.change24h >= 0 ? 'positive' : 'negative';
        const changeSymbol = crypto.change24h >= 0 ? '↑' : '↓';
        
        let priceDisplay = crypto.price;
        if (currentCurrency === 'EUR') {
            priceDisplay = (crypto.price * 0.92).toFixed(2);
        } else if (currentCurrency === 'RUB') {
            priceDisplay = (crypto.price * 92).toFixed(2);
        }

        row.innerHTML = `
            <td><strong>${crypto.name}</strong></td>
            <td>${crypto.symbol}</td>
            <td>${currentCurrency} ${priceDisplay.toLocaleString()}</td>
            <td class="${changeClass}">${changeSymbol} ${crypto.change24h}%</td>
            <td>${crypto.marketCap}</td>
            <td>
                <button class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem;" onclick="addToPortfolio('${crypto.name}', '${crypto.symbol}', ${crypto.price})">Добавить</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Загрузка блога
function loadBlog() {
    const blogGrid = document.getElementById('blogGrid');
    blogGrid.innerHTML = '';

    blogPosts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'blog-card';
        card.innerHTML = `
            <div class="blog-image">${post.emoji}</div>
            <div class="blog-content">
                <div class="blog-date">${post.date}</div>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <span class="blog-tag">${post.tag}</span>
            </div>
        `;
        card.onclick = () => showBlogDetail(post);
        blogGrid.appendChild(card);
    });
}

// Поиск криптовалют
document.getElementById('searchInput')?.addEventListener('keyup', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#ratesTableBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});

// Смена валюты
document.getElementById('currencySelect')?.addEventListener('change', function(e) {
    currentCurrency = e.target.value;
    loadRates();
});

// Обновление курсов
function refreshRates() {
    // Имитация обновления данных
    cryptoData.forEach(crypto => {
        const change = (Math.random() - 0.5) * 10;
        crypto.change24h = (crypto.change24h + change).toFixed(2);
        crypto.price = (crypto.price * (1 + change / 1000)).toFixed(2);
    });
    loadRates();
    showNotification('Курсы обновлены!', 'success');
}

// Модальное окно личного кабинета
function setupProfileModal() {
    const modal = document.getElementById('profileModal');
    const loginBtn = document.querySelector('.btn-login');

    if (loginBtn) {
        loginBtn.onclick = function(e) {
            e.preventDefault();
            modal.classList.add('show');
        };
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    };
}

// Закрыть модальное окно
function closeProfile() {
    document.getElementById('profileModal').classList.remove('show');
}

// Переключение вкладок
function switchTab(tabName) {
    // Скрыть все вкладки
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));

    // Удалить активный класс со всех кнопок
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));

    // Показать выбранную вкладку и активировать кнопку
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Найти и активировать соответствующую кнопку
    event.target.classList.add('active');
}

// Обработка входа
function handleLogin(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    showNotification(`Добро пожаловать, ${email}!`, 'success');
    closeProfile();
}

// Обработка регистрации
function handleRegister(event) {
    event.preventDefault();
    const name = event.target.querySelector('input[type="text"]').value;
    showNotification(`Добро пожаловать, ${name}! Аккаунт создан.`, 'success');
    closeProfile();
}

// Добавление активов в портфель
function addAsset(event) {
    event.preventDefault();
    const assetSelect = document.getElementById('assetSelect').value;
    const assetAmount = document.getElementById('assetAmount').value;

    if (assetSelect && assetAmount) {
        userPortfolio.push({
            name: assetSelect,
            amount: assetAmount,
            date: new Date().toLocaleDateString('ru-RU')
        });

        updatePortfolioDisplay();
        showNotification(`${assetAmount} ${assetSelect} добавлено в портфель!`, 'success');
        event.target.reset();
    }
}

// Добавление к портфелю (из таблицы)
function addToPortfolio(name, symbol, price) {
    const amount = prompt(`Введите количество ${symbol}:`);
    if (amount && !isNaN(amount) && amount > 0) {
        userPortfolio.push({
            name: name,
            symbol: symbol,
            amount: amount,
            price: price,
            date: new Date().toLocaleDateString('ru-RU')
        });
        showNotification(`${amount} ${symbol} добавлено в портфель!`, 'success');
        updatePortfolioDisplay();
    }
}

// Обновление отображения портфеля
function updatePortfolioDisplay() {
    const portfolioContent = document.getElementById('portfolioContent');
    
    if (userPortfolio.length === 0) {
        portfolioContent.innerHTML = '<p>Ваш портфель пуст. Начните добавлять активы!</p>';
        return;
    }

    let total = 0;
    let html = '<table style="width: 100%; border-collapse: collapse;">';
    html += '<tr style="border-bottom: 1px solid var(--border-color);"><th>Активы</th><th>Количество</th><th>Дата</th><th>Действие</th></tr>';

    userPortfolio.forEach((asset, index) => {
        const value = (asset.amount * asset.price).toFixed(2);
        total += parseFloat(value);
        html += `
            <tr style="border-bottom: 1px solid var(--border-color);">
                <td>${asset.name} (${asset.symbol})</td>
                <td>${asset.amount}</td>
                <td>${asset.date}</td>
                <td><button class="btn btn-secondary" style="padding: 0.3rem 0.7rem; font-size: 0.8rem;" onclick="removeAsset(${index})">Удалить</button></td>
            </tr>
        `;
    });

    html += '</table>';
    html += `<div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color);"><strong>Общая стоимость: ${currentCurrency} ${total.toLocaleString()}</strong></div>`;
    
    portfolioContent.innerHTML = html;
}

// Удаление активов из портфеля
function removeAsset(index) {
    userPortfolio.splice(index, 1);
    updatePortfolioDisplay();
    showNotification('Актив удален из портфеля', 'success');
}

// Показ деталей блога
function showBlogDetail(post) {
    alert(`${post.title}\n\n${post.excerpt}\n\nДата: ${post.date}`);
}

// Обработка отправки контактной формы
function handleContactSubmit(event) {
    event.preventDefault();
    showNotification('Спасибо за сообщение! Мы свяжемся с вами в ближайшее время.', 'success');
    event.target.reset();
}

// Мобильное меню
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Закрыть меню при клике на ссылку
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
}

// Уведомления
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'var(--success-color)' : 'var(--primary-color)'};
        color: white;
        border-radius: 10px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Анимация для уведомлений
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; transform: translateX(400px); }
    }
`;
document.head.appendChild(style);

// Плавная прокрутка при клике на ссылки
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
