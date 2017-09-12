const swig = require('swig');
const fs = require('fs');

// FIXME: disable force overwrite  for release
const force_overwrite = false;

module.exports.api_h = (function () {
  const template = swig.compileFile(__dirname + '/api.h.swig');

  function gen(file, config, stream) {
    const targetFile = file.clone();
    targetFile.extname = '.h';

    if (!fs.existsSync(targetFile.path)
        || force_overwrite) {
      targetFile.stat = null;
      targetFile.contents = new Buffer(template(config));
      stream.push(targetFile);
    } else {
      console.log('skipped ' + targetFile.relative);
    }
  }

  return gen;
})();

module.exports.api_m = (function () {
  const template = swig.compileFile(__dirname + '/api.m.swig');

  function gen(file, config, stream) {
    const targetFile = file.clone();
    targetFile.extname = '.m';

    if (!fs.existsSync(targetFile.path)
        || force_overwrite) {
      targetFile.stat = null;
      targetFile.contents = new Buffer(template(config));
      stream.push(targetFile);
    } else {
      console.log('skipped ' + targetFile.relative);
    }
  }

  return gen;
})();

module.exports.api_gen_h = (function () {
  const template = swig.compileFile(__dirname + '/api+gen.h.swig');

  function gen(file, config, stream) {
    const targetFile = file.clone();
    targetFile.stem += '+gen';
    targetFile.extname = '.h';

    if (!fs.existsSync(targetFile.path)
        || fs.statSync(targetFile.path).mtime < file.stat.mtime
        || force_overwrite) {
      targetFile.stat = null;
      targetFile.contents = new Buffer(template(config));
      stream.push(targetFile);
    } else {
      console.log('skipped ' + targetFile.relative);
    }
  }

  return gen;
})();

module.exports.api_gen_m = (function () {
  const template = swig.compileFile(__dirname + '/api+gen.m.swig');

  function gen(file, config, stream) {
    const targetFile = file.clone();
    targetFile.stem += '+gen';
    targetFile.extname = '.m';

    if (!fs.existsSync(targetFile.path)
        || fs.statSync(targetFile.path).mtime < file.stat.mtime
        || force_overwrite) {
      targetFile.stat = null;
      targetFile.contents = new Buffer(template(config));
      stream.push(targetFile);
    } else {
      console.log('skipped ' + targetFile.relative);
    }
  }

  return gen;
})();

