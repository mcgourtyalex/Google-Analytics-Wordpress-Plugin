function hide(selection) {
        var value = selection.value;
        if (value == "week") {
            document.getElementById("tableMonth").style.display = "none";
            document.getElementById("tableYear").style.display = "none";
            document.getElementById("tableWeek").style.display = "block";
            document.getElementById("graphMonth").style.display = "none";
            document.getElementById("graphYear").style.display = "none";
            document.getElementById("graphWeek").style.display = "block";
            document.getElementById("mapWeek").style.display = "block";
        } else if (value == "month") {
            document.getElementById("tableWeek").style.display = "none";
            document.getElementById("tableYear").style.display = "none";
            document.getElementById("tableMonth").style.display = "block";
            document.getElementById("graphWeek").style.display = "none";
            document.getElementById("graphYear").style.display = "none";
            document.getElementById("graphMonth").style.display = "block";
            document.getElementById("mapWeek").style.display = "none";
        } else {
            document.getElementById("tableWeek").style.display = "none";
            document.getElementById("tableMonth").style.display = "none";
            document.getElementById("tableYear").style.display = "block";
            document.getElementById("graphWeek").style.display = "none";
            document.getElementById("graphMonth").style.display = "none";
            document.getElementById("graphYear").style.display = "block";
            document.getElementById("mapWeek").style.display = "none";
        }
    }