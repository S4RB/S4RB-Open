import convertCsvFileToJson from '../utils/csvToJsonConverter';
import { csvDataFilePath } from '../config';

class CpmuService {
  constructor() {
    this.filePath = csvDataFilePath;
  }

  getCpmuData() {
    return convertCsvFileToJson(this.filePath);
  }
}

export default new CpmuService();
