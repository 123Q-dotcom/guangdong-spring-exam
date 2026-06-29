// ============================================================
//   UI ENHANCEMENTS - Interactive & Polished
// ============================================================

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
  var linksHtml = links.map(function(link) {
    var isActive = currentPath === link.href.replace("/", "") || (currentPath === "index.html" && link.href === "./");
    return '<a href="' + link.href + '" class="' + (isActive ? "active" : "") + '">' + link.text + '</a>';
  }).join("");
  nav.innerHTML = '<div class="nav-container"><a href="./" class="nav-brand">广东省春季高考</a><div class="nav-links" id="navLinks">' + linksHtml + '<button class="nav-search-btn" id="navSearchBtn" aria-label="搜索" title="搜索"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></button></div><button class="nav-hamburger" id="navHamburger" aria-label="菜单"><span></span><span></span><span></span></button></div>';
  var hamburger = document.getElementById("navHamburger");
  var navLinks = document.getElementById("navLinks");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function() { hamburger.classList.toggle("active"); navLinks.classList.toggle("active"); });
    navLinks.querySelectorAll("a").forEach(function(link) { link.addEventListener("click", function() { hamburger.classList.remove("active"); navLinks.classList.remove("active"); }); });
    document.addEventListener("click", function(e) { if (!nav.contains(e.target)) { hamburger.classList.remove("active"); navLinks.classList.remove("active"); } });
  }
}

function renderFooter() {
  var footer = document.getElementById("footer");
  if (!footer) return;
  footer.innerHTML = '<div class="container"><p>&copy; ' + new Date().getFullYear() + ' 广东省春季高考资讯平台 · 仅供参考，请以官方通知为准</p></div>';
}

function initNavScroll() {
  var nav = document.getElementById("nav");
  if (!nav) return;
  window.addEventListener("scroll", function() { nav.classList.toggle("scrolled", window.scrollY > 10); });
}

function initScrollProgress() {
  var bar = document.createElement("div"); bar.className = "scroll-progress"; bar.id = "scrollProgress";
  document.body.prepend(bar);
  window.addEventListener("scroll", function() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + "%";
  });
}

function initRipple() {
  document.addEventListener("click", function(e) {
    var target = e.target.closest(".btn, .tag");
    if (!target) return;
    var ripple = document.createElement("span"); ripple.className = "ripple-effect";
    var rect = target.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
    ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
    target.appendChild(ripple);
    ripple.addEventListener("animationend", function() { ripple.remove(); });
  });
}

function initCardTilt() {
  document.querySelectorAll(".stat-card, .card-accent").forEach(function(card) {
    card.addEventListener("mousemove", function(e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left, y = e.clientY - rect.top;
      var cx = rect.width / 2, cy = rect.height / 2;
      var rx = ((y - cy) / cy) * -4, ry = ((x - cx) / cx) * 4;
      card.style.transform = "perspective(1000px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateY(-4px)";
      card.style.boxShadow = "0 20px 50px rgba(0,0,0,0.12)";
    });
    card.addEventListener("mouseleave", function() {
      card.style.transform = ""; card.style.boxShadow = "";
    });
  });
}

function animateCounters() {
  document.querySelectorAll(".counter").forEach(function(el) {
    var target = parseInt(el.getAttribute("data-target"), 10);
    if (isNaN(target)) return;
    var duration = 1500, start = null;
    function tick(now) {
      if (!start) start = now;
      var elapsed = now - start, progress = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString();
    }
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) { if (entry.isIntersecting) { requestAnimationFrame(tick); observer.unobserve(el); } });
    }, { threshold: 0.5 });
    observer.observe(el);
  });
}

function initTimelineReveal() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } });
  }, { threshold: 0.2 });
  document.querySelectorAll(".timeline-item").forEach(function(el) { observer.observe(el); });
}

function initFAQ() {
  document.querySelectorAll(".faq-question").forEach(function(btn) {
    btn.addEventListener("click", function() {
      var item = btn.closest(".faq-item"), wasActive = item.classList.contains("active");
      document.querySelectorAll(".faq-item.active").forEach(function(i) { i.classList.remove("active"); });
      if (!wasActive) item.classList.add("active");
    });
  });
}

function observeAnimate() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) { if (entry.isIntersecting) { entry.target.classList.add("animate-in"); observer.unobserve(entry.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll(".animate-on-scroll").forEach(function(el) { observer.observe(el); });
}

function initBackToTop() {
  var btn = document.createElement("button"); btn.className = "back-to-top";
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>';
  btn.setAttribute("aria-label", "回到顶部"); document.body.appendChild(btn);
  window.addEventListener("scroll", function() { btn.classList.toggle("visible", window.scrollY > 300); });
  btn.addEventListener("click", function() { window.scrollTo({ top: 0, behavior: "smooth" }); });
}

function showToast(message, duration) {
  duration = duration || 2500;
  var existing = document.querySelector(".toast"); if (existing) existing.remove();
  var toast = document.createElement("div"); toast.className = "toast"; toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(function() { toast.classList.add("visible"); });
  setTimeout(function() { toast.classList.remove("visible"); setTimeout(function() { toast.remove(); }, 400); }, duration);
}

function initPageTransitions() {
  var overlay = document.createElement("div"); overlay.className = "page-transition"; document.body.appendChild(overlay);
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

document.addEventListener("DOMContentLoaded", function() {
  renderNav();
  renderFooter();
  initNavScroll();
  initScrollProgress();
  initRipple();
  initCardTilt();
  animateCounters();
  initTimelineReveal();
  initFAQ();
  observeAnimate();
  initBackToTop();
  initPageTransitions();
  console.log("UI Enhanced");
});