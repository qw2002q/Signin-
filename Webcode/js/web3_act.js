var web3;
var signin;

ReConnect();

function ReConnect()
{
	$("#leftinfo").append('<li>' + "Connecting..." +'</li>');

	//Connect
	if(typeof web != 'undefined'){
		web3 = new Web3(web3.currentProvider);
	} else {
 		 web3 = new Web3(new Web3.providers.HttpProvider(url));
	}

	//Check Connection
	if(!web3.isConnected())	{
		$("#leftinfo").append('<li>' + "Server Connect Fail" +'</li>');
	}	else {
		$("#leftinfo").append('<li>' + "Welcome to Online Course" +'</li>');

		//Contract Deployment
		var signinContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"viewStudentsAnswer","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"stop","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"ques","type":"string"}],"name":"ask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"viewMyAnswers","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"answ","type":"string"}],"name":"answerToQuestion","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"viewMyQuestions","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ques_index","type":"uint256"},{"name":"answ","type":"string"}],"name":"answerToStudent","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"viewStudentsQuestion","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"viewSigner","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"teacher","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"start","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"viewTeachersQuestion","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"viewCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"viewAnswersFrom","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"signin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]);
		signin = signinContract.at(contractAddress);
	}
}

function SigninUser(account, password)	//Sign in User
{
	if(!MapAccount(account)) return false;
	if(CheckSignUser(MapAccount(account), PasswordHash(password))) return true;

	return false;
}

function CheckSignUser(account, password)	//Check account and password correct
{
	if(account == account0 && password == password0)
		return true;
	if(account == account1 && password == password1)
		return true;
	if(account == account2 && password == password2)
		return true;

	return false;
}

//*** Button Action ***//
function Start(account, password)
{
	var txData = {
		from: MapAccount(account),
		gas: 3000000
	};

	web3.personal.unlockAccount(MapAccount(account), password);
	signin.start.sendTransaction(
		txData,
		(err,add)=>{
			console.log(err);
			return false;
		}
	);

	return true;
}

function Stop(account, password)
{
	var txData = {
		from: MapAccount(account)
	};

	web3.personal.unlockAccount(MapAccount(account), password);
	signin.stop.sendTransaction(
		txData,
		(err,add)=>{
			console.log(err);
			return false;
		}
	);

	return true;
}

function Signin(account, password)
{
	var txData = {
		from: MapAccount(account),
		gas: 300000
	};

	web3.personal.unlockAccount(MapAccount(account), password);
	signin.signin.sendTransaction(
		txData,
		(err,add)=>{
			console.log(err);
			return false;
		}
	);

	return true;
}

function Teacher()
{
	return inverseMapAccount(signin.teacher.call());
}

function Ask(account, password, str)
{
	var txData = {
		from: MapAccount(account),
		gas: 3000000
	};

	web3.personal.unlockAccount(MapAccount(account), password);
	signin.ask.sendTransaction(
		str,
		txData,
		(err,add)=>{
			console.log(err);
			return false;
		}
	)

	return true;
}

function AnswerToQuestion(account, password, answer)
{
	var txData = {
		from: MapAccount(account),
		gas: 300000
	};

	web3.personal.unlockAccount(MapAccount(account), password);
	signin.answerToQuestion.sendTransaction(
		answer,
		txData,
		(err,add)=>{
			console.log(err);
			return false;
		}
	)

	return true;
}

function AnswerToStudent(account,password,index,answer) {
	var txData = {
		from: MapAccount(account),
		gas: 300000
	};

	web3.personal.unlockAccount(MapAccount(account), password);
	signin.answerToStudent.sendTransaction(
		index,
		answer,
		txData,
		(err,add)=>{
			console.log(err);
			return false;
		}
	)

	return true;
}

function viewSigner(account)
{
	var str = "";
	var temp = signin.viewSigner.call();
	var i = 0;
	while(temp[i])
	{
		if(i != 0) str += ",";
		str += inverseMapAccount(temp[i]);
		i++;
	}
	return str;
}

function viewCount()
{
	return signin.viewCount.call();
}

function viewMyAnswers(account,password)
{
	var txData = {
		from: MapAccount(account)
	};

	web3.personal.unlockAccount(MapAccount(account), password);

	return signin.viewMyAnswers(txData);
}

function viewMyQuestions(account,password)
{
	var txData = {
		from: MapAccount(account)
	};

	web3.personal.unlockAccount(MapAccount(account), password);

	return signin.viewMyQuestions(txData);
}

function viewAnswersFrom(account,password,index)
{
	var txData = {
		from: MapAccount(account)
	};

	web3.personal.unlockAccount(MapAccount(account), password);

	return inverseMapAccount(signin.viewAnswersFrom(index,txData));
}

function viewStudentsAnswer(account,password)
{
	var txData = {
		from: MapAccount(account)
	};

	web3.personal.unlockAccount(MapAccount(account), password);

	return signin.viewStudentsAnswer(txData);
}

function viewStudentsQuestion(account,password)
{
	var txData = {
		from: MapAccount(account)
	};

	web3.personal.unlockAccount(MapAccount(account), password);

	return signin.viewStudentsQuestion(txData);
}

function viewTeachersQuestion(account,password)
{
	var txData = {
		from: MapAccount(account)
	};

	web3.personal.unlockAccount(MapAccount(account), password);

	return signin.viewTeachersQuestion(txData);
}
