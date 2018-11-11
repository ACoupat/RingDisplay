var nbCol = 3;

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    //var headers = allTextLines[0].split(';');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(';');
        if (data.length == nbCol) {

            var tarr = [];
            for (var j=0; j<nbCol; j++) {
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
        document.getElementById('out3').innerHTML = generateHTML(processData(content));
        document.getElementById('out4').innerHTML = generateHTML(processData(content));
        document.getElementById('out5').innerHTML = generateHTML(processData(content));
    };
    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput.files[0]);
};

var generateHTML = function(lines){
    
    var html ="<table>";
    
    //headers
    html += "<tr><th>Num. Assaut</th><th>Tireur bleu</th><th>Tireur Rouge</th></tr>"
    
    //data
    for(var i=0; i<lines.length; i++)
    {
        html += "<tr>"
        for(var j=0; j<nbCol ; j++)
        {   
            //Handling color
            if(j==0){
                html += "<td>"
            }
            if(j==1)
            {
                html += "<td class='blue'>";
            }
            else if(j==2)
            {
                 html += "<td class='red'>";
            }
            html += lines[i][j]+"</td>"
        }
        html += "</tr>";
    }
        html += "</table>";
    
    return html;
}

fileInput.addEventListener('change', readFile);