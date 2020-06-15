import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { View, Input } from 'react-native'
//import { FormFieldProps, Form, Label } from 'semantic-ui-react'

// interface IProps
//     extends FieldRenderProps<string, HTMLElement>,
//     FormFieldProps { }

const TextInput: React.FC<{
    input: any,
    width: any,
    type: any,
    placeholder: any,
    meta: any
}> = ({
    input,
    width,
    type,
    placeholder,
    meta: { touched, error }
}) => {
        return (
            <View>
                {/* <TextInput                                      
                    onChangeText={onChangeText}
                    autoCapitalize={autoCapitalize}
                    autoCorrect={autoCorrect}
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                    textContentType={textContentType}
                    secureTextEntry={secureTextEntry}
                    maxLength={maxLength}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    value={value}
                // onChangeText={text => setTextVal(text)}
                /> */}
            </View>


        )
    }

export default TextInput
