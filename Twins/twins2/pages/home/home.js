(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Utilities.query("a").listen("click", linkClickEventHandler, false);
            WinJS.Utilities.query(".nav").listen("onmousedown", menudown, false);
            WinJS.Utilities.query(".nav").listen("onmouseup", menu_up, false);
        }
    });
})();

function linkClickEventHandler(eventInfo) {
    eventInfo.preventDefault();
    var link = eventInfo.target;
    WinJS.Navigation.navigate(link.href);
}

function menudown() {
    this.style.backgroundColor = "#11289f";
    
}

function menu_up() {
    this.style.backgroundColor = "#000000"; 
}