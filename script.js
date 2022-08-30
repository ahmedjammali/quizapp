//getting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".info_box .quit");
const continue_btn = info_box.querySelector(".info_box .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");

const option_list =document.querySelector(".option_list");


//if start quiz button clicked
start_btn.onclick = () =>{
    info_box.classList.add("activeInfo");
}
//if exit button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");//hide teh info box
}

//If continue button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");//hide teh info box
    quiz_box.classList.add("activeQuiz");//show teh quiz box
    showQuestion (0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
 }
 let que_count = 0;
 let que_numb =1;
 let counter;
 let counterLine;
 let timeValue = 15;
 let widthValue =0;
 let userScore = 0;

 const next_btn = quiz_box.querySelector(".next_btn");
 const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");


restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    let que_count = 0;
    let que_numb =1;
    let timeValue = 15;
    let widthValue =0;
    let userScore = 0;
    queCounter(que_numb)
    showQuestion(que_count);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
}

quit_quiz.onclick = () => {
    window.location.reload();
}
 
 //If Next button clicked
 next_btn.onclick = () =>{
    if (que_count < questions.length - 1){
        que_count++;
        que_numb ++;
        queCounter(que_numb)
        showQuestion(que_count);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
    }
    else{
        console.log("questions completed");
        showResultBox();

    }
}

 //getting question and options from array
function showQuestion(index) {
    const que_text =document.querySelector(".que_text");
    let que_tag ='<span>'+questions[index].numb +". "+questions[index].question+'<span>';
    let option_tag = '<div class="option">' +questions[index].Options[0] +'<span></span></div>'
                     +'<div class="option">' + questions [index].Options[1] +'<span></span></div>'
                     +'<div class="option">' + questions [index].Options[2] +'<span></span></div>'
                     +'<div class="option">' + questions [index].Options[3] +'<span></span></div>';
                      
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let i=0 ;i< option.length ;i++){
        option[i].setAttribute("onclick","optionSelected(this)");
    }

}

let tickIcon ='<div class="icon tick">&#10004</div>';
let crossIcons ='<div class="icon cross">&#10005</div>';


function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let alloptions = option_list.children.length; 
    
    if (userAns == correctAns){
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("answer correct");
        answer.insertAdjacentHTML("beforeend",tickIcon);
    }
    else{
        answer.classList.add("incorrect");
        console.log("answer is wrong");
        answer.insertAdjacentHTML("beforeend",crossIcons);
        //if answer is incorrect then automatically select right answer

        for (let i=0 ;i< alloptions ;i++){
            if (option_list.children [i].textContent == correctAns){
                option_list.children[i].setAttribute("class","option correct");
                option_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
            }
        }
    
    }
    //once user selected disable all options
    for (let i = 0 ; i< alloptions ;  i++) {
         option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block"; 
}

function showResultBox(){
    info_box.classList.remove("activeInfo");//hide the info box
    quiz_box.classList.remove("activeQuiz");//hide teh quiz box
    result_box.classList.add("activeResult");//show teh result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){
        let scoreTag = '<span>and congrats!, you got  <p>'+ userScore  +'</p>out of<p> '+ questions.length +'</p></span>'; 
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore > 1){
        let scoreTag = '<span>and nice, you got <p>'+ userScore  +'</p>out of<p> '+ questions.length +'</p></span>'; 
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>and sorry you got only <p>'+ userScore  +'</p>out of<p> '+ questions.length +'</p></span>'; 
        scoreText.innerHTML = scoreTag;
    }
}


function startTimer(time){
    counter = setInterval(timer , 1000);
    function timer (){
        timeCount.textContent = time;
        time--;
        if (time < 9){
            let addZero =timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
            let correctAns = questions[que_count].answer;
            let alloptions = option_list.children.length; 

            for (let i=0 ;i< alloptions ;i++){
                if (option_list.children [i].textContent == correctAns){
                    option_list.children[i].setAttribute("class","option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
                }
            }

            for (let i = 0 ; i< alloptions ;  i++) {
                option_list.children[i].classList.add("disabled");
           }
           next_btn.style.display = "block"; 
       


        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer , 29);
    function timer (){
        time += 1;
        timeLine.style.width = time + "px";
        if (time > 549){
            clearInterval(counterLine);
            
        }
    }
}



function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totaalQuesContTag = '<span><p>'+ index +'</p> of <p> ' + questions.length +'</p>questions</span>';
    bottom_ques_counter.innerHTML = totaalQuesContTag;
}
