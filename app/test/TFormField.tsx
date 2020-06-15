
import React from "react"
import { FontVariant, TextInput } from "react-native"
import { ErrorMessage } from "../common/forms";
import { Formik, FieldProps, Field, useFormikContext } from 'formik';

const TFormField: React.FC<{
    name: string,
    placeholder?: string,
    value?: any,
    onBlur?: any,
    onChangeText?: any,

    icon?: string,
    width?: number,

    autoCapitalize?: any,
    autoCorrect?: boolean,
    keyboardType?: any,

    textContentType?: any,
    secureTextEntry?: boolean,
    maxLength?: number,
    multiline?: boolean,
    numberOfLines?: number
}> = ({
    name,
    placeholder = "",
    value,
    onBlur,
    onChangeText,
    icon,
    width = "100%",
    autoCapitalize = "none",
    autoCorrect = true,
    keyboardType = "default",
    textContentType = "none",
    secureTextEntry = false,
    maxLength,
    multiline = false,
    numberOfLines = 1
}) => {


        const { setFieldTouched, handleChange, errors, touched, values, handleBlur } = useFormikContext();

        return (
            <>
                <TextInput
                    placeholder={placeholder}
                    // onChangeText={onChangeText}
                    // onBlur={onBlur}
                    // value={value}                   
                    onChangeText={handleChange(name)}
                    onBlur={handleBlur[name]}
                    value={String((values as any)[name])}
                    keyboardType={keyboardType}

                />
                <ErrorMessage error={errors[name]} visible={touched[name]} />
            </>
        )
    }

export default TFormField;    