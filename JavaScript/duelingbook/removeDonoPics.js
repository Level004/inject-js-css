let loggedPics = {};

function changeImageSrc() {
    // Find all the img tags on the page that match the specified URL pattern
    let donoPic = document.querySelectorAll('img[src^="https://images.duelingbook.com/profile-pics/"]');

    // Loop through each image
    for (let image of donoPic) {
        // Check if the image has already been logged
        if (image.src in loggedPics) {
            // Use the existing picCode for this image
            var picCode = loggedPics[image.src];
        } else {
            // Generate a random number between 1 and 14169
            var picCode = Math.floor(Math.random() * 14169) + 1;

            // Log the picCode for this image
            loggedPics[image.src] = picCode;
        }

        // Replace the image src with the new URL
        image.src = `https://images.duelingbook.com/low-res/${picCode}.jpg`;
    }
}

// Call the function once to change the image src initially
changeImageSrc();

// Call the function every second to change the image src again
setInterval(changeImageSrc, 1000);
