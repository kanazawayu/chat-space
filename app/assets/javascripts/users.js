$(function() {
  var search_result = $("#user-search-result");

  function addUser(user) {
    var html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    search_result.append(html);
  }

  function addNoUser() {
    var html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    search_result.append(html);
  }

  function appendUser(name, id) {
    var html = `
      <div class='chat-group-user'>
        <input name='group[user_ids][]' type='hidden' value='${id}'>
        <p class='chat-group-user__name'>${name}</p>
        <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id="${id}" data-user-name="${name}">削除</div>
      </div>
    `;
    $(".js-add-user").append(html);
  }
  function appendMember(id) {
    var html = `<input value="${id}" name="group[user_ids][]" type="hidden" id="group_user_ids_${id}" />`;
    $(`#${userId}`).append(html);
  }
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
      .done(function(users) {
        $("#user-search-result").empty();

        if (users.length !== 0) {
          users.forEach(function(user) {
            addUser(user);
          });
        } else if (input.length == 0) {
          return false;
        } else {
          addNoUser();
        }
      })
      .fail(function() {
        alert("通信エラーです。ユーザーが表示できません。");
      });
  });
  $(document).on('click', ".user-search-add", function(){
    var user_id = $(this).data('user-id');
    var user_name = $(this).data('user-name');
    $(this).parent().remove();
    appendUser(user_name, user_id);
    appendMember(user_id);
  });
  $(document).on('click', ".user-search-remove", function(){
    $(this).parent().remove();
  });
});