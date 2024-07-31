import axios from "axios";
import getEnvVar from "env/index";
import { DataRecord, dataShape } from "types/index";

class DataService {
    #data: DataRecord[];

    constructor() {
        this.#data  = [];
    }

    async #fetch() {
        return axios.get<DataRecord[]>(getEnvVar('DATA_URL'));
    }

    async getData(): Promise<DataRecord[]> {
        const res = await this.#fetch();
        this.#data = dataShape.parse(res.data);
        return this.#data;
    }
}

export default DataService;
