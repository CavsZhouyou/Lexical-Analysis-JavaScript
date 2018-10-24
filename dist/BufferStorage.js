"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * @Author: zhouyou@werun 
 * @Descriptions: 缓存区存储操作类 
 * @TodoList: 无
 * @Date: 2018-10-24 09:33:50 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-10-24 19:03:36
 */

var fs = require("fs"); // 引入文件模块依赖

var BufferStorage = function () {
  function BufferStorage(file, length) {
    _classCallCheck(this, BufferStorage);

    this.init(file, length);
  }

  /**
   * @description 初始化缓存区
   * @param {*} [file=null] 文件标识符
   * @param {number} [length=0] 缓存区长度
   * @memberof BufferStorage
   */


  _createClass(BufferStorage, [{
    key: "init",
    value: function init() {
      var file = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      this.file = file; // 打开文件标识符
      this.length = length; // 缓存区长度
      this.offset = 0; // 缓存区写入数据时的偏移量
      this.position = 0; // 读入文件时的初始位置
      this.buffer = new Buffer.alloc(this.length * 2); // 采用双缓存区策略 
      this.endFlag = false; // 判断文件是否读取完成
    }

    /**
     * @description 重新初始化缓存区
     * @memberof BufferStorage
     */

  }, {
    key: "reload",
    value: function reload() {
      this.init(this.file, this.length);
    }

    /**
     * @description 从文件中读取指定长度字节到缓存中
     * @memberof BufferStorage
     */

  }, {
    key: "readFile",
    value: function readFile() {
      var bytes = fs.readSync(this.file, this.buffer, this.offset, this.length, this.position);
      // 判断文件是否读取完成
      if (bytes !== this.length) {
        this.endFlag = true;
      } else {
        // 修改偏移量来实现不同缓存区读入
        this.offset = this.length - this.offset;

        // 修正下次文件读入的起始位置
        this.position += bytes;

        console.log(bytes);
      }
    }

    /**
     * @description 获取缓存区中的一个字符
     * @param {number} [index=0] 字符的索引值
     * @returns 一个字符
     * @memberof BufferStorage
     */

  }, {
    key: "getCharacter",
    value: function getCharacter() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      var bufferIndex = index % (this.length * 2);

      // 如果字符索引值还未读入到缓存中
      while (index >= this.position && !this.endFlag) {
        this.readFile();
      }

      return this.buffer.toString("utf8", bufferIndex, bufferIndex + 1);
    }

    /**
     * @description  获取指定字符串
     * @param {number} [start=0]
     * @param {number} [end=0]
     * @returns  指定字符串
     * @memberof BufferStorage
     */

  }, {
    key: "getString",
    value: function getString() {
      var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var bufferStart = start % (this.length * 2),
          bufferEnd = end % (this.length * 2),
          result = "";

      // 如果字符索引值还未读入到缓存中
      while (end >= this.position && !this.endFlag) {
        this.readFile();
      }

      // 判断结束位置在开始位置左边的情况
      if (bufferEnd < bufferStart) {
        result = this.buffer.toString("utf8", bufferStart) + this.buffer.toString("utf8", 0, bufferEnd);
      } else {
        result = this.buffer.toString("utf8", bufferStart, bufferEnd);
      }

      return result;
    }

    /**
     * @description 文件是否读取完成
     * @returns 是否完成标志
     * @memberof BufferStorage
     */

  }, {
    key: "isFileEnd",
    value: function isFileEnd() {
      return this.endFlag;
    }
  }]);

  return BufferStorage;
}();

exports.default = BufferStorage;
//# sourceMappingURL=BufferStorage.js.map