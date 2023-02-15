import { Options } from './types';
import { parse } from '@vue/compiler-dom';
import jsc from 'jscodeshift';
import * as babylon from '@babel/parser';

export default function preprocess(code: string, options: Options) {
  const script = parse(code).children.find((node: any) => node.type === 1 && node.tag === 'script');

  const { optionOrder } = options;

  const sortProperties = (a: any, b: any) => {
    const aName = a?.key?.name || '';
    const bName = b?.key?.name || '';
    let aIndex = optionOrder.indexOf(aName);
    if (aIndex === -1) {
      aIndex = 999;
    }
    let bIndex = optionOrder.indexOf(bName);
    if (bIndex === -1) {
      bIndex = 999;
    }
    if (aIndex === bIndex) {
      return aName === bName ? 0 : aName < bName ? -1 : 1;
    }
    return aIndex - bIndex;
  };

  if (script?.type === 1 && script.children[0].type === 2) {
    const { content, loc } = script.children[0];
    const root = jsc(content, { parser });

    root
      .find(jsc.ExportDefaultDeclaration)
      .nodes()
      .forEach(({ declaration }) => {
        if (declaration.type === 'ObjectExpression') {
          // sfc
          declaration.properties = declaration.properties.slice().sort(sortProperties);
        } else if (
          // vue2 ts
          declaration.type === 'CallExpression' &&
          declaration.callee.type === 'MemberExpression' &&
          declaration.callee.object.type === 'Identifier' &&
          declaration.callee.property.type === 'Identifier' &&
          declaration.callee.property.name === 'extend' &&
          declaration.arguments[0]?.type === 'ObjectExpression'
        ) {
          declaration.arguments[0].properties = declaration.arguments[0].properties.slice().sort(sortProperties);
        } else if (
          // vue3 ts
          declaration.type === 'CallExpression' &&
          declaration.callee.type === 'Identifier' &&
          declaration.callee.name === 'defineComponent' &&
          declaration.arguments[0]?.type === 'ObjectExpression'
        ) {
          declaration.arguments[0].properties = declaration.arguments[0].properties.slice().sort(sortProperties);
        }
      });
    const replaced = root.toSource();
    if (content !== replaced) {
      const pre = code.substring(0, loc.start.offset);
      const post = code.substring(loc.end.offset);
      return `${pre}${replaced}${post}`;
    }
  }
  return code;
}

const parser = {
  parse: (code: string) =>
    babylon.parse(code, {
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
    }),
};
