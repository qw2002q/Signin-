window.onload = function()
{
  cookie_account = "User";
  cookie_password = "";
  var start = 0;
  var teacher = "NULL";

  $("#return").click( //return button
    function()
    {
      $("#submenu").css("display", "none");
    }
  )

  $("#apply").click(  //apply button
    function()
    {
      var account = $("#Account_input").val();
      var password = $("#Password_input").val();
      if(SigninUser(account,password))  {
        cookie_account = account;
        cookie_password = password;
        $("#accountName").html("Account: " + account);
        $("#leftinfo").append('<li>' + 'System: ' + "Succeed Signin" + '</li>');
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
        $("#submenu").css("display", "none");
      } else {
        $("#errorbar").css("display","block");
      }
    }
  )

  $("#switchingUsers").click( //sign in or switch user
    function()
    {
      $("#submenu").css("display", "block");  //显示info
      $("#errorbar").css("display","none");
      $("#apply").css("display", "initial");
      $("#info_append").empty();
      $("#info_append").append("Account <input id='Account_input'></input><br/>");
      $("#info_append").append("Password <input id='Password_input' type='password'></input>");
      $("#submenu").attr("title","switchingUsers");
      $("#info").html("Signin/Switch User");
    }
  )

  $("#exitUsers").click(  //exit User
    function()
    {
      cookie_account = "User";
      cookie_password = "";
      $("")
      $("#leftinfo").append('<li>' + "System: " + "Exit Succeed" +'</li>');
      $("#accountName").html("Account: " + "Unknown");
    }
  )

  $("#ChatBoxButton").click(
    function()
    {
      var str = $("#ChatBox").val();
      $("#ChatBox").val("");  //clear content
      if(str === "#clr" || str === "#clear")
        $("#leftinfo").empty();
      else if(str === "#rec" || str === "#reconnect") //ReConnect
        ReConnect();
      else if(str != "")  //empty input
        $("#leftinfo").append('<li>' + cookie_account + ": " + str + '</li>');


      $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight); //滚动条自动带最底
    }
  )

  $("#Start").click(
    function()
    {
      if(start == 1){
        $("#leftinfo").append('<li>' + "System: Course has already begun" + '</li>');
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
        return;
      }

      if(Start(cookie_account,cookie_password)) {
          start = 1;
          teacher = cookie_account;
          $("#leftinfo").append('<li>' + "Course Start" + '</li>');
          $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
        }
      else
        $("#leftinfo").append('<li>' + "Start Course Failed" + '</li>');
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
    }
  )

  $("#Stop").click(
    function()
    {
      if(start == 0)  {
        $("#leftinfo").append('<li>' + "System: Course doesn't start" + '</li>');
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
        return;
      }
      if(teacher != cookie_account) {
        $("#leftinfo").append('<li>' + "System: Only Teacher can stop course" + '</li>');
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
        return;
      }

      if(Stop(cookie_account,cookie_password)){
        start = 0;
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
        $("#leftinfo").append('<li>' + "System: Course Stop" + '</li>');
      }      else{
        $("#leftinfo").append('<li>' + "System: Stop Course Failed" + '</li>');
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
      }

    }
  )

  $("#Signin").click(
    function()
    {
      if(start == 0)  {
        $("#leftinfo").append('<li>' + "System: Course doesn't start" + '</li>');
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
        return;
      }

      if(teacher == account)  {
        $("#leftinfo").append('<li>' + "System: Teacher does not have to signin" + '</li>');
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
        return;
      }

      if(Signin(cookie_account,cookie_password)){
        $("#leftinfo").append('<li>' + "System: Signin Succeed" + '</li>');
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
      } else  {
        $("#leftinfo").append('<li>' + "System: Signin Failed" + '</li>');
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
      }
    }
  )

  $("#Teacher").click(
    function()
    {
      var str = Teacher();
      $("#leftinfo").append('<li>' + "Teacher: " + str + '</li>');
      $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
    }
  )

  $("#Ask").click(
    function()
    {
      if(start == 0)  {
        $("#leftinfo").append('<li>' + "System: Course doesn't start" + '</li>');
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
        return;
      }

      var str = $("#Ask_str").val();
      if(Ask(cookie_account,cookie_password,str)) {
        $("#leftinfo").append('<li>' + "System: Question Uploaded" + '</li>');
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
        $("#Ask_str").val("");
      }
      else {
        $("#leftinfo").append('<li>' + "System: Uploaded Failed" + '</li>');
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
      }
    }
  )

  $("#AnswerToQuestion").click(
    function()
    {
      var str = $("#AnswerToQuestion_str").val();
      if(AnswerToQuestion(cookie_account, cookie_password, str)) {
        $("#leftinfo").append('<li>' + "System: Answer Uploaded" + '</li>');
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
        $("#AnswerToQuestion_str").val("");
      }
      else  {
        $("#leftinfo").append('<li>' + "System: Uploaded Failed" + '</li>');
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
      }
    }
  )

  $("#AnswerToStudent").click(
    function()
    {
      if(teacher != cookie_account) {
        $("#leftinfo").append('<li>' + "System: Only Teacher can use this function" + '</li>');
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
        return;
      }

      var index = $("#AnswerToStudent_index").val();
      var str = $("#AnswerToStudent_str").val();
      if(AnswerToStudent(cookie_account, cookie_password, index, str))  {
        $("#leftinfo").append('<li>' + "System: Answer Uploaded" + '</li>');
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
        $("#AnswerToStudent_str").val("");
        $("#AnswerToStudent_index").val("");
      }
      else  {
        $("#leftinfo").append('<li>' + "System: Uploaded Failed" + '</li>');
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
      }
    }
  )

  $("#Signer").click(
    function()
    {
      var str = viewSigner(cookie_account);
      $("#submenu").css("display", "block");  //显示info
      $("#errorbar").css("display","none");
      $("#apply").css("display", "none");
      $("#info_append").empty();
      $("#info_append").append("<p id='signer'>" + str + "</p>");
      $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
      $("#submenu").attr("title","singer");
      $("#info").html("Signer");
    }
  )

  $("#viewCount").click(
    function()
    {
      var str = viewCount();
      $("#leftinfo").append('<li>' + "Count: " + str + '</li>');
      $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
    }
  )

  $("#MyAnswers").click(
    function()
    {
      var str = viewMyAnswers(cookie_account, cookie_password);
      $("#submenu").css("display", "block");  //显示info
      $("#errorbar").css("display","none");
      $("#apply").css("display", "none");
      $("#info_append").empty();
      if(str != "undefine") {
        $("#info_append").append("<p id='myanswer'>" + str + "</p>");
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
      }
      else  {
        $("#info_append").append("<p id='myanswer'>" + "Answer: NULL or Plz Sginin first" + "</p>");
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
      }
      $("#submenu").attr("title","myanswer");
      $("#info").html("MyAnswer");
    }
  )

  $("#MyQuestions").click(
    function()
    {
      var str = viewMyQuestions(cookie_account, cookie_password);
      $("#submenu").css("display", "block");  //显示info
      $("#errorbar").css("display","none");
      $("#apply").css("display", "none");
      $("#info_append").empty();
      if(str != "undefine")  {
        $("#info_append").append("<p id='myquestion'>" + str + "</p>");
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
      }
      else  {
        $("#info_append").append("<p id='myquestion'>" + "Question: NULL or Plz Sginin first" + "</p>");
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
      }
      $("#submenu").attr("title","myquestion");
      $("#info").html("MyQuestion");
    }
  )

  $("#viewAnswersFrom").click(
    function()
    {
      if(teacher != cookie_account) {
        $("#leftinfo").append('<li>' + "System: Only Teacher can use this function" + '</li>');
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
        return;
      }

      var index = $("#viewAnswersFrom_index").val();
      var str = viewAnswersFrom(cookie_account, cookie_password, index);
      $("#submenu").css("display", "block");  //显示info
      $("#errorbar").css("display","none");
      $("#apply").css("display", "none");
      $("#info_append").empty();
      if(str != "undefine") {
        $("#viewAnswersFrom_index").val("");
        $("#info_append").append("<p id='answerfrom'>" + str + "</p>");
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
      }
      else  {
        $("#info_append").append("<p id='answerfrom'>" + "Answers Unfind or Plz Sginin first" + "</p>");
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
      }
      $("#submenu").attr("title","answerfrom");
      $("#info").html("Answers No."+index+" From");
    }
  )

  $("#StudentsAnswers").click(
    function()
    {
      if(teacher != cookie_account) {
        $("#leftinfo").append('<li>' + "System: Only Teacher can use this function" + '</li>');
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
        return;
      }

      var str = viewStudentsAnswer(cookie_account, cookie_password);
      $("#submenu").css("display", "block");  //显示info
      $("#errorbar").css("display","none");
      $("#apply").css("display", "none");
      $("#info_append").empty();
      if(str != "undefine") {
        $("#info_append").append("<p id='studentsanswer'>" + str + "</p>");
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
      }
      else  {
        $("#info_append").append("<p id='studentsanswer'>" + "Answer: NULL or Plz Sginin first" + "</p>");
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
      }
      $("#submenu").attr("title","studentsanswer");
      $("#info").html("Students'Answer");
    }
  )

  $("#StudentsQuestions").click(
    function()
    {
      if(teacher != cookie_account) {
        $("#leftinfo").append('<li>' + "System: Only Teacher can use this function" + '</li>');
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
        return;
      }

      var str = viewStudentsQuestion(cookie_account, cookie_password);
      $("#submenu").css("display", "block");  //显示info
      $("#errorbar").css("display","none");
      $("#apply").css("display", "none");
      $("#info_append").empty();
      if(str != "undefine") {
        $("#info_append").append("<p id='studentsquestion'>" + str + "</p>");
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
      }
      else  {
        $("#info_append").append("<p id='studentsquestion'>" + "Question: NULL or Plz Sginin first" + "</p>");
        $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
      }
      $("#submenu").attr("title","studentsquestion");
      $("#info").html("Students'Question");
    }
  )

  $("#TeachersQuestion").click(
    function()
    {
      var str = viewTeachersQuestion(cookie_account,cookie_password);
      $("#submenu").css("display", "block");  //显示info
      $("#errorbar").css("display","none");
      $("#apply").css("display", "none");
      $("#info_append").empty();
      $("#info_append").append("<p id='teacher'squestion'>" + str + "</p>");
      $("#leftinfo").scrollTop($("#leftinfo")[0].scrollHeight);
      $("#submenu").attr("title","teacher'squestion");
      $("#info").html("Teacher'sQuestion");
    }
  )
}
