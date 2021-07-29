let currentDay = $("#current-day");
let timeBlocks = $("#time-blocks");
let textEntryArray = [];

currentDay.text(moment().format("dddd, MMMM Do"));
let currentHour = moment().format("H");

/**
 * Renders the Schedule blocks, assiging appropriate class based on current time. 
 * @author Nate Irvin <nathan.a.irvin@gmail.com>
 */
function renderInitialSchedule() {
    for (i=0; i<9; i++) {
        const newRow = $("<tr>");
        newRow.addClass("row");
        timeBlocks.append(newRow);

        const hourBlock = $("<td>");
        if ((i+9)<12) {
            hourBlock.text((i+9) + " AM");
        }
        else if ((i+9)==12) {
            hourBlock.text((i+9) + " PM");
        } else {
            hourBlock.text((i-3) + " PM");
        }
        hourBlock.addClass("hour");
        newRow.append(hourBlock);

        const entryBlock = $("<td>");
        entryBlock.addClass("time-block")
        if ((i+9)<currentHour) {
            entryBlock.addClass("past");
        } else if ((i+9) == currentHour) {
            entryBlock.addClass("present");
        } else {
            entryBlock.addClass("future");
        }
        newRow.append(entryBlock);

        const textEntry = $("<textarea>");
        textEntry.addClass("select-text");
        textEntry.val(textEntryArray[i]);
        entryBlock.append(textEntry);

        const saveEl = $("<td>");
        saveEl.addClass("save-line");
        newRow.append(saveEl);
        const btn = $("<button>");
        btn.text("SAVE");
        btn.addClass("saveBtn");
        saveEl.append(btn);
    }
}

// Init function called when the page is loaded to get data from local storage and render the schedule
function init() {
    textEntryArray = JSON.parse(localStorage.getItem("textEntries"));
    if (textEntryArray == null) {
        textEntryArray = ["", "", "", "", "", "", "", "", ""];
        console.log(textEntryArray);
    }
    renderInitialSchedule();
}

init();

// Event listener on the Save Button -> Triggers runction to save the text in the associated area to local Storage
$(".save-line").on("click", "button", function(event) {
    let entryText = $(this).closest("tr").find(".select-text").val();
    let rowClicked = $(this).closest("tr").index();
    textEntryArray[rowClicked] = entryText;
    console.log(textEntryArray);
    localStorage.setItem("textEntries", JSON.stringify(textEntryArray));
});
