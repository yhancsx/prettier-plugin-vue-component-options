"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var parser_html_1 = require("prettier/parser-html");
var preprocessor_1 = __importDefault(require("./preprocessor"));
var options = {
    optionOrders: {
        type: 'path',
        category: 'Global',
        array: true,
        default: [
            {
                value: [
                    'name',
                    'title',
                    '$_veeValidate',
                    'inject',
                    'mixins',
                    'components',
                    'directives',
                    'filters',
                    'model',
                    'props',
                    'data',
                    'apollo',
                    'computed',
                    'methods',
                    'watch',
                    'beforeCreate',
                    'created',
                    'updated',
                    'mounted',
                    'beforeDestroy',
                    'destroyed',
                    'beforeRouteLeave',
                ],
            },
        ],
        description: 'Provide an order to sort component options.',
    },
};
module.exports = {
    parsers: {
        vue: __assign(__assign({}, parser_html_1.parsers.vue), { preprocess: preprocessor_1.default }),
    },
    options: options,
};
