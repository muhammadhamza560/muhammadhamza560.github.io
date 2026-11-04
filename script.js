
// =====================================================
// MUHAMMAD HAMZA — PERSONAL PORTFOLIO
// Main JavaScript File
// =====================================================


// ================= MOBILE NAVIGATION =================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    // Open and close the mobile navigation.
    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

    });


    // Close navigation after clicking a link.
    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });


    // Close navigation when Escape is pressed.
    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

        }

    });

}



// ================= STICKY NAVBAR =================

const navbar = document.getElementById("navbar");

function updateNavbar() {

    if (!navbar) return;

    if (window.scrollY > 30) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", updateNavbar, {
    passive: true
});

updateNavbar();



// ================= SCROLL REVEAL =================

const revealElements = document.querySelectorAll(".reveal");

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


if ("IntersectionObserver" in window && !prefersReducedMotion) {

    const revealObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12,
            rootMargin: "0px 0px -30px 0px"
        }

    );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

} else {

    // Show everything if animations are unsupported or disabled.
    revealElements.forEach(element => {

        element.classList.add("visible");

    });

}



// ================= ACTIVE NAVIGATION =================

const pageSections = document.querySelectorAll(
    "main section[id]"
);

const navigationLinks = document.querySelectorAll(
    ".nav-links a[href^='#']"
);


if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const currentId = entry.target.id;

                    navigationLinks.forEach(link => {

                        const targetId = link.getAttribute("href");

                        link.classList.toggle(
                            "active",
                            targetId === `#${currentId}`
                        );

                    });

                }

            });

        },

        {
            rootMargin: "-30% 0px -60% 0px",
            threshold: 0
        }

    );


    pageSections.forEach(section => {

        sectionObserver.observe(section);

    });

}



// ================= VIDEO PLAYER =================

const videoDialog = document.getElementById("videoDialog");

const videoPlayer = document.getElementById("videoPlayer");

const closeVideoButton = document.getElementById("closeVideo");

const videoPlayButtons = document.querySelectorAll(
    ".video-play-button"
);


// Stop and reset the current video.
function stopPortfolioVideo() {

    if (!videoPlayer) return;

    videoPlayer.pause();

    videoPlayer.removeAttribute("src");

    videoPlayer.removeAttribute("poster");

    videoPlayer.load();

}


// Open the selected video.
function openPortfolioVideo(button) {

    if (!videoDialog || !videoPlayer) return;

    const videoPath = button.dataset.video;

    const posterPath = button.dataset.poster;

    if (!videoPath) return;


    // Load the selected video.
    videoPlayer.pause();

    videoPlayer.src = videoPath;


    if (posterPath) {

        videoPlayer.poster = posterPath;

    } else {

        videoPlayer.removeAttribute("poster");

    }


    videoPlayer.load();


    // Open the popup.
    if (typeof videoDialog.showModal === "function") {

        if (!videoDialog.open) {

            videoDialog.showModal();

        }

        // Attempt playback.
        // Browser controls remain available if autoplay is blocked.
        videoPlayer.play().catch(error => {

            console.info(
                "Video is ready. Press Play to start.",
                error
            );

        });

    } else {

        // Fallback for browsers without dialog support.
        window.open(
            videoPath,
            "_blank",
            "noopener,noreferrer"
        );

    }

}


// Attach video buttons.
videoPlayButtons.forEach(button => {

    button.addEventListener("click", () => {

        openPortfolioVideo(button);

    });

});


// Close the video player.
function closePortfolioVideo() {

    stopPortfolioVideo();

    if (videoDialog && videoDialog.open) {

        videoDialog.close();

    }

}


// Close button.
if (closeVideoButton) {

    closeVideoButton.addEventListener(
        "click",
        closePortfolioVideo
    );

}


// Close when clicking outside the video.
if (videoDialog) {

    videoDialog.addEventListener("click", event => {

        if (event.target === videoDialog) {

            closePortfolioVideo();

        }

    });


    // Stop video when the dialog closes.
    videoDialog.addEventListener("close", () => {

        stopPortfolioVideo();

    });

}



// ================= CURRENT COPYRIGHT YEAR =================

const currentYear = document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}



// ================= CONSOLE MESSAGE =================

console.log(
    "Muhammad Hamza | Personal Portfolio Loaded Successfully."
);
