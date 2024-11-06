import { UploadClient } from "@uploadcare/upload-client"

export const upload = new UploadClient({
    publicKey : process.env.UPLOAD_CARE_PUBLIC_KEY as string
})