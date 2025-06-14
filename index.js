document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector('[data-collapse-toggle="mega-menu-full"]');
  const menu = document.getElementById("mega-menu-full");

  const overlay = document.createElement("div");
  overlay.className = `
    fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-[20px]
    opacity-0 pointer-events-none transition-opacity duration-500 ease-in-out
  `;
  document.body.appendChild(overlay);

  let isMenuOpen = false;

  function isMobile() {
    return window.innerWidth < 768;
  }

  function animateMenuItemsIn() {
    const items = menu.querySelectorAll("li, a, div");
    items.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(-10px)";
      item.style.transition = "none";
    });
    void menu.offsetHeight;
    items.forEach((item, index) => {
      item.style.transition = `opacity 0.4s ease ${index * 0.05}s, transform 0.4s ease ${index * 0.05}s`;
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    });
  }

  function resetMenuItems() {
    const items = menu.querySelectorAll("li, a, div");
    items.forEach((item) => {
      item.style.opacity = "";
      item.style.transform = "";
      item.style.transition = "";
    });
  }

  function showMenu() {
    menu.classList.remove(
      "hidden", "max-h-0", "opacity-0", "pointer-events-none", "scale-95", "translate-y-2"
    );
    menu.classList.add(
      "block", "max-h-[1000px]", "opacity-100", "pointer-events-auto", "scale-100", "translate-y-0"
    );
    overlay.classList.remove("opacity-0", "pointer-events-none");
    overlay.classList.add("opacity-100", "pointer-events-auto");

    animateMenuItemsIn();
    isMenuOpen = true;
  }

  function hideMenu() {
    menu.classList.remove(
      "block", "max-h-[1000px]", "opacity-100", "pointer-events-auto", "scale-100", "translate-y-0"
    );
    menu.classList.add(
      "max-h-0", "opacity-0", "pointer-events-none", "scale-95", "translate-y-2"
    );
    overlay.classList.add("opacity-0", "pointer-events-none");
    overlay.classList.remove("opacity-100", "pointer-events-auto");

    resetMenuItems();
    isMenuOpen = false;
  }

  toggleButton.addEventListener("click", (e) => {
    e.stopPropagation();
    if (isMobile()) {
      isMenuOpen ? hideMenu() : showMenu();
    }
  });

  function handleResize() {
    if (isMenuOpen && isMobile()) {
      toggleButton.click();
    }

    if (!isMobile()) {
      menu.classList.remove(
        "hidden", "max-h-0", "opacity-0", "pointer-events-none", "scale-95", "translate-y-2"
      );
      menu.classList.add(
        "block", "opacity-100", "pointer-events-auto", "scale-100", "translate-y-0"
      );
      overlay.classList.add("opacity-0", "pointer-events-none");
      overlay.classList.remove("opacity-100", "pointer-events-auto");

      isMenuOpen = false;
      resetMenuItems();
    } else {
      if (!isMenuOpen) {
        menu.classList.remove(
          "block", "max-h-[1000px]", "opacity-100", "pointer-events-auto", "scale-100", "translate-y-0"
        );
        menu.classList.add(
          "transition-all", "duration-500", "ease-in-out", "overflow-hidden",
          "max-h-0", "opacity-0", "pointer-events-none", "scale-95", "translate-y-2"
        );
        overlay.classList.add("opacity-0", "pointer-events-none");
        overlay.classList.remove("opacity-100", "pointer-events-auto");
        resetMenuItems();
      }
    }
  }

  handleResize();
  window.addEventListener("resize", handleResize);

  // 🔻 New: click outside to close
  document.addEventListener("click", (e) => {
    if (isMobile() && isMenuOpen && !menu.contains(e.target) && !toggleButton.contains(e.target)) {
      toggleButton.click();
    }
  });

  // 🔻 New: scroll to close
  window.addEventListener("scroll", () => {
    if (isMobile() && isMenuOpen) {
      toggleButton.click();
    }
  });
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

const carousel = document.getElementById('carouselCards');
const prevArrow = document.getElementById('prevArrow');
const nextArrow = document.getElementById('nextArrow');
const gap = 24;

// Get the width of one full card including gap
const getScrollStep = () => {
  const card = carousel.querySelector(':scope > *');
  return card ? card.offsetWidth + gap : 0;
};

// Update visibility and interactivity of arrows
function updateArrowVisibility() {
  const maxScroll = carousel.scrollWidth - carousel.clientWidth;
  const atStart = carousel.scrollLeft <= 5;
  const atEnd = carousel.scrollLeft >= maxScroll - 5;

  prevArrow.style.visibility = atStart ? 'hidden' : 'visible';
  nextArrow.style.visibility = atEnd ? 'hidden' : 'visible';

  prevArrow.style.opacity = atStart ? '0' : '1';
  nextArrow.style.opacity = atEnd ? '0' : '1';

  prevArrow.style.pointerEvents = atStart ? 'none' : 'auto';
  nextArrow.style.pointerEvents = atEnd ? 'none' : 'auto';
}

// Scroll behavior for arrows (smooth)
nextArrow.addEventListener('click', () => {
  carousel.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
  setTimeout(updateArrowVisibility, 350);
});

prevArrow.addEventListener('click', () => {
  carousel.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
  setTimeout(updateArrowVisibility, 350);
});

// Drag-to-scroll (no smooth behavior to avoid stutter)
let isDragging = false;
let startX = 0;
let scrollStart = 0;

carousel.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX;
  scrollStart = carousel.scrollLeft;
  carousel.style.cursor = 'grabbing';
});

carousel.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const delta = (e.pageX - startX) * 1.5;
  carousel.scrollLeft = scrollStart - delta;
});

carousel.addEventListener('mouseup', () => {
  isDragging = false;
  carousel.style.cursor = 'grab';
});

carousel.addEventListener('mouseleave', () => {
  isDragging = false;
  carousel.style.cursor = 'grab';
});

// Touch equivalent
carousel.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
  scrollStart = carousel.scrollLeft;
});

carousel.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const delta = (e.touches[0].clientX - startX) * 1.5;
  carousel.scrollLeft = scrollStart - delta;
});

carousel.addEventListener('touchend', () => {
  isDragging = false;
});

carousel.addEventListener('touchcancel', () => {
  isDragging = false;
});

// Prevent text/image selection during drag
document.addEventListener('selectstart', (e) => {
  if (isDragging) e.preventDefault();
});

// Initial state
carousel.style.cursor = 'grab';
updateArrowVisibility();

// Update arrows on resize or layout shift
window.addEventListener('resize', updateArrowVisibility);
