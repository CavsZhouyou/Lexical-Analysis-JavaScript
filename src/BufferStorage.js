/*
 * @Author: zhouyou@werun 
 * @Descriptions: 缓存区存储对象 
 * @TodoList: 无
 * @Date: 2018-10-24 09:33:50 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-10-24 10:34:59
 */

let fs = require("fs"); // 引入文件模块依赖

class BufferStorage {
  constructor(file, length) {
    this.file = file; // 打开文件标识符
    this.length = length; // 缓存区长度
    this.offset = 0; // 缓存区写入数据时的偏移量
    this.position = 0; // 读入文件时的初始位置
    this.buffer = new Buffer.alloc(length * 2); // 采用双缓存区策略 
  }

  read() {
    let bytes = fs.readSync(this.file, this.buffer, this.offset, this.offset + this.length, this.position);
    console.log(bytes);
  }
}

export default BufferStorage;