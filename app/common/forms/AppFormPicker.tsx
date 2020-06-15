import React from "react";
import { useFormikContext } from "formik";

import AppPicker from "../components/AppPicker";
import ErrorMessage from "./ErrorMessage";

//const AppFormPicker: React.FC<myProps> = ({ navigation }) => {
const AppFormPicker: React.FC<{
    items: any,
    name: string,
    numberOfColumns: number
    PickerItemComponent: any,
    placeholder: string,
    width: string,
}> = ({
    items, 
    name,
    numberOfColumns,
    PickerItemComponent,
    placeholder,
    width,
}) => {
        const { errors, setFieldValue, touched, values } = useFormikContext();

        return (
            <>
                <AppPicker
                    items={items}
                    numberOfColumns={numberOfColumns}
                    onSelectItem={(item) => setFieldValue(name, item)}
                    PickerItemComponent={PickerItemComponent}
                    placeholder={placeholder}
                    selectedItem={(values as any)[name]}
                    width={width}
                />
                <ErrorMessage error={errors[name]} visible={touched[name]} />
            </>
        );
    }

export default AppFormPicker;
