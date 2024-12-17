 type  PickImageResponse = {
assets: PickImageType[]
}

 type  PickImageType = {
fileName: string,
fileSize: number,
type: string,
uri: string,
    height: number,
    width: number,
}

export type  { PickImageResponse, PickImageType };
