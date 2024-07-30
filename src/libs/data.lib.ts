import axios from "axios";
import getEnvVar from "env/index";

class DataService {
    static async fetch() {
        return axios.get(getEnvVar('DATA_URL'));
    }
}

export default DataService;
