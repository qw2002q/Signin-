const url = "http://localhost:8545";
const contractAddress = "0xc169bbe29aa7d732b043c610816eac3116ca034e";
const account0 = "0xd496a9aa693b5f211eb86af4d31b4eb39ac4306b";
const account1 = "0x837abd42759dc93793a01bcc226df47f5313fbe6";
const account2 = "0x7918818ffe10295b96df99bcbcd8e0f529179cb9";

//Hash of password
const password0 = "211211213215214221211213";
const password1 = "208211208215208211";
const password2 = "208211208215208211";

function PasswordHash(password) //Hash password
{
  var i = 0;
  var temp = "";
  for(i = 0; i < password.length; i++)
  {
    temp += (password[i] ^ (0xd1 | i));
  }
  return temp;
}

function MapAccount(account)  //Map account
{
	if(account == "account0" || account == "Account0")
		return account0;
	else if(account == "account1" || account == "Account1")
		return account1;
	else if(account == "account2" || account == "Account2")
		return account2;

	return false;
}

function inverseMapAccount(account)
{
  if(account == account0)
    return "Account0";
  if(account == account1)
    return "Account1";
  if(account == account2)
    return "Account2";

  return "NULL";
}
//var txData = {
//    from:                 // 交易发起方地址
//    to:                   // 交易目标地址
//    value:                // 交易eth数量（当调用合约时，此处可以为0）
//    data:                 // 扩展字段（当调用合约时，此处为合约的方法以及参数）
//    gasPrice:             // 手续费单价
//    gasLimit:             // 手续费上限
//}
