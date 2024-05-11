const imageLinks=[];

const mouseOverEvent = new MouseEvent('mouseover', {
    bubbles: true,
    cancelable: true,
    view: window
});

const imagesList = document.getElementsByClassName("a-spacing-small item imageThumbnail a-declarative");
let i=0;

const id = setInterval(changeImage,1000)

function changeImage() {
    const divElement = imagesList[i];
    divElement.dispatchEvent(mouseOverEvent);
    i++;
    if(i==imagesList.length){
        clearInterval(id);
        startSaving();
    }
}

function startSaving() {

    const images = [...document.getElementsByClassName("a-dynamic-image a-stretch-vertical"),...(document.getElementsByClassName("a-dynamic-image a-stretch-horizontal"))];

    for(let i=0;i<images.length;i++) {

        const imgSrc = images[i].src.replace(/_([^_]*)_/g, "_SY879_");

        console.log(imgSrc);
        imageLinks.push(imgSrc);
    }

    let i=0;

    const id = setInterval(saveImage,1000)

    function saveImage() {
        const url = imageLinks[i];

        chrome.runtime.sendMessage({action: 'downloadFile', url})

        i++;

        if(i==imageLinks.length){
            clearInterval(id);
        }
    }


}
