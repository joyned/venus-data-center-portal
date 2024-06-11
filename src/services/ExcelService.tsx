import { utils, writeFile } from 'xlsx';

const exportDataToExcel = (data: any, fileName: string) => {
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFile(wb, `${fileName}.xlsx`);
}

export { exportDataToExcel };
