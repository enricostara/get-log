# get-log

Node.js Logging Utility, easy to use and ready for production.

## Installation

```bash
$ git clone --branch=master git://github.com/enricostara/get-log.git
$ cd get-log
$ npm install
```

## Coding

```js
var getLogger = require('get-log');

getLogger.PROJECT_NAME = 'my-best-app';
// or better: getLogger.PROJECT_NAME = require('./package.json').name;

var logger = getLogger('awesome-name');

logger.info('Let\'s start!');

logger.debug('Current file is %s', __filename);

var uglyLogger = getLogger('ugly-name');

uglyLogger.warn('This a Warning! Next debug log could not be displayed..');

uglyLogger.debug('Please, don\'t print me!');

uglyLogger.error('I\'m an error log, isn\'t it?');

```

## Execution

Set `DEBUG` env  to configure what logger (by name) can log at debug level. 
Use `*` as wildcard and use `-` as name prefix to exclude; the values are comma separated.
   
 ```bash
$ DEBUG=*,-*ugly-name node example.js 
  ```

## Output

 ```bash
[my-best-app:awesome-name] debug is ENABLED
[INFO] Thu, 30 Oct 2014 00:16:43 GMT my-best-app:awesome-name Let s start!
[DEBUG] Thu, 30 Oct 2014 00:16:43 GMT  my-best-app:awesome-name Current file is /example.js 
[WARN] Thu, 30 Oct 2014 00:16:43 GMT my-best-app:ugly-name This a Warning! Next debug log could not be displayed..
[ERROR] Thu, 30 Oct 2014 00:16:43 GMT my-best-app:ugly-name I m an error log, isn t it?
  ```
  
## Unit Testing 

```bash
$ npm test
```

## Dependencies

- [colors](https://github.com/Marak/colors.js): get colors in your node.js console
 
- [debug](https://github.com/visionmedia/debug): tiny node.js and browser debugging utility for your libraries and applications


## License

The project is released under the [MIT license](./LICENSE)   
  


