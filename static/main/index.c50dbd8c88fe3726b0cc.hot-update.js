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

/***/ "./node_modules/@mui/material/Box/Box.js":
/*!***********************************************!*\
  !*** ./node_modules/@mui/material/Box/Box.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/system */ \"./node_modules/@mui/system/esm/createBox.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _className__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../className */ \"./node_modules/@mui/utils/esm/ClassNameGenerator/ClassNameGenerator.js\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles */ \"./node_modules/@mui/material/styles/createTheme.js\");\n/* harmony import */ var _styles_identifier__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/identifier */ \"./node_modules/@mui/material/styles/identifier.js\");\n'use client';\n\n\n\n\n\n\nconst defaultTheme = (0,_styles__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\nconst Box = (0,_mui_system__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n  themeId: _styles_identifier__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  defaultTheme,\n  defaultClassName: 'MuiBox-root',\n  generateClassName: _className__WEBPACK_IMPORTED_MODULE_3__[\"default\"].generate\n});\n true ? Box.propTypes /* remove-proptypes */ = {\n  // ----------------------------- Warning --------------------------------\n  // | These PropTypes are generated from the TypeScript type definitions |\n  // |     To update them edit the d.ts file and run \"yarn proptypes\"     |\n  // ----------------------------------------------------------------------\n  /**\n   * @ignore\n   */\n  children: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().node),\n  /**\n   * The component used for the root node.\n   * Either a string to use a HTML element or a component.\n   */\n  component: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().elementType),\n  /**\n   * The system prop that allows defining system overrides as well as additional CSS styles.\n   */\n  sx: prop_types__WEBPACK_IMPORTED_MODULE_4___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_4___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_4___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_4___default().object), (prop_types__WEBPACK_IMPORTED_MODULE_4___default().bool)])), (prop_types__WEBPACK_IMPORTED_MODULE_4___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_4___default().object)])\n} : 0;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Box);\n\n//# sourceURL=webpack://django-react-template/./node_modules/@mui/material/Box/Box.js?");

/***/ }),

/***/ "./node_modules/@mui/system/esm/createBox.js":
/*!***************************************************!*\
  !*** ./node_modules/@mui/system/esm/createBox.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ createBox)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ \"./node_modules/@babel/runtime/helpers/esm/extends.js\");\n/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ \"./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! clsx */ \"./node_modules/clsx/dist/clsx.mjs\");\n/* harmony import */ var _mui_styled_engine__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/styled-engine */ \"./node_modules/@mui/styled-engine/index.js\");\n/* harmony import */ var _styleFunctionSx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./styleFunctionSx */ \"./node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js\");\n/* harmony import */ var _styleFunctionSx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./styleFunctionSx */ \"./node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js\");\n/* harmony import */ var _useTheme__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./useTheme */ \"./node_modules/@mui/system/esm/useTheme.js\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\n'use client';\n\n\n\nconst _excluded = [\"className\", \"component\"];\n\n\n\n\n\n\nfunction createBox(options = {}) {\n  const {\n    themeId,\n    defaultTheme,\n    defaultClassName = 'MuiBox-root',\n    generateClassName\n  } = options;\n  const BoxRoot = (0,_mui_styled_engine__WEBPACK_IMPORTED_MODULE_5__[\"default\"])('div', {\n    shouldForwardProp: prop => prop !== 'theme' && prop !== 'sx' && prop !== 'as'\n  })(_styleFunctionSx__WEBPACK_IMPORTED_MODULE_6__[\"default\"]);\n  const Box = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.forwardRef(function Box(inProps, ref) {\n    const theme = (0,_useTheme__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(defaultTheme);\n    const _extendSxProp = (0,_styleFunctionSx__WEBPACK_IMPORTED_MODULE_8__[\"default\"])(inProps),\n      {\n        className,\n        component = 'div'\n      } = _extendSxProp,\n      other = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_extendSxProp, _excluded);\n    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(BoxRoot, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n      as: component,\n      ref: ref,\n      className: (0,clsx__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(className, generateClassName ? generateClassName(defaultClassName) : defaultClassName),\n      theme: themeId ? theme[themeId] || theme : theme\n    }, other));\n  });\n  return Box;\n}\n\n//# sourceURL=webpack://django-react-template/./node_modules/@mui/system/esm/createBox.js?");

/***/ }),

