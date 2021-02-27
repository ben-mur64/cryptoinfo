/* Global Results */

document.getElementById("global-submit").addEventListener("click", function(event) {
  event.preventDefault();

  const url = "https://api.coinlore.net/api/global/"

  fetch(url)
  .then(function(response) {
      return response.json();
  }).then(function(json) {
    console.log(json);
    let results = "";

    results += "<h2>Global Crypto Data</h2>"
    results += "<div class='row'>"
    results += "<div class='col-12 col-sm-3 coin-block'><h3>Active Markets:</h3><p> " + json[0].active_markets + "</p></div>";
    results += "<div class='col-12 col-sm-3 coin-block'><h3>Average Percent Change:</h3><p> " + json[0].avg_change_percent + "%</p></div>";
    results += "<div class='col-12 col-sm-3 coin-block'><h3>Number of Coins:</h3><p> " + json[0].coins_count + "</p></div>";
    results += "<div class='col-12 col-sm-3 coin-block'><h3>Total Market Cap:</h3><p> $" + json[0].total_mcap + "</p></div>";
    results += "</div>"
    document.getElementById("results").innerHTML = results;
  });
});

/* Top Coins */

document.getElementById("top-submit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = parseInt(document.getElementById("top-input").value);
  if (value === "" || value < 1 || value > 200 || isNaN(value)) {
    console.log("Failed with " + value)
    document.getElementById("results").innerHTML = "Please input an integer between 1 and 200.";
    return;
  }
  console.log(value);

  const url = "https://api.coinlore.net/api/tickers/?limit=" + value;

  fetch(url)
  .then(function(response) {
      return response.json();
  }).then(function(json) {
    console.log(json);
    let results = "";

    results += "<div class='row'>";
    for (let i = 0; i < json.data.length; i++) {
      results += "<div class='col-12 col-md-3 coin-block mx-auto'>";
      results += "<h3 class='coin-title'>" + json.data[i].name + " - $" + json.data[i].symbol + "</h3>";
      results += "<p>Rank: <strong>" + json.data[i].rank + "</strong></p>";
      results += "<p>Price in USD: <strong>$" + json.data[i].price_usd + "</strong></p>";
      if (parseFloat(json.data[i].percent_change_1h) > 0) {
        results += "<p>Last Hour: <strong class='up'>" + json.data[i].percent_change_1h + " % &#8593</strong></p>";
      }
      else {
        results += "<p>Last Hour: <strong class='down'>" + json.data[i].percent_change_1h + " % &#8595</strong></p>";
      }
      if (parseFloat(json.data[i].percent_change_24h) > 0) {
        results += "<p>Last Day: <strong class='up'>" + json.data[i].percent_change_24h + " % &#8593</strong></p>";
      }
      else {
        results += "<p>Last Day: <strong class='down'>" + json.data[i].percent_change_24h + " % &#8595</strong></p>";
      }
      if (parseFloat(json.data[i].percent_change_7d) > 0) {
        results += "<p>Last Week: <strong class='up'>" + json.data[i].percent_change_7d + " % &#8593</strong></p>";
      }
      else {
        results += "<p>Last Week: <strong class='down'>" + json.data[i].percent_change_7d + " % &#8595</strong></p>";
      }
      results += "</div>"
    }
    results += "</div>";

    document.getElementById("results").innerHTML = results;
  });


});

/* Specific Coin */

document.getElementById("specific-submit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("specific-input").value;
  if (value === "") {
    return;
  }
  console.log(value);

  const url = "https://api.coinlore.net/api/tickers/";
  document.getElementById("results").innerHTML = "<p>Loading ... </p>";

  fetch(url)
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    console.log(json);

    let id = null;
    for (let i = 0; i < json.data.length; i++) {
      if (json.data[i].name == value) {
        id = json.data[i].id;
        break;
      }
      else if (json.data[i].symbol == value) {
        id = json.data[i].id;
        break;
      }
    }

    if (id == null) {
      console.log("Failed with " + value)
      document.getElementById("results").innerHTML = "<p>Coin not found in top 100.</p>";
      return;
    }

    const url2 = "https://api.coinlore.net/api/ticker/?id=" + id;

    fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      let results = "";
      results += "<div class='coin-block mx-auto'>";
      results += "<h3 class='coin-title'>" + json[0].name + " - $" + json[0].symbol + "</h3>";
      results += "<p>Rank: <strong>" + json[0].rank + "</strong></p>";
      results += "<p>Price in USD: <strong>$" + json[0].price_usd + "</strong></p>";
      if (parseFloat(json[0].percent_change_1h) > 0) {
        results += "<p>Last Hour: <strong class='up'>" + json[0].percent_change_1h + " % &#8593</strong></p>";
      }
      else {
        results += "<p>Last Hour: <strong class='down'>" + json[0].percent_change_1h + " % &#8595</strong></p>";
      }
      if (parseFloat(json[0].percent_change_24h) > 0) {
        results += "<p>Last Day: <strong class='up'>" + json[0].percent_change_24h + " % &#8593</strong></p>";
      }
      else {
        results += "<p>Last Day: <strong class='down'>" + json[0].percent_change_24h + " % &#8595</strong></p>";
      }
      if (parseFloat(json[0].percent_change_7d) > 0) {
        results += "<p>Last Week: <strong class='up'>" + json[0].percent_change_7d + " % &#8593</strong></p>";
      }
      else {
        results += "<p>Last Week: <strong class='down'>" + json[0].percent_change_7d + " % &#8595</strong></p>";
      }
      results += "</div>"

    document.getElementById("results").innerHTML = results;

    });
  })
});
