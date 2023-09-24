// Zastąp YOUR_APP_ID rzeczywistym identyfikatorem aplikacji z Google Cast SDK
const applicationID = 'YOUR_APP_ID';

// Inicjalizacja Google Cast SDK
window['__onGCastApiAvailable'] = function(isAvailable) {
    if (isAvailable) {
        initializeCastApi();
    }
};

function initializeCastApi() {
    const sessionRequest = new chrome.cast.SessionRequest(applicationID);
    const apiConfig = new chrome.cast.ApiConfig(
        sessionRequest,
        sessionListener,
        receiverListener
    );

    chrome.cast.initialize(apiConfig, onInitSuccess, onError);
}

function onInitSuccess() {
    console.log('Initialization succeeded');
}

function onError(message) {
    console.log('Initialization failed: ' + message);
}

function sessionListener(session) {
    console.log('Session started: ' + session);
}

function receiverListener(status) {
    if (status === chrome.cast.ReceiverAvailability.AVAILABLE) {
        document.getElementById('castButton').addEventListener('click', function() {
            chrome.cast.requestSession(sessionListener, onError);
        });
    }
}

// Inicjalizacja Pusher
// Zastąp APP_KEY i CLUSTER rzeczywistymi danymi z Twojego konta Pusher
const pusher = new Pusher('APP_KEY', {
    cluster: 'CLUSTER'
});

// Subskrypcja kanału
const channel = pusher.subscribe('my-channel');

// Nasłuchiwanie na zdarzenie
channel.bind('my-event', function(data) {
    // Jeśli w danych jest URL do filmu na YouTube, załaduj go na Chromecast
    if (data.youtubeId) {
        playYouTubeVideo(data.youtubeId);
    }
});

function playYouTubeVideo(youtubeId) {
    // W tym miejscu musisz zintegrować funkcjonalność odtwarzania filmu na YouTube
    // Można to zrobić np. za pomocą YouTube Iframe API
}
