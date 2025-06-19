/* NAVBAR */
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("menu-toggle-btn");
  const iconPath = document.getElementById("menu-icon-path");
  const sidebar = document.getElementById("sidebar-multi-level-sidebar");
  const desktopMenu = document.getElementById("mega-menu-full");
  const hamburgerPath = "M4 6h16M4 12h16M4 18h16";
  const closePath = "M6 18L18 6M6 6l12 12";

  const hamburgerOverlay = document.createElement("div");
  hamburgerOverlay.className = `
    fixed inset-0 z-20 bg-black bg-opacity-50 backdrop-blur-sm
    opacity-0 pointer-events-none transition-opacity duration-300 ease-in-out
  `;
  document.body.appendChild(hamburgerOverlay);

  let isSidebarOpen = false;
  const sidebarMainItems = sidebar?.querySelectorAll("ul > li");

  sidebarMainItems?.forEach((item) => {
    item.classList.add(
      "opacity-0",
      "translate-x-4",
      "transition-all",
      "duration-300",
      "ease-in-out"
    );
  });

  function animateSidebarIn() {
    sidebarMainItems?.forEach((item, i) => {
      item.style.transitionDelay = `${i * 30}ms`;
      item.classList.remove("opacity-0", "translate-x-4");
      item.classList.add("opacity-100", "translate-x-0");
    });
  }

  function resetSidebarAnimation() {
    sidebarMainItems?.forEach((item) => {
      item.style.transitionDelay = `0ms`;
      item.classList.remove("opacity-100", "translate-x-0");
      item.classList.add("opacity-0", "translate-x-4");
    });
  }

  function showSidebar() {
    sidebar?.classList.remove("hidden");
    requestAnimationFrame(() => {
      sidebar?.classList.add("block");
      hamburgerOverlay.classList.replace("opacity-0", "opacity-100");
      hamburgerOverlay.classList.replace("pointer-events-none", "pointer-events-auto");
      toggleBtn?.setAttribute("aria-expanded", "true");
      iconPath?.setAttribute("d", closePath);
      isSidebarOpen = true;

      setTimeout(() => {
        animateSidebarIn();
      }, 100);
    });
  }

  function hideSidebar() {
    sidebar?.classList.remove("block");
    setTimeout(() => {
      sidebar?.classList.add("hidden");
    }, 50);

    hamburgerOverlay.classList.replace("opacity-100", "opacity-0");
    hamburgerOverlay.classList.replace("pointer-events-auto", "pointer-events-none");
    toggleBtn?.setAttribute("aria-expanded", "false");
    iconPath?.setAttribute("d", hamburgerPath);
    isSidebarOpen = false;

    resetSidebarAnimation();
  }

  function setLayoutByScreen() {
    if (window.innerWidth >= 768) {
      hideSidebar();
      sidebar?.classList.add("translate-x-full", "hidden");
      hamburgerOverlay.classList.add("opacity-0", "pointer-events-none");
      desktopMenu?.classList.remove("hidden");
      desktopMenu?.classList.add("flex");
      iconPath?.setAttribute("d", hamburgerPath);
      isSidebarOpen = false;
    } else {
      desktopMenu?.classList.remove("flex");
      desktopMenu?.classList.add("hidden");

      sidebar?.classList.remove("translate-x-full");
      sidebar?.classList.add("hidden");
      hamburgerOverlay.classList.add("opacity-0", "pointer-events-none");
      iconPath?.setAttribute("d", hamburgerPath);
      isSidebarOpen = false;
      resetSidebarAnimation();
    }
  }

  toggleBtn?.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      isSidebarOpen ? hideSidebar() : showSidebar();
    }
  });

  document.addEventListener("click", (e) => {
    if (
      window.innerWidth < 768 &&
      isSidebarOpen &&
      !sidebar?.contains(e.target) &&
      !toggleBtn?.contains(e.target)
    ) {
      hideSidebar();
    }
  });

  window.addEventListener("resize", setLayoutByScreen);
  setLayoutByScreen();

  // --- DROPDOWN LOGIC ---
  const navItems = document.querySelectorAll("[data-menu]");
  const dropdownsContainer = document.getElementById("dropdowns-container");
  const allDropdowns = dropdownsContainer?.querySelectorAll(".submenu-dropdown");

  const dropdownOverlay = document.createElement("div");
  dropdownOverlay.id = "dropdown-blur-overlay";
  dropdownOverlay.className = `
    fixed inset-0 z-30 bg-black bg-opacity-20 backdrop-blur-[20px] pointer-events-none transition-none
  `;
  document.body.appendChild(dropdownOverlay);
  dropdownOverlay.style.display = "none";

  let activeDropdown = null;

  function showDropdown(menuKey) {
    const nextDropdown = document.getElementById(`dropdown-${menuKey}`);
    if (!nextDropdown || activeDropdown === nextDropdown) return;

    allDropdowns?.forEach((d) => d.classList.remove("active"));
    navItems.forEach((item) => item.classList.remove("active-menu"));
    if (window.innerWidth < 768) return;

    nextDropdown.classList.add("active");
    activeDropdown = nextDropdown;

    const activeNavItem = Array.from(navItems).find(
      (item) => item.getAttribute("data-menu") === menuKey
    );
    activeNavItem?.classList.add("active-menu");

    const items = nextDropdown.querySelectorAll(".dropdown-item");
    items.forEach((item, i) => {
      item.style.transitionDelay = `${i * 60}ms`;
      item.classList.remove("opacity-0", "translate-y-4");
      item.classList.add("opacity-100", "translate-y-0");
    });

    dropdownOverlay.style.display = "block";
  }

  function hideDropdown() {
    if (activeDropdown) {
      activeDropdown.classList.remove("active");
      activeDropdown = null;
    }
    navItems.forEach((item) => item.classList.remove("active-menu"));
    dropdownOverlay.style.display = "none";
  }

  navItems.forEach((item) => {
    const key = item.getAttribute("data-menu");
    item.addEventListener("mouseenter", () => {
      if (window.innerWidth >= 768) showDropdown(key);
    });
  });

  dropdownsContainer?.addEventListener("mouseleave", hideDropdown);

    let dropdownCloseTimeout = null;

  function scheduleDropdownClose() {
    dropdownCloseTimeout = setTimeout(() => {
      hideDropdown();
    }, 100);
  }

  function cancelScheduledDropdownClose() {
    if (dropdownCloseTimeout) {
      clearTimeout(dropdownCloseTimeout);
      dropdownCloseTimeout = null;
    }
  }

  // Listen on both nav bar and dropdown area
  const navBar = desktopMenu; // Assuming your navbar is this container
  navBar?.addEventListener("mouseleave", scheduleDropdownClose);
  navBar?.addEventListener("mouseenter", cancelScheduledDropdownClose);

  dropdownsContainer?.addEventListener("mouseleave", scheduleDropdownClose);
  dropdownsContainer?.addEventListener("mouseenter", cancelScheduledDropdownClose);

});
// End of NAVIGATION


