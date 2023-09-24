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
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
    // Attempt to make the video full screen; this may not work on some browsers.
    try {
        var iframe = document.getElementById('player');
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        } else if (iframe.mozRequestFullScreen) { // Firefox
            iframe.mozRequestFullScreen();
        } else if (iframe.webkitRequestFullscreen) { // Chrome, Safari and Opera
            iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) { // IE/Edge
            iframe.msRequestFullscreen();
        }
    } catch (e) {
        console.error("Unable to go full screen", e);
    }
}

// Initialize Pusher
// Replace APP_KEY and CLUSTER with your actual Pusher credentials
const pusher = new Pusher('dd9c0093a77f8814a7bd', {
    cluster: 'eu'
});

// Subscribe to a channel
const channel = pusher.subscribe('my-channel');

// Bind to an event within the channel
channel.bind('new-video', function(data) {
    // Update YouTube video based on the received ID
    player.loadVideoById(data.videoId);
});
