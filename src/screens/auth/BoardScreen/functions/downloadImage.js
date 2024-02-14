import { ensureDirExists } from "./ensureDirExists";
import { getSingleImg } from "./getSingleImg";

export const downloadImage = async (email) => {
    await ensureDirExists();
    return getSingleImg(email)
}