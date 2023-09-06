import toast from "react-hot-toast";

export const openToast = (message, icon) => {
  return toast(message, {
    icon,
    style: {
      borderRadius: "10px",
      background: "linear-gradient(to right, #282828, #323040)",
      color: "#fff",
      border: "1px solid #383838",
    },
  });
};
