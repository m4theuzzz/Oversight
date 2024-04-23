import React from "react";
import Text from "./Text";

type SubHeadingProps = {
  title: string;
};

const SubHeading = ({ title }: SubHeadingProps) => {
  return (
    <Text variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
      {title}
    </Text>
  );
};

export default SubHeading;
