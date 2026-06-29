// ============================================================
//   BRAND INTERACTIONS
// ============================================================

function initCardGlow() {
  document.querySelectorAll(".card").forEach(function(card) {
    card.addEventListener("mousemove", function(e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", ((e.clientX - r.left) / r.width * 100) + "%");
      card.style.setProperty("--mouse-y", ((e.clientY - r.top) / r.height * 100) + "%");
    });
  });
}

function renderNav() {
  var nav = document.getElementById("nav"); if (!nav) return;
  var cp = window.location.pathname.split("/").pop() || "index.html";
  var links = [
    { href: "./", text: "首页" },{ href: "policy.html", text: "政策解读" },
    { href: "registration.html", text: "报名流程" },{ href: "subjects.html", text: "考试科目" },
    { href: "scores.html", text: "分数线" },{ href: "schools.html", text: "院校招生" },
    { href: "resources.html", text: "备考资料" }
  ];
  var h = links.map(function(l) {
    var a = cp === l.href.replace("/","") || (cp === "index.html" && l.href === "./");
    return '<a href="'+l.href+'" class="'+(a?"active":"")+'">'+l.text+'</a>';
  }).join("");
  nav.innerHTML = '<div class="nav-container"><a href="./" class="nav-brand"><span class="nav-brand-dot"></span>春季高考</a><div class="nav-links" id="navLinks">'+h+'<button class="nav-search-btn" id="navSearchBtn" aria-label="搜索"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></button></div><button class="nav-hamburger" id="navHamburger" aria-label="菜单"><span></span><span></span><span></span></button></div>';
  var hb = document.getElementById("navHamburger"), nl = document.getElementById("navLinks");
  if (hb && nl) {
    hb.addEventListener("click", function() { hb.classList.toggle("active"); nl.classList.toggle("active"); });
    nl.querySelectorAll("a").forEach(function(a) { a.addEventListener("click", function() { hb.classList.remove("active"); nl.classList.remove("active"); }); });
    document.addEventListener("click", function(e) { if (!nav.contains(e.target)) { hb.classList.remove("active"); nl.classList.remove("active"); } });
  }
}

function renderFooter() {
  var f = document.getElementById("footer"); if (!f) return;
  f.innerHTML = '<div class="container"><p>&copy; '+new Date().getFullYear()+' 广东省春季高考资讯平台 · 仅供参考，以官方通知为准</p></div>';
}

function initNavScroll() {
  var n = document.getElementById("nav"); if (!n) return;
  window.addEventListener("scroll", function() { n.classList.toggle("scrolled", window.scrollY > 20); });
}

function initScrollProgress() {
  var b = document.createElement("div"); b.className = "scroll-progress"; document.body.prepend(b);
  window.addEventListener("scroll", function() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    b.style.width = h > 0 ? (window.scrollY / h * 100) + "%" : "0%";
  });
}

function animateCounters() {
  document.querySelectorAll(".counter").forEach(function(el) {
    var t = parseInt(el.getAttribute("data-target"), 10); if (isNaN(t)) return;
    var d = 1800, s = null;
    function tick(now) { if(!s) s=now; var p=Math.min((now-s)/d,1), e=1-Math.pow(1-p,3); el.textContent=Math.floor(e*t).toLocaleString(); if(p<1) requestAnimationFrame(tick); else el.textContent=t.toLocaleString(); }
    var o = new IntersectionObserver(function(es) { es.forEach(function(e) { if(e.isIntersecting) { requestAnimationFrame(tick); o.unobserve(el); } }); }, {threshold:0.3});
    o.observe(el);
  });
}

function initTimelineReveal() {
  var o = new IntersectionObserver(function(es) { es.forEach(function(e) { if(e.isIntersecting) { e.target.classList.add("visible"); o.unobserve(e.target); } }); }, {threshold:0.15});
  document.querySelectorAll(".timeline-item").forEach(function(el) { o.observe(el); });
}

function initFAQ() {
  document.querySelectorAll(".faq-question").forEach(function(b) {
    b.addEventListener("click", function() {
      var item = b.closest(".faq-item"), was = item.classList.contains("active");
      document.querySelectorAll(".faq-item.active").forEach(function(i) { i.classList.remove("active"); });
      if (!was) item.classList.add("active");
    });
  });
}

function observeAnimate() {
  var o = new IntersectionObserver(function(es) { es.forEach(function(e) { if(e.isIntersecting) { e.target.classList.add("animate-in"); o.unobserve(e.target); } }); }, {threshold:0.1});
  document.querySelectorAll(".animate-on-scroll").forEach(function(el) { o.observe(el); });
}

function initBackToTop() {
  var b = document.createElement("button"); b.className = "back-to-top";
  b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>';
  b.setAttribute("aria-label","回到顶部"); document.body.appendChild(b);
  window.addEventListener("scroll", function() { b.classList.toggle("visible", window.scrollY > 400); });
  b.addEventListener("click", function() { window.scrollTo({top:0,behavior:"smooth"}); });
}

function showToast(msg, dur) {
  dur = dur || 2500; var old = document.querySelector(".toast"); if (old) old.remove();
  var t = document.createElement("div"); t.className = "toast"; t.textContent = msg; document.body.appendChild(t);
  requestAnimationFrame(function() { t.classList.add("visible"); });
  setTimeout(function() { t.classList.remove("visible"); setTimeout(function() { t.remove(); }, 400); }, dur);
}

function initPageTransitions() {
  var overlay = document.createElement("div"); overlay.className = "page-transition"; document.body.appendChild(overlay);
  document.querySelectorAll("a[href]").forEach(function(l) {
    var href = l.getAttribute("href"); if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:")) return;
    l.addEventListener("click", function(e) { if (e.metaKey || e.ctrlKey) return; e.preventDefault(); overlay.classList.add("active"); setTimeout(function() { window.location.href = href; }, 400); });
  });
}

document.addEventListener("DOMContentLoaded", function() {
  renderNav(); renderFooter(); initNavScroll(); initScrollProgress(); initCardGlow();
  animateCounters(); initTimelineReveal(); initFAQ(); observeAnimate(); initBackToTop(); initPageTransitions();
});