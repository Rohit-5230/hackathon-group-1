var Result;
var Coins = {"BTC":"","LTC":"","XRP":"","ETH":"","DASH":""};
const CoinName = Object.keys(Coins);
var Myportfolio = {"walletValue":10000000,"TotalValue":0};
var i;

function getCoin(name){
	function reqListener () {
		Result = JSON.parse(this.responseText);
		console.log(name,Result.INR);
		Coins[name]  = Result;
		document.getElementById(name).textContent = name + " : INR " + Coins[name].INR;
	}

	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", reqListener);
	oReq.open("GET", `https://min-api.cryptocompare.com/data/price?fsym=${name}&tsyms=USD,INR,EUR`);
	oReq.send();
}

CoinName.forEach(name => 
{
	getCoin(name);
});

console.log(Coins);

function Buy(name){
	result = parseInt(window.prompt(`How many ${name} Coins you wish to Purchase?`, "1"));
	if(result * Coins[name].INR > Myportfolio.walletValue)
		alert("Your wallet doesn't has enough Cash!")
	else{
		Myportfolio[name] = {"numofcoins":result,"value":result*Coins[name].INR};
		Myportfolio.walletValue = Myportfolio.walletValue - result*Coins[name].INR;
		Myportfolio.TotalValue = Myportfolio.TotalValue + result*Coins[name].INR;
		console.log(Myportfolio);
		var ul = document.getElementById("portfolio");
		var li = document.createElement('li');
		li.setAttribute('id',name);
		li.appendChild(document.createTextNode(name + " " + Myportfolio[name].numofcoins + " " + Myportfolio[name].value));
		ul.appendChild(li);
		document.getElementById("portfolioValue").textContent = JSON.stringify(Myportfolio.TotalValue);
	}
}
