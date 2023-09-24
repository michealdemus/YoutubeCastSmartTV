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
    
    // Play YouTube video with the received ID
    if(data.videoId){
        player.loadVideoById(data.videoId);
    }
});
