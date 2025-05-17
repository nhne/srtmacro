var defaultBotToken = 'Set your telegram bot token';
var defaultChatId = 'Set your telegram chat id';

function save_options() {
  var botToken = document.getElementById('bot_token').value;
  var chatId = document.getElementById('chat_id').value;
  var webhookUrl = document.getElementById('webhook_url').value;

  chrome.storage.local.set({
    botToken: botToken,
    chatId: chatId,
    webhook_url: webhookUrl
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
  chrome.storage.local.get(['botToken', 'chatId', 'webhook_url'], function(items) {
    var botToken = items.botToken;
    var chatId = items.chatId;
    var webhookUrl = items.webhook_url;

    if (botToken == undefined)
      botToken = defaultBotToken;

    if (chatId == undefined)
      chatId = defaultChatId;

    document.getElementById('bot_token').value = botToken;
    document.getElementById('chat_id').value = chatId;
    document.getElementById('webhook_url').value = webhookUrl || '';
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
