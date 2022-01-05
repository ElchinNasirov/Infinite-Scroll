const imageContainer = document.getElementById("image-container")
const loader = document.getElementById("loader")

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
const count = 30;
const apiKey = 'szs9sIlVkdctPJcH6EiEFV_h34gTmCaB41If3P6L9hk';
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Checking if all images is loaded
const imageLoaded = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper function to set attributes on DOM elements
const setAttributes = (element, attributes) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
} 

// Creating elements for links and photos. Add t0 DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    
    photosArray.forEach(photo => {

        // Creating <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);    <--- before I used helper function setAttributes()
        // item.setAttribute('target', '_blank');   <--- before I used helper function setAttributes()
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank",
        });

        // Creating <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);    <--- before I used helper function setAttributes()
        // img.setAttribute('alt', photo.alt_description);    <--- before I used helper function setAttributes()
        // img.setAttribute('title', photo.alt_description);    <--- before I used helper function setAttributes()
        setAttributes( img, {
            src: photo.urls.regular, 
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // Event listener
        img.addEventListener("load", imageLoaded);

        // Putting <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get from Unsplash API
const getPhotos = async () => {
    try {
        const res = await fetch(apiURL)
        photosArray = await res.json();
        displayPhotos()
        console.log(photosArray)
    } catch (error) {
        // Error handling
    }
}

// When user closer to the bottom of the page, load more photos
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

// Calling getPhotos() function
getPhotos();