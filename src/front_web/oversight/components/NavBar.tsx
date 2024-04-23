import {
  Box,
  BoxProps,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { styled } from "@mui/material/styles";
import HandymanIcon from "@mui/icons-material/Handyman";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/img/Logo.png";
import GooglePlayLogo from "../public/img/googlePlayLogo2.png";
import { useAuth } from "../hooks/useAuth";
import LogoutIcon from "@mui/icons-material/Logout";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from '@mui/icons-material/People';

const NavBar = () => {
  const { pathname } = useRouter();
  const { user, logout } = useAuth();

  const getIsCurrentRouteOpacity = (routeName: string) => {
    if (routeName === "/") {
      return { opacity: pathname === "/" ? "1" : "0.75" };
    }

    return { opacity: pathname.includes(routeName) ? "1" : "0.5" };
  };

  return (
    <Wrapper data-testid="navbar">
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          color: "white",
        }}
      >
        <Image
          alt="logo"
          src={Logo}
          width={160}
          height={100}
          style={{ alignSelf: "center", marginTop: 50, marginBottom: 10 }}
        />
        <Typography>
          Olá, <strong>{user.name}</strong>
          <IconButton data-testid="logout-button" onClick={logout}>
            <LogoutIcon htmlColor="white" />
          </IconButton>
        </Typography>
      </Box>

      <List sx={{ color: "white" }}>
        <Link href="/budgets">
          <ListItem disablePadding>
            <ListItemButton
              data-testid="budgets-link"
              sx={getIsCurrentRouteOpacity("budgets")}
            >
              <ListItemIcon>
                <LocalAtmIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="orçamentos" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/services">
          <ListItem disablePadding>
            <ListItemButton
              data-testid="services-link"
              sx={getIsCurrentRouteOpacity("services")}
            >
              <ListItemIcon>
                <HandymanIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="serviços" />
            </ListItemButton>
          </ListItem>
        </Link>
        {user.role == "master" ? (
          <Link href="/companies">
            <ListItem disablePadding>
              <ListItemButton
                data-testid="companies-link"
                sx={getIsCurrentRouteOpacity("companies")}
              >
                <ListItemIcon>
                  <BusinessIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="empresas" />
              </ListItemButton>
            </ListItem>
          </Link>
        ) : null}
        <Link href="/costumers">
          <ListItem disablePadding>
            <ListItemButton sx={getIsCurrentRouteOpacity("costumers")}>
              <ListItemIcon>
                <PeopleIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="clientes" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Box>
        <Divider />
        <Box
          sx={{
            color: "white",
            display: "flex",
            p: 5,
            alignItems: "center",
            gap: 2,
            maxHeight: 80,
          }}
        >
          <Image
            alt="logo"
            src={GooglePlayLogo}
            width={25}
            height={25}
            style={{ alignSelf: "center" }}
          />
          <Typography variant="body2">Disponível no Google Play</Typography>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default NavBar;

const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: "100%",
  width: 300,
  backgroundColor: theme.palette.primary.main,
  borderRadius: 15,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "space-between",
}));
