document.addEventListener('DOMContentLoaded', () => {

  // const link = document.createElement('link');
  // link.rel = 'stylesheet';
  // // link.href = 'https://example.com/styles.css'; // путь к твоему CSS
  // link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css'; 
  // link.type = 'text/css';
  // document.head.appendChild(link);

  const style = document.createElement('style');
  style.innerText = `html:not(.gsap-not-found) [data-prevent-flicker='true'] { visibility: hidden; }
  .line-mask, .word-mask, .char-mask { padding-block: 0.1em; margin-block: -0.1em; }
  /* arrow animation */
  .absolute {
    position: absolute;
    left: 0;
    top: 0;
  }
  .arrow-hover-anim {
    display: flex;
    height: 12px;
    color: black;
    position: relative;
  }
  .arrow-hover-anim svg:nth-child(2) g line:nth-child(3) {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    transition: stroke-dashoffset 0.4s ease, opacity 0.4s ease;
  }

  .arrow-hover-anim svg:nth-child(2) g line {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    transition: stroke-dashoffset 0.4s 0.4s ease, opacity 0.4s 0.4s ease;
  }

  .arrow-hover-anim:hover svg:nth-child(1) g line {
    transition: opacity 0.3s ease;
  }

  .arrow-hover-anim:hover svg:nth-child(1) g line {
    opacity: 0;
  }

  .arrow-hover-anim:hover svg:nth-child(2) g line {
    stroke-dashoffset: 0;
  }
  `;

  const noscript = document.createElement('noscript');
  noscript.innerText = `<style>[data-prevent-flicker='true'] { visibility: visible !important; }</style>`;

  document.head.appendChild(style);
  document.head.appendChild(noscript);

  // arrow animation
  const arrowAnimHoverBlock = document.querySelector('.arrow-anim-hover');
  const arrow = `<svg aria-hidden="true" width="35" height="12" style="opacity: 1;">
    <g transform="translate(0 .6)" stroke="currentColor" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
      <line pathLength="1" stroke-dasharray="1" x1="34.5" y1="4.9" x2="29.7"></line>
      <line pathLength="1" stroke-dasharray="1" x1="34.5" y1="4.9" x2="29.7" y2="10"></line>
      <line pathLength="1" stroke-dasharray="1" x1=".5" y1="4.9" x2="34.5" y2="4.9"></line>
    </g>
  </svg>

  <svg aria-hidden="true" class="absolute" width="35" height="12">
    <g transform="translate(0 .6)" stroke="currentColor" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
      <line pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" x1="34.5" y1="4.9" x2="29.7"></line>
      <line pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" x1="34.5" y1="4.9" x2="29.7" y2="10"></line>
      <line pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" x1=".5" y1="4.9" x2="34.5" y2="4.9"></line>
    </g>
  </svg>`;
  arrowAnimHoverBlock.innerHTML = arrow;

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
    //       start: 'top top',
    //       end: 'bottom bottom',
    //       scrub: 0.3,
    //       pin: true,
    //       pinSpacing: true,
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

  });
});