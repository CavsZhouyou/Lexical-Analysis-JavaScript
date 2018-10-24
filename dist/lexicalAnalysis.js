"use strict";

var _BufferStorage = require("./BufferStorage");

var _BufferStorage2 = _interopRequireDefault(_BufferStorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 依赖模块引入
 */
var fs = require("fs"); // 引入文件模块依赖

/**
 * 常量定义
 */
/*
 * @Author: zhouyou@werun 
 * @Descriptions: 
 * @TodoList: 无
 * @Date: 2018-10-24 09:07:20 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-10-24 09:51:04
 */
/*
 * @Author: zhouyou@werun 
 * @Descriptions: js 实现 c 语言的词法分析器
 * @TodoList: 无
 * @Date: 2018-10-20 18:46:33 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-10-24 09:07:12
 */

var DOCUMENT_PATH = "./document/test.txt",
    // 源文件路径
BUFFER_LENGTH = 1024; // 缓存区长度

/**
 * 打开并处理文件
 */
console.log("准备打开已存在的文件：" + DOCUMENT_PATH);
fs.open(DOCUMENT_PATH, 'r+', function (err, fd) {
  // 错误处理
  if (err) {
    return console.error(err);
  }
  console.log("文件打开成功！");
  var buf = new _BufferStorage2.default(fd, BUFFER_LENGTH);
  buf.read();
  // let buffer = new Buffer.alloc(2 * BUFFER_LENGTH), // 缓存对象，使用双缓存区机制
  //   bytes = 0,
  //   offset = 0,
  //   position = 0;

  // bytes = fs.readSync(fd, buffer, offset, offset + BUFFER_LENGTH, position);
});
//# sourceMappingURL=lexicalAnalysis.js.map