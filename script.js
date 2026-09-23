/**
 * Save the Date - Lançamento "Devedor Contumaz"
 * JavaScript Interativo (Scroll Fade Hero Full-Bleed, Form, Timer)
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 0. SCROLL FADE HERO FULL-BLEED EFFECT (Mobile Only) ---
    const fullBleedBg = document.getElementById('fullBleedBg');
    const heroFullImage = document.getElementById('heroFullImage');
    const heroFadeOverlay = document.getElementById('heroFadeOverlay');
    const scrollArrow = document.getElementById('scrollArrow');

    function handleScrollFade() {
        if (window.innerWidth >= 992) {
            // Em telas desktop/computador, manter a imagem do livro nítida e visível na coluna esquerda
            if (heroFullImage) {
                heroFullImage.style.transform = '';
                heroFullImage.style.opacity = '';
                heroFullImage.style.filter = '';
            }
            if (heroFadeOverlay) {
                heroFadeOverlay.style.opacity = '';
            }
            if (scrollArrow) {
                scrollArrow.style.opacity = '';
            }
            return;
        }

        const scrollY = window.scrollY || window.pageYOffset;
        // Distância de rolagem para esmaecer a imagem totalmente (420px)
        const fadeThreshold = 420;
        
        let progress = Math.min(scrollY / fadeThreshold, 1);

        if (heroFullImage) {
            // Esmaecer a opacidade da imagem e aplicar leve desfoque à medida que o conteúdo sobrepõe
            const scale = 1 + progress * 0.08;
            const blur = progress * 10;
            heroFullImage.style.transform = `scale(${scale})`;
            heroFullImage.style.opacity = (1 - progress * 0.95).toFixed(3);
            heroFullImage.style.filter = `drop-shadow(0 15px 30px rgba(45, 20, 35, ${0.15 * (1 - progress)})) blur(${blur}px)`;
        }

        if (heroFadeOverlay) {
            // Transição para o fundo claro (#f7f4f0)
            heroFadeOverlay.style.opacity = (0.3 + progress * 0.7).toFixed(3);
        }

        if (scrollArrow) {
            // A seta desaparece rapidamente assim que o usuário começa a rolar
            const arrowProgress = Math.min(scrollY / 120, 1);
            scrollArrow.style.opacity = (1 - arrowProgress).toFixed(2);
            scrollArrow.style.pointerEvents = arrowProgress > 0.8 ? 'none' : 'auto';
        }
    }

    if (scrollArrow) {
        scrollArrow.addEventListener('click', () => {
            window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' });
        });
    }

    window.addEventListener('scroll', handleScrollFade, { passive: true });
    window.addEventListener('resize', handleScrollFade, { passive: true });
    handleScrollFade(); // Execução inicial


    // --- 1. COUNTDOWN TIMER (22/10/2026 às 18:00h) ---
    const eventDate = new Date(2026, 9, 22, 18, 0, 0).getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const diff = eventDate - now;

        if (diff <= 0) {
            const container = document.getElementById('countdown');
            if (container) {
                container.innerHTML = `
                    <div style="color: var(--accent-gold); font-weight: 600; font-size: 1rem; width: 100%;">
                        🎉 É hoje! O lançamento está acontecendo.
                    </div>
                `;
            }
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);


    // --- 2. MÁSCARA AUTOMÁTICA DE WHATSAPP ---
    const whatsappInput = document.getElementById('whatsapp');

    if (whatsappInput) {
        whatsappInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);

            if (value.length === 11) {
                value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
            } else if (value.length > 6) {
                value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
            } else if (value.length > 2) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            } else if (value.length > 0) {
                value = `(${value}`;
            }

            e.target.value = value;
        });
    }


    // --- 3. VALIDAÇÃO E ENVIO DO FORMULÁRIO ---
    const rsvpForm = document.getElementById('rsvpForm');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');

    const formCard = document.getElementById('formCard');
    const successCard = document.getElementById('successCard');
    const userNameSpan = document.getElementById('userNameSpan');

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function showError(inputEl) {
        const fieldGroup = inputEl.closest('.field-group');
        if (fieldGroup) fieldGroup.classList.add('has-error');
    }

    function clearError(inputEl) {
        const fieldGroup = inputEl.closest('.field-group');
        if (fieldGroup) fieldGroup.classList.remove('has-error');
    }

    [nomeInput, whatsappInput, emailInput].forEach(input => {
        if (input) {
            input.addEventListener('input', () => clearError(input));
        }
    });

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Validar Nome
            const nomeVal = nomeInput.value.trim();
            if (nomeVal.length < 3) {
                showError(nomeInput);
                isValid = false;
            } else {
                clearError(nomeInput);
            }

            // Validar WhatsApp
            const phoneDigits = whatsappInput.value.replace(/\D/g, '');
            if (phoneDigits.length < 10) {
                showError(whatsappInput);
                isValid = false;
            } else {
                clearError(whatsappInput);
            }

            // Validar Email
            const emailVal = emailInput.value.trim();
            if (!validateEmail(emailVal)) {
                showError(emailInput);
                isValid = false;
            } else {
                clearError(emailInput);
            }

            if (isValid) {
                const submitBtn = document.getElementById('submitBtn');
                const originalBtnText = submitBtn ? submitBtn.innerHTML : 'CONFIRMAR MINHA PRESENÇA';
                
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> CONFIRMANDO...';
                }

                // Dados do Lead
                const leadData = {
                    nome: nomeVal,
                    whatsapp: whatsappInput.value,
                    email: emailVal,
                    origem: "Save The Date - Lançamento Devedor Contumaz",
                    dataCadastro: new Date().toISOString()
                };

                // Envio para o Webhook n8n
                const webhookUrl = 'https://n8n.srv1077266.hstgr.cloud/webhook/savethedate_livro';

                fetch(webhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(leadData)
                })
                .then(response => {
                    console.log('Webhook n8n resposta:', response.status);
                })
                .catch(err => {
                    console.warn('Erro ao enviar para o webhook (prosseguindo com confirmação):', err);
                })
                .finally(() => {
                    // Salvar backup local no localStorage
                    try {
                        const existing = JSON.parse(localStorage.getItem('devedor_contumaz_leads') || '[]');
                        existing.push(leadData);
                        localStorage.setItem('devedor_contumaz_leads', JSON.stringify(existing));
                    } catch (e) {
                        console.log('Backup local salvo');
                    }

                    // Atualizar tela de confirmação
                    const firstName = nomeVal.split(' ')[0];
                    if (userNameSpan) userNameSpan.textContent = firstName;

                    if (formCard) formCard.style.display = 'none';
                    if (successCard) successCard.classList.remove('hidden');

                    // Rolar suavemente até o cartão de confirmação
                    successCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

                    // Configurar botões de agenda e compartilhamento
                    setupCalendarAndShare(nomeVal);

                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                    }
                });
            }
        });
    }

    // Botão reset / cadastrar outro
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            rsvpForm.reset();
            if (successCard) successCard.classList.add('hidden');
            if (formCard) formCard.style.display = 'block';
        });
    }


    // --- 4. INTEGRATORES DE AGENDA E COMPARTILHAMENTO ---
    function setupCalendarAndShare(nome) {
        const title = encodeURIComponent("Lançamento do Livro 'Devedor Contumaz' - Filipe R. Carvalho");
        const details = encodeURIComponent("Lançamento do livro 'Devedor Contumaz: Análise, Planejamento e Estratégias de Defesa na Lei Complementar 225/2026' por Filipe R. Carvalho.");
        const location = encodeURIComponent("Auditório da ACIRP - R. Silva Jardim, 3099 - Centro, São José do Rio Preto - SP");
        
        // Google Calendar Link
        const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261022T210000Z/20261022T230000Z&details=${details}&location=${location}`;

        const addGcalBtn = document.getElementById('addGcalBtn');
        if (addGcalBtn) {
            addGcalBtn.onclick = () => window.open(gCalUrl, '_blank');
        }

        // iCal Download
        const addIcalBtn = document.getElementById('addIcalBtn');
        if (addIcalBtn) {
            addIcalBtn.onclick = () => {
                const icsContent = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Devedor Contumaz//PT
BEGIN:VEVENT
SUMMARY:Lançamento do Livro Devedor Contumaz - Filipe R. Carvalho
DESCRIPTION:Lançamento oficial do livro Devedor Contumaz.
LOCATION:Auditório da ACIRP - São José do Rio Preto - SP
DTSTART:20261022T210000Z
DTEND:20261022T230000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

                const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.setAttribute('download', 'Lançamento-Devedor-Contumaz.ics');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };
        }

        // WhatsApp Share Link
        const shareWspBtn = document.getElementById('shareWspBtn');
        if (shareWspBtn) {
            const shareText = encodeURIComponent(`Olá! Tudo bom?\n\nGostaria de te convidar para o lançamento do livro *Devedor Contumaz* escrito pelo *Dr. Filipe R. Carvalho*.\n\nSerá uma noite de confraternização e autógrafos, e sua participação é imprescindível.\n\n📅 Data: 22/10/2026 às 18h\n📍 Local: Auditório da ACIRP \n\nConfirme sua presença em: \n\nconvite.advocaciafilipecarvalho.com.br`);
            shareWspBtn.href = `https://api.whatsapp.com/send?text=${shareText}`;
        }
    }

});
