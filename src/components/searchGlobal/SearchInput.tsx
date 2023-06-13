import { useDebounce } from "@/hooks/useDebounce";
import React, { useCallback, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import styled from "styled-components";
import { FormItemWrapper, FormWrapper, InputWrapper } from "../common/AntComp";

export const SearchInput = ({
  _onSearch,
  form,
  style,
  _onReset,
}: {
  _onSearch: Function;
  _onReset?: () => void;
  form: any;
  style?: React.CSSProperties;
}): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    // Replace this with your search logic
    if (debouncedSearchTerm || debouncedSearchTerm === undefined) {
      _onSearch(debouncedSearchTerm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value || undefined);
    },
    []
  );

  return (
    <SearchGlobalWrapper className="relative lg:w-64 rounded-lg">
      <FormWrapper form={form}>
        <FormItemWrapper
          name="search"
          style={{ marginBottom: 0, border: "none" }}
        >
          <InputWrapper
            type="text"
            value={searchTerm}
            onBlur={_onReset}
            onChange={handleChange}
            placeholder="Search Projects or Tokens"
            className="bg-transparent h-full w-full py-2 text-white placeholder:text-gray-200"
            prefix={<BiSearch />}
            allowClear
            style={{ ...style }}
          />
        </FormItemWrapper>
      </FormWrapper>
      {/* <span
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          margin: "auto 0",
          transform: "translate(50%, 10px)",
        }}
      >
        <AiOutlineSearch style={{ fontWeight: 800, fontSize: 20 }} />
      </span> */}
    </SearchGlobalWrapper>
  );
};

const SearchGlobalWrapper = styled.div`
  input {
    background-color: transparent;
  }
`;
