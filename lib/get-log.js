//       get-log
//
//       Copyright 2014 Enrico Stara 'enrico.stara@gmail.com'
//       Released under the BSD-2-Clause license
//       https://github.com/enricostara/get-log

//      Logger class
//
// This class is the Logger utility and it supports the following levels: ERROR, WARN, INFO and DEBUG.
// The ERROR, WARN, INFO levels are always on, DEBUG can be enabled/disabled with 'DEBUG' environment var.
// To add your project name as prefix, set the 'GETLOG_PROJECT_NAME' env with your project_name
// To enable the debug for all the modules of your project then you can set: 'DEBUG=project_name:*'

// Import dependencies
require('colors');

// The constructor requires the logger name
function Logger(name) {
    var debug = require('debug');
    var prjName = module.exports.PROJECT_NAME;
    this.name = prjName ? prjName + ':' + name : name;
    this._debug = debug(this.name);
    this._debug.log = function () {
        var args = arguments;
        args[0] = '[DEBUG] '.green + args[0];
        console.log.apply(console, args);
    };
    this.debugEnabled = debug.enabled(this.name);
    if (this.debugEnabled) {
        console.log('[%s] debug is %s', this.name.blue, 'ENABLED'.green);
    }
}

// Log ERROR message in std err, cannot be disabled
Logger.prototype.error = function () {
    var args = arguments;
    args[0] = '[ERROR] ' + new Date().toUTCString() + ' ' +
        this.name + ' ' + args[0];
    console.error.apply(this, args);
};

// Log WARN message in std out, cannot be disabled
Logger.prototype.warn = function () {
    var args = arguments;
    args[0] = '[WARN] '.magenta + new Date().toUTCString() + ' ' +
        this.name + ' ' + args[0];
    console.log.apply(this, args);
};

// Log INFO message in std out, cannot be disabled
Logger.prototype.info = function () {
    var args = arguments;
    args[0] = '[INFO] '.blue + new Date().toUTCString() + ' ' +
        this.name + ' ' + args[0];
    console.log.apply(this, args);
};

// Log DEBUG message in std out, CAN be disabled/enabled
Logger.prototype.debug = function () {
    if (this.isDebugEnabled()) {
        this._debug.apply(this, arguments);
    }
};

// Check if debug is enabled
Logger.prototype.isDebugEnabled = function () {
    return this.debugEnabled;
};

// Retrieve the logger name
Logger.prototype.getName = function () {
    return this.name;
};

// Loggers cache
var loggers = {};

// Export the get-log by name function
module.exports = exports = function (name) {
    return loggers[name] || (loggers[name] = new Logger(name));
};
