import { useState } from "react";

function useModal() {
  const [modal, setModal] = useState({
    isOpen: false,
    type: null,
    data: null,
  });


  const openModal = (type, data = null) => {
    setModal({
      isOpen: true,
      type,
      data,
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      type: null,
      data: null,
    });
  };

  return {
    modal,
    openModal,
    closeModal,
  };
}

export default useModal;