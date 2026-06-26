import mongoose, { mongo } from "mongoose";
import { mailerTemplateInterface } from "../../shared/interfaces/MailerInterface.js";


const mailerTemplateSchema = new mongoose.Schema<mailerTemplateInterface>({
  templateName: { type: String, required: true, unique: true},
  subject: { type: String, required: true },
  templateBody: { type: String, required: true },
});

export default mongoose.models.mailerTemplates || mongoose.model("mailerTemplates", mailerTemplateSchema, "mailerTemplates");

