import { FormItemWrapper, SelectWrapper } from "@/components/common/AntComp";
import { useGetgroups } from "@/hooks/APIs/useGetgroups";
import { useMemo, useState } from "react";
import { WrappLabelForm } from "./ProjectForm";
import { IChildren } from "@/utils/interfaces";
import { LabelForm } from "../styles/projects/collectionStyle";
import { turnSelectOption } from "@/utils/common";

const CategoriesBox = (props: { isAdmin?: boolean; list?: Array<any> }) => {
  const { isAdmin, list } = props;
  const { groups } = useGetgroups({});

  const options = useMemo(() => {
    const mappingData = groups || [];
    return turnSelectOption(mappingData);
  }, [groups]);

  const groupSelectedList = useMemo(() => {
    return turnSelectOption(list);
  }, [list]);
  const [value, setValue] = useState<Array<any>>(groupSelectedList);

  const TitleWrapper = (props: IChildren) =>
    isAdmin ? (
      <LabelForm>{props.children}</LabelForm>
    ) : (
      <WrappLabelForm>{props.children}</WrappLabelForm>
    );

  const selectProps: any = {
    mode: "multiple",
    style: { width: "100%" },
    value,
    options,
    onChange: (newValue: string[]) => {
      setValue(newValue);
    },
    placeholder: "Select Item...",
    maxTagCount: "responsive",
    showSearch: true,
  };

  return (
    <FormItemWrapper
      name="categories"
      rules={[
        {
          required: true,
          message: "Please input categories!",
        },
      ]}
      label={<TitleWrapper>Category</TitleWrapper>}
    >
      <SelectWrapper
        {...selectProps}
        filterOption={(input, option) =>
          (option?.label.toLowerCase() ?? "").includes(input?.toLowerCase())
        }
      />
    </FormItemWrapper>
  );
};

export default CategoriesBox;
