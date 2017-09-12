const through = require('through2');
const fs = require('fs');
const vinyl = require('vinyl');
const path = require('path');
const gen = require('./generator/index.js');

const default_config = {
  superClassName: "QHNetworkJsonApi",
};

function expand_config(config) {
  var expand = {
    resultClassName: config.className + "Result",
    resultSuperClassName: config.superClassName + "Result",
  };

  config['isCustomSuperClass'] = (config['superClassName'] != 'QHNetworkJsonApi');

  Object.assign(config, expand);
}

const generator = function(options) {
  return through.obj(function (file, enc, cb) {
    const stream = this;

    var config;
    try {
      config = JSON.parse(file.contents.toString(enc));
      config = Object.assign({}, default_config, config);
      expand_config(config);
    } catch(err) {
      console.log('invalid input: ' + file.relative);
      console.log(err.message);

      cb();
      return;
    }

    // console.log('config of ' + file.relative + ':');
    // console.log(config);

    // build a new vinyl to make `extname` and `stem` methods available
    const dest = options['dest'] || file.cwd;
    file = new vinyl({
      cwd: dest,
      base: dest,
      path: path.resolve(options['dest'], file.relative),
      stat: file.stat,
    });

    const generators = [ gen.api_h,
                         gen.api_m,
                         gen.api_gen_h,
                         gen.api_gen_m ];
    generators.forEach(function(gen) {
      gen(file, config, stream);
    });

    cb();
  });
};

const reporter = function() {
  return through.obj(function (file, enc, cb) {
    console.log('genertating ' + file.relative);
    this.push(file);
    cb();
  });
};

module.exports = {
  generator: generator,
  reporter: reporter,
};
