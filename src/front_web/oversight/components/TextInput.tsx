import {
  InputBase,
  InputLabel,
  InputBaseProps,
  styled,
  Box,
  FormHelperText,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

type TextInputProps = { label: string } & InputBaseProps;

const TextInput = ({ label, name, control, ...props }: TextInputProps) => {
  const Base = styled(InputBase)(({ theme }) => ({
    label: {
      fontSize: 15,
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
      border: "1px solid",
      borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
      fontSize: 13,

      padding: "10px 12px",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        borderColor: theme.palette.primary.main,
      },
    },
  }));

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState: {},
      }) => (
        <Box>
          <InputLabel shrink sx={{ fontSize: 16 }}>
            {label}
          </InputLabel>
          <Base
            fullWidth
            value={value}
            onChange={onChange}
            error={!!error?.message}
            {...props}
          />
          <FormHelperText>{error?.message}</FormHelperText>
        </Box>
      )}
    />
  );
};

export default TextInput;
