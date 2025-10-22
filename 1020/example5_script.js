// example5_script.js
// 以巢狀 for 產生 1~9 的乘法表

var output = '';

// 延伸練習
const range_start = prompt('Enter the start of the range (1-9):');
const range_end = prompt('Enter the end of the range (1-9):');

for (var i = range_start; i <= range_end; i++) {
  for (var j = 1; j <= 9; j++) {
    output += i + 'x' + j + '=' + (i * j) + '\t';
  }
  output += '\n';
}
document.getElementById('result').textContent = output;
