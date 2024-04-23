import { Typography, TypographyTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React from "react";

type TextProps = {
  children: React.ReactNode;
} & TypographyTypeMap

const Text = ({ children, ...props }: any) => {
  return <Typography  color='text.primary' {...props}>{children}</Typography>;
};

export default Text;
