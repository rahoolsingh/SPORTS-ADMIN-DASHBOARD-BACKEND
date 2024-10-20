import fs from "fs";
import axios from "axios";

// download image from url as a PNG file with passed name on root directory
const downloadImage = async (url, filename, path = ".") => {
    path = `${path}/${filename}`;
    const writer = fs.createWriteStream(path);

    const response = await axios({
        url,
        method: "GET",
        responseType: "stream",
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
    });
};

// download multiple images from urls as PNG files with passed names on root directory
const downloadImages = async (images) => {
    if (!images || images.length === 0) {
        return;
    }

    images.map(async (image) => {
        await downloadImage(image.url, image.filename);
    });
};

export { downloadImage, downloadImages };
export default downloadImage;
