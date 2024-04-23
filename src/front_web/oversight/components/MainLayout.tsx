import { Box, BoxProps } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import NavBar from "./NavBar";

const MainLayout = ({
  children,
  hideNav,
}: {
  children: React.ReactNode;
  hideNav: boolean;
}) => {
  return (
    <Wrapper>
      <AppWrapper>
        {!hideNav ? <NavBar /> : null}
        <PageWrapper>{children}</PageWrapper>
      </AppWrapper>
    </Wrapper>
  );
};

export default MainLayout;

const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  p: 0,
  backgroundColor: theme.palette.secondary.main,
}));

const AppWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: "80%",
  width: "90%",
  borderRadius: 15,
  display: "flex",
  p: 0,
  backgroundColor: theme.palette.background.paper,
}));

const PageWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  padding: 40,
  width: "100%",
  borderRadius: 15,
  backgroundColor: theme.palette.background.default,
  overflow: "auto",
}));
