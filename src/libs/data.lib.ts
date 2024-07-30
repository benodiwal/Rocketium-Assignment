import axios from "axios";
import getEnvVar from "env/index";
import { DataRecord } from "types/index";

class DataService {
    static async fetch() {
        return axios.get<DataRecord[]>(getEnvVar('DATA_URL'));
    }
}

export default DataService;
