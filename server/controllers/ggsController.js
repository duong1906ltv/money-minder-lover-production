import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import format from "date-format";
import { formatCell } from "../utils/formatCell.js";
import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  keyFile: "./utils/credentials.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const client = await auth.getClient();

const googleSheets = google.sheets({ version: "v4", auth: client });

export const getIncomeCategory = async (req, res) => {
  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join("\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(
      "13upxVyrriIHEIN9e0oBTt-wHJTzYaEpQjjudUS_d_Zg",
      serviceAccountAuth
    );

    await doc.loadInfo(); // Load thông tin của bảng tính

    const sheet = doc.sheetsByTitle["0. Hạng mục"];

    // Lấy dữ liệu từ phạm vi A1 của sheet (tất cả dữ liệu)
    await sheet.loadCells("G10:G");

    const values = [];
    for (let rowIndex = 10; rowIndex <= sheet.rowCount; rowIndex++) {
      const cell = sheet.getCellByA1(`G${rowIndex}`);
      if (cell.value) {
        values.push({
          value: cell.value,
          label: cell.value,
        });
      }
    }

    res.json(values);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getExpenseCategory = async (req, res) => {
  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join("\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(
      "13upxVyrriIHEIN9e0oBTt-wHJTzYaEpQjjudUS_d_Zg",
      serviceAccountAuth
    );

    await doc.loadInfo(); // Load thông tin của bảng tính

    const sheet = doc.sheetsByTitle["0. Hạng mục"];

    // Lấy dữ liệu từ phạm vi A1 của sheet (tất cả dữ liệu)
    await sheet.loadCells("A10:D");

    const values = [];
    for (let rowIndex = 10; rowIndex <= sheet.rowCount; rowIndex++) {
      const cell = sheet.getCellByA1(`A${rowIndex}`);
      if (cell.value) {
        values.push({
          value: cell.value,
          label: cell.value,
        });
      }
    }

    for (let rowIndex = 10; rowIndex <= sheet.rowCount; rowIndex++) {
      const cell = sheet.getCellByA1(`D${rowIndex}`);
      if (cell.value) {
        values.push({
          value: cell.value,
          label: cell.value,
        });
      }
    }

    res.json(values);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateIncomeSheet = async (req, res) => {
  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join("\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(
      "13upxVyrriIHEIN9e0oBTt-wHJTzYaEpQjjudUS_d_Zg",
      serviceAccountAuth
    );
    await doc.loadInfo();

    const sheet = doc.sheetsByTitle["1. Thu nhập"];

    await sheet.loadHeaderRow(2);

    const datetime = format("dd/MM/yyyy", new Date());

    const rowData = {
      STT: sheet.rowCount - 1,
      "Thời gian": req.body.date ? req.body.date : datetime,
      "Loại thu nhập": req.body.category,
      "Số tiền": req.body.money,
      "Ghi chú": req.body.note ? req.body.note : "",
    };
    await sheet.addRow(rowData);

    const { lastColumnLetter, rowCount } = sheet;
    // await sheet.loadCells(`A1:${lastColumnLetter}${rowCount}`);
    const lastColumnIndex = lastColumnLetter.charCodeAt(0) - 65 + 1;

    formatCell(sheet, lastColumnIndex, rowCount, lastColumnLetter);

    res.status(200).json({ message: "Income updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateExpenseSheet = async (req, res) => {
  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join("\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(
      "13upxVyrriIHEIN9e0oBTt-wHJTzYaEpQjjudUS_d_Zg",
      serviceAccountAuth
    );
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle["3. Chi tiêu"];
    sheet.loadHeaderRow(2);
    const datetime = format("dd/MM/yyyy", new Date());

    const rowData = {
      STT: sheet.rowCount - 1,
      "Thời gian": req.body.date ? req.body.date : datetime,
      "Hạng mục": req.body.category,
      "Số tiền": req.body.money,
      "Ghi chú": req.body.note ? req.body.note : "",
    };

    await sheet.addRow(rowData);

    await createFilter("13upxVyrriIHEIN9e0oBTt-wHJTzYaEpQjjudUS_d_Zg", 0, 10);

    const { lastColumnLetter, rowCount } = sheet;
    const lastColumnIndex = lastColumnLetter.charCodeAt(0) - 65 + 1;

    formatCell(sheet, lastColumnIndex, rowCount, lastColumnLetter);
    res
      .status(200)
      .json({ message: "Expense sheet has been updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

async function createFilter(spreadsheetId, startColumnIndex, endColumnIndex) {
  try {
    const response = await googleSheets.spreadsheets.get({
      spreadsheetId: spreadsheetId,
      ranges: ["3. Chi tiêu"],
      includeGridData: false,
    });
    const sheetProperties = response.data.sheets[0].properties;
    const sheetId = sheetProperties.sheetId;
    const lastRow = sheetProperties.gridProperties.rowCount;

    const request = {
      spreadsheetId: spreadsheetId,
      resource: {
        requests: [
          {
            setBasicFilter: {
              filter: {
                range: {
                  sheetId: sheetId,
                  startRowIndex: 1,
                  endRowIndex: lastRow,
                  startColumnIndex: startColumnIndex,
                  endColumnIndex: endColumnIndex + 1, // Kết thúc ở cột K nên cần +1
                },
              },
            },
          },
        ],
      },
    };

    await googleSheets.spreadsheets.batchUpdate(request);
  } catch (error) {
    console.error("Error creating filter:", error);
  }
}

// Cập nhật sheet chi tiêu hàng loạt

export const updateExpenseSheetBatch = async (req, res) => {
  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join("\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(
      "13upxVyrriIHEIN9e0oBTt-wHJTzYaEpQjjudUS_d_Zg",
      serviceAccountAuth
    );
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle["3. Chi tiêu"];
    sheet.loadHeaderRow(2);

    // const datetime = format("dd/MM/yyyy", new Date());

    const items = req.body.input.split(";");

    const rowData = items.map((item, index) => {
      const [date, money, note] = item.split(" - ");

      return {
        STT: sheet.rowCount - 1 + index,
        "Thời gian": date,
        "Hạng mục": req.body.category,
        "Số tiền": money,
        "Ghi chú": note,
      };
    });

    await sheet.addRows(rowData);

    const { lastColumnLetter, rowCount } = sheet;
    const lastColumnIndex = lastColumnLetter.charCodeAt(0) - 65 + 1;

    formatCell(
      sheet,
      lastColumnIndex,
      rowCount,
      lastColumnLetter,
      items.length
    );

    await createFilter("13upxVyrriIHEIN9e0oBTt-wHJTzYaEpQjjudUS_d_Zg", 0, 10);

    res
      .status(200)
      .json({ message: "Expense sheet has been updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
