'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _pipeline = require('./pipeline.create');

describe('pipeline create', function () {
  it('should be a funtion', function () {
    expect(typeof _pipeline.createServerPipeline === 'undefined' ? 'undefined' : _typeof(_pipeline.createServerPipeline)).toBe('function');
  });

  it('Should be passed', function () {
    global.hello = 'world';
    expect(global.hello).not.toBeNull();
  });
});