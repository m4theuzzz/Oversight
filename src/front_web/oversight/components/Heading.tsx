import { Box, Typography } from "@mui/material";
import React from "react";

type HeadingProps = {
  title: string;
  subtitle?: string;
};

const subtitleStyles = {
  fontWeight: 300,
  marginLeft: 1,
};

const Heading = ({ title, subtitle }: HeadingProps) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography variant="h5" color="text.primary" sx={{ fontWeight: 800 }}>
        {title}
      </Typography>
      {!!subtitle ? (
        <Typography variant="h6" color="text.primary" sx={subtitleStyles}>
          • {subtitle}
        </Typography>
      ) : null}
    </Box>
  );
};

export default Heading;
