var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
var app = {
    lineCavans: 2,
    handleEvents: function () {
        const _this = this;
        const canvas = $("#canvas");
        const canvasWidth = $(".canvasWidth");
        const canvasHeight = $(".canvasHeight");
        const imageWidth = $(".imageWidth");
        const imageHeight = $(".imageHeight");
        const borderLineCavans = $(".border-lineCavans");
        const imageLineCavans = $(".image-lineCavans");
        const checkbox = $(".checkbox");
        $(".submit").onclick = function () {
            html2canvas(document.querySelector("#canvas")).then(function (canvas) {
                const url = canvas.toDataURL();
                const a = document.createElement("a");
                a.href = url;
                a.download = "anhbiaboss.png";
                a.click();
                console.log(canvas.toDataURL("image/jpeg"));
            })
            
        }
        canvasWidth.onchange = function () {
            canvas.style.width = this.value + "px";
            zoommanhinh()
        }
        canvasHeight.onchange = function () {
            canvas.style.height = this.value + "px";
        }
        imageWidth.onchange = function () {
            const listImage = $$("#canvas img");
            for (let i = 0; i < listImage.length; i++) {
                const imageWidthValue = imageWidth.value;
                listImage[i].style.width = imageWidthValue + "px";
            }
        }
        imageHeight.onchange = function () {
            const listImage = $$("#canvas img");
            for (let i = 0; i < listImage.length; i++) {
                const imageHeightValue = imageHeight.value;
                listImage[i].style.height = imageHeightValue + "px";
            }
        }
        $(".image").onchange = function (e) {
            var files = $(".image").files[0];
            _this.getBase64(files).then(data => {
                const imageLineCavansValue = imageLineCavans.value;
                const borderLineCavansValue = borderLineCavans.value;
                let image = new Image();
                image.setAttribute("src", data);
                image.style.border = `${borderLineCavansValue}px solid ${imageLineCavansValue}`
                canvas.appendChild(image);
            })
        }
        borderLineCavans.onchange = setbordercanvas;
        imageLineCavans.onchange = setbordercanvas;
        checkbox.onchange = checkboxfc;
        $(".newimage").onclick = function (e) {
            location.reload();
        }
        $(".background-image").onchange = function (e) {
            var files = $(".background-image").files[0];
            _this.getBase64(files).then(data => {
                canvas.style.background = `url(${data})`;
                canvas.style.backgroundRepeat = `no-repeat`;
                canvas.style.backgroundSize = `100%`;
            })
        }
        console.log(canvas.clie)
        function zoommanhinh() {
            var screenWidth = screen.width;
            if (canvas.clientWidth > screenWidth) {
                const phantram = canvas.clientWidth / screenWidth;
                canvas.style.zoom = 100 / phantram + "%";
            }
        } 
        function setbordercanvas() {
                const borderLineCavansValue = borderLineCavans.value;
                const imageLineCavansValue = imageLineCavans.value;
                const listImage = $$("#canvas img");
                for (let i = 0; i < listImage.length; i++) {
                    listImage[i].style.border = `${borderLineCavansValue}px solid ${imageLineCavansValue}`;
                }
        }
        function checkboxfc() {
            const listImage = $$("#canvas img");
            const imageWidthValue = imageWidth.value;
            const imageHeightValue = imageHeight.value;
            if (checkbox.checked) {
                console.log(listImage , imageWidthValue , imageHeightValue);
                for (let i = 0; i < listImage.length; i++) {
                    listImage[i].style.width = imageWidthValue + "px";
                    listImage[i].style.height = imageHeightValue + "px";
                }
            } else {
                console.log("bỏ check")
                for (let i = 0; i < listImage.length; i++) {
                    listImage[i].style.width = "auto";
                    listImage[i].style.height = "50px";
                }
            }
        }
    },
    getBase64: function (file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })
    },
    Start: function () {
        app.handleEvents();
    }
}
app.Start();