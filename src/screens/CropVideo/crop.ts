import RNFS from 'react-native-fs';
import {FFmpegKit, ReturnCode} from "ffmpeg-kit-react-native";
import {CropBox} from "./utils.ts";
import {MutableRefObject} from "react";


type CropResponse = {
    success: boolean;
    path: string | null;
};

export const cropVideo =
    async (videoUri:string, fileName: string, videoWidth:number, videoHeight:number, width: number, height: number, cropBox: MutableRefObject<CropBox>)
       : Promise<CropResponse> => {
        const tempDir = RNFS.TemporaryDirectoryPath; // Path to the temp folder
        const fileExt = fileName.split('.').pop();
        const finalName = `${Date.now()}.${fileExt}`;
        const outputPath = `${tempDir}cropped_${finalName}`;

    const scaleX = videoWidth / width; // Width scale factor
    const scaleY = videoHeight / height; // Height scale factor

    // Convert cropBox dimensions to video-relative
    const cropWidth = cropBox.current.width * scaleX;
    const cropHeight = cropBox.current.height * scaleY;
    const offsetX = cropBox.current.x * scaleX;
    const offsetY = cropBox.current.y * scaleY;

        console.log("CropVideo", cropWidth, cropHeight, offsetX, offsetY);

    const ffmpegCommand = `-i ${videoUri} -vf "crop=${cropWidth}:${cropHeight}:${offsetX}:${offsetY}" -c:a copy ${outputPath}`;

    try {
        const session = await FFmpegKit.execute(ffmpegCommand);
        const returnCode = await session.getReturnCode();

        return {
            success:ReturnCode.isSuccess(returnCode),
            path: outputPath,
        };

    } catch (e) {
        console.log(e);
        return {
            success: false,
            path:null,
        };
    }
};
