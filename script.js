function generateBarcode() {
    var barcodeText = document.getElementById("barcodeInput").value; // Número de barras
    var description = document.getElementById("descriptionInput").value; // Capturar la descripción ingresada
    

    // Generar el código de barras
    JsBarcode("#barcodeDisplay", barcodeText, {
        displayValue: true, 
        width: 2, // Ancho de las barras del código de barras
        height: 50, // Altura del código de barras
        margin: 30, // Margen alrededor del código de barras
    });

    // Añadir la descripción como texto SVG
    var svgElement = document.getElementById("barcodeDisplay");
    var svgNS = "http://www.w3.org/2000/svg";
    var textElement = document.createElementNS(svgNS, "text");
    textElement.setAttribute("x", "50%"); // Centrar horizontalmente
    textElement.setAttribute("y", "15"); // Posicionar verticalmente dentro del margen superior
    textElement.setAttribute("text-anchor", "middle"); // Alinear al centro
    textElement.setAttribute("font-size", "18"); // Tamaño de la fuente
    textElement.setAttribute("font-family", "Arial, sans-serif"); // Definir la fuente
    //svgElement.setAttribute("width", "1000");
 
    textElement.textContent = description;
    svgElement.appendChild(textElement);

    // Mostrar el botón "Descargar Imagen"
    document.getElementById("downloadButton").style.display = "inline-block";
}


function downloadBarcodeImage(elementId, filename) {
    const svgElement = document.getElementById(elementId);
    const svgData = new XMLSerializer().serializeToString(svgElement);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = filename;
        link.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
}



// Funcion nueva Boton, se utiliza para validar que los campos esten "completos" y para la Animacion Boton "Generar Codigo de Barras"
function checkInputs() {
    var barcodeInput = document.getElementById("barcodeInput").value;
    var descriptionInput = document.getElementById("descriptionInput").value;
    var generateButton = document.getElementById("generateButton");

    if (barcodeInput.trim() !== "" && descriptionInput.trim() !== "") {
        generateButton.disabled = false;
        generateButton.classList.add("button-hover"); // Agregar la clase para la animación al pasar el ratón
    } else {
        generateButton.disabled = true;
        generateButton.classList.remove("button-hover"); // Eliminar la clase de animación al pasar el ratón
    }
}
// Cuando el usuario escriba algo en el campo 'barcodeInput' y/o 'descriptionInput', o borre algo, ejecuta la función 'checkInputs'
document.getElementById("barcodeInput").addEventListener("input", checkInputs);
document.getElementById("descriptionInput").addEventListener("input", checkInputs);


// Funcion utilizada para pasar de campos con el "Enter"
function handleKeyPress(event, nextElementId) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del Enter (como enviar formularios)

        // Obtener el siguiente elemento según el ID proporcionado
        var nextElement = document.getElementById(nextElementId);

        // Enfocar el siguiente elemento
        if (nextElement) {
            nextElement.focus();
        }
    }
}


// Función para habilitar o deshabilitar el botón "Delete" según el contenido de los campos de entrada
function toggleDeleteButton() {
    if (barcodeInput.value || descriptionInput.value) { // Verificar si al menos uno de los campos está lleno
        deleteButton.disabled = false; // Habilitar el botón "Delete"
    } else {
        deleteButton.disabled = true; // Deshabilitar el botón "Delete"
    }
}
// Cuando el usuario ingresa algun dato en algun campo se habilita el boton Limpiar/Delete para borrar los mismos
barcodeInput.addEventListener("input", toggleDeleteButton);
descriptionInput.addEventListener("input", toggleDeleteButton);


// Función para limpiar los campos de entrada
function clearFields() {
    barcodeInput.value = ""; // Limpiar campo de entrada de código de barras
    descriptionInput.value = ""; // Limpiar campo de entrada de descripción

    // Limpiar el SVG de código de barras
    var svgElement = document.getElementById("barcodeDisplay");
    while (svgElement.firstChild) {
        svgElement.removeChild(svgElement.firstChild);
    }

    // Ocultar el botón de "Descargar Imagen"
    document.getElementById("downloadButton").style.display = "none";

    // Deshabilitar el botón de "Generar Código de Barras"
    document.getElementById("generateButton").disabled = true;

    // Deshabilitar el botón "Delete" después de limpiar los campos
    deleteButton.disabled = true;
}