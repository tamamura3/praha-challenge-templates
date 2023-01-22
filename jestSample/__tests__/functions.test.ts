import {
    asyncSumOfArray,
    asyncSumOfArraySometimesZero,
    getFirstNameThrowIfLong,
    sumOfArray
} from "../functions";
import { NameApiService } from "../nameApiService";
import { DatabaseMock } from "../util/index";

jest.mock('../util/index');
jest.mock('../nameApiService');
const databaseMock = DatabaseMock as jest.Mock;
const nameApiService = NameApiService as jest.Mock;

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
        databaseMock.mockImplementation(() => {
            return { save: jest.fn() }
        });
        expect(await asyncSumOfArraySometimesZero([1, 1], databaseMock)).toBe(2);
        databaseMock.mockRestore();
    });
    test('DBの登録に失敗すると0を返却する', async (): Promise<void> => {
        databaseMock.mockImplementation(() => {
            return {
                save: jest.fn(() => {
                    throw new Error();
                })
            }
        });
        expect(await asyncSumOfArraySometimesZero([1, 1], databaseMock)).toBe(0);
        databaseMock.mockRestore();
    });
});

describe('getFirstNameThrowIfLong', () => {
    test('名前が指定の長さ以下の場合は名前が返却される', async (): Promise<void> => {
        nameApiService.mockImplementation(() => {
            return {
                getFirstName: jest.fn(() => {
                    return 'John';
                })
            }
        });
        expect(await getFirstNameThrowIfLong(4, nameApiService)).toBe('John');
        nameApiService.mockRestore();
    });

    test('名前が指定の長さを超える場合は例外を投げる', async (): Promise<void> => {
        nameApiService.mockImplementation(() => {
            return {
                getFirstName: jest.fn(() => {
                    return 'Jerry';
                })
            }
        });
        expect(getFirstNameThrowIfLong(4, nameApiService)).rejects.toThrow();
        nameApiService.mockRestore();
    });
});