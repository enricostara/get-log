require('should');
var namespace = '*,-*logger_name4';
process.env['DEBUG'] = namespace;
process.env['LOGGER_FILE'] = 'test';

var getLogger = require('../lib/get-log');
getLogger.enable(namespace);

describe('get-log', function () {
    describe('#require(..)("logger_name")', function () {
        it('should return a logger called "logger_name"  ', function () {
            var logger = getLogger('logger_name');
            logger.getName().should.be.equal('logger_name');
        })
    });
    describe('#require(..)("logger_name2") and PROJECT_NAME = "project_name"', function () {
        it('should return a logger called "project_name:logger_name2"  ', function () {
            getLogger.PROJECT_NAME = 'project_name';
            var logger = getLogger('logger_name2');
            logger.getName().should.be.equal('project_name:logger_name2');
        })
    });
    describe('#isDebugEnabled()', function () {
        it('should return true ', function () {
            var logger = getLogger('logger_name3');
            logger.isDebugEnabled().should.be.true;
        })
    });
    describe('#isDebugEnabled()', function () {
        it('should return false ', function () {
            var logger = getLogger('logger_name4');
            logger.isDebugEnabled().should.be.false;
        })
    });
    describe('#debug()', function () {
        it('should return false ', function () {
            var logger = getLogger('logger_name5');
            logger.debug('debug');
            logger.info('info');
            logger.warn('warn');
            logger.error('error');
            (require('fs').readdirSync('.').indexOf(getLogger.logFileName) > -1).should.be.true;
        })
    });
});