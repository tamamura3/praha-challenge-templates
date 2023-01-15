// todo: ここに単体テストを書いてみましょう！
import { asyncSumOfArray, asyncSumOfArraySometimesZero, getFirstNameThrowIfLong, sumOfArray } from "../functions";
import { NameApiService } from "../nameApiService";
import { Database, DatabaseValid, DatabaseError, DatabaseMock } from "../util";


describe('sumOfArray', () => {

    test('1 + 1', () => {
        expect(sumOfArray([1, 1])).toEqual(2);
    });

    test('Enpty array', () => {
        expect(sumOfArray([])).toEqual(0);
    });

    // ビルドエラー
    // ※ビルド時のエラーケースはテスト不要と考える
    // 理由はビルド時のエラーでバグに気付けるため
    // ただし今回のケースで言えば、JavaScriptのような型が厳密ではない場合はテストした方がいい
    // test('String array', () => {
    //     expect(sumOfArray(['1', '2'])).toThrow(Error);
    // });
});

describe('asyncSumOfArray', () => {

    test('1 + 1', () => {
        return asyncSumOfArray([1, 1]).then(result => {
            expect(result).toBe(2);
        });
    });

    test('1 + 1', () => {
        return asyncSumOfArray([]).then(result => {
            expect(result).toBe(0);
        });
    });

    // ビルドエラー
    // test('String array', async () => {
    //     expect.assertions(1);
    //     try {
    //         await asyncSumOfArray(['1', '2']);
    //     } catch (e) {
    //         expect(e).toMatch('error');
    //     }
    // });
});

describe('asyncSumOfArraySometimesZero', () => {

    // 関数が外部のコード（データベース）に依存しているため、正常終了するか異常終了するか分からない
    // そのため何も考えずテストコードを実装すると、コードが正しくても結果が期待通りにならないことがある
    // test('正常ケース', async(): Promsise<void> => {
    //     const result = await asyncSumOfArraySometimesZero([1, 1]);
    //     expect(result).toBe(2);
    // });


    // 依存性の注入を行うことで上記の問題を解決する
    // 依存しているコードを自身で実装することで期待結果を固定できる
    test('依存性の注入 正常ケース', async (): Promise<void> => {
        const databaseValid: Database = new DatabaseValid();

        const result = await asyncSumOfArraySometimesZero(
            [1, 1],
            databaseValid
        );
        expect(result).toBe(2);
    });

    test('依存性の注入 エラーケース', async (): Promise<void> => {
        const databaseError: Database = new DatabaseError();

        const result = await asyncSumOfArraySometimesZero(
            [1, 1],
            databaseError
        );
        expect(result).toBe(0);
    });

    // Mockを利用することで、元々あるDatabaseMockを利用して依存性の注入をする
    test('依存性の注入&Mock 正常ケース', async (): Promise<void> => {
        const databaseMock = new DatabaseMock();
        jest.spyOn(databaseMock, "save")
            .mockImplementation(() => { /* Succeed. do nothing. */ });

        const result = await asyncSumOfArraySometimesZero(
            [1, 1],
            databaseMock,
        );
        expect(result).toBe(2);
    })

    test('依存性の注入&Mock エラーケース', async (): Promise<void> => {
        const databaseMock = new DatabaseMock();
        jest.spyOn(databaseMock, "save")
            .mockImplementation(() => { throw new Error() });

        const result = await asyncSumOfArraySometimesZero(
            [1, 1],
            databaseMock,
        );
        expect(result).toBe(0);
    });

    // Mockだけを利用してカバレッジを100%にするにはどうすればいいか不明
});

describe('getFirstNameThrowIfLong', () => {

    test('依存性の注入&Mock 正常ケース', async (): Promise<void> => {
        const nameApiServiceMock = new NameApiService();
        jest.spyOn(nameApiServiceMock, 'getFirstName')
            .mockImplementation(async (): Promise<string> => { return 'Tom'; });
        const result = await getFirstNameThrowIfLong(
            4,
            nameApiServiceMock,
        );
        expect(result).toBe('Tom');
    })

    test('依存性の注入&Mock 異常ケース', async (): Promise<void> => {
        const nameApiServiceMock = new NameApiService();
        jest.spyOn(nameApiServiceMock, 'getFirstName')
            .mockImplementation(async (): Promise<string> => {
                return 'Michael';
            });
        await expect(getFirstNameThrowIfLong(4, nameApiServiceMock))
            .rejects.toThrow();
    })

});