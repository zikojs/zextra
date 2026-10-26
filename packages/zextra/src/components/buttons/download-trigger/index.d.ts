import { ZextraUI } from "../../../constructor/zextra-ui";
import { UIElement } from "ziko/src/ui";

type MimeType = `${string}/${string}` 

export declare class UIDownloadTrigger extends ZextraUI{}

export declare function DownloadTrigger(
    props?: {
        element? : UIElement | HTMLElement | string,
        data : Blob | string | ArrayBuffer | Object | File
        fileName : string,
        mimeType : MimeType,
    },
    controller : UIElement
) : UIDownloadTrigger

// export declare function DownloadTrigger(...items : UIElement[] ) : UIDownloadTrigger
