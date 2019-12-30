var bot_name = 'makumbot 3000';
var user_name = 'Ty';

$(document).ready(() => {
    var welcomeText = '<div id="makumbot-intro"><h1 class="display-4">Przywitaj się z makumbotem pisząc <i>witam</i></h1></div>';
    $("#messages-box").append(welcomeText);
    setTimeout(() => {
        $("#makumbot-intro").fadeOut('slow', () => {
            $("#makumbot-intro").remove();
        })
    }, 3000);
});

$("#chat-bot").submit(event => {
    event.preventDefault();
    takeCareOfMessage();
});

function takeCareOfMessage() {
    var userMessage = $("#user-message").val();
    userMessage = userMessage.trim();
    if (userMessage != '') {
        $("#user-message").val('');

        addMessageToChat(userMessage, 'user');
        sendMessageToBot(userMessage);
    }
}

function addMessageToChat(message, senderType) {
    var date = new Date();
    var hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
    var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

    var messageSendTime = hours + ':' + minutes;

    var messageRow =
        '<div class="row message ' + senderType + '">' +
        '<div class="col-md-7">' +
        '<small class="text-muted"><b>' + window[senderType + '_name'] + ':</b></small>' +
        '<div class="card" data-toggle="tooltip" data-placement="bottom" title="Wysłano ' + messageSendTime + '">' +
        '<p>' +
        message +
        '</p>' +
        '<div>' +
        '<div>' +
        '<div>';

    $("#messages-box").append(messageRow);
    $('[data-toggle="tooltip"]').tooltip();
    $(document).scrollTop($(document).height());
}

function sendMessageToBot(userMessage) {
    var loadingIndicator = '<div id="loading-indicator"><span class="spinner-grow align-middle" role="status"></span><small class="text-muted align-middle"><b>' + bot_name + '</b> pisze...</small></div>';
    $("#messages-box").append(loadingIndicator);

    $.post("makumbotController.php",
        {
            "driver": "web",
            "userId": "666",
            "message": userMessage
        },
        function (data, status) {
            console.log(data);
            $("#loading-indicator").remove();
            var botMessages = data.messages;
            botMessages.forEach(botMessage => {
                addMessageToChat(botMessage.text, 'bot');
            });

            
        });
}
