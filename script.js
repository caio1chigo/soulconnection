const toast = document.querySelector('.toast');
let toastTimer;

document.querySelectorAll('.demo-link').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    if (!toast) return;

    toast.textContent =
      'Contato demonstrativo — substitua pelo link oficial antes de publicar.';

    toast.classList.add('show');

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  });
});

const revealEls = document.querySelectorAll(
  '.reveal, .reveal-left, .reveal-right'
);

revealEls.forEach((element) => {
  element.classList.add('reveal');
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealEls.forEach((element) => {
    observer.observe(element);
  });
} else {
  revealEls.forEach((element) => {
    element.classList.add('visible');
  });
}

const topButton = document.querySelector('.fab-top');

if (topButton) {
  window.addEventListener(
    'scroll',
    () => {
      topButton.classList.toggle('show', window.scrollY > 600);
    },
    {
      passive: true
    }
  );

  topButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* =========================
   Loader
========================= */

const loader = document.querySelector('#page-loader');
const loaderFill = document.querySelector('#loader-progress-fill');
const loaderPercent = document.querySelector('#loader-percent');

if (loader && loaderFill && loaderPercent) {
  let loadingValue = 0;
  let loadingFinished = false;

  function updateLoader(value) {
    const safeValue = Math.min(Math.round(value), 100);

    loaderFill.style.transform = `scaleX(${safeValue / 100})`;
    loaderPercent.textContent = `${String(safeValue).padStart(2, '0')}%`;

    loader.setAttribute('aria-valuenow', safeValue);
  }

  const loadingInterval = setInterval(() => {
    if (!loadingFinished && loadingValue < 92) {
      loadingValue += Math.random() * 7 + 2;
      updateLoader(loadingValue);
    }
  }, 120);

  window.addEventListener('load', () => {
    loadingFinished = true;
    clearInterval(loadingInterval);

    updateLoader(100);

    setTimeout(() => {
      loader.classList.add('is-hidden');

      setTimeout(() => {
        loader.remove();
      }, 750);
    }, 420);
  });
}