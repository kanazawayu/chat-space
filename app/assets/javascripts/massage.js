$(function(){

  var message_list = $('.chat-main__message-list')

  function buildHTML(message) {
    if (message.content && message.image) {
      var html = `<div class="chat-main__message-list__box" data-message-id=${message.id}>
                    <div class="chat-main__message-list__box__up">
                      <div class="chat-main__message-list__box__up__name">
                        ${message.user_name}
                      </div>
                      <div class="chat-main__message-list__box__up__time">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="chat-main__message-list__box__up__text">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                      <img src="` + message.image + `" class="lower-message__image" >
                    </div>
                  </div>`
    } else if (message.content) {
      var html = `<div class="chat-main__message-list__box" data-message-id=${message.id}>
                    <div class="chat-main__message-list__box__up">
                      <div class="chat-main__message-list__box__up__name">
                        ${message.user_name}
                      </div>
                      <div class="chat-main__message-list__box__up__time">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="chat-main__message-list__box__up__text">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                    </div>
                  </div>`
    } else if (message.image) {
      var html = `<div class="chat-main__message-list__box" data-message-id=${message.id}>
                    <div class="chat-main__message-list__box__up">
                      <div class="chat-main__message-list__box__up__name">
                        ${message.user_name}
                      </div>
                      <div class="chat-main__message-list__box__up__time">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="chat-main__message-list__box__up__text">
                      <img src="` + message.image + `" class="lower-message__image" >
                    </div>
                  </div>`
    };
    return html;
  }

  var reloadMessages = function() {
    var last_message_id = $('.chat-main__message-list__box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        message_list.append(insertHTML);
        message_list.animate({ scrollTop: message_list[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data) {
        var html = buildHTML(data);
        message_list.append(html);
        message_list.animate({ scrollTop: message_list[0].scrollHeight});
        $('form')[0].reset();
        $(".form__submit").prop('disabled', false);
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
        $(".form__submit").prop('disabled', false);
      });
  })
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});