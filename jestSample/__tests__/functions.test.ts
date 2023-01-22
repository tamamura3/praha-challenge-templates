import {
    asyncSumOfArray,
    asyncSumOfArraySometimesZero,
    getFirstNameThrowIfLong,
    sumOfArray
} from "../functions";
import { NameApiService } from "../nameApiService";
import { DatabaseMock } from "../util";

describe('sumOfArray', () => {
    test('配列の要素の合計値が返却される', () => {
        expect(sumOfArray([1, 1])).toEqual(2);
    });
    test('空の配列を渡すと0が返却される', () => {
        expect(sumOfArray([])).toEqual(0);
    });
});

describe('asyncSumOfArray', () => {
    test('配列の要素の合計値が返却される（非同期実行）', async () => {
        expect(await asyncSumOfArray([1, 1])).toBe(2);
    });
    test('空の配列を渡すと0が返却される（非同期実行）', async () => {
        expect(await asyncSumOfArray([])).toBe(0);
    });
});

describe('asyncSumOfArraySometimesZero', () => {
    test('配列の要素の合計値がDBに登録後、返却される', async (): Promise<void> => {
        const databaseMock = jest.spyOn(DatabaseMock.prototype, 'save').mockReturnValue();
        expect(await asyncSumOfArraySometimesZero([1, 1])).toBe(2);
        databaseMock.mockRestore();
    });
    test('DBの登録に失敗すると0を返却する', async (): Promise<void> => {
        const databaseMock = jest.spyOn(DatabaseMock.prototype, 'save').mockImplementation(() => { throw new Error() });
        expect(await asyncSumOfArraySometimesZero([1, 1])).toBe(0);
        databaseMock.mockRestore();
    });
});

describe('getFirstNameThrowIfLong', () => {
    test('名前が指定の長さ以下の場合は名前が返却される', async (): Promise<void> => {
        const nameApiService = jest.spyOn(NameApiService.prototype, 'getFirstName').mockResolvedValue('John');
        expect(await getFirstNameThrowIfLong(4)).toBe('John');
        nameApiService.mockRestore();
    })

    test('名前が指定の長さを超える場合は例外を投げる', async (): Promise<void> => {
        const nameApiService = jest.spyOn(NameApiService.prototype, 'getFirstName').mockResolvedValue('Jerry');
        expect(getFirstNameThrowIfLong(4)).rejects.toThrow();
        nameApiService.mockRestore();
    })
});