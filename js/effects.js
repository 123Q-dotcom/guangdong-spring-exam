// ============================================================
//   PREMIUM VISUAL FX — Orb, Glare, Mirror, Tilt
// ============================================================

// ----- 1. CURSOR GLOW ORB -----
(function() {
  var orb = document.createElement("div");
  orb.id = "cursorOrb";
  orb.style.cssText = "position:fixed;width:320px;height:320px;border-radius:50%;pointer-events:none;z-index:0;background:radial-gradient(circle,oklch(0.52 0.16 330 / 0.18),oklch(0.68 0.16 82 / 0.06) 45%,transparent 70%);filter:blur(40px);transform:translate(-50%,-50%);transition:opacity 0.4s;opacity:0;";
  document.body.prepend(orb);
  var timeout;
  document.addEventListener("mousemove", function(e) {
    orb.style.opacity = "1";
    orb.style.left = e.clientX + "px";
    orb.style.top = e.clientY + "px";
    clearTimeout(timeout);
    timeout = setTimeout(function() { orb.style.opacity = "0"; }, 1500);
  }, { passive: true });
})();

// ----- 2. 3D TILT CARD + GLARE -----
function initTiltGlare() {
  document.querySelectorAll(".tilt-card").forEach(function(card) {
    // Create glare layer
    var glare = document.createElement("div");
    glare.className = "card-glare";
    card.appendChild(glare);

    card.addEventListener("mousemove", function(e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var cx = rect.width / 2, cy = rect.height / 2;
      var rx = ((y - cy) / cy) * -12;
      var ry = ((x - cx) / cx) * 12;
      card.style.transform = "perspective(1000px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) scale3d(1.02,1.02,1.02)";
      card.style.boxShadow = "0 25px 60px rgb(0 0 0 / 0.5), 0 0 80px oklch(0.52 0.16 330 / 0.15)";
      var gx = (x / rect.width) * 100;
      var gy = (y / rect.height) * 100;
      glare.style.background = "radial-gradient(circle at " + gx + "% " + gy + "%, oklch(1 0 0 / 0.15) 0%, transparent 60%)";
      glare.style.opacity = "1";
    });
    card.addEventListener("mouseleave", function() {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)";
      card.style.boxShadow = "";
      glare.style.opacity = "0";
    });
  });
}

// ----- 3. DIAGONAL LIGHT SWEEP -----
function initLightSweep() {
  document.querySelectorAll(".sweep-card").forEach(function(card) {
    card.addEventListener("mousemove", function(e) {
      var rect = card.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      card.style.setProperty("--sweep-x", x + "%");
    });
    card.addEventListener("mouseleave", function() {
      card.style.setProperty("--sweep-x", "-100%");
    });
  });
}

// ----- 4. MAGNETIC BUTTONS -----
function initMagnetic() {
  document.querySelectorAll(".magnetic").forEach(function(el) {
    el.addEventListener("mousemove", function(e) {
      var rect = el.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = "translate(" + (x * 0.3) + "px, " + (y * 0.3) + "px)";
    });
    el.addEventListener("mouseleave", function() {
      el.style.transform = "translate(0, 0)";
    });
  });
}

document.addEventListener("DOMContentLoaded", function() {
  initTiltGlare();
  initLightSweep();
  initMagnetic();
});