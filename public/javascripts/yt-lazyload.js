const v = document.getElementsByClassName('videoPlayer');

function updateVideo() {
    const id = this.id.replace('vid-','');
    this.classList.add("embed-responsive-16by9"); // adds responsive styling to the video iframe via a css class
    this.innerHTML =
        '<iframe src="https://www.youtube.com/embed/'
        + id
        + '?autoplay=1" allow="autoplay" width="640" height="360" frameborder="0" allowfullscreen></iframe>';
}

for (i = 0; i < v.length; i++) {
    v[i].addEventListener("click", updateVideo);
}