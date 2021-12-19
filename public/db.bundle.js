/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/indexedDb.js":
/*!*****************************!*\
  !*** ./public/indexedDb.js ***!
  \*****************************/
/***/ (() => {

eval("var db;\nvar budgetVersion; // Create a new db request for a \"budget\" database.\n\nvar request = indexedDB.open(\"BudgetDB\", budgetVersion || 21);\n\nrequest.onupgradeneeded = function (e) {\n  console.log(\"Upgrade needed in IndexDB\");\n  var oldVersion = e.oldVersion;\n  var newVersion = e.newVersion || db.version;\n  console.log(\"DB Updated from version \".concat(oldVersion, \" to \").concat(newVersion));\n  db = e.target.result;\n\n  if (db.objectStoreNames.length === 0) {\n    db.createObjectStore(\"BudgetStore\", {\n      autoIncrement: true\n    });\n  }\n};\n\nrequest.onerror = function (e) {\n  console.log(\"Woops! \".concat(e.target.errorCode));\n};\n\nfunction checkDatabase() {\n  console.log(\"check db invoked\"); // Open a transaction on your BudgetStore db\n\n  var transaction = db.transaction([\"BudgetStore\"], \"readwrite\"); // access your BudgetStore object\n\n  var store = transaction.objectStore(\"BudgetStore\"); // Get all records from store and set to a variable\n\n  var getAll = store.getAll(); // If the request was successful\n\n  getAll.onsuccess = function () {\n    // If there are items in the store, we need to bulk add them when we are back online\n    if (getAll.result.length > 0) {\n      fetch(\"/api/transaction/bulk\", {\n        method: \"POST\",\n        body: JSON.stringify(getAll.result),\n        headers: {\n          Accept: \"application/json, text/plain, */*\",\n          \"Content-Type\": \"application/json\"\n        }\n      }).then(function (response) {\n        return response.json();\n      }).then(function (res) {\n        // If our returned response is not empty\n        if (res.length !== 0) {\n          // Open another transaction to BudgetStore with the ability to read and write\n          transaction = db.transaction([\"BudgetStore\"], \"readwrite\"); // Assign the current store to a variable\n\n          var currentStore = transaction.objectStore(\"BudgetStore\"); // Clear existing entries because our bulk add was successful\n\n          currentStore.clear();\n          console.log(\"Clearing store 🧹\");\n        }\n      });\n    }\n  };\n}\n\nrequest.onsuccess = function (e) {\n  console.log(\"success\");\n  db = e.target.result; // Check if app is online before reading from db\n\n  if (navigator.onLine) {\n    console.log(\"Backend online! 🗄️\");\n    checkDatabase();\n  }\n};\n\nvar saveRecord = function saveRecord(record) {\n  console.log(\"Save record invoked\"); // Create a transaction on the BudgetStore db with readwrite access\n\n  var transaction = db.transaction([\"BudgetStore\"], \"readwrite\"); // Access your BudgetStore object store\n\n  var store = transaction.objectStore(\"BudgetStore\"); // Add record to your store with add method.\n\n  store.add(record);\n}; // Listen for app coming back online\n\n\nwindow.addEventListener(\"online\", checkDatabase);\n\n//# sourceURL=webpack://budget-app/./public/indexedDb.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/indexedDb.js"]();
/******/ 	
/******/ })()
;