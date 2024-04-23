import {
  Box,
  Button,
  InputBase,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import Text from "./Text";
import TextInput from "./TextInput";
import Image from "next/image";
import BirdImage from "../public/img/oversight-bird2.png";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {

  const { login } = useAuth()
  const loginForm = useForm({ defaultValues: { email: "", password: "" } });
  const { control, handleSubmit } = loginForm;

  const submitLogin = (data) => {
    login(data)
  };

  return (
    <>
      <LoginBoxWrapper>
        <Text variant="h6">Bem vindo(a)!</Text>
        <Text variant="body2">Insira seus dados para acessar o Oversight</Text>
        <form onSubmit={handleSubmit(submitLogin)}>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 12 }}
          >
            <TextInput name="email" label="Email" control={control} />
            <TextInput
              name="password"
              label="Senha"
              type="password"
              control={control}
            />
            <Button type="submit" variant="contained">
              Entrar
            </Button>
          </Box>
        </form>
      </LoginBoxWrapper>
      <Image
        alt="logo"
        src={BirdImage}
        width={400}
        height={400}
        style={{ position: "absolute", bottom: 45, right: 15 }}
      />
    </>
  );
};

export default LoginPage;

const LoginBoxWrapper = styled(Box)(({ theme }) => ({
  width: 400,
  backgroundColor: theme.palette.background.paper,
  padding: 30,
  height: "100%",
  borderRadius: 15,
}));
