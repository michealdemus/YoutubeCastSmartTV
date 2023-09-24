

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
