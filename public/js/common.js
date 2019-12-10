
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
        var auth = cinerino.createAuthInstance(option);
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