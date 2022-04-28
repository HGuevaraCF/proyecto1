var cripto = document.getElementById('cripto');
var ranking = document.getElementById('ranking');
var nameC = document.getElementById('name');
var priceCriptos = document.getElementById('priceCriptos');
var conversion = document.getElementById('conversion');

function getApiData (){
fetch(`https://api.coinpaprika.com/v1/tickers`)
	.then(response => response.json())
	.then(data => rankingCoinpaprika(data))
	.catch(err => console.error(err));

	
}

function rankingCoinpaprika (data){

	console.log(data);

	var total = 10_000;

	for (i = 0; i <= 9; i++) {
        var rank = data[i].rank;
        var nameCripto = data[i].name;
		var priceUSD = data[i].quotes.USD.price;

		var trEL = document.createElement('tr');
		var rankNumber = document.createElement('td');
        var nameEl = document.createElement('td');
		var priceEl = document.createElement('td');
		var conversionEl = document.createElement('td');
        
		cripto.appendChild(trEL);
		trEL.appendChild(rankNumber);
		trEL.appendChild(nameEl);
		trEL.appendChild(priceEl);
		trEL.appendChild(conversionEl);
		

		rankNumber.innerHTML = '#' + rank;
        nameEl.innerHTML = nameCripto;
		priceEl.innerHTML = '$ ' + priceUSD.toFixed(4);
		conversionEl.innerHTML = (total/priceUSD).toFixed(4);

    }
	
}

getApiData();