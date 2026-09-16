window.addEventListener("load", function(){
  'use strict';

  /* =======================
  // Menu
  ======================= */
  var body = document.querySelector("body"),
  header = document.querySelector(".header"),
  menuOpenButton = document.querySelector(".nav-button"),
  menuCloseButton = document.querySelector(".nav__icon-close"),
  menuList = document.querySelector(".main-nav"),
  mobileNavigation = window.matchMedia("(max-width: 1024px)");

  /* =======================
  // Theme
  ======================= */
  var themeToggle = document.querySelector("[data-theme-toggle]"),
  themeLabel = document.querySelector("[data-theme-label]"),
  themeColor = document.querySelector('meta[name="theme-color"]'),
  systemTheme = window.matchMedia("(prefers-color-scheme: dark)"),
  themeOrder = ["system", "light", "dark"];

  function getThemePreference() {
    try {
      return localStorage.getItem("gac-theme") || "system";
    } catch (error) {
      return "system";
    }
  }

  function setThemePreference(theme) {
    if (theme === "system") {
      document.documentElement.removeAttribute("data-theme");
      try {
        localStorage.removeItem("gac-theme");
      } catch (error) {}
    } else {
      document.documentElement.dataset.theme = theme;
      try {
        localStorage.setItem("gac-theme", theme);
      } catch (error) {}
    }
    updateThemeControl();
  }

  function updateThemeControl() {
    var theme = getThemePreference(),
    isDark = theme === "dark" || (theme === "system" && systemTheme.matches),
    labels = { system: "System", light: "Light", dark: "Dark" },
    iconWrap = themeToggle && themeToggle.querySelector("[data-theme-icon]"),
    iconClass = theme === "light" ? "fa-sun" : theme === "dark" ? "fa-moon" : "fa-circle-half-stroke";

    if (themeToggle) {
      themeToggle.setAttribute("aria-label", "Theme: " + labels[theme] + ". Activate to change theme.");
      themeToggle.title = "Theme: " + labels[theme];
    }
    if (themeLabel) {
      themeLabel.textContent = labels[theme] + " theme";
    }
    if (iconWrap) {
      // Font Awesome's kit script replaces <i> with an inline <svg>, so we
      // re-inject a fresh <i> each time and let it re-process the new element
      // rather than mutating the (already-converted) svg's class list.
      iconWrap.innerHTML = '<i class="fa-duotone fa-solid ' + iconClass + '"></i>';
    }
    if (themeColor) {
      themeColor.content = isDark ? "#091923" : "#ffffff";
    }
  }

  if (themeToggle) {
    updateThemeControl();
    themeToggle.addEventListener("click", function () {
      var current = getThemePreference(),
      next = themeOrder[(themeOrder.indexOf(current) + 1) % themeOrder.length];
      setThemePreference(next);
    });
  }

  systemTheme.addEventListener("change", function () {
    if (getThemePreference() === "system") updateThemeControl();
  });

  function updateHeaderState() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  function menuOpen() {
    if (!mobileNavigation.matches || !menuList) return;
    menuList.hidden = false;
    menuList.classList.add("is-open");
    header.classList.add("menu-open");
    menuOpenButton.setAttribute("aria-expanded", "true");
    menuCloseButton.focus();
  }

  function menuClose(restoreFocus = true) {
    if (!menuList) return;
    menuList.classList.remove("is-open");
    header.classList.remove("menu-open");
    menuOpenButton.setAttribute("aria-expanded", "false");
    if (mobileNavigation.matches) menuList.hidden = true;
    if (restoreFocus) menuOpenButton.focus();
  }

  function syncNavigationAvailability() {
    if (!menuList) return;
    if (mobileNavigation.matches) {
      menuList.hidden = !menuList.classList.contains("is-open");
    } else {
      menuList.hidden = false;
      menuList.classList.remove("is-open");
      header.classList.remove("menu-open");
      menuOpenButton.setAttribute("aria-expanded", "false");
    }
  }

  if (menuOpenButton && menuCloseButton && menuList) {
    menuOpenButton.addEventListener("click", menuOpen);
    menuCloseButton.addEventListener("click", () => menuClose());
    mobileNavigation.addEventListener("change", syncNavigationAvailability);
    syncNavigationAvailability();
  }

  /* =======================
  // Board Profile Modal
  ======================= */
  const boardTriggers = document.querySelectorAll("[data-board-target]");
  const boardModals = document.querySelectorAll(".board-modal");
  let activeBoardTrigger = null;

  function openBoardModal(modal, trigger) {
    if (!modal) return;
    activeBoardTrigger = trigger;
    modal.hidden = false;
    requestAnimationFrame(() => {
      modal.classList.add("is-visible");
      document.body.classList.add("board-modal-open");
      const panel = modal.querySelector(".board-modal__panel");
      const closeButton = modal.querySelector(".board-modal__close");
      (closeButton || panel).focus();
    });
  }

  function closeBoardModal(modal) {
    if (!modal) return;
    modal.classList.remove("is-visible");
    document.body.classList.remove("board-modal-open");
    window.setTimeout(() => {
      modal.hidden = true;
      if (activeBoardTrigger) activeBoardTrigger.focus();
      activeBoardTrigger = null;
    }, 200);
  }

  function getFocusableElements(container) {
    return [...container.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )].filter((element) => !element.hidden);
  }

  boardTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      openBoardModal(document.getElementById(trigger.dataset.boardTarget), trigger);
    });
  });

  boardModals.forEach((modal) => {
    modal.querySelectorAll("[data-board-close]").forEach((closeControl) => {
      closeControl.addEventListener("click", () => closeBoardModal(modal));
    });
  });

  window.addEventListener("keydown", (event) => {
    const openModal = document.querySelector(".board-modal.is-visible");
    if (event.key === "Escape") {
      if (openModal) {
        closeBoardModal(openModal);
        return;
      }
      if (menuList && menuList.classList.contains("is-open")) menuClose();
    }

    if (event.key === "Tab" && openModal) {
      const focusableElements = getFocusableElements(openModal);
      if (!focusableElements.length) {
        event.preventDefault();
        return;
      }
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    if (event.key === "Tab" && !openModal && menuList && menuList.classList.contains("is-open")) {
      const focusableElements = getFocusableElements(menuList);
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (!firstElement || !lastElement) return;
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  });


  /* =======================
  // Animation Load Page
  ======================= */
  setTimeout(function(){
    body.classList.add("is-in");
  },150)


  /* ======================================
  // Stop Animations During Window Resizing
  ====================================== */
  let resizeTimer;
  window.addEventListener("resize", () => {
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      document.body.classList.remove("resize-animation-stopper");
    }, 300);
  });


  /* =======================
  // Responsive Videos
  ======================= */
  reframe(".post__content iframe:not(.reframe-off), .page__content iframe:not(.reframe-off), .project-content iframe:not(.reframe-off)");


  /* =======================
  // Zoom Image
  ======================= */
  const lightense = document.querySelector(".page img, .post img, .project-content img"),
  imageLink = document.querySelectorAll(".page a img, .post a img, .project-content a img");

  if (imageLink) {
    for (var i = 0; i < imageLink.length; i++) imageLink[i].parentNode.classList.add("image-link");
    for (var i = 0; i < imageLink.length; i++) imageLink[i].classList.add("no-lightense");
  }

  if (lightense) {
    Lightense(".page img:not(.no-lightense), .post img:not(.no-lightense), .project-content img:not(.no-lightense)", {
    padding: 60,
    offset: 30
    });
  }


  /* =======================
  // LazyLoad Images
  ======================= */
  var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
  })


  /* ============================
  // Smooth scrolling to section
  ============================ */
  document.querySelectorAll(".author__btn").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    });
  });


  /* ============================
  // Sponsor Scroller
  ============================ */
  document.querySelectorAll("[data-sponsor-scroller]").forEach((scroller) => {
    const section = scroller.closest(".sponsors");
    const previousButton = section.querySelector(".sponsors__control--previous");
    const nextButton = section.querySelector(".sponsors__control--next");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const originalCount = Number(scroller.dataset.sponsorCount);
    const autoScrollDelay = 4500;
    let autoScrollTimer;
    let interactionPaused = false;
    let boundaryResetTimer;

    function getSponsorStep() {
      const firstItem = scroller.querySelector(".sponsors__item");
      const list = scroller.querySelector(".sponsors__list");
      const gap = parseFloat(window.getComputedStyle(list).gap) || 0;
      return firstItem ? firstItem.getBoundingClientRect().width + gap : scroller.clientWidth;
    }

    function getLoopBoundary() {
      return getSponsorStep() * originalCount;
    }

    function jumpToSponsorPosition(left) {
      const previousScrollBehavior = scroller.style.scrollBehavior;
      scroller.style.scrollBehavior = "auto";
      scroller.scrollLeft = left;
      scroller.offsetHeight;
      scroller.style.scrollBehavior = previousScrollBehavior;
    }

    function normalizeSponsorPosition() {
      const boundary = getLoopBoundary();

      if (boundary && scroller.scrollLeft >= boundary - 2) {
        jumpToSponsorPosition(scroller.scrollLeft - boundary);
      }
    }

    function scheduleBoundaryReset() {
      clearTimeout(boundaryResetTimer);
      boundaryResetTimer = setTimeout(normalizeSponsorPosition, 500);
    }

    function stopAutoScroll() {
      clearInterval(autoScrollTimer);
      autoScrollTimer = undefined;
    }

    function startAutoScroll() {
      stopAutoScroll();

      if (reducedMotion.matches || interactionPaused || document.hidden) return;

      autoScrollTimer = setInterval(() => {
        scrollSponsors(1, false);
      }, autoScrollDelay);
    }

    function scrollSponsors(direction, restartTimer = true) {
      const step = getSponsorStep();
      const boundary = getLoopBoundary();

      if (direction < 0 && scroller.scrollLeft <= 2) {
        jumpToSponsorPosition(boundary);
      } else {
        normalizeSponsorPosition();
      }

      scroller.scrollBy({
        left: direction * step,
        behavior: reducedMotion.matches ? "auto" : "smooth"
      });

      scheduleBoundaryReset();
      if (restartTimer) startAutoScroll();
    }

    previousButton.addEventListener("click", () => scrollSponsors(-1));
    nextButton.addEventListener("click", () => scrollSponsors(1));
    section.addEventListener("pointerenter", () => {
      interactionPaused = true;
      stopAutoScroll();
    });
    section.addEventListener("pointerleave", () => {
      interactionPaused = false;
      startAutoScroll();
    });
    section.addEventListener("focusin", () => {
      interactionPaused = true;
      stopAutoScroll();
    });
    section.addEventListener("focusout", (event) => {
      if (!section.contains(event.relatedTarget)) {
        interactionPaused = false;
        startAutoScroll();
      }
    });
    scroller.addEventListener("pointerdown", () => {
      interactionPaused = true;
      stopAutoScroll();
    });
    scroller.addEventListener("pointerup", () => {
      interactionPaused = false;
      scheduleBoundaryReset();
      startAutoScroll();
    });
    scroller.addEventListener("scroll", scheduleBoundaryReset, { passive: true });
    document.addEventListener("visibilitychange", startAutoScroll);
    reducedMotion.addEventListener("change", startAutoScroll);
    window.addEventListener("resize", normalizeSponsorPosition);
    startAutoScroll();
  });


  /* ============================
  // Testimonials Slider
  ============================ */
  if (document.querySelector(".my-slider")) {
    var slider = tns({
      container: ".my-slider",
      items: 3,
      slideBy: 1,
      gutter: 32,
      nav: false,
      mouseDrag: true,
      autoplay: false,
      controlsContainer: "#customize-controls",
      responsive: {
        1024: {
          items: 3,
        },
        768: {
          items: 2,
        },
        0: {
          items: 1,
        }
      }
    });
  }


  /* ============================
  // Scroll to top
  ============================ */
  const btnScrollToTop = document.querySelector(".top");

  if (btnScrollToTop) {
    window.addEventListener("scroll", function () {
      window.scrollY > window.innerHeight ? btnScrollToTop.classList.add("is-active") : btnScrollToTop.classList.remove("is-active");
    });

    btnScrollToTop.addEventListener("click", function () {
      if (window.scrollY != 0) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      }
    });
  }

  const analyticsConsent = document.querySelector("[data-analytics-consent]");
  if (analyticsConsent) {
    const analyticsStorageKey = "gac-analytics-consent";
    try {
      if (!localStorage.getItem(analyticsStorageKey)) analyticsConsent.hidden = false;
    } catch (error) {}

    analyticsConsent.querySelectorAll("[data-analytics-consent]").forEach((button) => {
      button.addEventListener("click", () => {
        try {
          localStorage.setItem(analyticsStorageKey, button.dataset.analyticsConsent);
        } catch (error) {}
        if (button.dataset.analyticsConsent === "granted" && window.enableGoogleAnalytics) {
          window.enableGoogleAnalytics();
        }
        analyticsConsent.hidden = true;
      });
    });
  }

});