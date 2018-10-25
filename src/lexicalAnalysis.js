/*
 * @Author: zhouyou@werun 
 * @Descriptions: js 实现 c 语言的词法分析器
 * @TodoList: 无
 * @Date: 2018-10-20 18:46:33 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-10-25 11:12:28
 */


/**
 * 依赖模块引入
 */
import BufferStorage from './BufferStorage'; // 引入 BufferStorage 缓存区操作类
import * as maps from './maps'; // 引入字符偏移量映射表
let fs = require("fs"); // 引入文件模块依赖


/**
 * 常量定义
 */
const DOCUMENT_PATH = "./document/test.txt", // 源文件路径
  BUFFER_LENGTH = 10; // 缓存区长度


/**
 * 全局变量定义
 */
let identifier = [], // 标识符识别表
  results = []; // 存放结果数组


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
  console.log("开始对源文件进行词法分析！");

  // 开始词法分许
  lexicalAnalysis(fd);

  // 关闭文件
  fs.close(fd, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("词法分析结果如下：");
    showResult(results);
  });
});


/**
 * @description 词法分析操作函数
 * @param {*} [file=null] 文件标识符
 */
function lexicalAnalysis(file = null) {
  let buffer = new BufferStorage(file, BUFFER_LENGTH), // 缓存区
    start = 0, // 字符串状态的开始索引
    end = 0, // 字符串状态的结束索引
    state = 0, // 状态机状态
    isSearching = true; // 判断是否处于状态转移的过程中

  do {
    if (!isSearching) {
      end--;
      isSearching = true;
    }
    let charter = buffer.getCharacter(end),
      nextIndex = 0;

    // 获取 next 映射表中的索引值
    if (charter.match(/^[0-9]*$/)) {
      nextIndex = maps.BASE[state] + maps.OFFSET_MAP.get("digit");
    } else if (charter.match(/^[A-Za-z]+$/)) {
      nextIndex = maps.BASE[state] + maps.OFFSET_MAP.get("letter");
    } else if (charter.match(/^[ ]+$/) || charter.match(/[\r\n]/)) {
      nextIndex = maps.BASE[state] + maps.OFFSET_MAP.get("space");
    } else {
      nextIndex = maps.BASE[state] + maps.OFFSET_MAP.get(charter);
    }

    // 状态转移判断
    if (maps.CHECK[nextIndex] !== "" && maps.CHECK[nextIndex] === state && !buffer.isFileEnd(end + 1)) {
      state = maps.NEXT[nextIndex];
      continue;
    } else { // 对应不同状态，截取字符串进行判断
      let token = buffer.getString(start, end),
        result = {
          type: "",
          value: "",
        }

      switch (state) {
        case 1: // 处理标识符的情况
          identifier.push(token);
          if (maps.STATE_MAP.get(token)) {
            result.type = maps.STATE_MAP.get(token);
            result.value = token;
          } else {
            result.type = maps.STATE_MAP.get("identifier");
            result.value = token;
          }
          break;
        case 2: // 处理整数的情况
          result.type = maps.STATE_MAP.get("int");
          result.value = parseInt(token);
          break;
        case 18: // 处理空字符的情况
          break;
        default:
          if (maps.STATE_MAP.get(token)) {
            result.type = maps.STATE_MAP.get(token);
            result.value = token;
          }
      }

      // 对空字符情况做判断
      if (result.type) {
        results.push(result);
      }

      // 结束后转移到默认状态开始下一次循环
      state = maps.DEFAULT[state];
      start = end;
      isSearching = false;
    }
  } while (!buffer.isFileEnd(++end));
}



/**
 * @description 显示词法分析结果
 * @param {*} [results=[]] 结果数组
 */
function showResult(results = []) {
  results.forEach(token => {
    console.log("(" + token.type + "," + token.value + ")")
  });
}