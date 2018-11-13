var nbCol = 5;

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    //var headers = allTextLines[0].split(';');
    var lines = [];

    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(';');
        if (data.length == nbCol) {

            var tarr = [];
            for (var j = 0; j < nbCol; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    }
    console.log(lines);
    return lines;
}

var fileInput = document.getElementById("csv"),

// Builds an array of lines containing the values
    readFile = function () {
        var reader = new FileReader();
        reader.onload = function () {
            var content = reader.result;
            document.getElementById('out1').innerHTML = generateHTML(processData(content));
            document.getElementById('out2').innerHTML = generateHTML(processData(content));
            // document.getElementById('out3').innerHTML = generateHTML(processData(content));
            // document.getElementById('out4').innerHTML = generateHTML(processData(content));
            // document.getElementById('out5').innerHTML = generateHTML(processData(content));
        };
        // start reading the file. When it is done, calls the onload event defined above.
        reader.readAsBinaryString(fileInput.files[0]);
    };

var generateHTML = function (lines) {

    var html = "<table>";

    //headers
    html += "<tr><th>Num. Assaut</th><th>Tireur bleu</th><th>Tireur Rouge</th></tr>"

    //data
    for (var i = 0; i < lines.length; i++) {
        html += "<tr>"

        var num = "<td>"+lines[i][0]+"</td>"

        var redBoxer = "<td class ='red'>"+lines[i][1] + " ("+lines[i][2] + ") "+"</td>"
        var blueBoxer = "<td class ='blue'>"+lines[i][3] + " ("+lines[i][4] + ") "+"</td>"


        html += num + redBoxer + blueBoxer + "</tr>";
    }
    html += "</table>";

    return html;
}

fileInput.addEventListener('change', readFile);