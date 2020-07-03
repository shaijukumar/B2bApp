import React from "react";
import { StyleSheet } from "react-native";

import AppText from "../components/AppText";
import { useFormikContext } from "formik";

const ErrorMessage: React.FC<{
    error: string
    visible: boolean
    numberOfLines?: number,
}>
    = ({
        error,
        visible,
        numberOfLines = 1,
    }) => {

        const { setFieldTouched, handleChange, errors, touched } = useFormikContext();
        if (!visible || !error) return null;

        return <AppText style={styles.error} numberOfLines={numberOfLines}>{error}</AppText>;
    }

const styles = StyleSheet.create({
    error: { color: "red" },
});

export default ErrorMessage;
