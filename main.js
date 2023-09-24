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
const pusher = new Pusher('dd9c0093a77f8814a7bd', {
    cluster: 'eu'
});

// Subskrypcja kanału
const channel = pusher.subscribe('my-channel');

// Nasłuchiwanie na zdarzenie i aktualizacja elementu h1
channel.bind('my-event', function(data) {
    document.getElementById('pusherData').textContent = JSON.stringify(data);
});