/***/ "./frontend/main/StyleCalculator.tsx":
/*!*******************************************!*\
  !*** ./frontend/main/StyleCalculator.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ StyleCalculator)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material_Stack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/Stack */ \"./node_modules/@mui/material/Stack/Stack.js\");\n/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-query */ \"./node_modules/react-query/es/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"./node_modules/axios/lib/axios.js\");\n/* harmony import */ var _mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material/MenuItem */ \"./node_modules/@mui/material/MenuItem/MenuItem.js\");\n/* harmony import */ var _mui_material_Select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material/Select */ \"./node_modules/@mui/material/Select/Select.js\");\n/* harmony import */ var _mui_material_FormControl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material/FormControl */ \"./node_modules/@mui/material/FormControl/FormControl.js\");\n/* harmony import */ var _mui_material_FormHelperText__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material/FormHelperText */ \"./node_modules/@mui/material/FormHelperText/FormHelperText.js\");\n/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/Button */ \"./node_modules/@mui/material/Button/Button.js\");\n/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material/Typography */ \"./node_modules/@mui/material/Typography/Typography.js\");\n/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material/Box */ \"./node_modules/@mui/material/Box/Box.js\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\n\n\n\n\n\n\n\n\n\nlet ENDPOINT = \"\";\nif (true) {\n    ENDPOINT = \"http://127.0.0.1:8000\";\n}\nelse {}\nconst URL = `${ENDPOINT}/app/style_calculator/`;\nconst fetchItems = () => __awaiter(void 0, void 0, void 0, function* () {\n    const result = yield axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(URL);\n    return result.data;\n});\nfunction StyleCalculator() {\n    const { isLoading, error, data } = (0,react_query__WEBPACK_IMPORTED_MODULE_1__.useQuery)(\"style\", fetchItems);\n    const [selectedFabric, setSelectedFabric] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"\");\n    const [selectedQuantityRange, setSelectedQuantityRange] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"\");\n    const [selectedStyleCategory, setSelectedStyleCategory] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"\");\n    const [size, setSize] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"\");\n    const [cost, setCost] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"\");\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n        if (data) {\n            setSelectedFabric(data[\"fabric_types\"][0].id);\n            setSelectedQuantityRange(data[\"quantity_ranges\"][0].id);\n            setSelectedStyleCategory(data[\"style_categories\"][0].id);\n            setSize(\"3 sizes (S, M, L)\");\n        }\n    }, [data]);\n    const csrfTokenInput = document.getElementsByName(\"csrfmiddlewaretoken\")[0];\n    const CSRF_TOKEN = csrfTokenInput.value;\n    const handleCalculate = () => {\n        const calcData = {\n            fabric_type: selectedFabric,\n            quantity_range: selectedQuantityRange,\n            style_category: selectedStyleCategory,\n            size: size,\n        };\n        axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"].post(URL, calcData, {\n            headers: {\n                \"X-CSRFToken\": CSRF_TOKEN,\n            },\n        })\n            .then((response) => {\n            console.log(\"response\", response);\n            setCost(response.data.estimated_cost);\n        })\n            .catch((err) => {\n            console.log(\"error\", err);\n        });\n    };\n    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Stack__WEBPACK_IMPORTED_MODULE_3__[\"default\"], { alignItems: \"center\", useFlexGap: true, gap: \"40px\" },\n        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Stack__WEBPACK_IMPORTED_MODULE_3__[\"default\"], { direction: \"row\" },\n            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_FormControl__WEBPACK_IMPORTED_MODULE_4__[\"default\"], { variant: \"standard\", sx: { m: 1, minWidth: 120 } },\n                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Select__WEBPACK_IMPORTED_MODULE_5__[\"default\"], { value: selectedFabric, onChange: (e) => setSelectedFabric(e.target.value) }, data &&\n                    data[\"fabric_types\"].map((fabricType) => {\n                        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_6__[\"default\"], { value: fabricType.id }, fabricType.label));\n                    })),\n                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_FormHelperText__WEBPACK_IMPORTED_MODULE_7__[\"default\"], null, \"fabric type\")),\n            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_FormControl__WEBPACK_IMPORTED_MODULE_4__[\"default\"], { variant: \"standard\", sx: { m: 1, minWidth: 120 } },\n                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Select__WEBPACK_IMPORTED_MODULE_5__[\"default\"], { value: selectedQuantityRange, onChange: (e) => setSelectedQuantityRange(e.target.value) }, data &&\n                    data[\"quantity_ranges\"].map((quantityRange) => {\n                        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_6__[\"default\"], { value: quantityRange.id }, quantityRange.label));\n                    })),\n                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_FormHelperText__WEBPACK_IMPORTED_MODULE_7__[\"default\"], null, \"quantity range\")),\n            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_FormControl__WEBPACK_IMPORTED_MODULE_4__[\"default\"], { variant: \"standard\", sx: { m: 1, minWidth: 120 } },\n                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Select__WEBPACK_IMPORTED_MODULE_5__[\"default\"], { value: size, onChange: (e) => setSize(e.target.value) }, [\"3 sizes (S, M, L)\", \"5 sizes (XS, S, M, L, XL)\"].map((size) => {\n                    return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_6__[\"default\"], { value: size }, size);\n                })),\n                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_FormHelperText__WEBPACK_IMPORTED_MODULE_7__[\"default\"], null, \"size\")),\n            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_FormControl__WEBPACK_IMPORTED_MODULE_4__[\"default\"], { variant: \"standard\", sx: { m: 1, minWidth: 120 } },\n                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Select__WEBPACK_IMPORTED_MODULE_5__[\"default\"], { value: selectedStyleCategory, onChange: (e) => setSelectedStyleCategory(e.target.value) }, data &&\n                    data[\"style_categories\"].map((styleCategory) => {\n                        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_6__[\"default\"], { value: styleCategory.id }, styleCategory.label));\n                    })),\n                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_FormHelperText__WEBPACK_IMPORTED_MODULE_7__[\"default\"], null, \"style category\"))),\n        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Button__WEBPACK_IMPORTED_MODULE_8__[\"default\"], { variant: \"outlined\", onClick: handleCalculate }, \"Calculate\"),\n        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_9__[\"default\"], { sx: {\n                width: 300,\n                height: 300,\n                backgroundColor: 'primary.dark',\n                '&:hover': {\n                    backgroundColor: 'primary.main',\n                    opacity: [0.9, 0.8, 0.7],\n                },\n            } }),\n        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_10__[\"default\"], { variant: \"h1\", component: \"h2\" }, cost && `$${cost}`)));\n}\n\n\n//# sourceURL=webpack://django-react-template/./frontend/main/StyleCalculator.tsx?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("b94e417213e9f944e8a3")
/******/ })();
/******/ 
/******/ }
);