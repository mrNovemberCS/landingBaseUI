import { ModalWrapper } from "@/components/common/AntComp";
import { IChildren } from "@/utils/interfaces";
import { notification } from "antd";
import React, { createContext, useCallback, useContext, useState } from "react";
type NotificationType = "success" | "info" | "warning" | "error";
interface IAppcontext {
  userData: any;
  isLoading: boolean;
  onLoading: (item?: any) => void;
  modalObject: any;
  onNotification: (item?: any) => void;
  setModalObject: (item?: any) => void;
  handleCancelModal: () => void;
}

export interface INotify {
  key?: NotificationType;
  mess?: string;
  des?: string;
}

export const AppContext = createContext({});

const AppContextProvider = (props: IChildren) => {
  const [api, contextHolder]: any = notification.useNotification();

  const [modalObject, setModalObject] = useState({
    state: false,
    title: null,
    modalContent: null,
    modalClass: "mutual-class",
    isCenter: true,
    modalStyle: { maxWidth: 520, width: "100%" },
    width: "100%",
  });

  const onNotification = useCallback(
    ({ key = "success", des, mess = "Base Universe Notice" }: INotify) => {
      api[key]({
        message: mess,
        description: des,
      });
    },
    [api]
  );

  const handleCancelModal = () => {
    setModalObject((modal) => ({ ...modal, state: false, modalContent: null }));
  };

  return (
    <AppContext.Provider
      value={{
        modalObject,
        setModalObject,
        onNotification,
        handleCancelModal,
      }}
    >
      {contextHolder}
      {props.children}
      <ModalWrapper
        destroyOnClose
        maskClosable={false}
        style={{
          ...modalObject.modalStyle,
        }}
        footer={false}
        onCancel={handleCancelModal}
        title={modalObject.title}
        width={modalObject.width}
        open={modalObject?.state}
        centered={modalObject.isCenter}
        className={modalObject.modalClass}
        getContainer={false}
      >
        {modalObject.modalContent}
      </ModalWrapper>
    </AppContext.Provider>
  );
};

export default AppContextProvider;

export const useAppContext = () => useContext(AppContext) as IAppcontext;
