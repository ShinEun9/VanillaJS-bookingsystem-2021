const seats = document.querySelectorAll(".seat");
const remainedSeats = document.querySelectorAll(".remained-seat");
const button = document.querySelector(".booking-btn");
const movieSelect = document.querySelector("select");
const price = document.querySelector(".price-expression");

let selectingSeats = [];
let selectingSeats2 = [];
let selectedSeats = [];
let movieTitle = "theater";
let movieIndex = 0;
let count = 0;
let Aladdin = [];

function loadSeats() {
  seats.forEach((seat) => {
    if (seat.classList.contains("selected")) {
      seat.classList.toggle("selected");
    }
  });

  if (localStorage.getItem(movieTitle) !== null) {
    let a = localStorage.getItem(movieTitle).split(",");
    for (let i = 0; i < a.length; i++) {
      let selected = document.querySelector(`#${a[i]}`);
      selected.classList.toggle("selected");
    }
  }
}

function seatsClickCheck() {
  seats.forEach((seat) => remained);
}

function changePriceExpression(count) {
  price.innerText = `You have selected ${count}seats for a price of \\${
    count * 12000
  }`;
}

function changeOptions(event) {
  movieTitle = event.target.selectedOptions[0].value;
  if (movieTitle === "theater") {
    seats.forEach((seat) => {
      if (!seat.classList.contains("click-impossible")) {
        seat.classList.toggle("click-impossible");
      }
      seat.removeEventListener("click", clickSeat);
    });
  } else {
    seats.forEach((seat) => {
      if (seat.classList.contains("click-impossible")) {
        seat.classList.toggle("click-impossible");
      }
    });
    loadSeats();
    remainedSeats.forEach((remainedSeat) =>
      remainedSeat.addEventListener("click", clickSeat)
    );
    button.addEventListener("click", clickButton);
  }

  const moviePoster = document.querySelector(".movie-poster");
  moviePoster.attributes[1].nodeValue = `img/${movieTitle}.jpg`;
}

function checkDoubleClick(id) {
  for (let i = 0; i < selectingSeats.length; i++) {
    if (selectingSeats[i] === id) {
      return false;
      break;
    }
  }
  return true;
}

function clickSeat(event) {
  if (selectingSeats.length === 0) {
    selectingSeats.push(event.target.id);
    count++;
  } else if (!checkDoubleClick(event.target.id)) {
    selectingSeats.forEach(function (selectingSeat) {
      if (selectingSeat !== event.target.id) {
        selectingSeats2.push(selectingSeat);
      }
    });
    count--;
    selectingSeats = selectingSeats2;
    selectingSeats2 = [];
  } else {
    selectingSeats.push(event.target.id);
    count++;
  }
  changePriceExpression(count);
  event.target.classList.toggle("selecting");
  event.target.classList.toggle("remained-seat");
}

function clickButton(event) {
  count = 0;
  changePriceExpression(count);

  for (let i = 0; i < selectingSeats.length; i++) {
    selected = document.querySelector(`#${selectingSeats[i]}`);
    selected.classList.toggle("selecting");
    selected.classList.toggle("selected");
    selected.removeEventListener("click", clickSeat);
  }

  if (localStorage.getItem(movieTitle) !== null) {
    selectedSeats = localStorage.getItem(`${movieTitle}`).split(",");
  }
  selectingSeats.forEach((selectingSeat) => selectedSeats.push(selectingSeat));
  localStorage.setItem(movieTitle, selectedSeats);
  selectingSeats = [];
  selectedSeats = [];
}

function init() {
  movieSelect.addEventListener("change", changeOptions);
}

init();
