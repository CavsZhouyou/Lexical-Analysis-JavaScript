/*
 * @Author: zhouyou@werun 
 * @Descriptions: 缓存区存储操作类 
 * @TodoList: 无
 * @Date: 2018-10-24 09:33:50 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-10-24 22:44:56
 */

let fs = require("fs"); // 引入文件模块依赖

class BufferStorage {

  constructor(file, length) {
    this.init(file, length);
  }

  /**
   * @description 初始化缓存区
   * @param {*} [file=null] 文件标识符
   * @param {number} [length=0] 缓存区长度
   * @memberof BufferStorage
   */
  init(file = null, length = 0) {
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
  reload() {
    this.init(this.file, this.length);
  }

  /**
   * @description 从文件中读取指定长度字节到缓存中
   * @memberof BufferStorage
   */
  readFile() {
    let bytes = fs.readSync(this.file, this.buffer, this.offset, this.length, this.position);
    // 判断文件是否读取完成
    if (bytes !== this.length) {
      this.endFlag = true;
    } else {
      // 修改偏移量来实现不同缓存区读入
      this.offset = this.length - this.offset;
    }

    // 修正下次文件读入的起始位置
    this.position += bytes;

  }

  /**
   * @description 获取缓存区中的一个字符
   * @param {number} [index=0] 字符的索引值
   * @returns 一个字符
   * @memberof BufferStorage
   */
  getCharacter(index = 0) {
    let bufferIndex = index % (this.length * 2);

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
  getString(start = 0, end = 0) {
    let bufferStart = start % (this.length * 2),
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
   * @param {number} index 索引值
   * @returns 是否完成标志
   * @memberof BufferStorage
   */
  isFileEnd(index = 0) {
    return this.endFlag && index > this.position;
  }


}

export default BufferStorage;