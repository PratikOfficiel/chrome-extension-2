const imageLinks=[];
const imagesList = document.getElementsByClassName("a-spacing-small item imageThumbnail a-declarative");

const mouseOverEvent = new MouseEvent('mouseover', {
    bubbles: true,
    cancelable: true,
    view: window
});

function changeImage() {

    for(let i=0;i<imagesList.length;i++) {
        const divElement = imagesList[i];
        divElement.dispatchEvent(mouseOverEvent);
    }

    startSaving();
}

window.addEventListener('load', changeImage);

async function startSaving() {

    const images = [...document.getElementsByClassName("a-dynamic-image a-stretch-vertical"),...(document.getElementsByClassName("a-dynamic-image a-stretch-horizontal"))];

    for(let i=0;i<images.length;i++) {

        const imgSrc = images[i].src.replace(/_([^_]*)_/g, "_SY879_");

        console.log(imgSrc);
        imageLinks.push(imgSrc);
    }

    
    for (let i = 0; i < imageLinks.length; i++) {
        const url = imageLinks[i];

        try {
            await chrome.runtime.sendMessage({ action: 'downloadFile', url });
        } catch (error) {
            console.error(`Failed to download ${url}:`, error);
        }
    }

    // console.log('All images have been processed.');
}
