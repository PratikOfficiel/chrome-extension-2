const imageLinks=[];

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
    
    console.log("div",element);
    element.dispatchEvent(mouseOverEvent);

    const imgElement = document.getElementsByClassName("SuLbm2")[0];

    console.log("img", imgElement)
    try {
        const imgSrc = await getImageSrc(imgElement);
    
        console.log(imgSrc);
        imageLinks.push(imgSrc);
        console.log(i+1);

    } catch (error) {
        console.log(error.message || "failed to get this image");
    }
}

const imagesList = document.getElementsByClassName("HXf4Qp");
let i=0;

const id = setInterval(changeImage,1000)

function changeImage() {
    const divElement = imagesList[i];
    divElement.dispatchEvent(mouseOverEvent);
    printImageUrl(i);
    i++;
    if(i==imagesList.length){
        clearInterval(id);
        startSaving();
    }
}


console.log("areimagesREady",imageLinks);

function startSaving() {

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
