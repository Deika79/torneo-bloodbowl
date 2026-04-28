const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".galeria-grid img").forEach(img => {
    img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
    });
});

closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
});