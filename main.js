// Replace YOUR_APP_ID with the actual App ID you receive after registering your application.
const applicationID = 'YOUR_APP_ID';

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
