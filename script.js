function applyFilters() {
  const length = document.getElementById("lengthFilter").value;
  const cost = document.getElementById("costFilter").value;
  const type = document.getElementById("typeFilter").value;
  const packages = document.querySelectorAll(".package");
  let visibleCount = 0;

  packages.forEach(pkg => {
    const match =
      (!length || pkg.dataset.length === length) &&
      (!cost || pkg.dataset.cost === cost) &&
      (!type || pkg.dataset.type === type);

    if (match) {
      pkg.classList.remove("fade-out");
      pkg.classList.add("fade-in");
      pkg.style.display = "block";
      visibleCount++;
    } else {
      pkg.classList.remove("fade-in");
      pkg.classList.add("fade-out");
      setTimeout(() => {
        pkg.style.display = "none";
      }, 300);
    }
  });

  updateVisibleCount(visibleCount);
}

function resetFilters() {
  document.getElementById("lengthFilter").value = "";
  document.getElementById("costFilter").value = "";
  document.getElementById("typeFilter").value = "";

  const packages = document.querySelectorAll(".package");
  packages.forEach(pkg => {
    pkg.classList.remove("fade-out");
    pkg.classList.add("fade-in");
    pkg.style.display = "block";
  });

  updateVisibleCount(packages.length);
}

function updateVisibleCount(count) {
  let counter = document.getElementById("visibleCount");
  if (!counter) {
    counter = document.createElement("div");
    counter.id = "visibleCount";
    counter.style.textAlign = "center";
    counter.style.margin = "10px";
    counter.style.fontWeight = "bold";
    document.body.insertBefore(counter, document.querySelector(".grid"));
  }
  counter.textContent = `Showing ${count} vacation package${count !== 1 ? "s" : ""}`;
}

// Add tooltips and keyboard navigation
document.addEventListener("DOMContentLoaded", () => {
  const applyBtn = document.querySelector("button[onclick='applyFilters()']");
  const resetBtn = document.querySelector("button[onclick='resetFilters()']");
  if (applyBtn) applyBtn.title = "Apply selected filters to the vacation packages";
  if (resetBtn) resetBtn.title = "Reset all filters and show all packages";

  // Add keyboard navigation
  const packages = document.querySelectorAll(".package a");
  packages.forEach(link => {
    link.setAttribute("tabindex", "0");
  });

  // Initialize visible count
  updateVisibleCount(document.querySelectorAll(".package").length);
});
