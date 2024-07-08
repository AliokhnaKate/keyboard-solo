const container = document.querySelectorAll('.word span');
const word = document.querySelector('.word');
const span = word.querySelectorAll('span');
const timer = document.querySelector('#timer');
//правильные ответы
let correctCount = document.querySelector('.correct-count');
//неправильные ответы
let wrongCount = document.querySelector('.wrong-count');
//ошибки в текущем слове
let wordMistakes = document.querySelector('.word-mistakes');

//массив
const arr = [
    'perfomance',
    'fruit',
    'mistakes',
    'letter',
    'weather'
];

//индекс буквы
let indexLetter = 0;
//рендорим слово из массива
let randomWord = randomWordArr(arr);
wordReplacement(randomWord);


document.addEventListener("keydown", function(event) {
    console.log(randomWord[indexLetter])
    if (event.key === randomWord[indexLetter]) {
        symbolSuccess(randomWord[indexLetter]);
        indexLetter++;
    } else {
        symbolFail(randomWord[indexLetter]);
    }
    if (indexLetter === randomWord.length) {
        correctCount.textContent = ++correctCount.textContent;
        setTimeout(newWord, 0);
    }
});

//функция нового слова
function newWord() {
    //проверка выиграли/проиграли
    checkWordsCount();
    //рендорим новое слово
    randomWord = randomWordArr(arr);
    //выводим в браузер currentWord
    wordReplacement(randomWord);
    wordMistakes.textContent = 0;
}

//функция рандомного слова
function randomWordArr(value) {
    console.log(value.indexOf(value[0]))
    const minArr = value.indexOf(value[0]);
    const maxArr = value.indexOf(value[value.length - 1]);
    //индекс слова в массиве
    const indexWord = generateRandomValue(minArr, maxArr);
    //рандомное слово
    const randomValue = value[indexWord];
    return randomValue;
}

//help-функция для рандомного числа
function generateRandomValue(min, max) {
    return min + Math.floor(Math.random() * (max - min));
}

//функция замены слова в браузере
function wordReplacement(value) {
    //console.log(randomWord.indexOf(randomWord[0]))
    //currentIndex = randomWord.indexOf(randomWord[0]);
    // indexLetter = 0;
    // container.forEach(item => {
    //     item.textContent = value[indexLetter];
    //     word.children[indexLetter].className = 'b';
    //     indexLetter++;
    // })
    // indexLetter = 0;
    let newWord = value.split('');
    newWord = newWord.map((char) => `<span>${char}</span>`);
    word.innerHTML = newWord.join('');
    indexLetter = 0;
}

//успешное нажатие клавиши
function symbolSuccess() {
    //value.className = 'c';
    //console.log(word.children)
    word.children[indexLetter].className = 'c';
    //span[indexLetter].className = 'c';
}

//неудачное нажатие клавиши
function symbolFail() {
    word.children[indexLetter].className = 'w';
    //span[indexLetter].className = 'c';
    //кол-во ошибок в слове
    wordMistakes.textContent = ++wordMistakes.textContent;
    //кол-во неправильных слов
    wrongCount.textContent = ++wrongCount.textContent;
}

//функции проверки правильных и неправильных слов
function checkWordsCount() {
    if (correctCount.textContent >= 5) {
        alert(`Вы выиграли! Ваше время ${timer.textContent}`);
        clear();
    }
    if (wrongCount.textContent >= 5) {
        alert(`Вы програли! Ваше время ${timer.textContent}`);
        clear();
    }
}

//таймер
const timerId = setInterval(() => {
    const time = timer.textContent.split(':');
    let minutes = +time[0];
    let seconds = +time[1];
    if (seconds <= 59) {
        seconds++;
    } else {
        minutes++;
        seconds = 0;
    }
    if (minutes >= 0 && seconds >= 0) {
        timer.textContent = `${format(minutes)}:${format(seconds)}`;
    }
}, 1000);

function clear() {
    clearInterval(timerId);
    timer.textContent = '00:00';
    correctCount.textContent = 0;
    wrongCount.textContent = 0;
    wordMistakes.textContent = 0;
}

function format(value) {
    if (value < 10) {
        return `0${value}`;
    }
    return value;
}