import React, { memo } from "react";
import { TextField, TextFieldProps } from "@material-ui/core";
import { FastField } from "formik";

const FormikTextField= memo(({ name, ...props }) => {
  return (
    <FastField name={name}>
      {({ field, form, meta }) => {
        const errorText = meta.error && meta.touched ? meta.error : "";
        return (
          <TextField
            {...props}
            {...field}
            error={!!errorText}
            helperText={errorText}
          />
        );
      }}
    </FastField>
  );
});

export default FormikTextField;
