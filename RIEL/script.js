document.addEventListener('DOMContentLoaded', () => {

  // const link = document.createElement('link');
  // link.rel = 'stylesheet';
  // // link.href = 'https://example.com/styles.css'; // путь к твоему CSS
  // link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css'; 
  // link.type = 'text/css';
  // document.head.appendChild(link);

  const style = document.createElement('style');
  style.innerText = `html:not(.gsap-not-found) [data-prevent-flicker='true'] { visibility: hidden; }
  .line-mask, .word-mask, .char-mask { padding-block: 0.1em; margin-block: -0.1em; }`;

  const noscript = document.createElement('noscript');
  noscript.innerText = `<style>[data-prevent-flicker='true'] { visibility: visible !important; }</style>`;

  document.head.appendChild(style);
  document.head.appendChild(noscript);

  if (typeof window.gsap === "undefined") document.documentElement.classList.add("gsap-not-found");

  document.fonts.ready.then(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Animation 1
    document.querySelectorAll("[data-word-reveal='true']").forEach((text) => {
      const split = SplitText.create(text, {
        type: "words, chars",
        mask: "words",
        wordsClass: "word",
        charsClass: "char",
      });

      console.log(split);

      if (split.words.length) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: text,
            start: "top bottom",
            end: "top 80%",
            toggleActions: "none play none reset",
          },
        });
      
        tl.from(split.words, {
          yPercent: 110,
          delay: 0.2,
          duration: 0.8,
          stagger: { amount: 0.5 },
        });
      }

      gsap.set(text, { visibility: "visible" });
    });

    // Animation 4
    const pinnedHero = document.querySelector('.hero');
    if (pinnedHero) {
      ScrollTrigger.create({
        trigger: pinnedHero,
        start: () => pinnedHero.offsetHeight < window.innerHeight ? "top top" : "bottom bottom", // if it's shorter than the viewport, we prefer to pin it at the top
        pin: true, 
        pinSpacing: false,
        markers: true,
      });
    }

    // Animation 5
    // const sectPinCards = document.querySelector('.section-pined-cards');
    // if (sectPinCards) {
    //   const tlStackCards = gsap.timeline({
    //     scrollTrigger: {
    //       trigger: sectPinCards,
    //       end: 'bottom bottom',
    //       scrub: 0.3,
    //       toggleActions: 'restart none reverse',
    //     },
    //   });
    
    //   tlStackCards.from('.card-item', {
    //     opacity: 0.8,
    //     yPercent: 350,  // Adjusted for a more pronounced vertical movement
    //     scale: 1.1,  // Start from scale 0 to scale 1 for a scaling effect
    //     duration: 1.2,
    //     stagger: { each: 0.5, from: 'end' },  // Adjusted stagger for a quicker succession
    //   });
    // }
    const sectPinCards = document.querySelector('.section-pined-cards');
    if (sectPinCards) {
      const cards = gsap.utils.toArray('.card-item');

      // Reverse порядок для правильной стопки
      cards.reverse();

      gsap.timeline({
        scrollTrigger: {
          trigger: sectPinCards,
          start: 'top top',
          end: `+=${cards.length * 200}`, // Длина анимации зависит от количества карточек
          scrub: true,
          pin: true,
          markers: true, // временно
        }
      }).to(cards, {
        yPercent: 350,
        scale: 1.1,
        duration: 1.2,
        stagger: { each: 0.5, from: 'end' },
      });
    }

  });
});