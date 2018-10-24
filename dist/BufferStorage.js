"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * @Author: zhouyou@werun 
 * @Descriptions: 缓存区存储对象 
 * @TodoList: 无
 * @Date: 2018-10-24 09:33:50 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-10-24 10:34:59
 */

var fs = require("fs"); // 引入文件模块依赖

var BufferStorage = function () {
  function BufferStorage(file, length) {
    _classCallCheck(this, BufferStorage);

    this.file = file; // 打开文件标识符
    this.length = length; // 缓存区长度
    this.offset = 0; // 缓存区写入数据时的偏移量
    this.position = 0; // 读入文件时的初始位置
    this.buffer = new Buffer.alloc(length * 2); // 采用双缓存区策略 
  }

  _createClass(BufferStorage, [{
    key: "read",
    value: function read() {
      var bytes = fs.readSync(this.file, this.buffer, this.offset, this.offset + this.length, this.position);
      console.log(bytes);
    }
  }]);

  return BufferStorage;
}();

exports.default = BufferStorage;
//# sourceMappingURL=BufferStorage.js.map