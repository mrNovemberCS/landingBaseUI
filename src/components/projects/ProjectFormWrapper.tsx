import { API_METHOD, BASE_URL_API, pathAPI } from "@/utils";
import ProjectForm from "./ProjectForm";
import { Form } from "antd";

import type { UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { useCallback, useEffect, useState } from "react";
import { turnSubmitData } from "./SubmitFunction";
import { useFetchAPI } from "@/hooks/useFetchApi";
import { useAppContext } from "@/contexts";

const ProjectFormWrapper = (props: { updateInfos?: any; onCb: () => void }) => {
  const { updateInfos, onCb } = props;
  const [form] = Form.useForm();
  const { fetchApi } = useFetchAPI();
  const { onNotification, setModalObject } = useAppContext();

  const [fileList, setFileList] = useState<UploadFile[]>([]) as any;
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const onSubmitForm = useCallback(
    async (values: any) => {
      try {
        setLoadingSubmit(true);
        const dataSubmit = turnSubmitData(values);
        const { status } = await fetchApi({
          method: updateInfos ? API_METHOD.PATCH : API_METHOD.POST,
          endpoint: updateInfos
            ? `${pathAPI.PROJECTS}/${updateInfos?.id}`
            : pathAPI.PROJECTS,
          sendData: dataSubmit,
        });
        if (status) {
          onCb();
          form.resetFields();
          setFileList([]);
          onNotification({
            des: "Successfully!",
          });
          setModalObject({
            state: false,
            modalContent: null,
          });
        }
        setLoadingSubmit(false);
        // } else {
        //   form.setFields([
        //     {
        //       name: "file",
        //       errors: ["Please insert logo"],
        //     },
        //   ]);
        // }
      } catch (error) {
        console.log({ error });
        setLoadingSubmit(false);
      }
    },
    [fetchApi, form, onCb, onNotification, setModalObject, updateInfos]
  );

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onResetContent = useCallback(() => {
    form.resetFields();
    setFileList([]);
  }, [form]);

  const onSubmitFail = useCallback((failedValues: any) => {
    console.log({ failedValues });
  }, []);

  useEffect(() => {
    if (updateInfos) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: `${BASE_URL_API}${updateInfos?.logo}`,
        },
      ]);
    }
  }, [updateInfos]);

  return (
    <div>
      <ProjectForm
        fromAdmin={true}
        onSubmitFail={onSubmitFail}
        form={form}
        onSubmitForm={onSubmitForm}
        handleChange={handleChange}
        fileList={fileList}
        onResetContent={onResetContent}
        loadingSubmit={loadingSubmit}
        initValue={updateInfos}
        isUpdate={updateInfos ? false : true}
      />
    </div>
  );
};

export default ProjectFormWrapper;
