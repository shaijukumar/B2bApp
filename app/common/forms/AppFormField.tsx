import React from "react";
import { useFormikContext } from "formik";

import AppText from "../components/AppText"
import ErrorMessage from "./ErrorMessage";
import AppTextInput from "../components/AppTextInput";
  

const AppFormField: React.FC<{
  value?: any,
  name: string,
  width?: number, 
  autoCapitalize?: string,
  autoCorrect?: boolean, 
  icon?: string, 
  keyboardType?: string,
  placeholder?: string, 
  textContentType?: string,
  secureTextEntry?: boolean,
  maxLength?: number, 
  multiline?: boolean,
  numberOfLines?: number,

}> =
  ({
    value,
    name,
    width,
    autoCapitalize,
    autoCorrect = true,
    icon,
    keyboardType,
    placeholder,
    textContentType,
    secureTextEntry,
    maxLength,
    multiline,
    numberOfLines = 1 }) => {

    const { setFieldTouched, handleChange, errors, touched, values } = useFormikContext();

    // console.log("values")
    // console.log(values)
   
    return ( 
      <>
        <AppTextInput
          value={String((values as any)[name])} //{values}
          onBlur={() => setFieldTouched(name)}
          onChangeText={handleChange(name)}
          width={width}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          icon={icon}
          keyboardType={keyboardType}
          placeholder={placeholder}
          textContentType={textContentType}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
        <ErrorMessage error={errors[name]} visible={touched[name]} />
      </>
    );
  }

export default AppFormField;
