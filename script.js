//assistant
const c = (el) => document.querySelector(`${el}`);
const cs = (el) => document.querySelectorAll(`${el}`);

//initial data
let currentQuestion = 0;
let correctAnswers = 0;
let progress = c(".progress--bar");
loadQuestion();

//events
c("button").addEventListener("click", () => {
  currentQuestion = 0;
  correctAnswers = 0;
  loadQuestion();
});
//functions
function loadQuestion() {
  let pct = 0;
  pct = (currentQuestion / questions.length) * 100;
  progress.style.width = `${pct}%`;

  if (questions[currentQuestion]) {
    let quest = questions[currentQuestion];
    c(".questionArea").style.display = "block";
    c(".scoreArea").style.display = "none";

    c(".question").innerHTML = quest.question;

    let answers = "";
    for (let i in quest.options) {
      answers += `<div data-ans="${i}" class="option"><span>${+i + 1}</span>${
        quest.options[i]
      }</div>`;
    }
    c(".options").innerHTML = answers;

    cs(".options .option").forEach((item) => {
      item.addEventListener("click", seeAnswer);
    });
  } else {
    finishQuizz();
  }
}

function seeAnswer(e) {
  let ans = +e.currentTarget.getAttribute("data-ans");

  if (ans === questions[currentQuestion].answer) {
    e.currentTarget.style.color = "#fff";
    e.currentTarget.style.backgroundColor = "rgba(0,200,0,.6)";
    correctAnswers++;
  } else {
    e.currentTarget.style.color = "#fff";
    e.currentTarget.style.backgroundColor = "rgba(200,0,0,.6)";
  }
  setTimeout(() => {
    currentQuestion++;
    loadQuestion();
  }, 500);
}

function finishQuizz() {
  c(".questionArea").style.display = "none";
  c(".scoreArea").style.display = "block";

  let p = (correctAnswers / questions.length) * 100;
  if (p < 40) {
    c(".scoreText1").innerHTML = "Precisa melhorar";
    c(".scorePct").style.color = "red";
  } else if (p >= 40 && p < 70) {
    c(".scoreText1").innerHTML = "Muito bom";
    c(".scorePct").style.color = "yellow";
  } else {
    c(".scoreText1").innerHTML = "Parabéns!!";
    c(".scorePct").style.color = "green";
  }

  c(".scorePct").innerHTML = `Acertou ${p}%`;
  c(
    ".scoreText2"
  ).innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`;
}
