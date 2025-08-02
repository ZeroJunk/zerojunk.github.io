let specialsData = [];

window.onload = function() {
  fetch("restaurant_specials.csv")
    .then(response => response.text())
    .then(text => {
      const rows = text.trim().split('\n').map(row => row.split(','));
      const headers = rows[0].map(h => h.trim());
      specialsData = rows.slice(1).map(row => {
        let obj = {};
        row.forEach((value, i) => {
          obj[headers[i]] = value.trim();
        });
        return obj;
      });

      populateFilters(specialsData);
      displayResults(specialsData);
    })
    .catch(error => {
      document.getElementById("results").innerHTML = "<p>Error loading CSV file.</p>";
      console.error("CSV load error:", error);
    });
};

function populateFilters(data) {
  const fields = ["City", "Neighbourhood", "Weekday", "Cuisine"];
  fields.forEach(field => {
    const select = document.getElementById(field.toLowerCase() + "Filter");
    select.innerHTML = `<option value="">All ${field}s</option>`;
    const uniqueValues = [...new Set(data.map(item => item[field]))].sort();
    uniqueValues.forEach(value => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  });
}

function applyFilters() {
  const city = document.getElementById("cityFilter").value;
  const neighbourhood = document.getElementById("neighbourhoodFilter").value;
  const weekday = document.getElementById("weekdayFilter").value;
  const cuisine = document.getElementById("cuisineFilter").value;
  const time = document.getElementById("timeFilter").value;

  const filtered = specialsData.filter(item => {
    return (!city || item.City === city) &&
           (!neighbourhood || item.Neighbourhood === neighbourhood) &&
           (!weekday || item.Weekday === weekday) &&
           (!cuisine || item.Cuisine === cuisine) &&
           (!time || (item.StartTime <= time && item.EndTime >= time));
  });

  displayResults(filtered);
}

function clearFilters() {
  document.getElementById("cityFilter").value = "";
  document.getElementById("neighbourhoodFilter").value = "";
  document.getElementById("weekdayFilter").value = "";
  document.getElementById("cuisineFilter").value = "";
  document.getElementById("timeFilter").value = "";
  displayResults(specialsData);
}

function displayResults(data) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (data.length === 0) {
    resultsDiv.innerHTML = "<p>No specials found.</p>";
    return;
  }

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "result-card";
    card.innerHTML = `
      <strong>${item.Restaurant}</strong><br>
      ${item.Description}<br>
      <em>${item.City}, ${item.Neighbourhood}</em><br>
      ${item.Weekday} | ${item.StartTime} - ${item.EndTime}<br>
      ${item.Cuisine} | ${item.Price}
    `;
    resultsDiv.appendChild(card);
  });
}
