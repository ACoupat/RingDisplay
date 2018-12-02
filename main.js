let nbCol = 5;

let lines = [];
let maxLines = 3;

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
        html += "<tr><th>Num. Assaut</th><th>Tireur bleu</th><th>Tireur Rouge</th></tr>"


        for (let i = 0; i < maxLines; i++) {
            //data
            if (lineCount < lines.length) {
                html += "<tr>"

                var num = "<td>" + lines[lineCount][0] + "</td>"

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

fileInput.addEventListener('change', readFile);