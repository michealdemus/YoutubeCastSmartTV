
// Initialize YouTube API
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'dQw4w9WgXcQ', // Default video
        playerVars: {
            'autoplay': 1 // Autoplay the video
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if(event.data === YT.PlayerState.ENDED) {
        player.nextVideo(); // Play next recommended video
    }
}

function enterFullscreen(element) {
    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) { // Chrome, Safari and Opera
        element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) { // IE/Edge
        element.msRequestFullscreen();
    }
}

// Initialize Pusher
// Replace APP_KEY and CLUSTER with your actual Pusher credentials
const pusher = new Pusher('APP_KEY', {
    cluster: 'CLUSTER'
});

// Subscribe to a channel
const channel = pusher.subscribe('my-channel');

// Bind to an event within the channel
channel.bind('new-video', function(data) {
    // Update YouTube video based on the received ID
    player.loadVideoById(data.videoId);
    player.playVideo(); // Autoplay the video

    // Attempt to enter fullscreen mode
    enterFullscreen(document.getElementById('player'));

    // Update HTML element to display the current Pusher data
    document.getElementById('pusherData').innerHTML = `Current Video ID: ${data.videoId}`;
});
