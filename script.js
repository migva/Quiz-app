const questions = [
    {
        question: "Kokio modelio lėktuvas buvo \"\Lituanica\"?",
        answers: [
            {text: "ANBO", correct: false},
            {text: "Bellanca", correct: true},
            {text: "Boeing", correct: false},
            {text: "Fokker", correct: false},
        ]
    },
    {
        question: "Ilgiausias pasaulio sąsiauris?",
        answers: [
            {text: "Jukatano", correct: false},
            {text: "Lamanšo", correct: false},
            {text: "Magelano", correct: false},
            {text: "Mozambiko", correct: true},
        ]
    },
    {
        question: "Kuri Europos valstybė kadaise buvo vadinama Batavijos Respublika?",
        answers: [
            {text: "Danija", correct: false},
            {text: "Olandija", correct: true},
            {text: "Portugalija", correct: false},
            {text: "Rumunija", correct: false},
        ]
    },
    {
        question: "Kurio Lietuvos miesto garbės pilietis yra Jonas Mekas?",
        answers: [
            {text: "Panevėžio", correct: false},
            {text: "Biržų", correct: true},
            {text: "Joniškio", correct: false},
            {text: "Zarasų", correct: false},
        ]
    },
    {
        question: "Mefistofelis Faustui pirmą kartą pasirodė šuns pavidalu. Kokios veislės buvo šuo?",
        answers: [
            {text: "Neapolio mastifas", correct: false},
            {text: "Rotveileris", correct: false},
            {text: "Ryzenšnauceris", correct: false},
            {text: "Pudelis", correct: true},
        ]
    },
    {
        question: "Kuris Saulės sistemos planeta yra pirmoji, atrasta teleskopu?",
        answers: [
            {text: "Jupiteris", correct: false},
            {text: "Marsas", correct: false},
            {text: "Saturnas", correct: false},
            {text: "Uranas", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Kitas";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    if(score === questions.length) {
        questionElement.innerHTML = `Surinkote ${score} iš ${questions.length} galimų taškų! Puikus rezultatas!`;
    } else {
        questionElement.innerHTML = `Surinkote ${score} iš ${questions.length} galimų taškų!`;
    }
nextButton.innerHTML = "Žaisti dar kartą";
nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();