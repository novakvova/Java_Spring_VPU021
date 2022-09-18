import React from "react";

export interface IInput {
    inputName?: string,
    inputType?: string,
    autocomplete?: string,
    title?: string,
    errors?: string,
    touched?: boolean,
    handleChange:(e: React.ChangeEvent<any>)=>void
}