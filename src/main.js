import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { downloadImage } from "./utils/downloadImage.js";
import doesFileExist from "./utils/doesFileExist.js";
import { templateImageConfig } from "./config.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// check and download pass template images
(async function () {
    templateImageConfig.map(async (image) => {
        if (!doesFileExist(image.filename, image.localPath)) {
            await downloadImage(
                image.downloadUrl,
                image.filename,
                image.localPath
            );

            console.log(`Downloaded ${image.filename} successfully`);
        } else {
            console.log(`${image.filename} already exists`);
        }
    });
})();

// Connect to MongoDB
mongoose
    .connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(`Error connecting to MongoDB: ${err}`);
    });
