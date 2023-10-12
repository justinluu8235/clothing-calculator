/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatedjango_react_template"]("main/index",{

/***/ "./node_modules/@mui/material/MenuItem/index.js":
/*!******************************************************!*\
  !*** ./node_modules/@mui/material/MenuItem/index.js ***!
  \******************************************************/
/***/ (() => {

eval("throw new Error(\"Module build failed: Error: ENOENT: no such file or directory, open '/Users/justinluu/clothing-calculator/node_modules/@mui/material/MenuItem/index.js'\");\n\n//# sourceURL=webpack://django-react-template/./node_modules/@mui/material/MenuItem/index.js?");

/***/ }),

/***/ "./frontend/main/StyleCalculator.tsx":
/*!*******************************************!*\
  !*** ./frontend/main/StyleCalculator.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ StyleCalculator)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module '@mui/material/Stack'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module 'react-query'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"./node_modules/axios/lib/axios.js\");\n/* harmony import */ var _mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/MenuItem */ \"./node_modules/@mui/material/MenuItem/index.js\");\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module '@mui/material/Select'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module '@mui/material/FormControl'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module '@mui/material/FormHelperText'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module '@mui/material/Button'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\n\n\n\n\n\n\n\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module 'dotenv'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();\nconst ENDPOINT = process.env.ENDPOINT;\nconst URL = `${ENDPOINT}/app/style_calculator/`;\nconst fetchItems = () => __awaiter(void 0, void 0, void 0, function* () {\n    const result = yield axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(URL);\n    return result.data;\n});\nfunction StyleCalculator() {\n    const { isLoading, error, data } = Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'react-query'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('style', fetchItems);\n    const [selectedFabric, setSelectedFabric] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');\n    const [selectedQuantityRange, setSelectedQuantityRange] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');\n    const [selectedStyleCategory, setSelectedStyleCategory] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');\n    const [cost, setCost] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('??');\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n        if (data) {\n            setSelectedFabric(data['fabric_types'][0].id);\n            setSelectedQuantityRange(data['quantity_ranges'][0].id);\n            setSelectedStyleCategory(data['style_categories'][0].id);\n        }\n    }, [data]);\n    const csrfTokenInput = document.getElementsByName('csrfmiddlewaretoken')[0];\n    const CSRF_TOKEN = csrfTokenInput.value;\n    const handleCalculate = () => {\n        const calcData = {\n            'fabric_type': selectedFabric,\n            'quantity_range': selectedQuantityRange,\n            'style_category': selectedStyleCategory\n        };\n        axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"].post(URL, calcData, {\n            headers: {\n                'X-CSRFToken': CSRF_TOKEN,\n            },\n        })\n            .then(response => {\n            console.log('response', response);\n        })\n            .catch(err => {\n            console.log('error', err);\n        });\n    };\n    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '@mui/material/Stack'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), { alignItems: \"center\", useFlexGap: true, gap: \"40px\" },\n        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '@mui/material/FormControl'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), { variant: \"standard\", sx: { m: 1, minWidth: 120 } },\n            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '@mui/material/Select'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), { value: selectedFabric, onChange: (e) => setSelectedFabric(e.target.value) }, data && data['fabric_types'].map((fabricType) => { return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_3__[\"default\"], { value: fabricType.id }, fabricType.label); })),\n            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '@mui/material/FormHelperText'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), null, \"fabric type\")),\n        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '@mui/material/FormControl'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), { variant: \"standard\", sx: { m: 1, minWidth: 120 } },\n            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '@mui/material/Select'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), { value: selectedQuantityRange, onChange: (e) => setSelectedQuantityRange(e.target.value) }, data && data['quantity_ranges'].map((quantityRange) => { return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_3__[\"default\"], { value: quantityRange.id }, quantityRange.label); })),\n            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '@mui/material/FormHelperText'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), null, \"quantity range\")),\n        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '@mui/material/FormControl'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), { variant: \"standard\", sx: { m: 1, minWidth: 120 } },\n            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '@mui/material/Select'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), { value: selectedStyleCategory, onChange: (e) => setSelectedStyleCategory(e.target.value) }, data && data['style_categories'].map((styleCategory) => { return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_3__[\"default\"], { value: styleCategory.id }, styleCategory.label); })),\n            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '@mui/material/FormHelperText'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), null, \"style category\")),\n        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '@mui/material/Button'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), { variant: \"contained\", onClick: handleCalculate }, \"Calculate\")));\n}\n\n\n//# sourceURL=webpack://django-react-template/./frontend/main/StyleCalculator.tsx?");

/***/ }),

/***/ "./node_modules/webpack/hot/emitter.js":
/*!*********************************************!*\
  !*** ./node_modules/webpack/hot/emitter.js ***!
  \*********************************************/
/***/ (() => {

eval("throw new Error(\"Module build failed: Error: ENOENT: no such file or directory, open '/Users/justinluu/clothing-calculator/node_modules/webpack/hot/emitter.js'\");\n\n//# sourceURL=webpack://django-react-template/./node_modules/webpack/hot/emitter.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!*****************************************!*\
  !*** ./node_modules/webpack/hot/log.js ***!
  \*****************************************/
/***/ (() => {

eval("throw new Error(\"Module build failed: Error: ENOENT: no such file or directory, open '/Users/justinluu/clothing-calculator/node_modules/webpack/hot/log.js'\");\n\n//# sourceURL=webpack://django-react-template/./node_modules/webpack/hot/log.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("a4daa424801e1a22ed83")
/******/ })();
/******/ 
/******/ }
);