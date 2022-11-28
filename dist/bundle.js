/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
function factorial(n) {
  if (n === 1) {
    return 1;
  }else {
    return n * factorial(n - 1);
  }
}

console.log(factorial(5));
/******/ })()
;
//# sourceMappingURL=bundle.js.map