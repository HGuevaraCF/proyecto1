let currencyDom = document.getElementById('currency');
let dateTimeDom = document.getElementById('time');

const API_KEY = '8ad7da8b94bef48aac8fa7b852c76819';




function getAPIData() {
    fetch(`http://data.fixer.io/api/latest?access_key=${API_KEY}&base=EUR`)
        .then(res => res.json()).then(data => {
            console.log(data);
            currentTimeDate();

          let { EUR, MXN, USD } = data.rates;

            console.log(EUR);
            console.log(MXN);
            console.log(USD);

            let currencyExchUSDtoEUR = (EUR / USD).toFixed(2);
            let currencyExchUSDtoMXN = (currencyExchUSDtoEUR * MXN).toFixed(2);
            let currencyExchUSD = (USD / USD);
            console.log(currencyExchUSDtoMXN);
            console.log(currencyExchUSDtoEUR);
            console.log(currencyExchUSD);
    

            currencyDom.innerHTML =

                `   
                    <h2> Todays dollar price </h2>
                    <p id="unitatedStatesDollar">Dollar: ${currencyExchUSD}</p>
                    <p id="mexicanPeso">Mexican Peso: ${currencyExchUSDtoMXN}</p>
                    <p id="euro">Euro: ${currencyExchUSDtoEUR}</p> 
               `

        });
}


getAPIData();
function currentTimeDate() {
    
    var dateEl = new Date().toLocaleString("en-US");
    dateTimeDom.innerHTML = dateEl;

}
setInterval(currentTimeDate, 1000);


