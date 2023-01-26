// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  var saveBtn = document.querySelectorAll('.saveBtn');

  // Function that saves the description and attaches it to the id of the parent div
  saveBtn.forEach(item => { item.addEventListener('click',  function (){
    var pressedBtn = this;
    var parentHour = pressedBtn.parentElement;
    var inputToSave = parentHour.children[1].value;
    var hourToFind = pressedBtn.parentElement.id;
    localStorage.setItem(hourToFind, inputToSave);
    })
  })


  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  // Get saved descriptions by their parent element ID
  // Set the innner text of the description elements to the saved message
  var descs = document.getElementsByClassName('description'); 
  $(descs).each(function() {
    var descID = this.parentElement.id;
    var savedDesc = localStorage.getItem(descID);
    this.innerHTML = savedDesc
  })
  
  // TODO: Add code to display the current date in the header of the page.
  var date = document.getElementById('currentDay');
  date.textContent = dayjs().format('dddd, D MMMM YYYY')
});
