import { ZextraUI } from "../../../constructor/zextra-ui";

export declare class UICode extends ZextraUI{}

export declare function Code(
    props: {
        lang : 'string',
        adapter? : any,
        raw_code : string
    },
    code_raw : string | Promise<string>
) : UICode
