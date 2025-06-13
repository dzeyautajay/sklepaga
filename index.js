//<!-- Drop Down on Nav Bar Script -->
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector('[data-collapse-toggle="mega-menu-full"]');
  const menu = document.getElementById("mega-menu-full");

  const icon = toggleButton.querySelector("svg");

  const overlay = document.createElement("div");
  overlay.className =
    "fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-[20px] opacity-0 pointer-events-none transition-opacity duration-500 ease-in-out";
  document.body.appendChild(overlay);

  let isMenuOpen = false;

  function isMobile() {
    return window.innerWidth < 768;
  }

  function setIcon(isOpen) {
    icon.innerHTML = isOpen
      ? `<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4L13 13M13 4L4 13" />` // X
      : `<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>`; // Hamburger
  }

  function openMenu() {
    if (!isMobile()) return;

    menu.classList.remove("max-h-0", "opacity-0", "pointer-events-none");
    menu.classList.add("max-h-[1000px]", "opacity-100", "pointer-events-auto");

    overlay.classList.remove("opacity-0", "pointer-events-none");
    overlay.classList.add("opacity-100", "pointer-events-auto");

    toggleButton.setAttribute("aria-expanded", "true");
    setIcon(true);
    isMenuOpen = true;
  }

  function closeMenu() {
    if (!isMenuOpen) return;

    menu.classList.add("max-h-0", "opacity-0", "pointer-events-none");
    menu.classList.remove("max-h-[1000px]", "opacity-100", "pointer-events-auto");

    overlay.classList.add("opacity-0", "pointer-events-none");
    overlay.classList.remove("opacity-100", "pointer-events-auto");

    toggleButton.setAttribute("aria-expanded", "false");
    setIcon(false);
    isMenuOpen = false;
  }

  // Toggle by hamburger
  toggleButton.addEventListener("click", function (e) {
    e.stopPropagation();
    isMenuOpen ? closeMenu() : openMenu();
  });

  // On resize: reset if desktop
  window.addEventListener("resize", function () {
    if (!isMobile()) {
      menu.classList.remove(
        "max-h-0",
        "opacity-0",
        "pointer-events-none",
        "max-h-[1000px]",
        "opacity-100",
        "pointer-events-auto"
      );
      overlay.classList.add("opacity-0", "pointer-events-none");
      overlay.classList.remove("opacity-100", "pointer-events-auto");
      isMenuOpen = false;
      setIcon(false);
    } else {
      menu.classList.add(
        "transition-all",
        "duration-500",
        "ease-in-out",
        "overflow-hidden",
        "max-h-0",
        "opacity-0",
        "pointer-events-none"
      );
    }
  });

  // Initial setup
  if (isMobile()) {
    menu.classList.add(
      "transition-all",
      "duration-500",
      "ease-in-out",
      "overflow-hidden",
      "max-h-0",
      "opacity-0",
      "pointer-events-none"
    );
    setIcon(false);
  }
});


// Dropdown Menu
document.addEventListener("DOMContentLoaded", function () {
  const dropdownButton = document.getElementById("mega-menu-full-dropdown-button");
  const dropdownMenu = document.getElementById("mega-menu-full-dropdown");
  let isOpen = false;

  const overlay = document.createElement("div");
  overlay.className =
    "fixed inset-0 z-40 bg-black/30 backdrop-blur-[20px] opacity-0 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]";
  document.body.appendChild(overlay);

  const dropdownItems = dropdownMenu.querySelectorAll(".dropdown-item");

  // Add transition classes to dropdown container
  dropdownMenu.classList.add(
    "transition-all", 
    "duration-700", 
    "ease-[cubic-bezier(0.4,0,0.2,1)]", 
    "overflow-hidden",
    "transform", 
    "max-h-0", 
    "opacity-0", 
    "pointer-events-none", 
    "translate-y-[-10px]"
  );

  // Hide items initially
  dropdownItems.forEach((item) => {
    item.classList.add("opacity-0", "translate-y-2", "transition-all", "duration-500");
  });

  function openDropdown() {
    dropdownMenu.classList.remove("max-h-0", "opacity-0", "pointer-events-none", "translate-y-[-10px]");
    dropdownMenu.classList.add("max-h-[600px]", "opacity-100", "pointer-events-auto", "translate-y-0");

    overlay.classList.remove("opacity-0", "pointer-events-none");
    overlay.classList.add("opacity-100", "pointer-events-auto");

    isOpen = true;

    // Animate items after dropdown opens (700ms delay)
    setTimeout(() => {
      dropdownItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.remove("opacity-0", "translate-y-2");
          item.classList.add("opacity-100", "translate-y-0");
        }, index * 100); // stagger effect
      });
    }, 700);
  }

  function closeDropdown() {
    dropdownMenu.classList.add("max-h-0", "opacity-0", "pointer-events-none", "translate-y-[-10px]");
    dropdownMenu.classList.remove("max-h-[600px]", "opacity-100", "pointer-events-auto", "translate-y-0");

    overlay.classList.add("opacity-0", "pointer-events-none");
    overlay.classList.remove("opacity-100", "pointer-events-auto");

    dropdownItems.forEach((item) => {
      item.classList.add("opacity-0", "translate-y-2");
      item.classList.remove("opacity-100", "translate-y-0");
    });

    isOpen = false;
  }

  dropdownButton.addEventListener("click", function (e) {
    e.stopPropagation();
    isOpen ? closeDropdown() : openDropdown();
  });

  document.addEventListener("click", function (e) {
    if (isOpen && !dropdownMenu.contains(e.target) && !dropdownButton.contains(e.target)) {
      closeDropdown();
    }
  });

  window.addEventListener("scroll", function () {
    if (isOpen) closeDropdown();
  });

  overlay.addEventListener("click", function () {
    closeDropdown();
  });
});

// End of NAVIGATION

//<!-- Scroll and Drag Script -->
    const carousel = document.getElementById('carouselCards');
    const prevArrow = document.getElementById('prevArrow');
    const nextArrow = document.getElementById('nextArrow');

    let scrollPos = 0;
    const gap = 24;

    const getScrollStep = () => carousel.firstElementChild.offsetWidth + gap;

    // Button navigation
    nextArrow.addEventListener('click', () => {
      const step = getScrollStep();
      carousel.scrollBy({ left: step, behavior: 'smooth' });
      scrollPos += step;
      prevArrow.classList.remove('hidden');
    });

    prevArrow.addEventListener('click', () => {
      const step = getScrollStep();
      carousel.scrollBy({ left: -step, behavior: 'smooth' });
      scrollPos -= step;
      if (scrollPos <= 0) {
        scrollPos = 0;
        prevArrow.classList.add('hidden');
      }
    });

    // Drag logic
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      carousel.classList.add('cursor-grabbing');
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
      isDown = false;
      carousel.classList.remove('cursor-grabbing');
    });

    carousel.addEventListener('mouseup', () => {
      isDown = false;
      carousel.classList.remove('cursor-grabbing');
    });

    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.5;
      carousel.scrollLeft = scrollLeft - walk;
      prevArrow.classList.toggle('hidden', carousel.scrollLeft <= 0);
    });

    // Touch support
    carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('touchmove', (e) => {
      const touchX = e.touches[0].clientX;
      const delta = (touchX - startX) * 1.5;
      carousel.scrollLeft = scrollLeft - delta;
      prevArrow.classList.toggle('hidden', carousel.scrollLeft <= 0);
    });

    // Optional: Prevent text highlight during drag
    document.addEventListener('selectstart', (e) => {
      if (isDown) e.preventDefault();
    });