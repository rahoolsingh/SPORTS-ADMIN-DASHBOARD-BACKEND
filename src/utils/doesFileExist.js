import fs from "fs";
import path from "path";

function doesFileExist(filename, directory = ".") {
    if (!filename) {
        return false;
    }

    const fullPath = path.join(directory, filename);

    try {
        return fs.existsSync(fullPath);
    } catch (err) {
        console.error(`Error checking file existence: ${err}`);
        return false;
    }
}

export default doesFileExist;
