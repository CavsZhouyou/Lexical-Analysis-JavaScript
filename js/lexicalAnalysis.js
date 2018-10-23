/*
 * @Author: zhouyou@werun 
 * @Descriptions: js 实现 c 语言的词法分析器
 * @TodoList: 无
 * @Date: 2018-10-20 18:46:33 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-10-23 22:07:13
 */

var fs = require("fs");

var buf = new Buffer.alloc(1024);

console.log("准备打开已存在的文件！");
fs.open('test.txt', 'r+', function (err, fd) {
  if (err) {
    return console.error(err);
  }

  console.log("文件打开成功！");
  console.log("准备读取文件：");
  fs.read(fd, buf, 512, buf.length - 512, 0, function (err, bytes) {
    if (err) {
      console.log(err);
    }
    console.log(bytes + "  字节被读取");

    // 仅输出读取的字节
    if (bytes > 0) {
      console.log(buf.slice(512, 512 + bytes).toString());
    }
  });

});