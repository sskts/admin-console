$(function () {
    // 読み込んだときの処理
    $('.submit').on('click', depositProcess);
});

/**
 * 認証情報取得
 * @param {Function} cb
 */
function getCredentials(cb) {
    // 通信の設定
    var options = {
        dataType: 'json',
        url: '/api/authorize/getCredentials',
        type: 'GET',
        timeout: 10000
    };
    var done = function (data, textStatus, jqXhr) {
        // 通信成功の処理
        console.log(data);
        const option = {
            domain: '',
            clientId: '',
            redirectUri: '',
            logoutUri: '',
            responseType: '',
            scope: '',
            state: '',
            nonce: null,
            tokenIssuer: ''
        };
        var auth = sasaki.createAuthInstance(option);
        auth.setCredentials(data);
        cb(auth);
    };
    var fail = function (jqXhr, textStatus, errorThrown) {
        // 通信失敗の処理
        console.log(jqXhr, textStatus, errorThrown);
        cb(null);
    }
    $.ajax(options).done(done).fail(fail);
}

/**
 * 入金処理
 * @param {Event} event
 */
function depositProcess(event) {
    // 押したときにデフォルトで実行される処理のキャンセル
    event.preventDefault();
    // エラー文言を消す
    $('.errors').text('');
    $('.errors').css('display', 'none');
    // 入力チェック
    var validation = false;
    if ($('input[name=recipientId]').val() === '') {
        $('.errors').append('受取人idが未入力です' + '<br>');
        validation = true;
    }
    if ($('input[name=recipientFamilyName]').val() === '') {
        $('.errors').append('姓が未入力です' + '<br>');
        validation = true;
    }
    if ($('input[name=recipientGivenName]').val() === '') {
        $('.errors').append('名が未入力です' + '<br>');
        validation = true;
    }
    if ($('input[name=toAccountNumber]').val() === '') {
        $('.errors').append('口座番号が未入力です' + '<br>');
        validation = true;
    }
    if ($('input[name=amount]').val() === '') {
        $('.errors').append('加算・減算ポイントが未入力です' + '<br>');
        validation = true;
    }
    if (validation) {
        // 入力チェックに当てはまったときの処理
        $('.errors').css('display', 'block');
        return;
    }
    // ボタンを押せなくする処理
    $('.submit').prop('disabled', true);
    // 認証情報取得
    getCredentials(function (auth) {
        // 認証情報取得後の処理
        console.log(auth);
        if (auth === null) {
            // エラー
            $('.errors').text('エラーが発生しました');
            $('.errors').css('display', 'block');
            // ボタンを押せるようにする処理
            $('.submit').prop('disabled', false);
            return;
        }
        // 送信データ生成
        var data = {
            recipient: {
                id: $('input[name=recipientId]').val(),
                name: $('input[name=recipientFamilyName]').val() + ' ' + $('input[name=recipientGivenName]').val(),
                url: $('input[name=recipientUrl]').val()
            },
            toAccountNumber: $('input[name=toAccountNumber]').val(),
            amount: Number($('input[name=amount]').val()),
            notes: $('input[name=notes]').val()
        };
        // 接続先を取得
        var endpoint = $('input[name=endpoint]').val();
        var depositDone = function(res) {
            // 通信成功の処理
            console.log('通信成功の処理', res);
            // ボタンを押せるようにする処理
            $('.submit').prop('disabled', false);
            // ポイント付与完了 モーダルを出す
            $('#grantingPointsDone').modal('toggle');
            // 入力リセット
            $('.form-control').val('');
        };
        var depositFail = function(res) {
            // 通信失敗の処理
            console.log('通信失敗の処理', res);
            if (res.code === 404) {
                $('.errors').text('口座が見つかりません');
            } else {
                $('.errors').html('エラーが発生しました<br>[' + res.message + ']');
            }
            $('.errors').css('display', 'block');
            // ボタンを押せるようにする処理
            $('.submit').prop('disabled', false);
        };
        // 通信開始
        new sasaki.service.Account({
            endpoint: endpoint,
            auth: auth
        }).deposit(data).then(depositDone).catch(depositFail);
    });
}