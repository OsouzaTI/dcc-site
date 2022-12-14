import { FieldValues } from "react-hook-form";

export interface CustomModalFormState {
    title: string,
    action: string,
    send: (data : FieldValues) => void
};