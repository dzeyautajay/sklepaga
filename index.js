/* GLOBAL ANIMATION */
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    '.fly-in, .left-in, .right-in, .fly-in-slow, .left-in-slow, .right-in-slow'
  );

  const observer = new IntersectionObserver((entries) => {
    let delay = 0;

    entries
      .filter(entry => entry.isIntersecting)
      .forEach((entry) => {
        const el = entry.target;

        // Apply stagger delay
        el.style.transitionDelay = `${delay}ms`;
        el.classList.add('animate-in');

        delay += 200; // stagger between each visible element

        observer.unobserve(el);
      });
  }, { threshold: 0.1 });

  animatedElements.forEach(el => observer.observe(el));
});

// NAVBAR //
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("menu-toggle-btn");
  const iconPath = document.getElementById("menu-icon-path");
  const sidebar = document.getElementById("sidebar-multi-level-sidebar");
  const navbar = document.getElementById("navbar");

  const hamburgerPath = "M4 6h16M4 12h16M4 18h16";
  const closePath = "M6 18L18 6M6 6l12 12";

  // Overlay
  const hamburgerOverlay = document.createElement("div");
  hamburgerOverlay.className = `
    fixed inset-0 z-20 bg-black bg-opacity-50
    opacity-0 pointer-events-none transition-opacity duration-300 ease-in-out
  `;
  document.body.appendChild(hamburgerOverlay);

  let isSidebarOpen = false;

   // ---------------- NAVBAR SCROLL BEHAVIOR -------------------
  let lastScrollY = window.scrollY;
  let navHidden = false;

  navbar.style.transition = "transform 0.3s ease";
  sidebar.style.transition = "transform 0.3s ease";

  function handleNavbarScroll() {
    const scrollY = window.scrollY;

    if (scrollY > lastScrollY && !navHidden) {
      navbar.style.transform = "translateY(-100%)";
      sidebar.style.transform = "translateY(-100%)";
      navHidden = true;
    } else if (scrollY < lastScrollY && navHidden) {
      navbar.style.transform = "translateY(0)";
      sidebar.style.transform = "translateY(0)";
      navHidden = false;
    }

    lastScrollY = scrollY;
  }

  window.addEventListener("scroll", handleNavbarScroll);

  // ---------------- SIDEBAR ANIMATION -------------------
  function showSidebar() {
    if (toggleBtn.disabled) return;
    toggleBtn.disabled = true;

    // Lock body scroll
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
document.body.style.overflow = "hidden";
document.body.style.paddingRight = `${scrollbarWidth}px`;
navbar.style.paddingRight = `${scrollbarWidth}px`;


    sidebar.classList.remove("hidden");
    sidebar.style.maxHeight = "0px";
    void sidebar.offsetHeight;
    sidebar.style.transition = "max-height 800ms ease, transform 0.3s ease";
    sidebar.style.maxHeight = `${window.innerHeight - 48}px`;

const menuItems = sidebar.querySelectorAll(".sidebar-menu-item");
menuItems.forEach((item) => {
  // Reset styles before animation
  item.style.opacity = "0";
  item.style.transform = "translateY(10px)";
  item.style.transition = "none"; // Prevent flash on reset
});

// Animate with delay after reset
menuItems.forEach((item, i) => {
  setTimeout(() => {
    item.style.transition = "opacity 800ms ease, transform 800ms ease";
    item.style.opacity = "1";
    item.style.transform = "translateY(0)";
  }, 200 + i * 120);
});


    // Show overlay
    hamburgerOverlay.classList.replace("opacity-0", "opacity-100");
    hamburgerOverlay.classList.replace("pointer-events-none", "pointer-events-auto");

    toggleBtn?.setAttribute("aria-expanded", "true");
    iconPath?.setAttribute("d", closePath);
    isSidebarOpen = true;

    setTimeout(() => {
      toggleBtn.disabled = false;
    }, 850);
  }

  function hideSidebar() {
    if (toggleBtn.disabled) return;
    toggleBtn.disabled = true;

    sidebar.style.maxHeight = "0px";

    // Restore overlay
    hamburgerOverlay.classList.replace("opacity-100", "opacity-0");
    hamburgerOverlay.classList.replace("pointer-events-auto", "pointer-events-none");

    toggleBtn?.setAttribute("aria-expanded", "false");
    iconPath?.setAttribute("d", hamburgerPath);
    isSidebarOpen = false;

    setTimeout(() => {
      sidebar.classList.add("hidden");
      sidebar.style.transition = "";
      sidebar.style.maxHeight = "";
      sidebar.style.transform = "";

      // Unlock body scroll
   document.body.style.overflow = "";
document.body.style.paddingRight = "";
navbar.style.paddingRight = "";


// Reset open submenus and their icon/title styles
document.querySelectorAll('#sidebar-menu .sidebar-menu-body.open').forEach(body => {
  body.classList.remove('open');
  body.style.maxHeight = null;
  body.style.opacity = 0;

  const header = body.previousElementSibling;
  const svg = header.querySelector('svg');
  const title = header.querySelector('h2');

  svg?.classList.remove('rotate-180');
  svg?.classList.remove('stroke-[#ffdd1a]');
  svg?.classList.add('stroke-white');

  title?.classList.remove('text-[#ffdd1a]');
  title?.classList.add('text-white');
});


      toggleBtn.disabled = false;
    }, 850);
  }

  // Toggle handlers
  toggleBtn?.addEventListener("click", () => {
    isSidebarOpen ? hideSidebar() : showSidebar();
  });

  // Click outside to close
  document.addEventListener("click", (e) => {
    if (
      isSidebarOpen &&
      !sidebar.contains(e.target) &&
      !toggleBtn.contains(e.target)
    ) {
      hideSidebar();
    }
  });

  // Close on window resize
  window.addEventListener("resize", () => {
    if (isSidebarOpen) hideSidebar();
  });
