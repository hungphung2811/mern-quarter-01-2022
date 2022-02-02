import Calc from '@src/calc/math';

describe('this is a test case', () => {
    it('should pass', () => {
        expect(Calc(2,3)).toBe(6);
    })
})