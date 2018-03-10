const middlewares = require('@motionpicture/express-middleware');
const sskts = require('@motionpicture/sskts-domain');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');

const mongooseConnectionOptions = require('./mongooseConnectionOptions');
const routes = require('./routes/index');

const app = express();

app.use(middlewares.basicAuth({ // ベーシック認証
    name: process.env.BASIC_AUTH_NAME,
    pass: process.env.BASIC_AUTH_PASS,
}));

// view engine setup
// app.set('views', path.join(__dirname, 'dist'));
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));

sskts.mongoose.connect(process.env.MONGOLAB_URI, mongooseConnectionOptions).then().catch(console.error);

app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//     app.use((err, req, res, next) => {
//         res.status(err.status || 500);
//         res.json({
//             message: err.message,
//             error: err
//         });
//     });
// }

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});


module.exports = app;
