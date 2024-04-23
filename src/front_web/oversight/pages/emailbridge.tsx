import { Alert, Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

// mail?message-token=$messageToken&approved=true

const EmailBridge = () => {
  const { query } = useRouter();
  const { approved } = query;
  const messageToken = query["message-token"] as string;
  const host = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000";

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {

    if (!messageToken) return

    const emailRequest = async () => {
      try {
        const res = await fetch(host + "/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "message-token": messageToken,
          },
          body: JSON.stringify({
            approved: approved == 'true' ? true : false,
            description: "",
          }),
        });

        if (!res.ok) {

          throw new Error();
        }

        setIsLoading(false);
      } catch {
        setError(true);
        setIsLoading(false);
      }


    };

    emailRequest();
  }, [messageToken]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">
          Erro ao {approved ? "aprovar" : "reprovar" + ' orçamento'}
        </Alert>
      ) : (
        <Alert>
          Orçamento {approved ? "aprovado" : "reprovado"} com sucesso!
        </Alert>
      )}
    </Box>
  );
};

EmailBridge.guard = false;

export default EmailBridge;