// ---------------- ACCORDION LOGIC ----------------
document.querySelectorAll('#sidebar-menu .sidebar-menu-header').forEach(header => {
  header.addEventListener('click', () => {
    const body = header.nextElementSibling;
    const icon = header.querySelector('svg');
    const title = header.querySelector('h2');
    const isOpen = body.classList.contains('open');

    // Close all open bodies
    document.querySelectorAll('#sidebar-menu .sidebar-menu-body').forEach(openBody => {
      openBody.classList.remove('open');
      openBody.style.maxHeight = null;
      openBody.style.opacity = 0;

      const otherHeader = openBody.previousElementSibling;
      const otherIcon = otherHeader.querySelector('svg');
      const otherTitle = otherHeader.querySelector('h2');

      otherIcon?.classList.remove('rotate-180', 'stroke-[#ffdd1a]');
      otherIcon?.classList.add('stroke-white');

      otherTitle?.classList.remove('text-[#ffdd1a]');
      otherTitle?.classList.add('text-white');
    });

    // Open current only if it was closed
    if (!isOpen) {
      body.classList.add('open');
      body.style.maxHeight = body.scrollHeight + "px";
      body.style.opacity = 1;

      icon?.classList.add('rotate-180');
      icon?.classList.remove('stroke-white');
      icon?.classList.add('stroke-[#ffdd1a]');

      title?.classList.remove('text-white');
      title?.classList.add('text-[#ffdd1a]');
    }
  });
});

// ---------------- SUBMENU ACTIVE LOGIC ----------------
document.querySelectorAll('#sidebar-menu .submenu-link').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('#sidebar-menu .submenu-link').forEach(l => {
      l.classList.remove('active');
    });
    link.classList.add('active');
  });
});

});


// ---------------- HERO ----------------
  // Fade from solid blue to video after 3 seconds
  setTimeout(() => {
    const solid = document.getElementById('bg-solid');
    const video = document.getElementById('bg-video');
    solid.style.opacity = 0;
    video.style.opacity = 1;
    video.play();

    // When video ends, fade to image
    video.onended = () => {
      video.style.opacity = 0;
      document.getElementById('bg-image').style.opacity = 1;
    };
  }, 3000);
