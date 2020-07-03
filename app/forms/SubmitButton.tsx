import React from "react";
import { useFormikContext } from "formik";

import Button from "../components/AppButton";


const SubmitButton: React.FC<{ title: string }> = ({ title }) => {

    const { handleSubmit, dirty } = useFormikContext();

    return <Button title={title} onPress={handleSubmit} disabled={!dirty} />;
}

export default SubmitButton;
