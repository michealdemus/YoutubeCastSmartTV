
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
document.addEventListener('keydown', function(event) {
    let keyPressed = "Unknown Key";
    switch(event.keyCode) {
        case 32: // Spacebar for Play/Pause toggle
            keyPressed = "Spacebar";
            if (player.getPlayerState() === YT.PlayerState.PLAYING) {
                player.pauseVideo();
            } else {
                player.playVideo();
            }
            break;
        case 39: // Right Arrow for Fast Forward
            keyPressed = "Right Arrow";
            var currentTime = player.getCurrentTime();
            player.seekTo(currentTime + 10);
            break;
        case 37: // Left Arrow for Rewind
            keyPressed = "Left Arrow";
            var currentTime = player.getCurrentTime();
            player.seekTo(currentTime - 10);
            break;
        default:
            keyPressed = "Other Key";
            // Handle other keys here
            break;
    }
    // Update HTML element to display the pressed key
    document.getElementById('pusherData').innerHTML = `Last Key Pressed: ${keyPressed}`;
});


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
    // Autoplay the video

    

    // Update HTML element to display the current Pusher data
    document.getElementById('pusherData').innerHTML = `Current Video ID: ${data.videoId}`;
     player.playVideo();
});
