import Button from "@/components/atoms/Button";
import InputForm from "@/components/molecules/InputForm";
import { login } from "@/services/auth";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Login = () => {
  const [errorLogin, setErrorLogin] = useState("");
  const router = useRouter();

  //event handler untuk simulasi login
  async function handleLogin(event) {
    // event.preventDefault mencegah halaman refresh
    event.preventDefault();

    const payload = {
      username: event.target.username.value, // johnd
      password: event.target.password.value, // m38rmF$
    };

    try {
      const res = await login(payload);
      console.log(res);

      if (res.status) {
        localStorage.setItem("token", res.token);
        router.push("/products");
        // window.location.href = "/products";
      } else {
        console.log("login error : ", res.error.response.data);
        setErrorLogin(res.error.response.data);
      }
    } catch (error) {
      console.log("login failed : ", error);
      setErrorLogin(error.response.data);
    }
  }

  return (
    <form className="" onSubmit={handleLogin}>
      <InputForm
        label="username"
        name="username"
        type="text"
        placeholder="Masukkan username"
      />
      <InputForm
        label="password"
        name="password"
        type="password"
        placeholder="Masukkan pasword"
      />

      <Button
        type="submit"
        buttonClassName="w-full mt-4 bg-gradient-aigen hover:bg-gradient-aigen-hover text-white"
      >
        Login
      </Button>

      {errorLogin && (
        <p className="mt-4 text-center text-sm text-red-500">{errorLogin}</p>
      )}
    </form>
  );
};

export default Login;
