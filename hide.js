function hide(selection) {
        var value = selection.value;
        if (value == "week") {
            document.getElementById("monthDiv").style.display = "none";
            document.getElementById("yearDiv").style.display = "none";
            document.getElementById("weekDiv").style.display = "block";
            document.getElementById("graphMonth").style.display = "none";
            document.getElementById("graphYear").style.display = "none";
            document.getElementById("graphWeek").style.display = "block";
            document.getElementById("mapWeek").style.display = "block";
        } else if (value == "month") {
            document.getElementById("weekDiv").style.display = "none";
            document.getElementById("yearDiv").style.display = "none";
            document.getElementById("monthDiv").style.display = "block";
            document.getElementById("graphWeek").style.display = "none";
            document.getElementById("graphYear").style.display = "none";
            document.getElementById("graphMonth").style.display = "block";
            document.getElementById("mapWeek").style.display = "none";
        } else {
            document.getElementById("weekDiv").style.display = "none";
            document.getElementById("monthDiv").style.display = "none";
            document.getElementById("yearDiv").style.display = "block";
            document.getElementById("graphWeek").style.display = "none";
            document.getElementById("graphMonth").style.display = "none";
            document.getElementById("graphYear").style.display = "block";
            document.getElementById("mapWeek").style.display = "none";
        }
    }