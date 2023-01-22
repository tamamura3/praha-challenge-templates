import { AddressApiService } from "./addressApiService";

// 関数1
export const averageOfArray = (numbers: number[]): number => {
  return numbers.reduce((a: number, b: number): number =>
    a + b, 0) / numbers.length;
};

// 関数2
export const asyncAverageOfArray = async (numbers: number[]): Promise<number> => {
  return new Promise((resolve) => {
    resolve(averageOfArray(numbers));
  })
};

// 関数3
export const getPrefectureThrowIfNull = async (zipcode: number): Promise<string> => {
  const addressApiService = new AddressApiService();
  const prefecture = await addressApiService.getPrefecture(zipcode);
  if (!prefecture) {
    throw new Error("No Prefecture found");
  }
  return prefecture;
}