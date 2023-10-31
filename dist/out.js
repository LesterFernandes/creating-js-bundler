
      (function(modules) {
        function require(id) {
          const [fn, mapping] = modules[id];
  
          function localRequire(name) {
            return require(mapping[name]);
          }
  
          const module = { exports : {} };
  
          fn(localRequire, module, module.exports);
  
          return module.exports;
        }
  
        require(0);
      })({0: [
        function (require, module, exports) {
          "use strict";

var _message = require("./message.js");

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_message2.default);
        },
        {"./message.js":1},
      ],1: [
        function (require, module, exports) {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = require("./name.js");

var _play = require("./play.js");

exports.default = "Hello, my name is " + _name.name + ". And my game is " + _play.game + ".";
        },
        {"./name.js":2,"./play.js":3},
      ],2: [
        function (require, module, exports) {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var name = exports.name = 'Erling Haaland';
        },
        {},
      ],3: [
        function (require, module, exports) {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var game = exports.game = 'Football';
        },
        {},
      ],})
    