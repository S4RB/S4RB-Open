import csv from 'csvtojson';

const convertCsvFileToJson = filePath => csv().fromFile(filePath);

export default convertCsvFileToJson;
