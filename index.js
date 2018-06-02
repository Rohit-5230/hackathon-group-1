var Result;
var Coins = {"BTC":"","LTC":"","XRP":"","ETH":"","DASH":""};
const CoinName = Object.keys(Coins);
var Myportfolio = {"walletvalue":"10000000","TotalValue":"0"};
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

function Buy(){
	result = parseInt(window.prompt("How many BTC Coins you wish to Purchase?", "1"));
	Coins.BTC.INR = getCoin("BTC");
	console.log(parseInt(Coins.BTC.INR));
	if(result * Coins.BTC.INR > Myportfolio.TotalValue)
		alert("Your wallet doesn't has enough Cash!")
	else{
		Myportfolio.BTC = {"numofcoins":result,"value":result*Coins.BTC.INR};
		Myportfolio.TotalValue = Myportfolio.TotalValue - result*Coins.BTC.INR;
	}
}
console.log(Myportfolio);