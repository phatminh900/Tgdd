import React, { useCallback, useState } from "react";

const useModalHook = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onToggleModal = useCallback(() => setIsOpenModal((prev) => !prev), []);
  return { isOpenModal, onToggleModal, setIsOpenModal };
};

export default useModalHook;
