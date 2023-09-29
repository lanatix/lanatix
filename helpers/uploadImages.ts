import { fetcher } from "@/utils/fetch";
import getBase64 from "./getBase64";

const uploadImages = async (images: any[]) => {
  let urls: any = [];
  for (const image of images) {
    const response = await fetcher("/api/image", "POST", {
      image: image.dataURL,
    }).then(({ data }) => {
      urls.push(data.public_id);
      return data;
    });
    console.log(response);
  }
  return urls;
};

export default uploadImages;
