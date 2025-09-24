/* Your JS here. */




function get_navbar_height() {
    const navbar = document.querySelector(".navbar");
    const rect = navbar.getBoundingClientRect();
    return rect.bottom;
}

function latest_item(currentY, div_items) {
    // Given the current Y coordinate and a list of div items
    // return the index of the latest item that it is currentY is greater than
    const scrollY = window.scrollY;
    let current_index = 0;
    div_items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const absoluteY = rect.top + scrollY;
        if (currentY >= absoluteY) {
            current_index = index;
        } else {
            return current_index;
        }
    });
    console.log(current_index)
    return current_index;
}


function get_navbar_index() {
    // Get the index of the div with which the navbar is
    // past in the page. For example, when the page is fresh,
    // the navbar will be past the 0th div section. If you scroll
    // down a little, you will pass the 1st div section, and so on.
    const scrollY = window.scrollY;
    const navbar = document.querySelector(".navbar");
    const rect = navbar.getBoundingClientRect();
    const navbar_bottomY = rect.bottom + scrollY;

    const div_items = [video, modals, columnized, carousel, background];

    const navbar_index = latest_item(navbar_bottomY, div_items);
    return navbar_index;
}



function bind_clicks(event) {
    // Bind clicking events to each navbar item
    const navbar_items = document.querySelectorAll(".navbar-item");    
    
    navbar_items.forEach((item, index) => {
        item.addEventListener("click", (event) => {

            // Find the index'th div, scroll to it
            const sections = [video, modals, columnized, carousel, background];
            const div_to_scroll_to = sections[index];            
            const targetY = div_to_scroll_to.getBoundingClientRect().top + window.scrollY;
            const finalScrollY = targetY - get_navbar_height();
            // console.log(`${window.scrollY}, ${div_to_scroll_to.getBoundingClientRect().top}, ${targetY}`, get_navbar_height());
            if (index == 0) {
                window.scrollTo({top: 0, behavior: "smooth"});
            } else {
                window.scrollTo({top: finalScrollY + 15, behavior: "smooth"});
            }


        });
    })

    // I have to figure out how to section off the different portions, such
    // as the video tag, modal, columnwise stuff, and carousel
}

function bind_hovering() {
    // Fire some events whenever we hover on the navbar items
    const navbar_items = document.querySelectorAll(".navbar-item");
    navbar_items.forEach((element, index) => {
        element.addEventListener("mouseenter", () =>{
            element.classList.add("navbar-item-outline");
        });
        element.addEventListener("mouseleave", () =>{
            // If we are on that current section of the page, don't remove the outline
            const navbar_index = get_navbar_index();
            if (index != navbar_index) {
                element.classList.remove("navbar-item-outline");
            } 
        });
    });
}


let navbarShrunk = false;

function resize_navbar() {
    const navbar = document.querySelector(".navbar");
    const header = document.getElementById("header");
    if (!navbarShrunk && window.scrollY > 90) {
        navbar.classList.add("shrink");
        header.classList.add("shrunk");
        navbarShrunk = true;
    } else if (navbarShrunk && window.scrollY < 55) {
        navbar.classList.remove("shrink");
        header.classList.remove("shrunk");
        navbarShrunk = false;
    }
    //console.log(window.scrollY);
}

function update_navbar(event) {
    // Update the navbar item shader depending on which section we're in
    const navbar_index = get_navbar_index();

    // Unhighlight all items
    const navbar_items = document.querySelectorAll(".navbar-item")
    navbar_items.forEach((item, index) => {
        item.className = "navbar-item"
    });

    if (navbar_index >= navbar_items.length) {
        return;
    }
    // Highlight the item'th item
    navbar_items[navbar_index].classList.add("navbar-item-outline");
}

function bind_scrolling() {
    document.addEventListener("scroll", update_navbar)
    document.addEventListener("scroll", resize_navbar)    
    // Do some navbar resizing when I scroll down
}




function bind_clickables() {
  const clickables = document.querySelectorAll(".clickable");
  const modal = document.getElementById("myModal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.querySelector(".close");

  clickables.forEach((item) => {
    item.onclick = function() {
      const imgSrc = item.src;

      modalImg.src = imgSrc;
      modal.style.display = "block"; // show modal container immediately

      // Small timeout to trigger CSS transition
      setTimeout(() => {
        modal.classList.add("active"); // fade-in with opacity transition
      }, 10);
    };
  });

  closeBtn.onclick = function() {
    modal.classList.remove("active"); // fade out

    // After transition ends, hide modal completely
    modal.addEventListener("transitionend", function handler() {
      modal.style.display = "none";
      modal.removeEventListener("transitionend", handler);
    });
  };

  // Optional: close modal when clicking outside image
  modal.onclick = function(event) {
    if (event.target === modal) {
      closeBtn.onclick();
    }
  };
}

let video, modals, columnized, background, carousel;

document.addEventListener("DOMContentLoaded", () => {
    // Fire some events whenever we hover on the navbar items
    video = document.querySelector("video");
    modals = document.querySelector(".modalgrid-wrapper");
    columnized = document.querySelector(".columnized-wrapper");
    carousel = document.querySelector(".carousel");
    background = document.querySelector(".div.background");


    bind_hovering();

    // I also wanna know where all the other DIVS are within the page
    // whenever we scroll, and do a comparison to the current position

    // Now that I have the div positions, I wanna write some code to highlight
    // which section of the page I'm in on the navbar

    // In order to do that, I need the bottom of the navbar
    bind_scrolling();

    // After that, I'm gonna write some code so that when I click on the
    // navbar item, it scrolls me down (smooth scrolling)
    bind_clicks();
    bind_clickables();

    window.scrollTo({top: 1});
});




// Carousel things

const path = document.querySelector('.carousel-path');
const items = document.querySelectorAll('.carousel-item');
const nextBtn = document.querySelector('.carousel-button.next');
const prevBtn = document.querySelector('.carousel-button.previous');
const fun_fact = document.getElementById("carousel-text");

let currentIndex = 0;

function updateCarousel() {
  const offset = -currentIndex * items[0].clientWidth;
  path.style.transform = `translateX(${offset}px)`;
  fun_fact.style.opacity = 0;
  setTimeout(() => {
    fun_fact.textContent = carousel_info[currentIndex];
    fun_fact.style.opacity = 1;
  }, 500); // matches CSS transition duration
}


const carousel_info = ["When they're born, they're only about 1lb, and they're very cute!",
    "After they turn 3, they become adolescents and learn to hunt.",
    "When they turn into adults, they start denning and make families of their own."
]

nextBtn.addEventListener('click', () => {
  if (currentIndex < items.length - 1) {
    currentIndex++;
    updateCarousel();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});


