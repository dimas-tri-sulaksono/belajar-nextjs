import Login from "@/components/organism/Login";
import AuthLayout from "@/components/templates/AuthLayout";
import React from "react";

const index = () => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <AuthLayout title={"Login"} desc={"Hi, please login to your account"}>
          <Login />
        </AuthLayout>
      </div>
    </>
  );
};

export default index;
