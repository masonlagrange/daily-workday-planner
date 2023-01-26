// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Identify all the buttons on the page
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

  // Variable for the current hour defined by a dayjs query
  // Variable for time block hour defined by removing non-numbers
  // from the div id, then parsing to an integer so they can be compared
  // to the query result
  var timeBlocks = document.getElementsByClassName('time-block');
  var theHour = 14// dayjs().format('H');

  $(timeBlocks).each(function(){
    var hourOfBlock = parseInt(this.id.replace(/\D/g, ''));
    // Conditional to add classes to the divs depending on the time
    // comparison
    if (hourOfBlock < theHour) {
      this.classList.add('past');
    } else if (hourOfBlock === theHour) {
      this.classList.add('present');
    } else {
      this.classList.add('future');
    }
  })
  
  // Get saved descriptions by their parent element ID
  // Set the innner text of the description elements to the saved message
  var descs = document.getElementsByClassName('description'); 
  $(descs).each(function() {
    var descID = this.parentElement.id;
    var savedDesc = localStorage.getItem(descID);
    
    this.innerHTML = savedDesc
  })
  
  // Display the current date in the header of the page.
  var date = document.getElementById('currentDay');
  date.textContent = dayjs().format('dddd, D MMMM YYYY');
});
