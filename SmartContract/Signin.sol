pragma solidity ^0.4.24;

contract Signin
{
    address public teacher;
    uint private count;  //count the number of account has signed in
    bool on = false;    //whether the sign in has start
    address[] private Signer;

    string private Question;
    string[] private Answers;
    string[] private Questions_student;
    uint private Answers_count;
    uint private Questions_count;
    mapping(address => string) private myAnswer;
    mapping(address => string) private myQuestion;
    mapping(uint => address) private Answers_from;
    mapping(uint => address) private Answers_to;
    mapping(uint => address) private Questions_from;

    // --------- Sign in ---------
    function start() public
    {
        require(on != true,
        "The Sign in has already started");
        teacher = msg.sender;
        on = true;
        count = 0;
        Signer = new address[](0);

        Question = "";
        Answers = new string[](0);
        Answers_count = 0;
        Questions_student = new string[](0);
        Questions_count = 0;
    }

    function stop() public
    {
        require(on == true,
        "The Sign in is not running");
        require(teacher == msg.sender,
        "You are not allowed to stop the Sign in");
        on = false;
    }

    function signin() public
    {
        require(on == true,"The Sign in is not running");
        {
            bool signed = false;
            for(uint i = 0; i < count; i++)
            {
                if(msg.sender == Signer[i])
                {
                    signed = true;
                    break;
                }
            }
            require(!signed,"You have already signed in.");
        }

        require(msg.sender != teacher, "You don't have to sign in");
        Signer.push(msg.sender);
        count += 1;
    }

    function viewCount() public view returns(uint)
    {
        return count;
    }

    function viewSigner() public view returns(address[])
    {
        return Signer;
    }

    //--------- Ask & Answer ---------
    function ask(string ques) public        //!!You should add double quotes to the string before you call this function,cause of the limit of solidity
    {
        require(on == true, "The class has not begun or has over");

        if(msg.sender == teacher)
            ask_teacher(ques);
        else
            ask_student(ques);
    }

    function ask_student(string ques) private
    {
        {
            bool signed = false;
            for(uint i = 0; i < count; i++)
            {
                if(msg.sender == Signer[i])
                {
                    signed = true;
                    break;
                }
            }
            require(signed,"You should sign in first before you answer the question.");
        }

        Questions_student.push(ques);
        Questions_from[Questions_count] = msg.sender;
        Questions_count++;
    }

    function ask_teacher(string ques) private
    {
        Question = ques;
    }

    function answerToQuestion(string answ) public
    {
        {
            bool signed = false;
            for(uint i = 0; i < count; i++)
            {
                if(msg.sender == Signer[i])
                {
                    signed = true;
                    break;
                }
            }
            require(signed || teacher == msg.sender,"You should sign in first before you answer the question.");
        }

        for(i = 0; i < Answers_count; i++)
        {
            if(Answers_from[i] == msg.sender)
            {
                Answers[i] = answ;
                return;
            }
        }

        Answers.push(answ);
        Answers_from[Answers_count] = msg.sender;
        Answers_to[Answers_count] = teacher;
        Answers_count++;
    }

    function answerToStudent(uint ques_index, string answ) public    //The first index refers to the index th question in the questions_list returns by function viewStudentsQuestion
    {
        require(teacher == msg.sender, "Only teacher can use this function.");
        require(ques_index < Questions_count, "Can not find the question");

        for(uint i = 0; i < Answers_count; i++)
        {
            if(Answers_to[i] == Answers_from[ques_index])
            {
                Answers[i] = answ;
                return;
            }
        }

        Answers.push(answ);
        Answers_from[Answers_count] = msg.sender;
        Answers_to[Answers_count] = Questions_from[ques_index];
        Answers_count++;
    }

    function viewStudentsAnswer() public view returns(string)
    {
        require(teacher == msg.sender, "Only teacher can use this function.");

        string memory answers = "";
        string memory temp1 = "";
        string memory temp2 = "";
        for(uint i = 0; i < Answers_count; i++)
        {
            if(Answers_from[i] != teacher)
            {
                temp1 = "";
                temp2 = "";

                //!!---The function aaddressToString ocuppys too much performance
                //!!---So I decide to use viewAnswersFrom to replace it
                //temp1 = strSplice(Answers[i], " from:");
                //temp2 = strSplice(addressToString(Answers_from[i]), ";\n");

                temp1 = strSplice(uintToString(i), ": ");
                temp2 = strSplice(Answers[i], ";\n");
                temp1 = strSplice(temp1, temp2);
                answers = strSplice(answers, temp1);
            }
        }

        return answers;
    }

    function viewAnswersFrom(uint index) public view returns(address)   //index refers to the index th answers in the answers list returns by viewStudentsAnswer
    {
        require(teacher == msg.sender, "Only teacher can use this function.");
        return Answers_from[index];
    }

    function viewTeachersQuestion() public view returns(string)
    {
        require(on == true,"The class has not begun or is over");
        {
            bool signed = false;
            for(uint i = 0; i < count; i++)
            {
                if(msg.sender == Signer[i])
                {
                    signed = true;
                    break;
                }
            }
            require(signed || msg.sender == teacher,"You should sign in first before you answer the question.");
        }

        return Question;
    }

    function viewStudentsQuestion() public view returns(string)
    {
        require(msg.sender == teacher, "Only teacher can view students' question.");

        string memory questions = "";
        string memory temp1 = "";
        string memory temp2 = "";
        for(uint i = 0; i < Questions_count; i++)
        {
            temp1 = "";
            temp2 = "";
            temp1 = strSplice(uintToString(i), ": ");
            temp2 = strSplice(Questions_student[i], ";\n");
            temp1 = strSplice(temp1, temp2);
            questions = strSplice(questions, temp1);
        }

        return questions;
    }

    function viewMyAnswers() public view returns(string)
    {
        {
            bool signed = false;
            for(uint i = 0; i < count; i++)
            {
                if(msg.sender == Signer[i])
                {
                    signed = true;
                    break;
                }
            }
            require(signed || msg.sender == teacher,"You should sign in first before you answer the question.");
        }

        for(i = 0; i < Answers_count; i++)
        {
            if(Answers_from[i] == msg.sender)
                return Answers[i];
        }

        return "";
    }

    function viewMyQuestions() public view returns(string)
    {
        {
            bool signed = false;
            for(uint i = 0; i < count; i++)
            {
                if(msg.sender == Signer[i])
                {
                    signed = true;
                    break;
                }
            }
            require(signed || msg.sender == teacher,"You should sign in first before you answer the question.");
        }

        if(msg.sender == teacher)
        {
            return Question;
        }

        string memory myQuestion = "";
        string memory temp1 = "";
        string memory temp2 = "";
        uint j = 0;
        uint que_count = 0;
        uint ans_count = 0;
        for(j = 0; j < Questions_count; j++)
        {
            if(Questions_from[j] == msg.sender)
            {
                que_count++;
                if(que_count == 1)  {
                    myQuestion = strSplice("Question: ", Questions_student[j]);
                }   else {
                    temp1 = "";
                    temp1 = strSplice(",", Questions_student[j]);
                    myQuestion = strSplice(myQuestion , temp1);
                }
            }
        }

        for(i = 0; i < Answers_count; i++)
        {
            if(Answers_to[i] == msg.sender)
            {
                ans_count++;
                if(ans_count == 1)  {
                    temp1 = strSplice(";  Answers: ", Answers[i]);
                    myQuestion = strSplice(myQuestion, temp1);
                }   else {
                    temp1 = "";
                    temp1 = strSplice(",", Answers[i]);
                    myQuestion = strSplice(myQuestion, temp1);
                }
            }
        }

        return myQuestion;
    }

    function strSplice(string a, string b) private returns(string)
    {
        bytes memory ba = bytes(a);
        bytes memory bb = bytes(b);
        string memory output = new string(ba.length + bb.length);
        bytes memory boutput = bytes(output);
        uint k = 0;
        for(uint i = 0; i < ba.length; i++)
            boutput[k++] = ba[i];
        for(i = 0; i < bb.length; i++)
            boutput[k++] = bb[i];
        return string(boutput);
    }

    function uintToString(uint a) private returns(string)
    {
        if(a == 0) return "0";
        uint b = a;
        uint length;
        while(b != 0)
        {
            length++;
            b /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint k = length - 1;
        while(a != 0)
        {
            bstr[k--] = byte(48 + a % 10);
            a /= 10;
        }
        return string(bstr);
    }

    //!!!Too inefficient!!!
    function addressToString(address a) private returns (string)
    {
        bytes32 value = bytes32(uint256(a));
        bytes memory alphabet = "0123456789abcdef";

        bytes memory str = new bytes(42);
        str[0] = '0';
        str[1] = 'x';
        for(uint i = 0; i < 20; i++)
        {
            str[2+i*2] = alphabet[uint(value[i + 12] >> 4)];
            str[3+i*2] = alphabet[uint(value[i + 12] & 0x0f)];
        }

        return string(str);
    }
}
