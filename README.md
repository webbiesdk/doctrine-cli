# doctrine-cli
A simple wrapper around doctrine, so one can use it in a command-line setting. 

The JSDoc input is passed to stdin. 

It takes two options, `--unwrap` and `--sloppy`, both match the corrosponding options in doctrine. 

The `--multiple` option allows one to keep the process alive when parsing multiple JSDoc's.
Just separate each request with the 0 byte, and the results will be printed on a line, ending with a `\n`.