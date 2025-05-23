function save_options() {
  var botToken = document.getElementById('bot_token').value;
  var chatId = document.getElementById('chat_id').value;
  var webhookUrl = document.getElementById('webhook_url').value;
  var webhookMessage = document.getElementById('webhook_message').value;

  chrome.storage.local.set({
    botToken: botToken,
    chatId: chatId,
    webhook_url: webhookUrl,
    webhook_message: webhookMessage
  }, function() {
    var url = 'https://api.telegram.org/bot' + botToken + '/sendmessage?chat_id=' + chatId + '&text=' + encodeURI('Bot connected.');
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var response = xmlhttp.responseText;
      }
    }
    xmlhttp.open('GET', url, true);
    xmlhttp.send();

    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.local.get(['botToken', 'chatId', 'webhook_url', 'webhook_message'], function(items) {
    var botToken = items.botToken;
    var chatId = items.chatId;
    var webhookUrl = items.webhook_url;
    var webhookMessage = items.webhook_message;

    document.getElementById('bot_token').value = botToken;
    document.getElementById('chat_id').value = chatId;
    document.getElementById('webhook_url').value = webhookUrl || '';
    document.getElementById('webhook_message').value = webhookMessage || '';
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
