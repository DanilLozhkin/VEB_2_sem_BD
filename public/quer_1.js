const button = document.getElementById('but');

button.addEventListener('click', function (event) {
    event.preventDefault();
    const selectElement = document.getElementById('p3');
    const typ = selectElement.options[selectElement.selectedIndex].value;

    const vertexElement = document.getElementById('p4');
    const vertex = vertexElement.value.split(',').map(Number);

    const colorElement = document.getElementById('p5');
    const Color = colorElement.value;

    TREE_JS(typ, vertex, Color)
});
