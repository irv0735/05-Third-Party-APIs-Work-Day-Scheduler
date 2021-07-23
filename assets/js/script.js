let currentDay = $("#current-day");
let timeBlocks = $("#time-blocks");

currentDay.text(moment().format("dddd, MMMM Do"));
let currentHour = moment().format("H");

/**
 * Renders the Schedule blocks, assiging appropriate class based on current time and pulling data from local storage
 */
function renderSchedule() {
    // Loop to add table rows to timeBlocks

    for (i=9; i<18; i++) {
        const newRow = $("<tr>");
        newRow.addClass("row");
        timeBlocks.append(newRow);

        const hourBlock = $("<td>");
        if (i<12) {
            hourBlock.text(i + " AM");
        }
        else if (i==12) {
            hourBlock.text(i + " PM");
        } else {
            hourBlock.text((i-12) + " PM");
        }
        hourBlock.addClass("hour");
        newRow.append(hourBlock);

        const entryBlock = $("<td>");
        entryBlock.addClass("time-block")
        if (i<currentHour) {
            entryBlock.addClass("past");
        } else if (i == currentHour) {
            entryBlock.addClass("present");
        } else {
            entryBlock.addClass("future");
        }
        newRow.append(entryBlock);
        const textEntry = $("<textarea>");
        textEntry.addClass("select-text");
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



renderSchedule();

//Event Listeners

$(".save-line").on("click", "button", function(event) {
    let entryText = $(this).closest("tr").find(".select-text").val();
    if (entryText !== (null || "")) {
        console.log(entryText);
    }
});
