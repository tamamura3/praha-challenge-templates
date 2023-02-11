const { add, subtract, multiply, divide } = require('../script');

const maxNumberOfArgsArray = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];

describe('add', () => {
    test('2つの整数を渡すと合計値が返ってくる', () => {
        expect(add(1, 2)).toBe(3);
    });
    test('3つの整数を渡すと合計値が返ってくる', () => {
        expect(add(1, 2, 3)).toBe(6);
    });
    test('31個以上の引数がある場合エラーが返ってくる', () => {
        expect(() => {
            add(...maxNumberOfArgsArray, 1)
        }).toThrow();
    });

    test('引数が数字以外の場合エラーが返ってくる', () => {
        expect(() => {
            add('test');
        }).toThrow();
    });
    test('合計値が1000を超えると計算結果ではなくtoo bigと文字列が返る', () => {
        expect(add(999, 1)).toBe('too big');
    });
});

describe('subtract', () => {
    test('2つの整数を渡すと減算した値が返ってくる', () => {
        expect(subtract(3, 1)).toBe(2);
    });
    test('3つの整数を渡すと減算した値が返ってくる', () => {
        expect(subtract(3, 1, 1)).toBe(1);
    });
    test('31個以上の引数がある場合エラーが返ってくる', () => {
        expect(() => {
            add(...maxNumberOfArgsArray, 1)
        }).toThrow();
    });
    test('引数が数字以外の場合エラーが返ってくる', () => {
        expect(() => {
            subtract('test')
        }).toThrow();
    });
    test('計算結果がマイナスの場合はnegative numberの文字列が返る', () => {
        expect(subtract(3, 10)).toBe('negative number');
    });
});

describe('multiply', () => {
    test('2つの整数を渡すと乗算した値が返ってくる', () => {
        expect(multiply(2, 3)).toBe(6);
    });
    test('3つの整数を渡すと乗算した値が返ってくる', () => {
        expect(multiply(2, 3, 10)).toBe(60);
    });
    test('31個以上の引数がある場合エラーが返ってくる', () => {
        expect(() => {
            add(...maxNumberOfArgsArray, 1)
        }).toThrow();
    });
    test('引数が数字以外の場合エラーが返ってくる', () => {
        expect(() => {
            multiply('test')
        }).toThrow();
    });
    test('計算結果が1000を超える場合はbig big numberの文字列が返る', () => {
        expect(multiply(1000, 5)).toBe('big big number');
    });
});

describe('divide', () => {
    test('2つの整数を渡すと除算した値が返ってくる', () => {
        expect(divide(6, 3)).toBe(2);
    });
    test('3つの整数を渡すと除算した値が返ってくる', () => {
        expect(divide(16, 4, 2)).toBe(2);
    });
    test('31個以上の引数がある場合エラーが返ってくる', () => {
        expect(() => {
            add(...maxNumberOfArgsArray, 1)
        }).toThrow();
    });
    test('引数が数字以外の場合エラーが返ってくる', () => {
        expect(() => {
            divide('test')
        }).toThrow();
    });
})