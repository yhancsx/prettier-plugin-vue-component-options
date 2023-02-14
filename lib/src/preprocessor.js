"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var compiler_dom_1 = require("@vue/compiler-dom");
var jscodeshift_1 = __importDefault(require("jscodeshift"));
var babylon = __importStar(require("@babel/parser"));
function preprocess(code, options) {
    var script = (0, compiler_dom_1.parse)(code).children.find(function (node) { return node.type === 1 && node.tag === 'script'; });
    var optionOrders = options.optionOrders;
    var sortProperties = function (a, b) {
        var _a, _b;
        var aName = ((_a = a === null || a === void 0 ? void 0 : a.key) === null || _a === void 0 ? void 0 : _a.name) || '';
        var bName = ((_b = b === null || b === void 0 ? void 0 : b.key) === null || _b === void 0 ? void 0 : _b.name) || '';
        var aIndex = optionOrders.indexOf(aName);
        if (aIndex === -1) {
            aIndex = 999;
        }
        var bIndex = optionOrders.indexOf(bName);
        if (bIndex === -1) {
            bIndex = 999;
        }
        if (aIndex === bIndex) {
            return aName === bName ? 0 : aName < bName ? -1 : 1;
        }
        return aIndex - bIndex;
    };
    if ((script === null || script === void 0 ? void 0 : script.type) === 1 && script.children[0].type === 2) {
        var _a = script.children[0], content = _a.content, loc = _a.loc;
        var root = (0, jscodeshift_1.default)(content, { parser: parser });
        root
            .find(jscodeshift_1.default.ExportDefaultDeclaration)
            .nodes()
            .forEach(function (_a) {
            var _b;
            var declaration = _a.declaration;
            if (declaration.type === 'ObjectExpression') {
                declaration.properties = declaration.properties.slice().sort(sortProperties);
            }
            else if (declaration.type === 'CallExpression' &&
                declaration.callee.type === 'MemberExpression' &&
                declaration.callee.object.type === 'Identifier' &&
                declaration.callee.property.type === 'Identifier' &&
                declaration.callee.property.name === 'extend' &&
                ((_b = declaration.arguments[0]) === null || _b === void 0 ? void 0 : _b.type) === 'ObjectExpression') {
                declaration.arguments[0].properties = declaration.arguments[0].properties.slice().sort(sortProperties);
            }
        });
        var replaced = root.toSource();
        if (content !== replaced) {
            var pre = code.substring(0, loc.start.offset);
            var post = code.substring(loc.end.offset);
            return "".concat(pre).concat(replaced).concat(post);
        }
    }
    return code;
}
exports.default = preprocess;
var parser = {
    parse: function (code) {
        return babylon.parse(code, {
            sourceType: 'module',
            allowImportExportEverywhere: true,
            allowReturnOutsideFunction: true,
            startLine: 1,
            tokens: true,
            plugins: [
                'jsx',
                'asyncGenerators',
                'bigInt',
                'classPrivateMethods',
                'classPrivateProperties',
                'classProperties',
                'decorators-legacy',
                'doExpressions',
                'dynamicImport',
                'exportDefaultFrom',
                'exportNamespaceFrom',
                'functionBind',
                'functionSent',
                'importMeta',
                'nullishCoalescingOperator',
                'numericSeparator',
                'objectRestSpread',
                'optionalCatchBinding',
                'optionalChaining',
                ['pipelineOperator', { proposal: 'minimal' }],
                'throwExpressions',
                'typescript',
            ],
        });
    },
};
