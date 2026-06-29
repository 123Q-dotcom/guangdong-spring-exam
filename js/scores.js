// ===== Scores Page Logic =====
(function () {
  var allScores = [];
  var currentYear = "全部年份";
  var currentCategory = "全部";
  var currentSearch = "";

  function renderTable(data) {
    var tbody = document.getElementById("scoresTableBody");
    var mobileContainer = document.getElementById("scoresMobile");

    if (data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:var(--spacing-xl);color:var(--color-text-secondary);">暂无匹配数据</td></tr>';
      if (mobileContainer) mobileContainer.innerHTML = '<p class="text-center text-secondary" style="padding:var(--spacing-xl);">暂无匹配数据</p>';
      return;
    }

    // Desktop table
    tbody.innerHTML = data
      .map(function (item) {
        return (
          "<tr>" +
          "<td>" + item.year + "</td>" +
          "<td><strong>" + item.school + "</strong></td>" +
          "<td>" + item.category + "</td>" +
          '<td><span class="score-highlight" style="font-weight:600;">' + item.minScore + "</span></td>" +
          "<td>" + item.avgScore + "</td>" +
          "<td>" + item.region + "</td>" +
          "</tr>"
        );
      })
      .join("");

    // Mobile cards
    if (mobileContainer) {
      mobileContainer.innerHTML = data
        .map(function (item) {
          return (
            '<div class="table-card">' +
            '<div class="tc-row"><span class="tc-label">年份</span><span class="tc-value">' + item.year + "</span></div>" +
            '<div class="tc-row"><span class="tc-label">院校</span><span class="tc-value"><strong>' + item.school + "</strong></span></div>" +
            '<div class="tc-row"><span class="tc-label">类别</span><span class="tc-value">' + item.category + "</span></div>" +
            '<div class="tc-row"><span class="tc-label">最低分</span><span class="tc-value score-highlight" style="font-weight:600;">' + item.minScore + "</span></div>" +
            '<div class="tc-row"><span class="tc-label">平均分</span><span class="tc-value">' + item.avgScore + "</span></div>" +
            '<div class="tc-row"><span class="tc-label">地区</span><span class="tc-value">' + item.region + "</span></div>" +
            "</div>"
          );
        })
        .join("");
    }
  }

  function applyFilters() {
    var filtered = allScores;

    if (currentYear !== "全部年份") {
      filtered = filtered.filter(function (s) {
        return s.year === parseInt(currentYear);
      });
    }

    if (currentCategory !== "全部") {
      filtered = filtered.filter(function (s) {
        return s.category === currentCategory;
      });
    }

    if (currentSearch.trim()) {
      var q = currentSearch.trim().toLowerCase();
      filtered = filtered.filter(function (s) {
        return s.school.toLowerCase().indexOf(q) !== -1;
      });
    }

    renderTable(filtered);
  }

  // Init
  var yearSelect = document.getElementById("scoreYear");
  var schoolInput = document.getElementById("scoreSchool");
  var categoryTags = document.getElementById("scoreCategoryTags");

  if (!yearSelect || !schoolInput) return;

  fetch("data/scores.json")
    .then(function (r) {
      return r.json();
    })
    .then(function (data) {
      allScores = data;

      // Populate years
      var years = [];
      data.forEach(function (s) {
        if (years.indexOf(s.year) === -1) years.push(s.year);
      });
      years.sort().reverse();
      years.forEach(function (y) {
        var opt = document.createElement("option");
        opt.value = y;
        opt.textContent = y;
        yearSelect.appendChild(opt);
      });

      renderTable(data);
    })
    .catch(function () {
      document.getElementById("scoresTableBody").innerHTML =
        '<tr><td colspan="6" style="text-align:center;padding:var(--spacing-xl);color:var(--color-text-secondary);">加载失败，请刷新重试</td></tr>';
    });

  // Event listeners
  yearSelect.addEventListener("change", function () {
    currentYear = this.value;
    applyFilters();
  });

  schoolInput.addEventListener("input", function () {
    currentSearch = this.value;
    applyFilters();
  });

  if (categoryTags) {
    categoryTags.addEventListener("click", function (e) {
      var tag = e.target.closest(".tag");
      if (!tag) return;
      currentCategory = tag.getAttribute("data-category");
      categoryTags.querySelectorAll(".tag").forEach(function (t) {
        t.classList.toggle("active", t.getAttribute("data-category") === currentCategory);
      });
      applyFilters();
    });
  }
})();
