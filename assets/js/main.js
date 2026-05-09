/* ============================================================
   FIRMA — Landing Page Scripts
   ============================================================ */

(function () {
  'use strict';

  // ==========================================================
  // 1. GSAP ANIMATIONS
  // ==========================================================

  gsap.registerPlugin(ScrollTrigger);

  // ---------- Loader & Hero Entry ----------
  var initTl = gsap.timeline();

  initTl
    .to('.loader-logo', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
      delay: 0.5,
    })
    .to('.loader-line', {
      width: '200px',
      duration: 0.8,
      ease: 'power2.inOut',
    })
    .to('#loader', {
      opacity: 0,
      duration: 0.8,
      display: 'none',
      ease: 'power2.inOut',
      delay: 0.5,
    })
    .to('#heroImage', {
      clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
      duration: 1.5,
      ease: 'power4.out',
    })
    .to(
      '#heroText',
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.8'
    );

  // ---------- Scroll Reveals ----------
  var revealElements = document.querySelectorAll('.gs-reveal');

  revealElements.forEach(function (elem) {
    var img = elem.querySelector('img');
    var text = elem.querySelector('.split-text');

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: elem,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    if (text) {
      tl.fromTo(
        text,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
    }

    if (img) {
      tl.fromTo(
        img,
        { scale: 0.9, opacity: 0, x: 30 },
        { scale: 1, opacity: 1, x: 0, duration: 1.2, ease: 'power2.out' },
        '-=0.6'
      );
    }
  });

  // ---------- Hero Parallax ----------
  gsap.to('#heroImage img', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  

  // ==========================================================
  // 3. FIRA MINI ROBOT — Eye Tracking
  // ==========================================================

  var bot = document.getElementById('firaBot');
  if (!bot) return;

  var pupilLeft = document.getElementById('firaPupilL');
  var pupilRight = document.getElementById('firaPupilR');
  var botBody = document.querySelector('.fira-bot__body');

  var MAX_PUPIL = 4;
  var MAX_TILT = 6;

  var mouseX = 0;
  var mouseY = 0;
  var rafScheduled = false;

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!rafScheduled) {
      rafScheduled = true;
      requestAnimationFrame(updateRobot);
    }
  });

  function updateRobot() {
    rafScheduled = false;

    var rect = bot.getBoundingClientRect();
    var botCenterX = rect.left + rect.width / 2;
    var botCenterY = rect.top + rect.height * 0.35;

    var dx = mouseX - botCenterX;
    var dy = mouseY - botCenterY;
    var dist = Math.sqrt(dx * dx + dy * dy);

    var factor = Math.min(dist / 300, 1);
    var px = (dx / (dist || 1)) * MAX_PUPIL * factor;
    var py = (dy / (dist || 1)) * MAX_PUPIL * factor;

    py = Math.max(-MAX_PUPIL * 0.7, Math.min(MAX_PUPIL * 0.7, py));

    if (pupilLeft) pupilLeft.setAttribute('transform', 'translate(' + px + ',' + py + ')');
    if (pupilRight) pupilRight.setAttribute('transform', 'translate(' + px + ',' + py + ')');

    if (botBody) {
      var tilt = (dx / (dist || 1)) * MAX_TILT * factor;
      botBody.style.transform = 'rotate(' + tilt + 'deg)';
    }
  }

  // ==========================================================
  // 4. FIRA CONTEXTUAL COMMENTS (Speech Bubble)
  // ==========================================================

  var speechBubble = document.getElementById('firaSpeech');
  var speechText = document.getElementById('firaSpeechText');
  if (!speechBubble || !speechText) return;

  // Section-to-message mapping
  var sectionMessages = {
    heroSection: 'Bem-vindo ao FIRMA! Esse é o carro que vai redefinir o que você entende por compacto. Prepare-se.',
    section360: 'Arraste para girar o carro em 360°! Cada ângulo conta uma história diferente.',
    sectionLateral: 'Olha essa silhueta... 2,60m de pura proporção áurea. A aerodinâmica aqui virou arte.',
    sectionFrontal: 'O olhar do FIRMA é inconfundível. Esses faróis não foram desenhados, foram esculpidos.',
    sectionAereo: 'Vista de cima, a simetria é milimétrica. Cada vinco tem um propósito.',
    sectionFira: 'Ei, essa sou eu! FIRA, sua copiloto holográfica. Prazer em conhecê-lo. 😊',
    sectionCrest: 'O brasão da FIRMA: coragem, precisão e essência. Nada de ornamento vazio.',
    siteFooter: 'Rien que l\'essentiel. Tout l\'impossible. Obrigada por explorar o FIRMA comigo!'
  };

  var currentSection = null;
  var typingTimer = null;

  // Typing effect
  function typeText(text, callback) {
    if (typingTimer) clearInterval(typingTimer);
    speechText.innerHTML = '';
    var i = 0;
    var cursor = document.createElement('span');
    cursor.className = 'fira-speech__cursor';
    speechText.appendChild(cursor);

    typingTimer = setInterval(function () {
      if (i < text.length) {
        // Insert character before cursor
        speechText.insertBefore(document.createTextNode(text[i]), cursor);
        i++;
      } else {
        clearInterval(typingTimer);
        typingTimer = null;
        // Remove cursor after typing
        setTimeout(function () {
          if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
        }, 2000);
        if (callback) callback();
      }
    }, 30);
  }

  function showSpeech(sectionId) {
    if (currentSection === sectionId) return;
    currentSection = sectionId;

    var message = sectionMessages[sectionId];
    if (!message) {
      speechBubble.classList.remove('active');
      return;
    }

    // Brief hide then show with new text
    speechBubble.classList.remove('active');
    setTimeout(function () {
      typeText(message);
      speechBubble.classList.add('active');
    }, 300);
  }

  // Create ScrollTriggers for each section
  var sectionIds = Object.keys(sectionMessages);
  sectionIds.forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;

    ScrollTrigger.create({
      trigger: el,
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: function () { showSpeech(id); },
      onEnterBack: function () { showSpeech(id); },
    });
  });

  // Show initial message after loader
  initTl.eventCallback('onComplete', function () {
    setTimeout(function () {
      showSpeech('heroSection');
    }, 800);
  });

})();
