/* Your JS here. */
console.log('Hello World!')


let currentPosition = 0;
let ticking = false;
function onScroll(position) {
    console.log(position);
}

const navbar_items = document.querySelectorAll(".navbar-item");

console.log("doing stuff");
navbar_items.forEach((element) => {
    console.log("attached method");
    element.addEventListener("mouseenter", () =>{
        console.log("entered")
        element.className = "navbar-item";

        /*Now make a box appear around the word instead of changing the color */
    });
    element.addEventListener("mouseleave", () =>{
        console.log("leaving");
        element.className = "navbar-item-no-outline";
    });
});

document.addEventListener("scroll", (event) => {
    positionY = window.scrollY;
    if (!ticking) {
        setTimeout(() => {
            onScroll(positionY);
            ticking = false;
        }, 50)
        ticking = true;
    }
});

// document.addEventListener("mouseover", (event) => {
//     ;
// });

