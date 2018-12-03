let nbCol = 5;

let lines = [];
let maxLines = 15;

let currentSelected = 1;

//Keyboard Input
document.addEventListener('keydown', function (event) {

    let amount = 0;

    //left && up
    if (event.keyCode == 37 || event.keyCode == 38) {
        amount = -1;
    }

    //right && down && space
    else if (event.keyCode == 39 || event.keyCode == 40 || event.keyCode == 32) {
        amount = 1;
    }

    let sum = parseInt(currentSelected) + amount;

    if (sum > 0 && sum < lines.length) {
        currentSelected = sum;
        highlightLineFromNumber();
    }

    console.log(currentSelected)
});

let resetTr = null;
let highlightLineByNumber = null;

//JQuery Stuff
$(function () {

    resetTr = function () {
        $("tr").removeClass('selected')
    };

    highlightLineByNumber = function (number) {
        $('#tr' + number).addClass('selected');
    }

    $("output").on("click", "tr", function (event) {
        currentSelected = $(this).children("td")[0].textContent;
        console.log(currentSelected);
        highlightLineFromNumber();
    });

    $("#toggleParameters").click(function () {
        $("#parameters").toggle();
        let text = $("#toggleParameters").text()
        $("#toggleParameters").text(text == "+" ? "-" : "+")
    });

});

//Functions
function update() {

    //Lines
    maxLines = document.getElementById("maxLineChooser").value;
    document.getElementById('out').innerHTML = generateHTML();
    console.log(maxLines);

    //Title
    let newTitle = document.getElementById("titleField").value
    document.getElementById("mainTitle").innerText = newTitle
    document.title = newTitle + " - Open Bisontin"

}

function highlightLineFromNumber() {
    resetTr();
    highlightLineByNumber(currentSelected)
}

function processData(allText) {
    let allTextLines = allText.split(/\r\n|\n/);
    //var headers = allTextLines[0].split(';');

    for (let i = 1; i < allTextLines.length; i++) {
        let data = allTextLines[i].split(';');
        if (data.length == nbCol) {

            let tarr = [];
            for (let j = 0; j < nbCol; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    }
    console.log(lines);
}

let fileInput = document.getElementById("csv"),

// Builds an array of lines containing the values
    readFile = function () {
        let reader = new FileReader();
        reader.onload = function () {
            processData(reader.result);
            document.getElementById('out').innerHTML = generateHTML();
        };
        // start reading the file. When it is done, calls the onload event defined above.
        reader.readAsBinaryString(fileInput.files[0]);
    };


let generateHTML = function () {

    let html = "";
    let lineCount = 0;

    while (lineCount < lines.length) {

        html += "<table>";

        //headers
        html += "<tr><th>Num. Assaut</th><th>Tireur Rouge</th><th>Tireur Bleu</th></tr>"


        for (let i = 0; i < maxLines; i++) {
            //data
            if (lineCount < lines.length) {

                let index = lines[lineCount][0];

                html += "<tr id='tr" + index + "'>"

                var num = "<td>" + parseInt(index) +"</td>"

                var redBoxer = "<td class ='red'>" + lines[lineCount][1] + " (" + lines[lineCount][2] + ") " + "</td>"
                var blueBoxer = "<td class ='blue'>" + lines[lineCount][3] + " (" + lines[lineCount][4] + ") " + "</td>"


                html += num + redBoxer + blueBoxer + "</tr>";
                lineCount++;
            } else {
                break;
            }
        }
        html += "</table>";
    }
    return html;
}

function clock() {// We create a new Date object and assign it to a variable called "time".
    var time = new Date(),

        // Access the "getHours" method on the Date object with the dot accessor.
        hours = time.getHours(),

        // Access the "getMinutes" method with the dot accessor.
        minutes = time.getMinutes(),


        seconds = time.getSeconds();

    document.querySelectorAll('.clock')[0].innerHTML = harold(hours) + ":" + harold(minutes) + ":" + harold(seconds);

    function harold(standIn) {
        if (standIn < 10) {
            standIn = '0' + standIn
        }
        return standIn;
    }
}
setInterval(clock, 1000);

fileInput.addEventListener('change', readFile);