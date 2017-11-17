let date=new Date()();

var log_file = require('fs').createWriteStream(__dirname + '/log '+date+'.text', {flags : 'w'})

function hook_stream(stream, callback) {
    var old_write = stream.write
		 stream.write = (function(write) {
        return function(string, encoding, fd) {
            write.apply(stream, arguments)  // comments this line if you don't want output in the console
            callback(string, encoding, fd)
        }
    })(stream.write)

    return function() {
        stream.write = old_write
    }
}

console.log('a')
console.error('b')
console.error('basas')
var unhook_stdout = hook_stream(process.stdout, function(string, encoding, fd) {
    log_file.write(string, encoding)
})

// var unhook_stderr = hook_stream(process.stderr, function(string, encoding, fd) {
//     log_file.write(string, encoding)
// })
console.log('sasa')
console.log('c')
// console.error('d')
console.log(5+)

console.log('e')
// console.error('f')

unhook_stdout()
// unhook_stderr()
