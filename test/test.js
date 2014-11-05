require('should');
process.env['DEBUG'] = '*,-*logger_name4';

describe('get-log', function () {
    describe('#require(..)("logger_name")', function () {
        it('should return a logger called "logger_name"  ', function () {
            var logger = require('../index')('logger_name');
            logger.getName().should.be.equal('logger_name');
        })
    });
    describe('#require(..)("logger_name2") and PROJECT_NAME = "project_name"', function () {
        it('should return a logger called "project_name:logger_name2"  ', function () {
            require('../index').PROJECT_NAME = 'project_name';
            var logger = require('../index')('logger_name2');
            logger.getName().should.be.equal('project_name:logger_name2');
        })
    });
    describe('#isDebugEnabled()', function () {
        it('should log without exception ', function () {
            var logger = require('../index')('logger');
            logger.info('Info');
            logger.warn('Warn');
            logger.error('Error');
        })
    });
    describe('#isDebugEnabled()', function () {
        it('should return false ', function () {
            var logger = require('../index')('logger_name4');
            logger.isDebugEnabled().should.be.false;
        })
    });
});