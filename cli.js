#!/usr/bin/env node

var concat = require('concat-stream'),
    wellknown = require('./'),
    fs = require('fs'),
    argv = require('minimist')(process.argv.slice(2));

if (argv.help || argv.h || (!argv._.length && process.stdin.isTTY)) return help();

((argv._[0] && fs.createReadStream(argv._[0])) || process.stdin).pipe(concat(openData));

function openData(body) {
    try {
        console.log(JSON.stringify(wellknown(body.toString()), null, 2));
    } catch(e) {
        console.error('Valid GeoJSON file required as input.');
        help();
    }
}

function help() {
    process.stdout.write(fs.readFileSync(__dirname + '/README.md'));
}
