import { Schema, model } from "mongoose";

const creaditSchema = new Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  payDate: { type: Date, required: true },
  type: {
    type: String,
    default: "CardPayment",
    enum: ["CardPayment", "AppRenewal"],
  },
  cardOwner: {
    type: String,
    enum: ["DD", "NN"],
    // required if type is CardPayment
    required: function () {
      return this.type === "CardPayment";
    },
  },
});

const Credit = model("Credit", creaditSchema);

export default Credit;
