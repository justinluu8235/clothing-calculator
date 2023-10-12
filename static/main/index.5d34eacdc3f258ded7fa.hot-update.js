"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatedjango_react_template"]("main/index",{

/***/ "./frontend/main/App/index.tsx":
/*!*************************************!*\
  !*** ./frontend/main/App/index.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/dist/index.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router/dist/index.js\");\n/* harmony import */ var _StyleCalculator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../StyleCalculator */ \"./frontend/main/StyleCalculator.tsx\");\n/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-query */ \"./node_modules/react-query/es/index.js\");\n\n\n\n\nconst queryClient = new react_query__WEBPACK_IMPORTED_MODULE_2__.QueryClient();\nconst About = () => {\n    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null,\n        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h1\", null, \"This is an about page\")));\n};\nconst App = () => {\n    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_query__WEBPACK_IMPORTED_MODULE_2__.QueryClientProvider, { client: queryClient },\n        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null,\n            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_StyleCalculator__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null))));\n};\nconst router = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_3__.createBrowserRouter)([\n    {\n        path: \"app\",\n        element: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(App, null),\n    },\n    {\n        path: \"app/about\",\n        element: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(About, null),\n    },\n]);\nconst AppWithRouter = () => {\n    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().StrictMode), null,\n        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.RouterProvider, { router: router })));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AppWithRouter);\n\n\n//# sourceURL=webpack://django-react-template/./frontend/main/App/index.tsx?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("0ac692fd597405f76f95")
/******/ })();
/******/ 
/******/ }
);