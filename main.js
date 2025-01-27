document.getElementById("app").append(letTheGame());

const VALUES_ARR = [];
let cardsArr = [];
let cardsOpen = [];
let cardValue;

function letTheGame() {
  const FORM = document.createElement("form");
  const LABEL_VERTICAL = document.createElement("label");
  const LABEL_HORIZONTAL = document.createElement("label");
  const INPUT_VERTICAL = document.createElement("input");
  const INPUT_HORIZONTAL = document.createElement("input");
  const BUTTON = document.createElement("button");
  const BUTTON_RETURN = document.createElement("button");
  const LOST_GAME = document.createElement("div");

  FORM.classList.add("container", "form");
  LABEL_VERTICAL.classList.add("label");
  LABEL_HORIZONTAL.classList.add("label");
  INPUT_HORIZONTAL.classList.add("input");
  INPUT_HORIZONTAL.classList.add("js-input-horizontal");
  INPUT_VERTICAL.classList.add("input");
  INPUT_VERTICAL.classList.add("js-input-vertical");
  BUTTON.classList.add("btn-form");
  INPUT_HORIZONTAL.setAttribute("type", "number");
  INPUT_HORIZONTAL.setAttribute("step", "2");
  INPUT_HORIZONTAL.setAttribute("value", "4");
  INPUT_HORIZONTAL.setAttribute("max", "10");
  INPUT_HORIZONTAL.setAttribute("min", "2");
  INPUT_VERTICAL.setAttribute("max", "10");
  INPUT_VERTICAL.setAttribute("min", "2");
  INPUT_VERTICAL.setAttribute("type", "number");
  INPUT_VERTICAL.setAttribute("step", "2");
  INPUT_VERTICAL.setAttribute("value", "4");
  BUTTON.setAttribute("type", "submit");

  LABEL_VERTICAL.textContent = "Количество карточек по вертикали:";
  LABEL_HORIZONTAL.textContent = "Количество карточек по горизонтали:";
  BUTTON.textContent = "Начать игру";

  FORM.append(LABEL_VERTICAL);
  FORM.append(INPUT_VERTICAL);
  FORM.append(LABEL_HORIZONTAL);
  FORM.append(INPUT_HORIZONTAL);
  FORM.append(BUTTON);

  FORM.addEventListener("submit", (event) => {
    const vertical = Number(INPUT_VERTICAL.value);
    const horizontal = Number(INPUT_HORIZONTAL.value);
    totalCards = vertical * horizontal;

    document.getElementById("app").innerHTML = "";
    document.getElementById("app").append(getGameCards(vertical, horizontal));

    setTimeout(() => {
      document.getElementById("app").innerHTML = "";
      LOST_GAME.classList.add("lost-game");
      document.getElementById("app").append(LOST_GAME);
      LOST_GAME.textContent = "Вы проиграли! Еще одна попытка?";
      LOST_GAME.append(BUTTON_RETURN);
      BUTTON_RETURN.textContent = "Ok";
      BUTTON_RETURN.classList.add("btn-lost-game");
      BUTTON_RETURN.addEventListener("click", () => {
        document.getElementById("app").innerHTML = "";
        document.getElementById("app").append(letTheGame());
      });
    }, 1000 * 60);
  });
  return FORM;
}

function shuffle(arr) {
  let newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function getGameCards(vertical, horizontal) {
  const CARDS = document.createElement("div");
  const NUMBERS = [];

  CARDS.classList.add("cards");

  CARDS.style.gridTemplateColumns = `repeat(${horizontal}, 1fr)`;
  CARDS.style.gridTemplateRows = `repeat(${vertical}, 1fr)`;

  (function generateNumbers(n) {
    for (let i = 1; i <= n; i++) {
      NUMBERS.push(i, i);
    }
  })((vertical * horizontal) / 2);

  const SHUFFLED_NUMBERS = shuffle(NUMBERS);

  SHUFFLED_NUMBERS.forEach((number) => {
    const CARD = document.createElement("div");
    const CARDS_FRONT = document.createElement("div");
    const CARDS_BACK = document.createElement("div");
    const CONTAINER = document.createElement("div");
    const BUTTON = document.createElement("btn");

    CONTAINER.classList.add("container");
    BUTTON.classList.add("btn");
    CARD.classList.add("card");
    CARDS_FRONT.classList.add("card__front");
    CARDS_BACK.classList.add("card__back");

    CARD.append(CARDS_FRONT);
    CARD.append(CARDS_BACK);
    CONTAINER.append(BUTTON);

    CARDS_BACK.textContent = number;

    BUTTON.textContent = "Сыграть ещё раз";
    CARDS.append(CARD);

    CARD.addEventListener("click", (e) => {
      CARD.classList.add("active");

      if (cardsArr.length === 0) {
        cardsArr.push(CARD);
        return;
      }

      cardsArr.push(CARD);
      if (
        cardsArr[0].querySelector(".card__back").textContent ===
        cardsArr[1].querySelector(".card__back").textContent
      ) {
        cardsArr.forEach((card) => {
          card.classList.add("open");
          cardsOpen.push(CARD);
        });
        cardsArr = [];
      } else {
        setTimeout(() => {
          cardsArr.forEach((card) => card.classList.remove("active"));
          cardsArr = [];
        }, 1000);
      }

      if (cardsOpen.length === vertical * horizontal) {
        setTimeout(() => {
          document.getElementById("app").append(CONTAINER);
        }, 1000);
      }
    });

    BUTTON.addEventListener("click", () => {
      document.getElementById("app").innerHTML = "";
      cardsOpen.length = 0;

      setTimeout(() => {
        document.getElementById("app").append(letTheGame());
      }, 300);
    });
  });
  return CARDS;
}
