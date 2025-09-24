import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, OutlinedInput, Typography, Button, Alert } from "@mui/material";

import { postRegister } from "../libs/fetcher";

import { useApp } from "../ThemedApp";

export default function Register() {
  const navigate = useNavigate();

  const { setToast } = useApp();

  const [hasErrors, setHasErrors] = useState(false);
  const nameRef = useRef();
  const usernameRef = useRef();
  const bioRef = useRef();
  const passwordRef = useRef();

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h3" sx={{ mb: 3 }}>
        Register
      </Typography>
      
      {hasErrors && <Alert severty="warning">{hasErrors}</Alert>}

      <form
        onSubmit={(e) => {
          e.preventDefault();

          const name = nameRef.current.value;
          const username = usernameRef.current.value;
          const bio = bioRef.current.value;
          const password = passwordRef.current.value;

          if (!name || !username || !password) {
            return setHasErrors("name, username and password required!");
          }

          (async () => {
            const result = await postRegister({
              name,
              username,
              bio,
              password,
            });

            if (result) {
              setToast("Register success");
              navigate("/login");
            } else {
              setHasErrors("Something went wrong");
            }
          })();
        }}
      >
        <OutlinedInput
          fullWidth
          placeholder="Full Name"
          inputRef={nameRef}
          sx={{ mb: 2 }}
        />
        <OutlinedInput
          fullWidth
          placeholder="Username"
          inputRef={usernameRef}
          sx={{ mb: 2 }}
        />
        <OutlinedInput
          fullWidth
          placeholder="Password"
          type="password"
          inputRef={passwordRef}
          sx={{ mb: 2 }}
        />
        <OutlinedInput
          fullWidth
          placeholder="Bio"
          inputRef={bioRef}
          sx={{ mb: 2 }}
        />
        <Button fullWidth type="submit" variant="contained">
          Register
        </Button>
      </form>
    </Box>
  );
}
