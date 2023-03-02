#!/usr/bin/env node

(function (process, require) {
    var program = require('commander');
    var doctrine = require("doctrine");

    program
        .version('1.0.4')
        .option('--unwrap', 'Set to delete the leading /**, any * that begins a line, and the trailing */ from the source text.')
        .option('--sloppy', 'allow optional parameters to be specified in brackets')
        .option('--multiple', 'keeps the program alive between requests to parse JSDoc. Each request to the program is separated by the 0 byte. And each result is printed on a line ending with a \\n. ')
        .parse(process.argv);

    function parse(content) {
        return doctrine.parse(content, {unwrap: program.unwrap, sloppy: program.sloppy});
    }

    var content = '';

    if (program.multiple) {
        var terminationChar = 0;

        process.stdin.resume();
        process.stdin.on('data', function(buf) {
            for (var i = 0; i < buf.length; i++) {
                var char = buf[i];
                if (char != terminationChar) {
                    content += String.fromCharCode(char);
                } else {
                    var ast = parse(content);

                    console.log(JSON.stringify(ast));

                    content = '';
                }
            }
        });
        process.stdin.on('end', function() {
            console.error("Garbage output, this is only supposed to happen if the process is killed. ")
        });
    } else {

        process.stdin.resume();
        process.stdin.on('data', function(buf) { content += buf.toString(); });
        process.stdin.on('end', function() {
            var ast = parse(content);

            console.log(JSON.stringify(ast));
        });
    }
})(process, require);
