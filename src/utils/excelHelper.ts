import XLSX, { Sheet, WorkBook } from 'xlsx';

export class ExcelHelper {
    
    static readExcel(filePath: string, sheetName: string): Record<string, string>[]{
        let workBook: WorkBook = XLSX.readFile(filePath)
        let sheet: Sheet = workBook.Sheets[sheetName]
        return XLSX.utils.sheet_to_json<Record<string, string>>(sheet,{defval: ""})

    }
}