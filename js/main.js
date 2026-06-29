// ============================================================
//   PREMIUM UI - Interactions & Animations
// ============================================================

// Card mouse tracking glow
function initCardGlow() {
  document.querySelectorAll(".card").forEach(function(card) {
    card.addEventListener("mousemove", function(e) {
      var rect = card.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mouse-x", x + "%");
      card.style.setProperty("--mouse-y", y + "%");
    });
  });
}

// Navigation
function renderNav() {
  var nav = document.getElementById("nav");
  if (!nav) return;
  var currentPath = window.location.pathname.split("/").pop() || "index.html";
  var links = [
    { href: "./", text: "首页" },
    { href: "policy.html", text: "政策解读" },
    { href: "registration.html", text: "报名流程" },
    { href: "subjects.html", text: "考试科目" },
    { href: "scores.html", text: "分数线" },
    { href: "schools.html", text: "院校招生" },
    { href: "resources.html", text: "备考资料" }
  ];
  var linksHtml = links.map(function(l) {
    var active = currentPath === l.href.replace("/","") || (currentPath === "index.html" && l.href === "./");
    return '<a href="' + l.href + '" class="' + (active ? "active" : "") + '">' + l.text + '</a>';
  }).join("");
  nav.innerHTML = '<div class="nav-container"><a href="./" class="nav-brand"><span class="nav-brand-dot"></span>春季高考</a><div class="nav-links" id="navLinks">' + linksHtml + '<button class="nav-search-btn" id="navSearchBtn" aria-label="搜索"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></button></div><button class="nav-hamburger" id="navHamburger" aria-label="菜单"><span></span><span></span><span></span></button></div>';
  var hamburger = document.getElementById("navHamburger");
  var navLinks = document.getElementById("navLinks");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function() { hamburger.classList.toggle("active"); navLinks.classList.toggle("active"); });
    navLinks.querySelectorAll("a").forEach(function(l) { l.addEventListener("click", function() { hamburger.classList.remove("active"); navLinks.classList.remove("active"); }); });
    document.addEventListener("click", function(e) { if (!nav.contains(e.target)) { hamburger.classList.remove("active"); navLinks.classList.remove("active"); } });
  }
}

function renderFooter() {
  var f = document.getElementById("footer");
  if (!f) return;
  f.innerHTML = '<div class="container"><p>&copy; ' + new Date().getFullYear() + ' 广东省春季高考资讯平台 · 仅供参考，以官方通知为准</p></div>';
}

// Nav scroll effect
function initNavScroll() {
  var nav = document.getElementById("nav");
  if (!nav) return;
  window.addEventListener("scroll", function() { nav.classList.toggle("scrolled", window.scrollY > 20); });
}

// Scroll progress
function initScrollProgress() {
  var bar = document.createElement("div"); bar.className = "scroll-progress";
  document.body.prepend(bar);
  window.addEventListener("scroll", function() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = h > 0 ? (window.scrollY / h) * 100 + "%" : "0%";
  });
}

// Counter animation
function animateCounters() {
  document.querySelectorAll(".counter").forEach(function(el) {
    var target = parseInt(el.getAttribute("data-target"), 10);
    if (isNaN(target)) return;
    var duration = 1800, start = null;
    function tick(now) {
      if (!start) start = now;
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target).toLocaleString() + (el.textContent.includes("+") && p < 1 ? "+" : "");
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString();
    }
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) { if (e.isIntersecting) { requestAnimationFrame(tick); obs.unobserve(el); } });
    }, { threshold: 0.3 });
    obs.observe(el);
  });
}

// Timeline reveal
function initTimelineReveal() {
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
  }, { threshold: 0.15 });
  document.querySelectorAll(".timeline-item").forEach(function(el) { obs.observe(el); });
}

// FAQ accordion
function initFAQ() {
  document.querySelectorAll(".faq-question").forEach(function(btn) {
    btn.addEventListener("click", function() {
      var item = btn.closest(".faq-item");
      var was = item.classList.contains("active");
      document.querySelectorAll(".faq-item.active").forEach(function(i) { i.classList.remove("active"); });
      if (!was) item.classList.add("active");
    });
  });
}

// Scroll animation
function observeAnimate() {
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) { if (e.isIntersecting) { e.target.classList.add("animate-in"); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll(".animate-on-scroll").forEach(function(el) { obs.observe(el); });
}

// Back to top
function initBackToTop() {
  var btn = document.createElement("button"); btn.className = "back-to-top";
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="18 15 12 9 6 15"/></svg>';
  btn.setAttribute("aria-label","回到顶部"); document.body.appendChild(btn);
  window.addEventListener("scroll", function() { btn.classList.toggle("visible", window.scrollY > 400); });
  btn.addEventListener("click", function() { window.scrollTo({top:0,behavior:"smooth"}); });
}

// Toast
function showToast(msg, dur) {
  dur = dur || 2500;
  var old = document.querySelector(".toast"); if (old) old.remove();
  var t = document.createElement("div"); t.className = "toast"; t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(function() { t.classList.add("visible"); });
  setTimeout(function() { t.classList.remove("visible"); setTimeout(function() { t.remove(); }, 400); }, dur);
}

// Page transitions
function initPageTransitions() {
  var overlay = document.createElement("div"); overlay.className = "page-transition";
  document.body.appendChild(overlay);
  document.querySelectorAll("a[href]").forEach(function(link) {
    var href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:")) return;
    link.addEventListener("click", function(e) {
      if (e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      overlay.classList.add("active");
      setTimeout(function() { window.location.href = href; }, 400);
    });
  });
}

// Init
document.addEventListener("DOMContentLoaded", function() {
  renderNav();
  renderFooter();
  initNavScroll();
  initScrollProgress();
  initCardGlow();
  animateCounters();
  initTimelineReveal();
  initFAQ();
  observeAnimate();
  initBackToTop();
  initPageTransitions();
});