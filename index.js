#!/usr/bin/env node

const process = require('process');
const path = require('path');
const vfs = require('vinyl-fs');
const qhapi = require('./qhapi');

var current_dir = process.cwd();
var source_dir = current_dir;
if (process.argv.length > 2) {
  source_dir = path.resolve(current_dir, process.argv[2]);
}
var dest_dir = source_dir;
if (process.argv.length > 3) {
  dest_dir = path.resolve(current_dir, process.argv[3]);
}
//console.log(source_dir, '=>', dest_dir, '\n');

vfs.src(qhapi.glob, { cwd: source_dir, base: source_dir })
  .pipe(qhapi.generator({ dest: dest_dir }))
  .pipe(qhapi.reporter())
  .pipe(vfs.dest(dest_dir));

