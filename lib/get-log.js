//     get-log
//     Copyright 2014 Enrico Stara 'enrico.stara@gmail.com'
//     Released under the MIT License
//     https://github.com/enricostara/get-log

//      Logger class
//
// This class is the Logger utility and it supports the following levels: ERROR, WARN, INFO and DEBUG.
// The ERROR, WARN, INFO levels are always on, DEBUG can be enabled/disabled with 'DEBUG' environment var.
// To add your project name as prefix, set the `PROJECT_NAME` property with your project_name:
//
//      require('get-log').PROJECT_NAME = require('./package.json').name;
//
// To enable the debug for all your project you can set `DEBUG` as following: `DEBUG=project_name:*`

// Import dependencies
require('colors');
var util = require('util');
var debug = require('debug');
var crc32 = require('buffer-crc32');

// Loggers cache
var loggers = {};

// Export the `get logger by name` function
module.exports = exports = function (name) {
    return loggers[name] || (loggers[name] = new Logger(name));
};

// Enable a specific `namespace` (separated by comma and with wildcards if needed)
exports.enable = debug.enable;

// File stream management
var fileStreamName = exports.logFileName = getFileStreamName();
var fileStream;
if (fileStreamName) {
    fileStream = require('fs').createWriteStream(fileStreamName, {autoClose: false});
}
function getFileStreamName() {
    var filePrefix = process.env.LOGGER_FILE;
    if (filePrefix) {
        filePrefix += '.' + crc32(__dirname).toString('hex');
        var now = new Date();
        var ts = now.getFullYear() + fill(now.getMonth() + 1) + fill(now.getDate()) + '-';
        ts += fill(now.getHours()) + fill(now.getMinutes()) + '-' + fill(now.getSeconds());
        return filePrefix + '.' + ts + '.log';
    }
    function fill(value) {
        value = '' + value;
        return (value.length === 1) ? '0' + value : value;
    }
}

// The constructor requires the logger name
function Logger(name) {
    var prjName = module.exports.PROJECT_NAME;
    this.name = prjName ? prjName + ':' + name : name;
    this._debug = debug(this.name);
    this._debug.log = logDebug;
    this.debugEnabled = debug.enabled(this.name);
    if (this.debugEnabled) {
        logDebug('[%s] debug is %s', this.name.blue, 'ENABLED'.green);
    }
}

function logDebug() {
    var args = Array.prototype.slice.call(arguments);
    writeOutput('[DEBUG] '.green, null, args);
}

function writeOutput(prefix, loggerName, args) {
    args[0] = prefix + new Date().toUTCString() +
        (loggerName ? '  ' + loggerName + ' ' : '') + args[0];
    if (fileStream) {
        fileStream.write(util.format.apply(this, args) + '\n');
    } else {
        return 'object' === typeof console
            && console.log
            && Function.prototype.apply.call(console.log, console, args);
    }
}

// Log DEBUG message in std out, CAN be disabled/enabled
Logger.prototype.debug = function () {
    if (this.isDebugEnabled()) {
        this._debug.apply(this, arguments);
    }
};

// Log ERROR message in std err, cannot be disabled
Logger.prototype.error = function () {
    var args = Array.prototype.slice.call(arguments);
    writeOutput('[ERROR] '.red, this.name, args);
};

// Log WARN message in std out, cannot be disabled
Logger.prototype.warn = function () {
    var args = Array.prototype.slice.call(arguments);
    writeOutput('[WARN] '.magenta, this.name, args);
};

// Log INFO message in std out, cannot be disabled
Logger.prototype.info = function () {
    var args = Array.prototype.slice.call(arguments);
    writeOutput('[INFO] '.blue, this.name, args);
};

// Check if debug is enabled
Logger.prototype.isDebugEnabled = function () {
    return this.debugEnabled;
};

// Retrieve the logger name
Logger.prototype.getName = function () {
    return this.name;
};