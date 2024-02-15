import { Dispatch, SetStateAction } from "react";

export interface ConnectionResponse{
    setIsConnectionError:Dispatch<SetStateAction<boolean>>
}