import { diffLines } from 'diff';

export const getDiff = (oldStr: string, newStr: string) => {
    return diffLines(oldStr, newStr)
}