function playSound() {
	if (typeof(audio) != "undefined" && audio) {
		audio.pause();
		document.body.removeChild(audio);
		audio = null;
	}
	audio = document.createElement('audio');
	document.body.appendChild(audio);
	audio.autoplay = true;
	audio.src = chrome.runtime.getURL('assets/tada.mp3');
	audio.play();
}

function sendTelegramMessage() {
    chrome.storage.local.get(['botToken', 'chatId', 'webhook_url'], function(items) {
        var botToken = items.botToken;
        var chatId = items.chatId;
        var webhookUrl = items.webhook_url;
        var msg = 'Macro has been stopped. Please check your reservation status.';
        if (botToken && chatId) {
            var url = 'https://api.telegram.org/bot' + botToken + '/sendmessage?chat_id=' + chatId + '&text=' + encodeURIComponent(msg);
            fetch(url)
                .then(response => response.text())
                .then(data => {
                    // Optionally handle Telegram response
                });
        }
        if (webhookUrl) {
            fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: 'ticket purchased' })
            });
        }
    });
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if (message && message.type == 'playSound') {
		chrome.windows.update(-2, {drawAttention: true});
		// playSound();
		sendTelegramMessage();
		sendResponse(true);
	}
});