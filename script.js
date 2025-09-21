// Memeternum - JavaScript Principal

document.addEventListener('DOMContentLoaded', function() {
    // Navegação suave
    initSmoothScrolling();
    
    // Menu mobile
    initMobileMenu();
    
    // Contador de visitantes (simulado)
    initVisitorCounter();
    
    // Efeitos de scroll
    initScrollEffects();
});

// Navegação suave entre seções
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Atualizar link ativo
                updateActiveNavLink(this);
            }
        });
    });
}

// Atualizar link ativo na navegação
function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Menu mobile
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-active');
            this.classList.toggle('active');
        });
    }
}

// Contador de visitantes (simulado - em produção seria conectado a um backend)
function initVisitorCounter() {
    const counterElement = document.getElementById('visitor-count');
    
    if (counterElement) {
        // Simular incremento do contador
        let currentCount = parseInt(counterElement.textContent.replace(/,/g, ''));
        
        // Incrementar baseado em localStorage para simular persistência
        const lastVisit = localStorage.getItem('memeternum-last-visit');
        const today = new Date().toDateString();
        
        if (lastVisit !== today) {
            currentCount += Math.floor(Math.random() * 5) + 1; // Incremento aleatório de 1-5
            localStorage.setItem('memeternum-last-visit', today);
        }
        
        // Animar contador
        animateCounter(counterElement, currentCount);
    }
}

// Animar contador de visitantes
function animateCounter(element, targetValue) {
    const startValue = parseInt(element.textContent.replace(/,/g, ''));
    const duration = 2000; // 2 segundos
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
        element.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Efeitos de scroll
function initScrollEffects() {
    // Parallax sutil no hero
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Fade in elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos que devem aparecer com scroll
    document.querySelectorAll('.support-section, .poem-container').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Função para mostrar notificações (será útil para comentários e outras interações)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos inline para a notificação
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '5px',
        color: 'white',
        fontWeight: '600',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        backgroundColor: type === 'success' ? '#27ae60' : 
                        type === 'error' ? '#e74c3c' : 
                        type === 'warning' ? '#f39c12' : '#3498db'
    });
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Função para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para formatar números (útil para contadores)
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Debounce function para otimizar eventos de scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


// Funcionalidades adicionais para as novas seções

// Inicializar funcionalidades específicas das seções
document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidades já existentes...
    
    // Novas funcionalidades
    initContactForm();
    initBlogPosts();
    initBookCards();
    initDonationButton();
});

// Formulário de contato
function initContactForm() {
    const contactForm = document.querySelector('.message-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coletar dados do formulário
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Validar dados
            if (!validateContactForm(data)) {
                return;
            }
            
            // Simular envio (em produção, conectaria com um backend)
            simulateFormSubmission(data);
        });
    }
}

// Validar formulário de contato
function validateContactForm(data) {
    if (!data.name.trim()) {
        showNotification('Por favor, informe seu nome.', 'error');
        return false;
    }
    
    if (!isValidEmail(data.email)) {
        showNotification('Por favor, informe um email válido.', 'error');
        return false;
    }
    
    if (!data.subject) {
        showNotification('Por favor, selecione um assunto.', 'error');
        return false;
    }
    
    if (!data.message.trim()) {
        showNotification('Por favor, escreva uma mensagem.', 'error');
        return false;
    }
    
    return true;
}

