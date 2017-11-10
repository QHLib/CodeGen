const ejs = require('ejs');
const fs = require('fs');

const force_overwrite = (process.env['NODE_ENV'] == 'dev');

module.exports.api_h = (function () {
  const templateFile = __dirname + '/api.h.ejs';
  const template = ejs.compile(fs.readFileSync(templateFile, 'utf-8'),
                               { 'filename': templateFile });

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
  const templateFile = __dirname + '/api.m.ejs';
  const template = ejs.compile(fs.readFileSync(templateFile, 'utf-8'),
                               { 'filename': templateFile });

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
  const templateFile = __dirname + '/api+gen.h.ejs';
  const template = ejs.compile(fs.readFileSync(templateFile, 'utf-8'),
                               { 'filename': templateFile });

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
  const templateFile = __dirname + '/api+gen.m.ejs';
  const template = ejs.compile(fs.readFileSync(templateFile, 'utf-8'),
                               { 'filename': templateFile });

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

