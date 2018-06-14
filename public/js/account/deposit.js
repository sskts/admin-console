$(function () {
    $('.submit').on('click', depositProcess);
});

/**
 * 入金処理
 * @param {Event} event
 */
function depositProcess(event) {
    event.preventDefault();
    var options = {
        dataType: 'json',
        url: '/account/deposit',
        type: 'POST',
        timeout: 10000,
        data: {
            recipient: {
                id: $('input[name=recipientId]').val(),
                name: $('input[name=recipientId]').val(),
                url: $('input[name=recipientId]').val()
            },
            toAccountNumber: $('input[name=toAccountNumber]').val(),
            amount: $('input[name=amount]').val(),
            notes: $('input[name=notes]').val()
        }
    };
    var done = function (data, textStatus, jqXhr) {
        console.log(data);
    };
    var fail = function (jqXhr, textStatus, errorThrown) {
        console.log(jqXhr, textStatus, errorThrown);
    }
    $.ajax(options).done(done).fail(fail);
}