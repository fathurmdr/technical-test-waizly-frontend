import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray dark:bg-boxdark">
      <h1 className="my-8 text-4xl font-bold text-primary">Waizly Test</h1>
      <div className="w-full items-center rounded-md bg-white p-8 shadow-md dark:bg-boxdark-2 sm:w-125">
        <Outlet />
      </div>
    </main>
  );
}

export default AuthLayout;