// CAROUSELL
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


document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".zoom-card");
  const isMobile = window.innerWidth < 1024;
  let currentlyZoomedCard = null;

  cards.forEach((card) => {
    const img = card.querySelector(".zoom-img");
    if (!img) return;

    img.style.transition = "transform 0.4s ease-in-out";
    img.style.transform = "scale(1)";

    if (isMobile) {
      // Tap-to-zoom on mobile
      card.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent bubbling up

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
      });

      // Tap outside to reset
      document.addEventListener("click", (e) => {
        if (
          currentlyZoomedCard &&
          !currentlyZoomedCard.contains(e.target)
        ) {
          const zoomedImg = currentlyZoomedCard.querySelector(".zoom-img");
          if (zoomedImg) zoomedImg.style.transform = "scale(1)";
          currentlyZoomedCard = null;
        }
      }, true);
    } else {
      // Hover-to-zoom on desktop
      card.addEventListener("mouseenter", () => {
        img.style.transform = "scale(1.05)";
      });

      card.addEventListener("mouseleave", () => {
        img.style.transform = "scale(1)";
      });
    }
  });
});



// IMAGES ZOOM + CLICK HANDLING
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll('.zoom-img');
  const supportsHover = window.matchMedia('(hover: hover)').matches;

  images.forEach(img => {
    // Add pointer cursor for better UX
    img.style.cursor = 'pointer';
    img.style.transition = 'transform 0.3s ease, z-index 0.3s ease';

    if (supportsHover) {
      img.addEventListener('mouseenter', () => {
        requestAnimationFrame(() => {
          img.style.transform = 'scale(1.05)';
          img.style.zIndex = '10';
        });
      });

      img.addEventListener('mouseleave', () => {
        requestAnimationFrame(() => {
          img.style.transform = 'scale(1)';
          img.style.zIndex = '0';
        });
      });
    }

    img.addEventListener('click', () => {
      console.log('Image clicked:', img.src);
      // TODO: Add lightbox/modal logic here
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
