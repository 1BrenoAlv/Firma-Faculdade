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
  const initTl = gsap.timeline();

  // Fade da logo inicial
  initTl
    .to('.loader-logo', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
      delay: 0.5,
    })
    // Linha expande
    .to('.loader-line', {
      width: '200px',
      duration: 0.8,
      ease: 'power2.inOut',
    })
    // Loader some
    .to('#loader', {
      opacity: 0,
      duration: 0.8,
      display: 'none',
      ease: 'power2.inOut',
      delay: 0.5,
    })
    // Carro (Traseira) emerge — clip-path opening
    .to('#heroImage', {
      clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
      duration: 1.5,
      ease: 'power4.out',
    })
    // Textos principais sobem
    .to(
      '#heroText',
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.8'
    );

  // ---------- Scroll Reveals ----------
  const revealElements = document.querySelectorAll('.gs-reveal');

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
  // 2. FIRA MINI ROBOT — Eye Tracking
  // ==========================================================

  var bot = document.getElementById('firaBot');
  if (!bot) return;

  var pupilLeft = document.getElementById('firaPupilL');
  var pupilRight = document.getElementById('firaPupilR');
  var botBody = document.querySelector('.fira-bot__body');

  // Maximum pupil displacement in px (inside the eye socket)
  var MAX_PUPIL = 4;
  // Maximum body tilt in degrees
  var MAX_TILT = 6;

  // Throttle helper for mousemove (requestAnimationFrame)
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

    // Get the center of the robot in viewport coordinates
    var rect = bot.getBoundingClientRect();
    var botCenterX = rect.left + rect.width / 2;
    var botCenterY = rect.top + rect.height * 0.35; // eyes are in upper third

    // Direction from robot to cursor
    var dx = mouseX - botCenterX;
    var dy = mouseY - botCenterY;
    var dist = Math.sqrt(dx * dx + dy * dy);

    // Normalised direction (clamped to MAX_PUPIL)
    var factor = Math.min(dist / 300, 1); // smooth ramp
    var px = (dx / (dist || 1)) * MAX_PUPIL * factor;
    var py = (dy / (dist || 1)) * MAX_PUPIL * factor;

    // Clamp vertically a bit less (eyes look more natural)
    py = Math.max(-MAX_PUPIL * 0.7, Math.min(MAX_PUPIL * 0.7, py));

    if (pupilLeft) pupilLeft.setAttribute('transform', 'translate(' + px + ',' + py + ')');
    if (pupilRight) pupilRight.setAttribute('transform', 'translate(' + px + ',' + py + ')');

    // Body tilt toward cursor
    if (botBody) {
      var tilt = (dx / (dist || 1)) * MAX_TILT * factor;
      botBody.style.transform = 'rotate(' + tilt + 'deg)';
    }
  }
})();
