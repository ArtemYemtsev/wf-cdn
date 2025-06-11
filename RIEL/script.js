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
	gsap.registerPlugin(ScrollTrigger, SplitText);

  document.querySelectorAll("[data-word-reveal='true']").forEach((text) => {
    const split = SplitText.create(text.children, {
      type: "words, chars",
      mask: "words",
      wordsClass: "word",
      charsClass: "char",
    });

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

    gsap.set(text, { visibility: "visible" });
  });
});