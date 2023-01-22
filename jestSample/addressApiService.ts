import axios from "axios";

export class AddressApiService {
    public async getPrefecture(zipcode: number): Promise<string> {
        const url = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`;
        const { data } = await axios.get(url);
        return data.results.address1 as string;
    }
}