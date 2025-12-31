let index = 0;
let score = 0;
let timer;
let isAnswered = false;

const questions = [
    {
        question: "HTML ka full form kya hai?",
        options: [
            "Hyper Text Makeup Language",
            "Hyper Text Markup Language",
            "Home Tool Mark Language",
            "None"
        ],
        answer: 1
    },
    {
        question: "What is capital of India?",
        options: ["Delhi", "Mumbai", "Kolkata", "Pune"],
        answer: 0
    },
    {
        question: "CSS ka full form kya hai?",
        options: [
            "Cascading Style Sheets",
            "Creative Style System",
            "Computer Style Sheet",
            "None"
        ],
        answer: 0
    },
    {
        question: "JS ka full form kya hai?",
        options: ["Java Super", "JavaScript", "JustScript", "None"],
        answer: 1
    }
];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const currentEl = document.getElementById("current");
const totalEl = document.getElementById("total");
const progressBar = document.getElementById("progress-bar");

totalEl.innerText = questions.length;

function loadQuestion() {
    clearInterval(timer);
    isAnswered = false;

    if (index >= questions.length) {
        showResult();
        return;
    }

    const q = questions[index];
    questionEl.innerText = q.question;
    currentEl.innerText = index + 1;

    progressBar.style.width =
        ((index) / questions.length) * 100 + "%";

    optionsEl.innerHTML = "";

    q.options.forEach((opt, i) => {
        const div = document.createElement("div");
        div.className = "option";
        div.innerText = opt;
        div.onclick = () => selectOption(i);
        optionsEl.appendChild(div);
    });

    startTimer();
}

function startTimer() {
    let timeLeft = 10;
    timerEl.innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerEl.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            if (!isAnswered) {
                isAnswered = true;
                disableOptions();
                setTimeout(nextQuestion, 800);
            }
        }
    }, 1000);
}

function selectOption(selectedIndex) {
    if (isAnswered) return;
    isAnswered = true;

    clearInterval(timer);

    const q = questions[index];
    const options = document.querySelectorAll(".option");

    disableOptions();

    if (selectedIndex === q.answer) {
        options[selectedIndex].classList.add("correct");
        score++;
        scoreEl.innerText = score;
    } else {
        options[selectedIndex].classList.add("wrong");
        options[q.answer].classList.add("correct");
    }

    setTimeout(nextQuestion, 1200);
}

function nextQuestion() {
    index++;
    loadQuestion();
}

function disableOptions() {
    document.querySelectorAll(".option").forEach(opt => {
        opt.style.pointerEvents = "none";
        opt.style.cursor = "not-allowed";
    });
}

function showResult() {
    progressBar.style.width = "100%";

    document.querySelector(".quiz-container").innerHTML = `
        <h2>🎉 Quiz Finished</h2>
        <p>Total Questions: ${questions.length}</p>
        <p>Correct Answers: ${score}</p>
        <p>Wrong Answers: ${questions.length - score}</p>
        <button onclick="location.reload()" style="
            margin-top:15px;
            padding:12px;
            width:100%;
            border:none;
            border-radius:10px;
            background:#2563eb;
            color:#fff;
            font-size:16px;
            cursor:pointer;
        ">Retry Quiz</button>
    `;
}

loadQuestion();
