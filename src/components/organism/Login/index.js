import Button from "@/components/atoms/Button";
import InputForm from "@/components/molecules/InputForm";
import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <form className="">
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

      <Button buttonClassName="w-full mt-4 bg-gradient-aigen hover:bg-gradient-aigen-hover text-white">
        Login
      </Button>

      {/* kalau pakai <a href></a> ada loadingnya */}
      {/* gunakan <Link></Link sebagai penganti a href tanpa loading page  */}
    </form>
  );
};

export default Login;