// Simular envio do formulário
function simulateFormSubmission(data) {
    // Mostrar loading
    const submitButton = document.querySelector('.message-form button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    // Simular delay de envio
    setTimeout(() => {
        // Resetar botão
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Limpar formulário
        document.querySelector('.message-form').reset();
        
        // Mostrar sucesso
        showNotification('Mensagem enviada com sucesso! Retornarei em breve.', 'success');
        
        // Em produção, aqui seria feita a integração com um serviço de email
        console.log('Dados do formulário:', data);
    }, 2000);
}

// Interatividade dos posts do blog
function initBlogPosts() {
    const blogPosts = document.querySelectorAll('.blog-post');
    
    blogPosts.forEach(post => {
        post.addEventListener('click', function() {
            // Simular abertura do post completo
            const title = this.querySelector('.post-title').textContent;
            showNotification(`Abrindo: "${title}"`, 'info');
            
            // Em produção, aqui redirecionaria para a página completa do post
            console.log('Clicou no post:', title);
        });
    });
    
    // Botão "Ver Todos os Posts"
    const viewAllButton = document.querySelector('.blog-actions .btn-secondary');
    if (viewAllButton) {
        viewAllButton.addEventListener('click', function() {
            showNotification('Carregando todos os posts...', 'info');
            // Em produção, carregaria mais posts ou redirecionaria para página de blog
        });
    }
}

// Interatividade dos cards de livros
function initBookCards() {
    const bookCards = document.querySelectorAll('.book-card');
    
    bookCards.forEach(card => {
        // Efeito hover mais elaborado
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Click no card (exceto no botão)
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('book-btn') && !e.target.closest('.book-btn')) {
                const title = this.querySelector('.book-title').textContent;
                const isUpcoming = this.classList.contains('upcoming');
                
                if (isUpcoming) {
                    showNotification('Este livro ainda está em desenvolvimento!', 'info');
                } else {
                    showNotification(`Visualizando detalhes de "${title}"`, 'info');
                }
            }
        });
    });
}

// Botão de doação
function initDonationButton() {
    const donateButton = document.querySelector('.btn-donate');
    
    if (donateButton) {
        donateButton.addEventListener('click', function() {
            // Simular abertura de sistema de doação
            showNotification('Redirecionando para sistema de doação...', 'info');
            
            // Em produção, aqui abriria o sistema de pagamento (PIX, PayPal, etc.)
            setTimeout(() => {
                showNotification('Sistema de doação em desenvolvimento. Use o QR Code ou entre em contato!', 'warning');
            }, 1500);
        });
    }
}

// Função para animar números (útil para estatísticas)
function animateNumber(element, targetValue, duration = 2000) {
    const startValue = 0;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Função para lazy loading de imagens (quando adicionarmos capas reais)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Função para compartilhamento social (futura implementação)
function shareContent(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        }).catch(console.error);
    } else {
        // Fallback para navegadores sem Web Share API
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Link copiado para a área de transferência!', 'success');
        }).catch(() => {
            showNotification('Não foi possível copiar o link.', 'error');
        });
    }
}

// Função para modo escuro/claro (futura implementação)
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('light-theme');
    
    if (isDark) {
        body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    }
}

// Carregar tema salvo
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
}

// Função para busca no blog (futura implementação)
function initBlogSearch() {
    const searchInput = document.querySelector('#blog-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function(e) {
            const query = e.target.value.toLowerCase();
            const posts = document.querySelectorAll('.blog-post');
            
            posts.forEach(post => {
                const title = post.querySelector('.post-title').textContent.toLowerCase();
                const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
                
                if (title.includes(query) || excerpt.includes(query)) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        }, 300));
    }
}

// Função para comentários (futura implementação com backend)
function initComments() {
    // Placeholder para sistema de comentários
    console.log('Sistema de comentários será implementado com backend');
}

// Função para analytics simples (contagem de cliques)
function trackEvent(eventName, data = {}) {
    // Simular tracking de eventos
    console.log('Event tracked:', eventName, data);
    
    // Em produção, enviaria para Google Analytics ou similar
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, data);
    }
}

// Adicionar tracking aos links importantes
document.addEventListener('DOMContentLoaded', function() {
    // Track cliques nos livros
    document.querySelectorAll('.book-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const bookTitle = this.closest('.book-card').querySelector('.book-title').textContent;
            trackEvent('book_click', { book_title: bookTitle });
        });
    });
    
    // Track cliques nos contatos
    document.querySelectorAll('.contact-method').forEach(method => {
        method.addEventListener('click', function() {
            const methodType = this.querySelector('.method-label').textContent;
            trackEvent('contact_click', { method: methodType });
        });
    });
});
