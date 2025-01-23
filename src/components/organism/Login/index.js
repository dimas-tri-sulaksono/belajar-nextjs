import Button from "@/components/atoms/Button";
import InputForm from "@/components/molecules/InputForm";
import Link from "next/link";
import React from "react";

const Login = () => {
  //event handler untuk simulasi login
  function handleLogin(event) {
    // event.preventDefault mencegah halaman refresh
    event.preventDefault();

    // menyimpan data dari input ke dalam local storage
    localStorage.setItem("username", event.target.username.value);
    localStorage.setItem("password", event.target.password.value);

    // redirect ke halaman product setelah login
    window.location.href = "/products";

    // untuk cek manual di konsol apakah ada datanya
    // console.log("klik login button");
    // console.log(event.target.username.value);
    // console.log(event.target.password.value);
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
        // onClick={handleLogin}
        type="submit"
        buttonClassName="w-full mt-4 bg-gradient-aigen hover:bg-gradient-aigen-hover text-white"
      >
        Login
      </Button>

      {/* onSubmit : event handler yang menangani aksi form ketika di-submit (button type = submit) */}
      {/* onClick : event handler untuk menangani aksi ketika button diklik */}

      {/* kalau pakai <a href></a> ada loadingnya */}
      {/* gunakan <Link></Link sebagai penganti a href tanpa loading page  */}
    </form>
  );
};

export default Login;
