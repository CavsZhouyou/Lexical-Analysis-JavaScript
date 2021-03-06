"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * @Author: zhouyou@werun 
 * @Descriptions: 自动状态机实现时的各个映射表 
 * @TodoList: 无
 * @Date: 2018-10-24 19:14:17 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-10-25 09:50:06
 */

// 字符偏移量映射表
var OFFSET_MAP = exports.OFFSET_MAP = new Map([["letter", 0], ["digit", 1], ["*", 2], [":", 3], ["=", 4], ["<", 5], [">", 6], ["+", 7], ["-", 8], ["/", 9], [",", 10], [";", 11], ["space", 12]]);

// 状态识别映射表
var STATE_MAP = exports.STATE_MAP = new Map([["identifier", "IDENTIFIER"], ["int", "INT"], ["char", "CHAR"], ["while", "WHILE"], ["for", "FOR"], ["do", "DO"], ["break", "BREAK"], ["continue", "CONTINUE"], ["*", "星号"], ["**", "幂运算符号"], [":", "冒号"], [":=", "等于符号"], ["<", "小于符号"], [">", "大于符号"], ["<=", "小于等于符号"], [">=", "大于等于符号"], ["=", "等号"], ["+", "加号"], ["-", "减号"], ["/", "斜杠"], [",", "逗号"], [";", "分号"]]);

// default 状态默认转向数组
var DEFAULT = exports.DEFAULT = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// base 状态在 next 中的索引数组
var BASE = exports.BASE = [0, 13, 15, 16, 19, 19, 24, 24, 30, 30, 30, 30, 35, 35, 35, 35, 35, 35, 35];

// NEXT 状态转向数组
var NEXT = exports.NEXT = [1, 2, 3, 5, 7, 10, 11, 13, 14, 15, 16, 17, 18, 1, 1, "", 2, "", 4, "", "", "", "", "", 6, "", "", "", "", 8, 9, "", "", "", "", 12];

// CHECK 源状态数组
var CHECK = exports.CHECK = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, "", 2, "", 3, "", "", "", "", "", 5, "", "", "", "", 7, 7, "", "", "", "", 11];
//# sourceMappingURL=maps.js.map