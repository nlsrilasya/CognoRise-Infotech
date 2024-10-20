document.querySelectorAll('.nav li').forEach(function (listItem) {
    listItem.addEventListener("click", function (evt) {
        let headerOffset = 100;

        let target = document.getElementById(evt.target.dataset.href);
        let elementPosition = target.getBoundingClientRect().top;
        let offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
             top: offsetPosition,
             behavior: "smooth"
        });
    })
})