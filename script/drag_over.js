
function toinputfilehover() {
    document.getElementById('img_input').classList = 'inputfilehover';
}
function toinputfilehoverend() {
    document.getElementById('img_input').classList = 'inputfile';
}


function previewFile() {
    const file = document.querySelector('#img_input_manually').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        // convert image file to base64 string
        loadToCanvas(reader.result);
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}



function loadToCanvas(result) {
    const image = new Image();
    image.src = result;
    image.onload = () => {
        const canvas = document.querySelector('canvas');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.width);
        let dataURL = canvas.toDataURL();
        console.log(dataURL.length);
    }
}

document.querySelector('#img_input').addEventListener('drop', e => {
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsDataURL(e.dataTransfer.files[0]);
    reader.onload = () => {
        loadToCanvas(reader.result);
    }
});