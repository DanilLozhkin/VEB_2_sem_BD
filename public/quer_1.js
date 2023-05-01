const button = document.getElementById('but');

button.addEventListener('click', function (event) {
    event.preventDefault();
    const typ = document.getElementById('p3').value;

    const vertexElement = document.getElementById('p4');
    const vertex = vertexElement.value.split(',').map(Number);

    const colorElement = document.getElementById('p5');
    const Color = colorElement.value;
    
    TREE_JS(typ, vertex, Color)
});
