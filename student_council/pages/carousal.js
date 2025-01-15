let currentIndex = 0;
const imagePaths = [
    "../images/cover_images/IMG_6519.PNG",
    "../images/cover_images/IMG_6555.PNG",
    "../images/cover_images/IMG_6556.PNG",
    "../images/cover_images/IMG_6558.PNG",
    "../images/cover_images/IMG_6559.PNG",
    "../images/cover_images/IMG_6560.PNG"
];
let totalSlides = imagePaths.length;
const transitionDuration = 500;  // Transition duration in ms

function showSlide(index) {
    const carousel = document.querySelector('.carousel');

    // Smooth transition logic
    carousel.style.transition = 'left 0.5s ease-in-out';  // Apply transition for smooth effect

    if (index >= totalSlides) {
        currentIndex = 0;  // Wrap back to the first slide
    } else if (index < 0) {
        currentIndex = totalSlides - 1;  // Wrap to the last slide
    } else {
        currentIndex = index;
    }

    // Move the carousel to the appropriate slide by updating the `left` property
    const offset = currentIndex * -100;  // Calculate percentage offset
    carousel.style.left = `${offset}%`;

    // Reset the transition to ensure it wraps smoothly without snapping
    carousel.addEventListener('transitionend', handleTransitionEnd);
}

function handleTransitionEnd() {
    const carousel = document.querySelector('.carousel');

    // If we are at the first or last fake slide, we snap the position without animation
    if (currentIndex === totalSlides) {
        carousel.style.transition = 'none';  // Disable transition for snapping
        currentIndex = 0;  // Reset to the first real slide
        carousel.style.left = `${currentIndex * -100}%`;  // Instantly move to the first slide
    } else if (currentIndex === -1) {
        carousel.style.transition = 'none';  // Disable transition for snapping
        currentIndex = totalSlides - 1;  // Reset to the last real slide
        carousel.style.left = `${currentIndex * -100}%`;  // Instantly move to the last slide
    }

    // Remove the transitionend event listener to avoid unnecessary calls
    carousel.removeEventListener('transitionend', handleTransitionEnd);
}

function renderCarousel() {
    const carousel = document.querySelector('.carousel');
    // Dynamically generate carousel-item divs with images
    imagePaths.forEach((path) => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        const img = document.createElement('img');
        img.src = path;
        img.alt = `Image ${imagePaths.indexOf(path) + 1}`;
        carouselItem.appendChild(img);
        carousel.appendChild(carouselItem);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderCarousel();
    // Initially show the first slide
    showSlide(currentIndex);
});

// Define nextSlide and prevSlide globally
function nextSlide() {
    showSlide(currentIndex + 1);  // Move to the next slide
}

function prevSlide() {
    showSlide(currentIndex - 1);  // Move to the previous slide
}
