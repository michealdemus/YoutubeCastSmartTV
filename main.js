// Initialize YouTube API
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'dQw4w9WgXcQ', // Default video
        events: {
            'onReady': onPlayerReady,
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

// Initialize Pusher
// Replace APP_KEY and CLUSTER with your actual Pusher credentials
const pusher = new Pusher('APP_KEY', {
    cluster: 'CLUSTER'
});

// Subscribe to a channel
const channel = pusher.subscribe('my-channel');

// Listen for an event and update the h1 element
channel.bind('my-event', function(data) {
    document.getElementById('pusherData').textContent = JSON.stringify(data);

    // Check if the videoId is present in the data received from Pusher
    if(data.hasOwnProperty('videoId') && data.videoId !== null && data.videoId.trim() !== '') {
        // Play the YouTube video with the received video ID
        player.loadVideoById(data.videoId);
    } else {
        console.log('No valid videoId received from Pusher');
    }
});

