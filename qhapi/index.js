const assert = require('assert');
const through = require('through2');
const fs = require('fs');
const vinyl = require('vinyl');
const path = require('path');
const gen = require('./generator/index.js');

const generator = function(options) {

  const default_superClassName = 'QHNetworkJsonApi';

  function set_default_value(object, key, default_value) {
    if (object[key] == undefined) {
      object[key] = default_value;
    }
  }

  function process_request_config(config, request) {
    set_default_value(request, 'name', 'request');
    set_default_value(request, 'method', config['method']);
    set_default_value(request, 'query', []);
    set_default_value(request, 'body', []);

    var params = [];

    var query = request['query'];
    query.map(function(p) {
      set_default_value(p, 'type', 'NSString *');
    });
    params = params.concat(query);

    var body = request['body'];
    body.map(function(p) {
      set_default_value(p, 'type', 'NSString *');
    });
    params = params.concat(body);

    request['params'] = params;
  }

  function process_config(config) {
    assert(config['className'], "className is required");

    set_default_value(config, 'superClassName', default_superClassName);
    config['isCustomSuperClass'] = (config['superClassName'] != 'QHNetworkJsonApi');

    set_default_value(config, 'resultClassName', config['className'] + 'Result');

    set_default_value(config, 'resultSuperClassName', config['superClassName'] + 'Result');

    set_default_value(config, 'method', 'GET');
    // only 'GET' and 'POST' were supported
    assert(config['method'] == 'GET' || config['method'] == 'POST');

    if (config['requests']) {
      assert(config['url'], "url is required for reqeusts");
      const requests = config['requests'];
      requests.forEach(function (req) {
        process_request_config(config, req);
      });
    }

    if (config['url']) {
      // create a default request if url is not empty and requests is empty
      if (!config['requests']) {
        config['requests'] = [ { "name": "request" } ];
        process_request_config(config, config['requests'][0]);
      }
    }
  }

  return through.obj(function (file, enc, cb) {
    const stream = this;

    var config;
    try {
      config = JSON.parse(file.contents.toString(enc));
      process_config(config);
    } catch(err) {
      console.log('invalid input: ' + file.relative);
      console.log(err.message);

      cb();
      return;
    }

    // console.log('config of ' + file.relative + ':');
    // console.log(JSON.stringify(config, null, 2));

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
  glob: '**/*.qhapi',
  generator: generator,
  reporter: reporter,
};
