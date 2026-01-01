const search = document.getElementById("search");
const result = document.getElementById("result");

let states = [];
let cities = [];
let indiaTotal = {};
let dataLoaded = false;

function loadData() {
  fetch("https://api.rootnet.in/covid19-in/stats/latest")
    .then(res => res.json())
    .then(data => {
      const totalIndia = data.data.summary;
      indiaTotal = {
        confirmed: totalIndia.total,
        recovered: totalIndia.discharged,
        deaths: totalIndia.deaths,
        active: totalIndia.total - totalIndia.discharged - totalIndia.deaths
      };
          states = data.data.regional;
          dataLoaded = true;
          showIndiaTotal();
    })
    .catch(err => console.log("Something went wrong: " + err));

  fetch("json/data.min.json")
    .then(res => res.json())
    .then(cityData => {
      for (const code in cityData) {
        const stateObj = cityData[code];
        if (!stateObj.districts){
          continue;
        } 

        let stateName = stateObj.meta?.state || "Unknown";

        const stateMapping = {
          "NCT of Delhi": "Delhi",
          "Orissa": "Odisha",
          "Dadra and Nagar Haveli and Daman and Diu": "Dadra & Nagar Haveli and Daman & Diu"
        };
        if (stateMapping[stateName]) stateName = stateMapping[stateName];

        Object.keys(stateObj.districts).forEach(city => {
          const total = stateObj.districts[city].total || {};
          cities.push({
            name: city.toLowerCase(),
            display: city,
            state: stateName, 
            confirmed: total.confirmed || 0,
            recovered: total.recovered || 0,
            deaths: total.deceased || 0
          });
        });
      }
    })
    .catch(err => console.log("City JSON not loaded. " + err));
}

function showIndiaTotal() {
  result.innerHTML = `
    <div class="covid-card">
      <h3>India (Total)</h3>
      <p class="confirmed">Confirmed: ${indiaTotal.confirmed}</p>
      <p class="active">Active: ${indiaTotal.active}</p>
      <p class="recovered">Recovered: ${indiaTotal.recovered}</p>
      <p class="deaths">Deaths: ${indiaTotal.deaths}</p>
    </div>
  `;
}

search.addEventListener("input", function () {
  if (!dataLoaded) {
    result.innerHTML = "<h3>Loading data, please wait...</h3>";
    return;
  }

  const value = search.value.trim().toLowerCase();
      if (!value) {
        showIndiaTotal();
        return;
      }

  let html = "";

  const cityMatch = cities.filter(c => c.name.includes(value));
  if (cityMatch.length > 0) {
    cityMatch.slice(0, 5).forEach(c => {
      const active = c.confirmed - c.recovered - c.deaths;
      html += `
        <div class="covid-card">
          <h3>${c.display}</h3>
          <p class="confirmed">Confirmed: ${c.confirmed}</p>
          <p class="active">Active: ${active < 0 ? 0 : active}</p>
          <p class="recovered">Recovered: ${c.recovered}</p>
          <p class="deaths">Deaths: ${c.deaths}</p>
        </div>
      `;
    });
    result.innerHTML = html;
    return;
  }

  const stateMatch = states.filter(s => s.loc.toLowerCase().includes(value));
  if (stateMatch.length > 0) {
    stateMatch.forEach(s => {
      const active = s.totalConfirmed - s.discharged - s.deaths;

      const citiesInState = cities
        .filter(c => c.state.toLowerCase().trim() === s.loc.toLowerCase().trim())
        .slice(0, 5);

      let cityHtml = "";
      citiesInState.forEach(c => {
        const activeCity = c.confirmed - c.recovered - c.deaths;
        cityHtml += `<p>${c.display} → Confirmed: <b>${c.confirmed}</b>, Active: <b>${activeCity < 0 ? 0 : activeCity}</b>, Recovered: <b>${c.recovered}</b>, Deaths: <b>${c.deaths}</b></p>`;
      });

      html += `
        <div class="covid-card">
          <h3>${s.loc}</h3>
          <p class="confirmed">Confirmed: ${s.totalConfirmed}</p>
          <p class="active">Active: ${active < 0 ? 0 : active}</p>
          <p class="recovered">Recovered: ${s.discharged}</p>
          <p class="deaths">Deaths: ${s.deaths}</p>
          ${cityHtml}
        </div>
      `;
    });
    result.innerHTML = html;
    return;
  }

  result.innerHTML = `<h3> State or City not found</h3>`;
});

loadData();
