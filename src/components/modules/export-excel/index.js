import React from 'react';
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const ExportExcel = ({ csvData, fileName, wscols }) => {
  // ******** XLSX with object key as header *************
  // const fileType =
  //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  // const fileExtension = ".xlsx";

  // const exportToCSV = (csvData, fileName) => {
  //   const ws = XLSX.utils.json_to_sheet(csvData);
  //   const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  //   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  //   const data = new Blob([excelBuffer], { type: fileType });
  //   FileSaver.saveAs(data, fileName + fileExtension);
  // };

  // ******** XLSX with new header *************
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const Heading = [];

  const exportToCSV = (csvData, fileName, wscols) => {
    console.log(csvData);
    const ws = XLSX.utils.json_to_sheet(Heading, {
      header: [],
      skipHeader: true,
      origin: 0, //ok
    });
    ws['!cols'] = wscols;
    XLSX.utils.sheet_add_json(ws, csvData, {
      header: [],
      skipHeader: true,
      origin: -1,
    });
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <input
      type={'button'}
      value="Export XLSX"
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onClick={(e) => exportToCSV(csvData, fileName, wscols)}
    />
  );
};

export default ExportExcel;
