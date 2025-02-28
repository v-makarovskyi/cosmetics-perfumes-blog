import React, { FC } from "react";

type ErrorMsgProps = {
  msg?: string;
};

export const ErrorMsg: FC<ErrorMsgProps> = ({ msg }): JSX.Element => {
  return <div style={{ color: "red", fontSize:12, marginTop:5 }}>{msg}</div>;
};
