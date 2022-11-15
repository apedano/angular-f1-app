export class Utility {

    // public static async fromDataUrlToFile(dataUrl: string): Promise<File> {
    //     const blob = await fetch(dataUrl).then(it => it.blob());
    //     const file = new File([blob], 'fileName.jpg', { type: "image/jpeg" });
    //     return file;
    // }

    public static fromDataUrlToFile(dataUrl: string): File {
        let dataUrlParts: string[] = dataUrl.split(',');
        // separate out the mime component
        var mimeString = dataUrlParts[0].split(':')[1].split(';')[0];
        let blob = new Blob([dataUrlParts[1]], { type: mimeString });
        return new File([blob], 'filename.jpg');

    }

    public static fromDataUrlToFile2(dataUrl: string): File {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        let dataUrlParts: string[] = dataUrl.split(',');
        var byteString: Buffer = Buffer.from(dataUrlParts[1], 'base64');

        // separate out the mime component
        var mimeString = dataUrlParts[0].split(':')[1].split(';')[0];

        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.at(i)!;
        }

        //Old Code
        //write the ArrayBuffer to a blob, and you're done
        //var bb = new BlobBuilder();
        //bb.append(ab);
        //return bb.getBlob(mimeString);

        //New Code
        let blob = new Blob([ab], { type: mimeString });
        return new File([blob], 'filename.jpg');
    }
}

