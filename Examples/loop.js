const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));
const random = (min, max) => Math.floor(Math.random() * ((max - min) + 1)) + min;
var variables = {};
(async() => {
function run() {
console.log("hi");
}
for (var i = 0; i < 50; i++) {
run();
}
rl.close();
})();
rl.on('close', () => process.exit(0));

