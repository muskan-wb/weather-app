let sideBar = document.querySelector(".side-bar");
let menuButton =document.querySelector(".menu-button");
let menuItems = document.querySelectorAll(".menu-item[data-page]");



menuButton.addEventListener("click" , ()=>{
    sideBar.classList.toggle("open");
});
menuItems.forEach((item) => {
    item.addEventListener("click", () => {
         console.log("clicked:", item.dataset.page);
        let page = item.dataset.page;
        window.location.href = page;
    });
});