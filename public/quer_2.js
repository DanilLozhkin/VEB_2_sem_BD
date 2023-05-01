const button2 = document.getElementById('but');

button2.addEventListener('click', function (event) {
    event.preventDefault();
    var Value = document.getElementById("p4").innerText;
    var values = Value.replace("value, vertex: ", "").split(",");
    var vertex = [];
    for (var i = 0; i < values.length; i++) {
        vertex.push(parseFloat(values[i]));
    }
    const typ = document.getElementById('p3').textContent.split(': ')[1];
    var Color = document.getElementById('p5').textContent.split(': ')[1];
    Color = parseInt("0x" + Color.substring(1));
    
    TREE_JS(typ, vertex, Color)
});
