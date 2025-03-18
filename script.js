document.addEventListener("DOMContentLoaded", () => {
    fetch("movies.json")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("sprite-container");
            data.forEach(movie => {
                let sprite = new MovieSprite(movie);
                container.appendChild(sprite.element);
                sprite.animate();
            });
        })

    document.getElementById("close-btn").addEventListener("click", () => {
        gsap.to("#info-box", { opacity: 0, duration: 0.5, onComplete: () => {
            document.getElementById("info-box").style.display = "none";
        }});
    });
});

class MovieSprite {
    constructor(movie) {
        this.movie = movie;
        this.element = document.createElement("div");
        this.element.classList.add("sprite");
        this.element.textContent = movie.title;

        this.element.addEventListener("click", () => {
            clickSprite(movie);
        });
    }

    animate() {
        gsap.fromTo(this.element, 
            { opacity: 0, y: 50 }, 
            { opacity: 1, y: 0, duration: 1, ease: "bounce.out" }
        );
    }
}

function clickSprite(movie) {
    document.getElementById("info-title").textContent = movie.title;
    document.getElementById("info-year").textContent = `Year: ${movie.year}`;
    document.getElementById("info-director").textContent = `Director: ${movie.director}`;

    let infoBox = document.getElementById("info-box");
    infoBox.style.display = "block";
    
    gsap.fromTo(infoBox, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 });
}
