$(function(){

  function buildHTML(message) {
    if (message.content && message.image) {
      var html = `<div class="chat-main__message-list__box">` +
      `<div class="chat-main__message-list__box__up">` +
      `<div class="chat-main__message-list__box__up__name">` +
      message.user_name +
      `</div>` +
      `<div class="chat-main__message-list__box__up__time">` +
      message.created_at +
      `</div>` +
      `</div>` +
      `<div class="chat-main__message-list__box__up__text">` +
      `<p class="lower-message__content">` +
      message.content +
      `</p>` +
      `<img src="` + message.image + `" class="lower-message__image" >` +
      `</div>` +
      `</div>`
    } else if (message.content) {
      var html = `<div class="chat-main__message-list__box">` +
      `<div class="chat-main__message-list__box__up">` +
      `<div class="chat-main__message-list__box__up__name">` +
      message.user_name +
      `</div>` +
      `<div class="chat-main__message-list__box__up__time">` +
      message.created_at +
      `</div>` +
      `</div>` +
      `<div class="chat-main__message-list__box__text">` +
      `<p class="lower-message__content">` +
      message.content +
      `</p>` +
      `</div>` +
      `</div>`
    } else if (message.image) {
      var html = `<div class="chat-main__message-list__box">` +
      `<div class="chat-main__message-list__box__up">` +
      `<div class="chat-main__message-list__box__up__name">` +
      message.user_name +
      `</div>` +
      `<div class="chat-main__message-list__box__up__time">` +
      message.created_at +
      `</div>` +
      `</div>` +
      `<div class="chat-main__message-list__box__up__text">` +
      `<img src="` + message.image + `" class="lower-message__image" >` +
      `</div>` +
      `</div>`
    };
    return html;
  }

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
        $('.chat-main__message-list').append(html);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
        $('form')[0].reset();
        $(".form__submit").prop('disabled', false);
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
        $(".form__submit").prop('disabled', false);
      });
  })
});