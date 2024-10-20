import { Toaster } from "react-hot-toast";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return <>
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 2000,
        style: {
          background: "#1f1f1f",
          color: "#fff",
        },
        error: {
          duration: 3000,
          position: "top-center",
          style: {
            background: "#f56565",
            color: "#fff",
          },
        },
        success: {
          duration: 3000,
          position: "top-center",
          style: {
            background: "#48bb78",
            color: "#fff",
          },
        },
      }}
    />
    {children}</>;
};

export default Provider;