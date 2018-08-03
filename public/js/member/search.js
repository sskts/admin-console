$(function () {
    //Default
    $('#datepicker-default .date').datepicker({
        format: "yyyy年mm月dd日",
        language: 'ja',
        autoclose: true,
    }).on('changeDate', function (event) {
        var value = moment(event.date).format('YYYYMMDD');
        var target = $(this).find('input');
        target.attr('data-value', value);
    });
    $('.submit').on('click', searchProcess);
});

/**
 * 検索処理
 * @param {Event} event
 */
function searchProcess(event) {
    event.preventDefault();
    // エラー文言を消す
    $('.errors').text('');
    $('.errors').css('display', 'none');
    // 入力チェック
    var validation = false;
    if ($('input[name=fromDate]').val() === '') {
        $('.errors').append('開始日が未入力です' + '<br>');
        validation = true;
    }
    if ($('input[name=toDate]').val() === '') {
        $('.errors').append('終了日が未入力です' + '<br>');
        validation = true;
    }
    if ($('input[name=fromDate]').val() > $('input[name=toDate]').val()) {
        $('.errors').append('終了日が開始日を超えています' + '<br>');
        validation = true;
    }
    var theaterCodeList = [];
    $('input[name=theaterCode]:checked').each(function () {
        var value = $(this).val();
        theaterCodeList.push(value);
    })
    if (theaterCodeList.length === 0) {
        $('.errors').append('劇場が未選択です' + '<br>');
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
            fromDate: $('input[name=fromDate]').attr('data-value'),
            toDate: $('input[name=toDate]').attr('data-value'),
            theaterIds: theaterCodeList
        };
        // 接続先を取得
        var endpoint = $('input[name=endpoint]').val();
        var done = function (res) {
            // 通信成功の処理
            console.log('通信成功の処理', res);
            $('.membership').css('display', 'block');
            // ボタンを押せるようにする処理
            $('.submit').prop('disabled', false);
        };
        var fail = function (res) {
            // 通信失敗の処理
            console.log('通信失敗の処理', res);
            if (res.code === 404) {
                $('.errors').text('エラーが発生しました');
            } else {
                $('.errors').html('エラーが発生しました<br>[' + res.message + ']');
            }
            $('.errors').css('display', 'block');
            // ボタンを押せるようにする処理
            $('.submit').prop('disabled', false);
        };
        console.log(sasaki.service);
        // 通信開始
        new sasaki.service.OwnershipInfo({
            endpoint: endpoint,
            auth: auth
        }).countByRegisterDateAndTheater(data).then(done).catch(fail);
    });
}

