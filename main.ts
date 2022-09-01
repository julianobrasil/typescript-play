const str = `
import {asb} from './sdfsd';

export interface Test {
  a345: string;
  b345: number;
  c345: {
    d345: Date;
    e345: Other[];
    f345: {f1345: number;f2345: number[];f3345:'a'| 'b'}[];
    g345: boolean
  }
}
`;

const buildKeysArray = (str: string) => {
  if (!str.includes('{')) {
    return [];
  }

  const noExtras = str.replace(/[\s\n]/g, '');
  const strArray = noExtras.slice();
  const stack: string[] = [];
  const exportIndex = noExtras.indexOf('export')
  const firstCurlyBracesOccurence = noExtras.indexOf('{', exportIndex);
  const firstValidCurlyBracesOccurence = noExtras.indexOf('{', firstCurlyBracesOccurence + 1);
  const regexAttrName = /[a-z0-9]+(?=:)/gi;

  // const result1 = regexAttrName.exec(noExtras);
  // const index1 = noExtras.lastIndexOf(result1[0], regexAttrName.lastIndex);
  // console.log(result1, index1, strArray[index1]);
  const token = false;
  let result!: RegExpExecArray | null;
  const keysArray: string[] = [];
  let lastResult = ''; 
  for (let i = 0; i < strArray.length; i++) {
    if (!result) {
      result = regexAttrName.exec(noExtras);
    }
    if (!result) {
      break; 
    }
    switch (strArray[i]) {
      case '{': {
        if (i > firstValidCurlyBracesOccurence - 1) {
          stack.push((stack.length > 0 ? `${stack.at(-1)}.` : '') + lastResult);
        }
        console.log(i, firstValidCurlyBracesOccurence, stack);

        break;
      }
      case '}': {
        stack.pop();
      }
    }
    if (i === result.index) {
      console.log('key => ', i, result, stack);
      keysArray.push((stack.at(-1) ? `${stack.at(-1)}.` : '') + result[0]);
      lastResult = result[0];
      result = null;
    }
  }
  console.log(keysArray);
};

buildKeysArray(str);
