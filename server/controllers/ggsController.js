import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import format from "date-format";
import { formatCell } from "../utils/formatCell.js";

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
      "Thời gian": req.body.date ? req.body.date : datetime,
      "Loại thu nhập": req.body.category,
      "Số tiền": req.body.money,
      "Ghi chú": req.body.note ? req.body.note : "",
    };
    await sheet.addRow(rowData);

    const { lastColumnLetter, rowCount } = sheet;
    await sheet.loadCells(`A1:${lastColumnLetter}${rowCount}`);
    const lastColumnIndex = lastColumnLetter.charCodeAt(0) - 65 + 1;

    formatCell(sheet, lastColumnIndex, rowCount);

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
      "Thời gian": req.body.date ? req.body.date : datetime,
      "Hạng mục": req.body.category,
      "Số tiền": req.body.money,
      "Ghi chú": req.body.note ? req.body.note : "",
    };

    await sheet.addRow(rowData);

    const { lastColumnLetter, rowCount } = sheet;
    await sheet.loadCells(`A1:${lastColumnLetter}${rowCount}`);
    const lastColumnIndex = lastColumnLetter.charCodeAt(0) - 65 + 1;

    formatCell(sheet, lastColumnIndex, rowCount);
    res
      .status(200)
      .json({ message: "Expense sheet has been updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
