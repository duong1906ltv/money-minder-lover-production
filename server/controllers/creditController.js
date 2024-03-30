// Viet ham tao hoac cap nhat credit
import Credit from "../models/Credit.js";

export const getAllCredits = async (req, res) => {
  try {
    const credits = await Credit.find();
    res.json(credits);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createCredit = async (req, res) => {
  try {
    const newCredit = await Credit.create(req.body);
    res.status(201).json(newCredit);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// viet ham tu dong gui mail khi den ngay tra no (gui vao 6h khi con 1, 3, 7 ngay gui 1 lan)
import cron from "node-cron";
import { transporter, sendEmail } from "../utils/MailCustom.js";

export const task = cron.schedule(
  "0 6 * * *",
  async () => {
    const credits = await Credit.find();
    credits.forEach((credit) => {
      const today = new Date().setHours(0, 0, 0, 0);
      const payDate = new Date(credit.payDate).setHours(0, 0, 0, 0);
      const diffTime = Math.abs(payDate - today);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if ([1, 3, 7].includes(diffDays)) {
        // Viet mailOptions. voi noi dung: con diffDays nua toi han tra the
        const mailOptions = {
          from: {
            name: "money minder lover",
            address: process.env.ACCOUNT,
          },
          to: ["duong1906ltv@gmail.com"],
          subject: "Tra no",
          text: `Con ${diffDays} ngay nua toi han tra the`,
          html: `<b>Con ${diffDays} ngay nua toi han tra the</b>`,
        };
        sendEmail(transporter, mailOptions);
      }
    });
  },
  {
    scheduled: false,
  }
);
