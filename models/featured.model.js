import mongoose from "mongoose";
const { Schema } = mongoose;

const featuredSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },

    link: {
        type: String,
        trim: true,
        validate: {
            validator: v => !v || /^https?:\/\/[^\s]+$/.test(v),
            message: props => `${props.value} is not a valid URL!`
        }
    },

    serviceType: {
        type: String,
        enum: ["business_website", "internal_tool", "automated_workflow"],
        default: "business_website"
    },

    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft"
    },

    file: {
        filePath: { type: String },
        fileName: { type: String }
    }

}, { timestamps: true });

const Featured = mongoose.model("Featured", featuredSchema);
export default Featured;
