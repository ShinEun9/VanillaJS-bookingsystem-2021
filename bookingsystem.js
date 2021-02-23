const seats = document.querySelectorAll(".seat");
const button = document.querySelector("button");
let selectingSeats = [];
let selectingSeats2 = [];
let selectedSeats = [];
let selected = 0;

function a(id) {
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
  } else if (!a(event.target.id)) {
    selectingSeats.forEach(function (selectingSeat) {
      if (selectingSeat !== event.target.id) {
        selectingSeats2.push(selectingSeat);
      }
    });
    selectingSeats = selectingSeats2;
    selectingSeats2 = [];
  } else {
    selectingSeats.push(event.target.id);
  }
  console.log(selectingSeats);
  event.target.classList.toggle("selecting");
}

function clickButton(event) {
  console.log(event);
  for (let i = 0; i < selectingSeats.length; i++) {
    selected = document.querySelector(`#${selectingSeats[i]}`);
    selected.classList.toggle("selecting");
    selected.classList.toggle("selected");
  }
  selectingSeats.forEach((selectingSeat) => selectedSeats.push(selectingSeat));
  console.log(selectedSeats);
  localStorage.setItem("selectedSeats", selectedSeats);
  selectingSeats = [];
}

function init() {
  if (localStorage.getItem("selectedSeats") !== null) {
    const b = localStorage.getItem("selectedSeats").split(",");
    selectedSeats = b;
    for (let i = 0; i < b.length; i++) {
      selected = document.querySelector(`#${b[i]}`);
      selected.classList.toggle("selected");
    }
  }
  seats.forEach((seat) => seat.addEventListener("click", clickSeat));
  button.addEventListener("click", clickButton);
}

init();
