// carousel
const track = document.querySelector('.carousel-track');
const rightArrow = document.querySelector('.arrow.right');
const leftArrow = document.querySelector('.arrow.left');

let scrollPosition = 0;
const cardWidth = 320; // card + margin

rightArrow.addEventListener('click', () => {
  scrollPosition -= cardWidth;
  track.style.transform = `translateX(${scrollPosition}px)`;
});

leftArrow.addEventListener('click', () => {
  scrollPosition += cardWidth;
  track.style.transform = `translateX(${scrollPosition}px)`;
});