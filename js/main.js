// ===== Navigation =====
function renderNav() {
  const nav = document.getElementById("nav");
  if (!nav) return;

  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  const links = [
    { href: "/", text: "首页" },
    { href: "/policy.html", text: "政策解读" },
    { href: "/registration.html", text: "报名流程" },
    { href: "/subjects.html", text: "考试科目" },
    { href: "/scores.html", text: "分数线" },
    { href: "/schools.html", text: "院校招生" },
    { href: "/resources.html", text: "备考资料" },
  ];

  let linksHtml = links
    .map((link) => {
      const isActive = currentPath === link.href.replace("/", "") || (currentPath === "index.html" && link.href === "/");
      return `<a href="${link.href}" class="${isActive ? "active" : ""}">${link.text}</a>`;
    })
    .join("");

  nav.innerHTML = `
    <div class="nav-container">
      <a href="/" class="nav-brand">广东省春季高考</a>
      <div class="nav-links" id="navLinks">
        ${linksHtml}
        <button class="nav-search-btn" id="navSearchBtn" aria-label="搜索" title="搜索">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>
      <button class="nav-hamburger" id="navHamburger" aria-label="菜单">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  `;

  // Mobile hamburger toggle
  const hamburger = document.getElementById("navHamburger");
  const navLinks = document.getElementById("navLinks");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target)) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });
  }
}

// ===== Footer =====
function renderFooter() {
  const footer = document.getElementById("footer");
  if (!footer) return;

  footer.innerHTML = `
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} 广东省春季高考资讯平台 · 仅供参考，请以官方通知为准</p>
    </div>
  `;
}

// ===== Animations on Scroll =====
function observeAnimate() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });
}

// ===== Back to Top =====
function initBackToTop() {
  const btn = document.createElement("button");
  btn.className = "back-to-top";
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  `;
  btn.setAttribute("aria-label", "回到顶部");
  document.body.appendChild(btn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  renderFooter();
  observeAnimate();
  initBackToTop();
});
