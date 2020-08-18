
/**
 * 認証情報取得
 */
function getCredentials() {
    // 通信の設定
    var options = {
        dataType: 'json',
        url: '/api/authorize/getCredentials',
        type: 'GET',
        timeout: 10000
    };
    return $.ajax(options);
}

/**
 * 設定作成
 * @param {string} accessToken 
 */
function createOptions(accessToken) {
    var option = {
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
    auth.setCredentials({ accessToken: accessToken });
    var endpoint = $('input[name=endpoint]').val();
    var projectId = $('input[name=projectId]').val();

    return {
        endpoint: endpoint,
        auth: auth,
        project: { id: projectId }
    }
}
