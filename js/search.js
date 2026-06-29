// ===== Full-site Search =====
(function () {
  let searchIndex = [];
  let overlayEl = null;
  let inputEl = null;
  let resultsEl = null;
  let debounceTimer = null;

  // Data source configs
  const dataSources = [
    { url: "data/policies.json", page: "政策解读", pageUrl: "policy.html", map: (item) => ({ title: item.title, snippet: item.summary, url: "policy.html?id=" + item.id, page: "政策解读" }) },
    { url: "data/subjects.json", page: "考试科目", pageUrl: "subjects.html", map: (item) => ({ title: item.name + "考试大纲", snippet: item.outline, url: "subjects.html", page: "考试科目" }) },
    { url: "data/schools.json", page: "院校招生", pageUrl: "schools.html", map: (item) => ({ title: item.name, snippet: item.description, url: "schools.html", page: "院校招生" }) },
    { url: "data/scores.json", page: "分数线", pageUrl: "scores.html", map: (item) => ({ title: item.school + " (" + item.year + ")", snippet: "最低分: " + item.minScore + " 平均分: " + item.avgScore, url: "scores.html", page: "分数线" }) },
    { url: "data/resources.json", page: "备考资料", pageUrl: "resources.html", map: (item) => ({ title: item.title, snippet: item.description, url: "resources.html", page: "备考资料" }) },
  ];

  async function buildIndex() {
    try {
      const results = await Promise.allSettled(
        dataSources.map((ds) =>
          fetch(ds.url)
            .then((r) => r.json())
            .then((data) => data.map(ds.map))
            .catch(() => [])
        )
      );
      searchIndex = results
        .filter((r) => r.status === "fulfilled")
        .flatMap((r) => r.value);
    } catch (e) {
      console.warn("Search index build failed:", e);
    }
  }

  function createOverlay() {
    if (document.getElementById("searchOverlay")) return;

    overlayEl = document.createElement("div");
    overlayEl.className = "search-overlay";
    overlayEl.id = "searchOverlay";
    overlayEl.innerHTML = `
      <div class="search-box">
        <input type="text" id="searchInput" placeholder="搜索政策、科目、院校、分数线..." autocomplete="off">
        <div class="search-results" id="searchResults"></div>
      </div>
    `;
    document.body.appendChild(overlayEl);

    inputEl = document.getElementById("searchInput");
    resultsEl = document.getElementById("searchResults");

    // Input handler with debounce
    inputEl.addEventListener("input", () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => performSearch(inputEl.value.trim()), 200);
    });

    // ESC to close
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeOverlay();
    });

    // Click outside to close
    overlayEl.addEventListener("click", (e) => {
      if (e.target === overlayEl) closeOverlay();
    });
  }

  function openOverlay() {
    if (!overlayEl) createOverlay();
    overlayEl.classList.add("active");
    inputEl.value = "";
    resultsEl.innerHTML = "";
    setTimeout(() => inputEl.focus(), 100);
  }

  function closeOverlay() {
    if (overlayEl) overlayEl.classList.remove("active");
  }

  function performSearch(query) {
    if (!query || query.length < 1) {
      resultsEl.innerHTML = "";
      return;
    }

    const q = query.toLowerCase();
    const results = searchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(q) || item.snippet.toLowerCase().includes(q)
    );

    if (results.length === 0) {
      resultsEl.innerHTML = `<div class="search-result-empty">未找到与 "${escapeHtml(query)}" 相关的结果</div>`;
      return;
    }

    resultsEl.innerHTML = results
      .slice(0, 15)
      .map(
        (item) => `
        <a class="search-result-item" href="${item.url}">
          <div class="result-title">${highlightMatch(item.title, query)}</div>
          <div class="result-snippet">${highlightMatch(item.snippet, query)} · ${item.page}</div>
        </a>
      `
      )
      .join("");

    // Close overlay on result click
    resultsEl.querySelectorAll(".search-result-item").forEach((el) => {
      el.addEventListener("click", closeOverlay);
    });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function highlightMatch(text, query) {
    if (!query) return escapeHtml(text);
    const escaped = escapeHtml(text);
    const regex = new RegExp(`(${escapeRegex(query)})`, "gi");
    return escaped.replace(regex, '<mark style="background:rgba(0,113,227,0.15);color:var(--color-text);border-radius:2px;padding:1px 0;">$1</mark>');
  }

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // Bind to nav search button (delegated since nav is rendered dynamically)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("#navSearchBtn");
    if (btn) {
      e.preventDefault();
      openOverlay();
    }
  });

  // Build index on load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildIndex);
  } else {
    buildIndex();
  }
})();
