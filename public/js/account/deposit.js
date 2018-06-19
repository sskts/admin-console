$(function () {
    // 読み込んだときの処理
    $('.submit').on('click', depositProcess);
});

/**
 * 入金処理
 * @param {Event} event
 */
function depositProcess(event) {
    // 押したときにデフォルトで実行される処理のキャンセル
    event.preventDefault();
    // 通信の設定
    var options = {
        dataType: 'json',
        url: '/account/deposit',
        type: 'POST',
        timeout: 10000,
        data: {
            recipient: {
                id: $('input[name=recipientId]').val(),
                name: $('input[name=recipientFamilyName]').val() + ' ' + $('input[name=recipientGivenName]').val(),
                url: $('input[name=recipientUrl]').val()
            },
            toAccountNumber: $('input[name=toAccountNumber]').val(),
            amount: $('input[name=amount]').val(),
            notes: $('input[name=notes]').val()
        }
    };
    var done = function (data, textStatus, jqXhr) {
        // 通信成功の処理
        console.log('通信成功');
        // ポイント付与完了 モーダルを出す
        $('#grantingPointsDone').modal('toggle');
        $('.form-control').val('');
    };
    var fail = function (jqXhr, textStatus, errorThrown) {
        // 通信失敗の処理
        console.log('通信失敗');
        console.log(jqXhr.responseJSON);
    }
    $.ajax(options).done(done).fail(fail);
}