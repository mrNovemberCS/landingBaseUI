import React, { ReactElement } from "react";

export interface IChildren {
  children:
    | string
    | JSX.Element
    | JSX.Element[]
    | ReactElement
    | React.ReactNode;
}

export interface ITitle {
  title?: string;
  isSort?: boolean;
}
