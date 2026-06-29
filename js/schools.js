// ===== Schools Page Logic =====
(function () {
  var allSchools = [];
  var currentRegion = "全部";
  var currentType = "全部";
  var currentSearch = "";

  function renderCards(data) {
    var container = document.getElementById("schoolCards");

    if (data.length === 0) {
      container.innerHTML = '<p class="text-center text-secondary" style="grid-column:1/-1;padding:var(--spacing-2xl);">暂无匹配院校</p>';
      return;
    }

    container.innerHTML = data
      .map(function (s) {
        var typeTag = s.type === "职业本科" ? "tag-primary" : "tag-success";
        var majorsHtml = s.majors
          .map(function (m) {
            return '<span class="tag" style="font-size:0.7rem;padding:2px 8px;">' + m + "</span>";
          })
          .join(" ");

        return (
          '<div class="card">' +
          "<h3 class=\"card-title\">" + s.name + "</h3>" +
          '<div class="tag-group" style="margin-bottom:var(--spacing-sm);">' +
          '<span class="tag ' + typeTag + '">' + s.type + "</span>" +
          '<span class="tag">' + s.region + "</span>" +
          '<span class="tag tag-warning">' + s.feature + "</span>" +
          "</div>" +
          '<p class="card-text">' + s.description + "</p>" +
          '<div class="tag-group" style="margin-top:var(--spacing-sm);">' + majorsHtml + "</div>" +
          '<a href="' + s.website + '" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="margin-top:var(--spacing-md);">访问官网</a>' +
          "</div>"
        );
      })
      .join("");
  }

  function applyFilters() {
    var filtered = allSchools;

    if (currentRegion !== "全部") {
      filtered = filtered.filter(function (s) {
        return s.region === currentRegion;
      });
    }

    if (currentType !== "全部") {
      filtered = filtered.filter(function (s) {
        return s.type === currentType;
      });
    }

    if (currentSearch.trim()) {
      var q = currentSearch.trim().toLowerCase();
      filtered = filtered.filter(function (s) {
        return (
          s.name.toLowerCase().indexOf(q) !== -1 ||
          s.description.toLowerCase().indexOf(q) !== -1
        );
      });
    }

    renderCards(filtered);
  }

  // Init
  var searchInput = document.getElementById("schoolSearch");
  var regionTags = document.getElementById("schoolRegionTags");
  var typeTags = document.getElementById("schoolTypeTags");

  if (!searchInput) return;

  fetch("data/schools.json")
    .then(function (r) {
      return r.json();
    })
    .then(function (data) {
      allSchools = data;
      renderCards(data);
    })
    .catch(function () {
      document.getElementById("schoolCards").innerHTML =
        '<p class="text-center text-secondary" style="grid-column:1/-1;padding:var(--spacing-2xl);">加载失败，请刷新重试</p>';
    });

  // Event listeners
  searchInput.addEventListener("input", function () {
    currentSearch = this.value;
    applyFilters();
  });

  if (regionTags) {
    regionTags.addEventListener("click", function (e) {
      var tag = e.target.closest(".tag");
      if (!tag) return;
      currentRegion = tag.getAttribute("data-region");
      regionTags.querySelectorAll(".tag").forEach(function (t) {
        t.classList.toggle("active", t.getAttribute("data-region") === currentRegion);
      });
      applyFilters();
    });
  }

  if (typeTags) {
    typeTags.addEventListener("click", function (e) {
      var tag = e.target.closest(".tag");
      if (!tag) return;
      currentType = tag.getAttribute("data-type");
      typeTags.querySelectorAll(".tag").forEach(function (t) {
        t.classList.toggle("active", t.getAttribute("data-type") === currentType);
      });
      applyFilters();
    });
  }
})();
