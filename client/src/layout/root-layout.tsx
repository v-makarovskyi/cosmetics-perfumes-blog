import React, { Dispatch, SetStateAction, FC, useState } from "react";
import { Outlet, useOutletContext } from "react-router";
import { Wrapper } from "@src/layout/wrapper";
import { Header } from "@src/layout/header/header";
import { Footer } from "@src/layout/footer/footer";
import {
  isFetchBaseQueryError,
  isErrorWithCustomDataServer,
} from "@src/helpers/rtk-helpers";
import {
  useAddBlogToWishlistMutation,
  useDeleteBlogFromWishlistMutation,
} from "@src/redux/features/userApi";

import { notifySuccess, notifyError } from "@src/utils/toastConfig";
import { AuthErrorClient } from "@src/errors";
import type { Blog } from "@client_types/clientTypes";

type blogsDataPositionType = {
  startPosition: number;
  stopPosition: number;
};

type OutletContextType = {
  setBlogsDataPosition: (arg0: blogsDataPositionType) => void;
  blogsDataPosition: blogsDataPositionType;
  handleAddBlogToWishlist: (slug: Blog["slug"]) => Promise<void>;
  handleDeleteBlogFromWishlist: (slug: Blog["slug"]) => Promise<void>;
};

const RootLayout: FC = (): JSX.Element => {
  const [blogsDataPosition, setBlogsDataPosition] =
    useState<blogsDataPositionType>({
      startPosition: 0,
      stopPosition: 4,
    });

  //handlers for added and deleted blogs to Wishlist of user
  const [addBlogToWishlist, {}] = useAddBlogToWishlistMutation();
  const [deleteBlogFromWishlist, {}] = useDeleteBlogFromWishlistMutation();

  const handleAddBlogToWishlist: OutletContextType["handleAddBlogToWishlist"] =
    async (slug) => {
      try {
        const result = await addBlogToWishlist(slug);
        if (result.data) {
          notifySuccess(result.data.message);
        } else {
          if (result.error) {
            if (isErrorWithCustomDataServer(result.error)) {
              notifyError(result.error.data.errorMessage);
              throw new AuthErrorClient(
                result.error.data.statusCode,
                result.error.data.errorMessage
              );
            } else if (isFetchBaseQueryError(result.error)) {
              throw new Error(result.error.name);
            } else {
              throw new Error(
                "Какая-то ошибка при попытке добавит блог в WishList"
              );
            }
          }
        }
      } catch (err) {
        console.log("Общая ошибка при попытке добавить блог в WishList: ", err);
      }
    };

  const handleDeleteBlogFromWishlist: OutletContextType["handleDeleteBlogFromWishlist"] =
    async (slug) => {
      try {
        const result = await deleteBlogFromWishlist(slug);
        if (result.data) {
          notifySuccess(result.data.message);
        } else {
          if (result.error) {
            if (isErrorWithCustomDataServer(result.error)) {
              notifyError(result.error.data.errorMessage);
              throw new AuthErrorClient(
                result.error.data.statusCode,
                result.error.data.errorMessage
              );
            } else if (isFetchBaseQueryError(result.error)) {
              throw new Error(result.error.name);
            } else {
              throw new Error(
                "Какая-то ошибка при попытке удалить блог из WishList"
              );
            }
          }
        }
      } catch (error) {
        console.log(
          "Общая ошибка при попытке удалить блог из WishList: ",
          error
        );
      }
    };

  return (
    <Wrapper>
      <Header
        onHandleAddBlogToWishlist={handleAddBlogToWishlist}
        onHandleDeleteBlogFromWishlist={handleDeleteBlogFromWishlist}
      />
      <Outlet
        context={
          {
            blogsDataPosition,
            setBlogsDataPosition,
            handleAddBlogToWishlist,
            handleDeleteBlogFromWishlist,
          } satisfies OutletContextType
        }
      />
      <Footer />
    </Wrapper>
  );
};

function useOutletContextData() {
  return useOutletContext<OutletContextType>();
}

export { RootLayout, useOutletContextData };
