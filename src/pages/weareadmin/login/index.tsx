import {
  ButtonWrapper,
  FormItemWrapper,
  FormWrapper,
  InputWrapper,
} from "@/components/common/AntComp";
import { H1 } from "@/components/common/SemanticTag";
import { useFetchAPI } from "@/hooks/useFetchApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { API_METHOD, pathAPI } from "@/utils";
import { Checkbox, Form } from "antd";
import { useState } from "react";

export interface IAdminLogin {
  _onSuccess: Function;
}
const AdminLogin = (props: IAdminLogin) => {
  const { _onSuccess } = props;
  const [form] = Form.useForm();
  const [_, setStore] = useLocalStorage("initData", "");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMess, setErrorMess] = useState<Array<any>>();

  const { fetchApi } = useFetchAPI();

  const onFinish = async (values: any) => {
    setIsLoading(true);
    const { data, status } = await fetchApi({
      endpoint: pathAPI.LOGIN,
      sendData: {
        ...values,
      },
      method: API_METHOD.POST,
    });
    if (status) {
      setErrorMess([]);
      setStore(data?.access_token);
      setTimeout(() => {
        _onSuccess(true);
        setIsLoading(false);
      }, 3000);
    } else {
      setErrorMess(data?.message ?? ["Login error, try again later!"]);
      setIsLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ maxWidth: 556, margin: "0 auto", width: "100%" }}>
      <div
        style={{
          textAlign: "center",
          padding: "24px 0 48px 0",
        }}
      >
        <H1>Admin Login</H1>
      </div>
      <FormWrapper
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <FormItemWrapper
          label="Username"
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <InputWrapper />
        </FormItemWrapper>

        <FormItemWrapper
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <InputWrapper.Password />
        </FormItemWrapper>
        {!!errorMess && (
          <FormItemWrapper
            style={{ color: "red" }}
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
              {errorMess.map((text: string, idx: number) => {
                return <span key={idx}>{text}</span>;
              })}
            </div>
          </FormItemWrapper>
        )}
        <FormItemWrapper
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </FormItemWrapper>

        <FormItemWrapper wrapperCol={{ offset: 8, span: 16 }}>
          <ButtonWrapper
            variant="secondary"
            htmlType="submit"
            loading={isLoading}
          >
            Signin
          </ButtonWrapper>
        </FormItemWrapper>
      </FormWrapper>
    </div>
  );
};
export default AdminLogin;
