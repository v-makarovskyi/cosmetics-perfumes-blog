import React, { FC, useState, useEffect } from "react";
import { useGetUserForStoreQuery } from "@src/redux/features/userApi";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@src/redux/store";

function useAuthUserChecked() {
  const [authChecked, setAuthChecked] = useState<true | null>(null);

  const at_cookie = document.cookie
    .split("; ")
    .filter((c) => c.startsWith("access"))
    .join("");

  useGetUserForStoreQuery(authChecked ?? skipToken);

  useEffect(() => {
    if (at_cookie) {
      setAuthChecked(true);
    } else {
      setAuthChecked(null);
    }
  }, [authChecked, at_cookie]);

  return authChecked;
}

export default useAuthUserChecked;
