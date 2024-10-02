import fs from "fs";
import axios from "axios";

// download image from url as a PNG file with passed name on root directory
const downloadImage = async (url, name) => {
    const path = `./${name}`;
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

export { downloadImage };
