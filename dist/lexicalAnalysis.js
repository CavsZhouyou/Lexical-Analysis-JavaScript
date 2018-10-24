'use strict';

var _BufferStorage = require('./BufferStorage');

var _BufferStorage2 = _interopRequireDefault(_BufferStorage);

var _maps = require('./maps');

var maps = _interopRequireWildcard(_maps);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 引入字符偏移量映射表
/*
 * @Author: zhouyou@werun 
 * @Descriptions: js 实现 c 语言的词法分析器
 * @TodoList: 无
 * @Date: 2018-10-20 18:46:33 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-10-24 22:50:51
 */

/**
 * 依赖模块引入
 */
var fs = require("fs"); // 引入文件模块依赖


/**
 * 常量定义
 */
// 引入 BufferStorage 缓存区操作类
var DOCUMENT_PATH = "./document/test.txt",
    // 源文件路径
BUFFER_LENGTH = 10; // 缓存区长度


/**
 * 全局变量定义
 */
var identifier = [],
    // 标识符识别表
buffer = null,
    // 缓存区
start = 0,
    end = 0,
    state = 0,
    // 状态机状态
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

  buffer = new _BufferStorage2.default(fd, BUFFER_LENGTH);

  do {
    var charter = buffer.getCharacter(end),
        nextIndex = 0;

    // // 处理空格、换行符等情况
    // if (charter.match(/^[ ]+$/) || charter.match(/[\r\n]/)) {
    //   continue;
    // }

    // 获取 next 映射表中的索引值
    if (charter.match(/^[0-9]*$/)) {
      nextIndex = maps.BASE[state] + maps.OFFSET_MAP.get("digit");
    } else if (charter.match(/^[A-Za-z]+$/)) {
      nextIndex = maps.BASE[state] + maps.OFFSET_MAP.get("letter");
    } else {
      nextIndex = maps.BASE[state] + maps.OFFSET_MAP.get(charter);
    }

    if (maps.CHECK[nextIndex] !== "" && maps.CHECK[nextIndex] === state && !buffer.isFileEnd(end + 1)) {
      state = maps.NEXT[nextIndex];
      continue;
    } else {
      var token = buffer.getString(start, end),
          result = {
        type: "",
        value: ""
      };
      console.log(token);
      // 处理空格、换行符等情况
      if (token.match(/^[ ]+$/) || token.match(/[\r\n]/)) {
        start = end;
        continue;
      } else {
        switch (state) {
          case 1:
            // 处理标识符的情况
            identifier.push(token);
            if (maps.STATE_MAP.get(token)) {
              result.type = maps.STATE_MAP.get(token);
              result.value = token;
            } else {
              result.type = maps.STATE_MAP.get("identifier");
              result.value = token;
            }
            break;
          case 2:
            // 处理整数的情况
            result.type = maps.STATE_MAP.get("int");
            result.value = parseInt(token);
            break;
          default:
            if (maps.STATE_MAP.get(token)) {
              result.type = maps.STATE_MAP.get(token);
              result.value = token;
            }
        }
        state = maps.DEFAULT[state];
        results.push(result);
      }
      start = end;
    }
  } while (!buffer.isFileEnd(++end));
  showResult(results);
});

// console.log(results[0].type);
function showResult(results) {
  results.forEach(function (token) {
    console.log("(" + token.type + "," + token.value + ")");
  });
}
//# sourceMappingURL=lexicalAnalysis.js.map