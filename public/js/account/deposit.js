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
    // ボタンを押せなくする処理
    $('.submit').prop('disabled', true);

    // エラー文言を消す
    $('.errors').text('');
    $('.errors').css('display', 'none');
    if ($('input[name=recipientFamilyName]').val() === '') {
        $('.errors').append('姓が未入力です' + '<br>');
    }
    if ($('input[name=recipientGivenName]').val() === '') {
        $('.errors').append('名が未入力です' + '<br>');
    }

    // 通信開始
    $.ajax(options).done(function (data, textStatus, jqXhr) {
        // 通信成功の処理
        // ボタンを押せるようにする処理
        $('.submit').prop('disabled', false);
        console.log('通信成功');
        // ポイント付与完了 モーダルを出す
        $('#grantingPointsDone').modal('toggle');
        $('.form-control').val('');
    }).fail(function (jqXhr, textStatus, errorThrown) {
        // 通信失敗の処理
        // ボタンを押せるようにする処理
        $('.submit').prop('disabled', false);
        console.log('通信失敗');
        console.log(jqXhr.responseJSON);
        var data = jqXhr.responseJSON;
        if (data.validation.amount !== undefined) {
            // 入金金額エラー表示
            $('.errors').append(data.validation.amount.msg + '<br>');
        }
        if (data.validation['recipient.id'] !== undefined) {
            // 入金受取人IDエラー表示
            $('.errors').append(data.validation['recipient.id'].msg + '<br>');
        }
        // if (data.validation['recipient.name'] !== undefined) {
        //     // 入金受取人名エラー表示
        //     $('.errors').append(data.validation['recipient.name'].msg + '<br>');
        // }
        if (data.validation['recipient.url'] !== undefined) {
            // 入金受取人URLエラー表示
            $('.errors').append(data.validation['recipient.url'].msg + '<br>');
        }
        if (data.validation.toAccountNumber !== undefined) {
            // 入金先口座番号エラー表示
            $('.errors').append(data.validation.toAccountNumber.msg + '<br>');
        }
        $('.errors').css('display', 'block');
    });
}