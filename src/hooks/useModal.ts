import { useState } from "react";

const useModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return { open, handleOpen };
};

export default useModal;
