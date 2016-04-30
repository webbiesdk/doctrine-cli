var program = require('commander');
var doctrine = require("doctrine");
var prettyjson = require('prettyjson');


program
    .version('0.0.1')
    .option('---unwrap ', 'Set to delete the leading /**, any * that begins a line, and the trailing */ from the source text.')
    .option('--sloppy ', 'allow optional parameters to be specified in brackets')
    .parse(process.argv);

var content = '';
process.stdin.resume();
process.stdin.on('data', function(buf) { content += buf.toString(); });
process.stdin.on('end', function() {
    var ast = doctrine.parse(
        content, { unwrap: program.unwrap , sloppy : program.sloppy });

    console.log(JSON.stringify(ast));
});