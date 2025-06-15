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

});


  // DROPDOWN
document.addEventListener("DOMContentLoaded", function () {
  const dropdownButton = document.getElementById("mega-menu-full-dropdown-button");
  const dropdownMenu = document.getElementById("mega-menu-full-dropdown");
  const dropdownItems = dropdownMenu.querySelectorAll(".dropdown-item");
  let isOpen = false;
  let currentMode = null; // 'click' or 'hover'

  // Create and append overlay
  const overlay = document.createElement("div");
  overlay.className =
    "fixed inset-0 z-40 bg-black/30 backdrop-blur-[20px] opacity-0 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]";
  document.body.appendChild(overlay);

  // Initialize menu
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

  dropdownItems.forEach((item) => {
    item.classList.add("opacity-0", "translate-y-2", "transition-all", "duration-500");
  });

  function openDropdown() {
    dropdownMenu.classList.remove("max-h-0", "opacity-0", "pointer-events-none", "translate-y-[-10px]");
    dropdownMenu.classList.add("max-h-[600px]", "opacity-100", "pointer-events-auto", "translate-y-0");

    overlay.classList.remove("opacity-0", "pointer-events-none");
    overlay.classList.add("opacity-100", "pointer-events-auto");

    isOpen = true;

    setTimeout(() => {
      dropdownItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.remove("opacity-0", "translate-y-2");
          item.classList.add("opacity-100", "translate-y-0");
        }, index * 100);
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

  // Store references to event handlers so we can remove them
  const handlers = {
    buttonClick: () => {
      isOpen ? closeDropdown() : openDropdown();
    },
    overlayClick: () => {
      closeDropdown();
    },
    buttonEnter: () => {
      openDropdown();
    },
    buttonLeave: () => {
      setTimeout(() => {
        if (!dropdownMenu.matches(":hover")) closeDropdown();
      }, 200);
    },
    menuLeave: () => {
      setTimeout(() => {
        if (!dropdownButton.matches(":hover")) closeDropdown();
      }, 200);
    },
    menuEnter: () => {
      openDropdown();
    },
  };

  function removeAllListeners() {
    dropdownButton.removeEventListener("click", handlers.buttonClick);
    overlay.removeEventListener("click", handlers.overlayClick);

    dropdownButton.removeEventListener("mouseenter", handlers.buttonEnter);
    dropdownButton.removeEventListener("mouseleave", handlers.buttonLeave);
    dropdownMenu.removeEventListener("mouseenter", handlers.menuEnter);
    dropdownMenu.removeEventListener("mouseleave", handlers.menuLeave);
    overlay.removeEventListener("mouseenter", closeDropdown);
  }

  function setupClickMode() {
    if (currentMode === "click") return;
    removeAllListeners();

    dropdownButton.addEventListener("click", handlers.buttonClick);
    overlay.addEventListener("click", handlers.overlayClick);

    currentMode = "click";
  }

  function setupHoverMode() {
    if (currentMode === "hover") return;
    removeAllListeners();

    dropdownButton.addEventListener("mouseenter", handlers.buttonEnter);
    dropdownButton.addEventListener("mouseleave", handlers.buttonLeave);
    dropdownMenu.addEventListener("mouseenter", handlers.menuEnter);
    dropdownMenu.addEventListener("mouseleave", handlers.menuLeave);
    overlay.addEventListener("mouseenter", closeDropdown);

    currentMode = "hover";
  }

  function applyListenersBasedOnScreenSize() {
    if (window.innerWidth >= 1024) {
      setupHoverMode();
    } else {
      setupClickMode();
    }
  }

  applyListenersBasedOnScreenSize();

  window.addEventListener("resize", () => {
    applyListenersBasedOnScreenSize();
  });
});


// End of NAVIGATION
const carousel = document.getElementById('carouselCards');
const prevArrow = document.getElementById('prevArrow');
const nextArrow = document.getElementById('nextArrow');
const gap = 24;

// Get all direct children (cards)
const getCards = () => Array.from(carousel.querySelectorAll(':scope > *'));

// Center a card by index
function scrollToCard(index) {
  const cards = getCards();
  if (index < 0 || index >= cards.length) return;

  const card = cards[index];
  const cardLeft = card.offsetLeft;
  const cardWidth = card.offsetWidth;

  const containerCenter = carousel.clientWidth / 2;
  const scrollLeft = cardLeft - containerCenter + cardWidth / 2;

  carousel.scrollTo({ left: scrollLeft, behavior: 'smooth' });

  setTimeout(updateArrowVisibility, 350); // wait for scroll to complete
}

// Find the index of the closest card to the center of the viewport
function getCenteredCardIndex() {
  const cards = getCards();
  const scrollCenter = carousel.scrollLeft + carousel.clientWidth / 2;

  let closestIndex = 0;
  let closestDistance = Infinity;

  cards.forEach((card, index) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const distance = Math.abs(scrollCenter - cardCenter);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
}

// Arrow button events
nextArrow.addEventListener('click', () => {
  const currentIndex = getCenteredCardIndex();
  scrollToCard(currentIndex + 1);
});

prevArrow.addEventListener('click', () => {
  const currentIndex = getCenteredCardIndex();
  scrollToCard(currentIndex - 1);
});

// Update arrows based on visibility of first and last card
function updateArrowVisibility() {
  const cards = getCards();
  if (!cards.length) return;

  const firstCard = cards[0];
  const lastCard = cards[cards.length - 1];
  const carouselRect = carousel.getBoundingClientRect();
  const firstRect = firstCard.getBoundingClientRect();
  const lastRect = lastCard.getBoundingClientRect();

  const buffer = 1; // prevent subpixel rounding issues

  const isFirstFullyVisible =
    firstRect.left >= carouselRect.left - buffer &&
    firstRect.right <= carouselRect.right + buffer;

  const isLastFullyVisible =
    lastRect.right <= carouselRect.right + buffer &&
    lastRect.left >= carouselRect.left - buffer;

  prevArrow.style.visibility = isFirstFullyVisible ? 'hidden' : 'visible';
  nextArrow.style.visibility = isLastFullyVisible ? 'hidden' : 'visible';

  prevArrow.style.opacity = isFirstFullyVisible ? '0' : '1';
  nextArrow.style.opacity = isLastFullyVisible ? '0' : '1';

  prevArrow.style.pointerEvents = isFirstFullyVisible ? 'none' : 'auto';
  nextArrow.style.pointerEvents = isLastFullyVisible ? 'none' : 'auto';
}

// Cursor style
carousel.style.cursor = 'grab';

// Events to update arrow visibility
carousel.addEventListener('scroll', updateArrowVisibility);
window.addEventListener('resize', updateArrowVisibility);

// Init
updateArrowVisibility();

// ========== ZOOM-IN EFFECT ==========

  document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".zoom-img");
    const isMobile = window.innerWidth < 1024;
    let currentlyZoomedCard = null;

    images.forEach((img) => {
      img.style.transition = "transform 0.4s ease-in-out";
      img.style.transform = "scale(1)";
      const card = img.closest(".max-w-sm");

      if (!card) return;

      if (isMobile) {
        // Click-to-zoom for mobile
        card.onclick = () => {
          // Zoom out previous if different
          if (currentlyZoomedCard && currentlyZoomedCard !== card) {
            const prevImg = currentlyZoomedCard.querySelector(".zoom-img");
            if (prevImg) prevImg.style.transform = "scale(1)";
          }

          if (currentlyZoomedCard === card) {
            img.style.transform = "scale(1)";
            currentlyZoomedCard = null;
          } else {
            img.style.transform = "scale(1.1)";
            currentlyZoomedCard = card;
          }
        };

        // Tap outside to zoom out
        document.addEventListener(
          "click",
          (e) => {
            if (
              currentlyZoomedCard &&
              !currentlyZoomedCard.contains(e.target)
            ) {
              const zoomedImg = currentlyZoomedCard.querySelector(".zoom-img");
              if (zoomedImg) zoomedImg.style.transform = "scale(1)";
              currentlyZoomedCard = null;
            }
          },
          true
        );
      } else {
        // Hover-zoom for desktop
        card.onclick = null;
        img.addEventListener("mouseenter", () => {
          img.style.transform = "scale(1.05)";
        });
        img.addEventListener("mouseleave", () => {
          img.style.transform = "scale(1)";
        });
      }
    });

    // Re-apply on resize
    window.addEventListener("resize", () => {
      location.reload(); // simplest way to reset listeners properly
    });
  });

   // IMAGES
 document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll('.zoom-img');

    images.forEach(img => {
      img.style.transition = 'transform 0.3s ease';

      img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.05)';
        img.style.zIndex = '1';
      });

      img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
        img.style.zIndex = '0';
      });
    });
  });




   // ACCORDION
  document.querySelectorAll('#accordion .accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const icon = header.querySelector('svg');

      const isOpen = body.classList.contains('open');

      // Close all
      document.querySelectorAll('#accordion .accordion-body').forEach(b => {
        b.classList.remove('open');
        b.style.maxHeight = null;
        b.style.opacity = 0;
        b.previousElementSibling.querySelector('svg').classList.remove('rotate-180');
      });

      // Open current if it was closed
      if (!isOpen) {
        body.classList.add('open');
        body.style.maxHeight = body.scrollHeight + "px";
        body.style.opacity = 1;
        icon.classList.add('rotate-180');
      }
    });
  });
