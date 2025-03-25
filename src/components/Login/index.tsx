"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  LoginContainer,
  LoginCardContainer,
  // WebsiteLogo,
  Label,
  Form,
  LoginButton,
  ShowPasswordLabel,
  LoginInput,
  ErrorMsg,
} from "./styledComponents";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [isError, setIsError] = useState(false);
  const [errorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const updateUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const updatePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordType(event.target.checked ? "text" : "password");
  };

  // const handleSubmit = async (event: FormEvent) => {
  //   event.preventDefault();
  //   setIsLoading(true);
  //   setIsError(false);

  //   try {
  //     const response = await fetch("https://apis.ccbp.in/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ username, password }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Login failed");
  //     }

  //     const data = await response.json();

  //     if (data.jwt_token) {
  //       Cookies.set("jwt_token", data.jwt_token, { expires: 30 });
  //       router.push("/");
  //     } else {
  //       throw new Error("No token received");
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     setIsError(true);
  //     setErrorMsg("Invalid username or password");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await fetch("/api/login", {
        method: "POST",

        body: JSON.stringify({ username, password }),
      });

      console.log(username, password);

      if (!response.ok) {
        new Error("Login failed");
      }

      const data = await response.json();
      console.log(data);
      if (data.token) {
        Cookies.set("token", data.token, { expires: 30 }); // Set to 30 days
        router.push("/"); // Updated route path
      } else {
        throw new Error("No token received");
      }
    } catch (error) {
      console.error("Login error:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCardContainer>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="username">USERNAME</Label>
          <LoginInput
            type="text"
            id="username"
            placeholder="Enter Username"
            onChange={updateUsername}
            value={username}
          />
          <Label htmlFor="password">PASSWORD</Label>
          <LoginInput
            id="password"
            placeholder="Enter Password"
            onChange={updatePassword}
            value={password}
            type={passwordType}
          />
          <input type="checkbox" id="showPassword" onChange={onCheckBox} />
          <ShowPasswordLabel htmlFor="showPassword">
            Show Password
          </ShowPasswordLabel>
          <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </LoginButton>
          {isError && <ErrorMsg>* {errorMsg}</ErrorMsg>}
        </Form>
      </LoginCardContainer>
    </LoginContainer>
  );
};

export default Login;
