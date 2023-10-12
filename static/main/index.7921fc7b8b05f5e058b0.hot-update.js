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

/***/ "./frontend/main/StyleCalculator.tsx":
/*!*******************************************!*\
  !*** ./frontend/main/StyleCalculator.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ StyleCalculator)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material_Stack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/Stack */ \"./node_modules/@mui/material/Stack/Stack.js\");\n/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-query */ \"./node_modules/react-query/es/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"./node_modules/axios/lib/axios.js\");\n/* harmony import */ var _mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material/MenuItem */ \"./node_modules/@mui/material/MenuItem/MenuItem.js\");\n/* harmony import */ var _mui_material_Select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material/Select */ \"./node_modules/@mui/material/Select/Select.js\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\n\n\n\n\nconst PROD_URL = 'http://clothing-calculator-env.eba-qnfpfgsz.us-west-2.elasticbeanstalk.com/app/style_calculator/';\nconst LOCAL_URL = 'http://127.0.0.1:8000/app/style_calculator/';\nconst fetchItems = () => __awaiter(void 0, void 0, void 0, function* () {\n    const result = yield axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(LOCAL_URL);\n    return result.data;\n});\nfunction StyleCalculator() {\n    const { isLoading, error, data } = (0,react_query__WEBPACK_IMPORTED_MODULE_1__.useQuery)('style', fetchItems);\n    const [selectedFabric, setSelectedFabric] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');\n    console.log('selectedFabric', selectedFabric);\n    console.log('data', data);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n        if (data) {\n            setSelectedFabric(data['fabric_types'][0].id);\n        }\n    }, [data]);\n    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Stack__WEBPACK_IMPORTED_MODULE_3__[\"default\"], { alignItems: \"center\", useFlexGap: true, gap: \"40px\" },\n        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Select__WEBPACK_IMPORTED_MODULE_4__[\"default\"], { value: 10 }, data && data['fabric_types'].map((fabricType) => { return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_5__[\"default\"], { value: fabricType.id }, fabricType.label); }))));\n}\n\n\n//# sourceURL=webpack://django-react-template/./frontend/main/StyleCalculator.tsx?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("cbf94d886cb2c5bd2a12")
/******/ })();
/******/ 
/******/ }
);