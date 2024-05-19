const imageLinks=[];
const imagesList = document.getElementsByClassName("HXf4Qp");

const mouseOverEvent = new MouseEvent('mouseover', {
    bubbles: true,
    cancelable: true,
    view: window
});

let prev = "";

async function getImageSrc(image) {
    return new Promise((resolve, reject) => {
        let iter = 0;
        const intId = setInterval(()=>{
            iter++;
            if(image.src && image.src !== prev) {
                prev = image.src;
                clearInterval(intId);
                resolve(image.src);
            }
            if(iter === 8){
                clearInterval(intId);
                reject(new Error("failed to get this image"));
            }

        }, 500);
    })
}
async function printImageUrl(i){
    const element = document.getElementsByClassName("vU5WPQ")[0];
    
    element.dispatchEvent(mouseOverEvent);

    const imgElement = document.getElementsByClassName("SuLbm2")[0];

    // console.log("img", imgElement)
    try {
        const imgSrc = await getImageSrc(imgElement);
    
        // console.log(imgSrc);
        imageLinks.push(imgSrc);
        // console.log(i+1);

    } catch (error) {
        console.log(error.message || "failed to get this image");
    }

    if(i==imagesList.length-1){
        startSaving();
    }
}


;(async function changeImage() {

    for(let i=0;i<imagesList.length;i++) {
        const divElement = imagesList[i];
        divElement.dispatchEvent(mouseOverEvent);
        await printImageUrl(i);
    }
})();


// console.log("areimagesReady");

// console.log(imageLinks.length);

async function startSaving() {
    for (let i = 0; i < imageLinks.length; i++) {
        const url = imageLinks[i];

        try {
            await chrome.runtime.sendMessage({ action: 'downloadFile', url });
        } catch (error) {
            console.error(`Failed to download ${url}:`, error);
        }
    }

    console.log('All images have been processed.');
}

