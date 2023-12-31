

const context = cast.framework.CastReceiverContext.getInstance();
        const playerManager = context.getPlayerManager();

        // Handle incoming messages from the sender app
        playerManager.setMessageInterceptor(
            cast.framework.messages.MessageType.LOAD,
            loadRequestData => {
                console.log("Received message:", loadRequestData);
                return loadRequestData;
            }
        );

        context.start();

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '100%',  // Set to 100% of parent container
        width: '100%',   // Set to 100% of parent container
        videoId: 'M7lc1UVf-VE',
        playerVars: {
            'autoplay': 1,
            'fs': 1  // Enable the fullscreen button
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}
let i = 0;
function countInfinity() {
  console.log(i);
  i++;
  setTimeout(countInfinity, 1000);  // Czekaj 1 sekundę przed kolejnym wywołaniem
}
countInfinity();

function onPlayerReady(event) {
    // Attempt to set the player to fullscreen
    var iframe = document.getElementById("player");
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) {  // Firefox
        iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) {  // Chrome, Safari and Opera
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {  // IE/Edge
        iframe.msRequestFullscreen();
    }
    event.target.playVideo();
}

// Initialize Pusher with existing credentials
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
    player.playVideo();

    // Update HTML element to display the current Pusher data
    document.getElementById('pusherData').innerHTML = `Current Video ID: ${data.videoId}`;
});

// Functionality for Chromecast remote control
document.addEventListener('keydown', function(event) {
    let keyPressed = "Unknown Key";
    switch(event.key) {
        case "Enter": // Enter for Play/Pause toggle
            keyPressed = "Enter";
            if (player.getPlayerState() === YT.PlayerState.PLAYING) {
                player.pauseVideo();
            } else {
                player.playVideo();
            }
            break;
        case "ArrowDown": // Down Arrow for stopping the video
            keyPressed = "Volume Down";
            var currentVolume = player.getVolume();
            player.setVolume(Math.max(currentVolume + 10, 0));
            break;
        case "ArrowLeft": // Left Arrow for Rewind
            keyPressed = "Left Arrow";
            var currentTime = player.getCurrentTime();
            player.seekTo(currentTime - 10);
            break;
        case "ArrowUp": // Up Arrow for playing the video
            keyPressed = "Volume Up";
            var currentVolume = player.getVolume();
            player.setVolume(Math.min(currentVolume - 10, 100));
            break;
        case "ArrowRight": // Right Arrow for Fast Forward
            keyPressed = "Right Arrow";
            var currentTime = player.getCurrentTime();
            player.seekTo(currentTime + 10);
            break;
      
        default:
            keyPressed = `Other Key (${event.key})`; // Display the actual key name
            break;
    }
    // Update HTML element to display the pressed key
    document.getElementById('pusherData').innerHTML = `Last Key Pressed: ${keyPressed}`;
});

// Fetch next video ID using YouTube Data API (Pseudocode)
// This is a placeholder as actual implementation would require server-side logic for API authentication
async function fetchNextVideoID() {
    // Use YouTube Data API to fetch recommended videos based on the current video ID
    // Note: Actual API authentication and fetch logic would go here
    const currentVideoID = player.getVideoData().video_id;
    // Placeholder for fetched next video ID
    const nextVideoID = "some_fetched_video_id";
    return nextVideoID;
}

// Listen for video end event
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        // Fetch the next recommended video
        fetchNextVideoID().then(nextVideoID => {
            // Load and play the next video
            player.loadVideoById(nextVideoID);
        });
    }
}
