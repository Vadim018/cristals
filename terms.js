/*  */

setTimeout(function () {
    document.getElementById("loading-screen").style.opacity = 0;
    setTimeout(function () {
      document.getElementById("loading-screen").style.display = "none";
    }, 500);
  }, 0);

document.addEventListener("click", function (event) {
  if (event.target.tagName === "A") {
    event.preventDefault();
    document.getElementById("loading-screen").classList.add("fade-out");
    setTimeout(function () {
      window.location.href = event.target.href;
    }, 0);
  }
});