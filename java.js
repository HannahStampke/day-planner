var toDoItems = [];

var $timeBlocks = (".time-block");
var $plannerArea = (".planner");
var $currentDay = (".today-date");
var currentDate = moment().format("dddd, MMMM Do YYYY");
var currentHour = moment().format("H");


var today = moment();
$("#today").text(today.format("MMM Do, YYYY"));

// Function to run planner 
function initializePlanner(){

  $timeBlocks.each(function(){
    var $thisBlock = $(this);
    var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

    var todoObj = {
      hour: thisBlockHr,
      text: "",
    }
    // Add to todoitems array
    toDoItems.push(todoObj);
  });

  // Saves array to local storage as string
  window.localStorage.setItem("todos", JSON.stringify(toDoItems));
}

// Change colours to the time
function createTimeBlocks(){
    $timeBlocks.each(function(){
      var $thisBlock = $(this);
      var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

      if (thisBlockHr < currentHour) {
        $thisBlock.addClass("past").removeClass("present future");
      }
      if (thisBlockHr == currentHour) {
        $thisBlock.addClass("present").removeClass("past future");
      }
      if (thisBlockHr > currentHour) {
        $thisBlock.addClass("future").removeClass("past present");
      }
    });
}
// Gets the planner content from local storage
function retrievePlanner(){
  
  toDoItems = localStorage.getItem("todos");
  toDoItems = JSON.parse(toDoItems);

  for (var i = 0; i < toDoItems.length; i++){
    var itemHour = toDoItems[i].hour;
    var itemText = toDoItems[i].text; 
   
    $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
  }

  console.log(toDoItems);
}

function saveHandler(){
  var $thisBlock = $(this).parent();

  var hourToUpdate = $(this).parent().attr("data-hour");
  var itemToAdd = (($(this).parent()).children("textarea")).val();

  // Update item based on the hour of the button clicked
  for (var j = 0; j < toDoItems.length; j++){
    if (toDoItems[j].hour == hourToUpdate){
    
      toDoItems[j].text = itemToAdd;
    }
  }
  window.localStorage.setItem("todos", JSON.stringify(toDoItems));
  retrievePlanner();
}

// Runs the functions when the page loads
$(document).ready(function() {

  //Colour timeblocks
  createTimeBlocks();
  //if there are no to dos in the local storage
  if(!localStorage.getItem("todos")){
    //initialize the array of objects
    initializePlanner();
}

  // Show current date
  $currentDay.text(currentDate);

  // Retrieve planner from local storage
  retrievePlanner();
  // So save button saves
  $plannerArea.on("click", "button", saveHandler);
  
});