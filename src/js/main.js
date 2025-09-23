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
    const div_items = document.querySelectorAll(".div1");
    const navbar_index = latest_item(navbar_bottomY, div_items);
    return navbar_index;
}



function bind_clicks(event) {
    // Bind clicking events to each navbar item
    const navbar_items = document.querySelectorAll(".navbar-item");    
    
    navbar_items.forEach((item, index) => {
        item.addEventListener("click", (event) => {

            // Find the index'th div, scroll to it
            const divs = document.querySelectorAll('.div1');
            const div_to_scroll_to = divs[index];            
            const targetY = div_to_scroll_to.getBoundingClientRect().top + window.scrollY;
            const finalScrollY = targetY - get_navbar_height();
            console.log(`${window.scrollY}, ${div_to_scroll_to.getBoundingClientRect().top}, ${targetY}`, get_navbar_height());
            if (index == 0) {
                window.scrollTo({top: 0, behavior: "smooth"});
            } else {
                window.scrollTo({top: finalScrollY + 15, behavior: "smooth"});
            }


            // setTimeout(() => {
            //     const targetY2 = div_to_scroll_to.getBoundingClientRect().top + window.scrollY;
            //     const finalScrollY2 = targetY2 - get_navbar_height();
            //     console.log(`${window.scrollY}, ${div_to_scroll_to.getBoundingClientRect().top}, ${targetY}`, get_navbar_height());
            //     window.scrollTo({top: finalScrollY2, behavior: "smooth"});
            // }, 400);// I know it shrinks by 40 pixels
        });
    })
    // Depending on which navbar item we clicked, scroll to that div
    // const element = document.querySelector('#target-section');
    // element.scrollIntoView({ behavior: 'smooth' });
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
    if (!navbarShrunk && window.scrollY > 90) {
        navbar.classList.add("shrink");
        navbarShrunk = true;
    } else if (navbarShrunk && window.scrollY < 55) {
        navbar.classList.remove("shrink");
        navbarShrunk = false;
        
    }
    console.log(window.scrollY);
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

    // 
}



document.addEventListener("DOMContentLoaded", () => {
    // Fire some events whenever we hover on the navbar items
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

    window.scrollTo({top: 1});
});





const path = document.querySelector('.carousel-path');
const items = document.querySelectorAll('.carousel-item');
const nextBtn = document.querySelector('.carousel-button.next');
const prevBtn = document.querySelector('.carousel-button.previous');

let currentIndex = 0;

function updateCarousel() {
  const offset = -currentIndex * items[0].clientWidth;
  path.style.transform = `translateX(${offset}px)`;
}

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
