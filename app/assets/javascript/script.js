var page = new FullPage("#main", {
  onLeave: function(index) {
    console.log(index);
  },

  afterLoad: function(index) {
    console.log(index);

  }

});

var moveToTop = document.getElementById("moveToTop");
var moveToLast = document.getElementById("moveToLast");

moveToTop.addEventListener('click', function(e) {
  page.moveTo(0);

  e.preventDefault();

});

moveToLast.addEventListener('click', function(e) {
  page.moveTo(3);

  e.preventDefault();


});
