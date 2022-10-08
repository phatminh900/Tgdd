import path from "path";
import sharp from "sharp";
const resizeImgUtil = async (resizeInfo: {
  id: string;
  width: number;
  height: number;
  fileBuffer: Buffer;
  fileName: string;
  quality: number;
  fileStorageResource: "phones" | "reviews" | "products";
}) => {
  // const fileName = `phone-${resizeInfo.id}-${Date.now()}-img-color-cover.jpg`;

  // @ts-ignore
  await sharp(resizeInfo.fileBuffer)
    .resize(resizeInfo.width, resizeInfo.height)
    .toFormat("jpeg")
    .jpeg({ quality: resizeInfo.quality })
    .toFile(
      `${path.join(__dirname, "..", "..", "public")}/img/${
        resizeInfo.fileStorageResource
      }/${resizeInfo.fileName}`
    );
};
export default resizeImgUtil;
