// particles.js config
particlesJS("particles-js", {
  particles: {
    number: { value: 50 },
    size: { value: 3 },
    color: { value: "#00ffff" },
    line_linked: { enable: true, color: "#00ffff" },
    move: { speed: 2 },
  },
  interactivity: {
    events: {
      onhover: { enable: true, mode: "repulse" },
    },
  },
});

// Language toggle
function setLang(lang) {
  document.querySelectorAll(`[data-${lang}]`).forEach((el) => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });
}

// Visit counter
const counterElement = document.getElementById("counter");

fetch("counter.php")
  .then((response) => response.json())
  .then((data) => {
    counterElement.textContent = data.count;
  })
  .catch((error) => {
    console.error("Error fetching counter:", error);
    counterElement.textContent = "error";
  });

// Scroll duplication behavior
document.addEventListener("DOMContentLoaded", function () {
  const originals = [];
  document.querySelectorAll("#scroll-loop > li").forEach((li) => {
    originals.push(li.cloneNode(true));
  });
  const container = document.getElementById("scroll-container");
  const ul = document.getElementById("scroll-loop");

  let currentIndex = 5;
  let reverseIndex = 5;

container.addEventListener("scroll", function () {
  const maxScroll = container.scrollHeight - container.clientHeight;
  const currentScroll = container.scrollTop;
  const buffer = 300;

  // Scroll DOWN
if (currentScroll + buffer >= maxScroll) {
  const insertIndex = currentIndex % originals.length;
  const li = originals[insertIndex];
  const newLi = li.cloneNode(true);
  newLi.classList.add("animated-section", "visible", "fade-in");

  const prevScrollHeight = container.scrollHeight;

  ul.appendChild(newLi);
  currentIndex++;

  if (ul.children.length > 5) {
    const prevScrollHeight = container.scrollHeight;
    const prevScrollTop = container.scrollTop;

    ul.removeChild(ul.firstChild);

    const newScrollHeight = container.scrollHeight;
    const deltaHeight = newScrollHeight - prevScrollHeight;

    // Compensate scroll to prevent visual jump
    container.scrollTop = prevScrollTop + deltaHeight;
  }
}



  // Scroll UP: add to top
  if (currentScroll <= buffer) {
    const insertIndex =
      (originals.length - 1 - (reverseIndex % originals.length) + originals.length) %
      originals.length;
    const firstLi = originals[insertIndex].cloneNode(true);
    firstLi.classList.add("animated-section", "visible", "fade-in");

    const prevScrollHeight = container.scrollHeight;
    const prevScrollTop = container.scrollTop;

    ul.insertBefore(firstLi, ul.firstChild);

    const newScrollHeight = container.scrollHeight;
    const deltaHeight = newScrollHeight - prevScrollHeight;
    container.scrollTop = prevScrollTop + deltaHeight;

    if (ul.children.length > 1) {
      ul.removeChild(ul.lastChild);
    }
    reverseIndex++;
  }
});


  // IntersectionObserver to toggle 'visible' class
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  document
    .querySelectorAll("#scroll-loop li")
    .forEach((li) => observer.observe(li));
});
