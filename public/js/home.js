const home = () => {
    const whyDoTab = () => {
        const DOM = {
            tabs: document.querySelectorAll('.whyDo__detail-tab-item'),
            contents: document.querySelectorAll('.whyDo__detail-content-item')
        }
        DOM.tabs.forEach((tab, index) => {
            tab.addEventListener('click', function () {
                removeActive();
                DOM.tabs[index].classList.add("active");
                DOM.contents[index].classList.add("active");
            })
        })
        const removeActive = () => {
            DOM.tabs.forEach((tab, index) => {
                DOM.tabs[index].classList.remove("active");
                DOM.contents[index].classList.remove("active");
            })
        }
    }

    whyDoTab();
}

window.onload = function () {
    home();
}