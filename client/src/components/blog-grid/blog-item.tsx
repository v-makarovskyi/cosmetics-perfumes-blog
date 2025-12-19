import React, { FC, useState, Dispatch, SetStateAction } from "react";
import { Link } from "react-router";
import type { Blog } from "@client_types/clientTypes";
import { Tags } from "@svg/tags";
import { Date } from "@svg/date";
import { Delete } from "@src/svg/delete";
import { Comment } from "@svg/comment";
import { ArrowRightLong } from "@svg/arrow-right-long";
import { RootState, AppDispatch } from "@src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Wishlist } from "@src/svg/wishlist";
import { ChangeBlog } from "@src/svg/change";

type BlogItemProps = {
  blog: Blog;
  blogGridItem?: boolean;
  blogMenusItem?: boolean;
  blogListItem?: boolean;
  onHandleAddBlogToWishlist: (slug: Blog["slug"]) => Promise<void>;
  onHandleDeleteBlogFromWishlist: (slug: Blog["slug"]) => Promise<void>;
};

export const BlogItem: FC<BlogItemProps> = ({
  blog,
  blogMenusItem = false,
  blogGridItem = false,
  blogListItem = false,
  onHandleAddBlogToWishlist,
  onHandleDeleteBlogFromWishlist,
}): JSX.Element => {
  const user = useSelector((state: RootState) => state.auth.existUser);

  const {
    title,
    slug: blogSlug,
    main_image,
    created_at_for_client,
    description,
    category,
    /* comments, */
    tags,
  } = blog || {};

  const isBlogInWishlist = user?.wishlist?.wishlist_blogs.find(
    (blog) => blog.slug === blogSlug
  );

  return (
    <div
      className={`blog-item ${
        blogMenusItem
          ? "blog-item__menus"
          : blogGridItem
          ? "blog-item__grid"
          : blogListItem
          ? "blog-item__list"
          : ""
      }`}
    >
      <div className="blog-item__top">
        <button
          className="button blog-item__wishlist"
          onClick={
            isBlogInWishlist
              ? () => onHandleDeleteBlogFromWishlist(blogSlug)
              : () => onHandleAddBlogToWishlist(blogSlug)
          }
        >
          <Wishlist
            width="40"
            height="50"
            fill={!isBlogInWishlist ? "yellow" : "#16284a"}
          />
        </button>
          <button className="blog-item__delete">
            <Delete width="40" height="50" fill='red'/>
          </button>

        <Link
          className="blog-item__link"
          to={`/blogs/${
            category?.slug || blog.category_slug
          }/blog-detail/${blogSlug}`}
        >
          <img
            className="blog-item__image"
            src={main_image}
            alt=""
            width="700"
            height="390"
            loading="lazy"
          />
        </Link>

        {blogGridItem || blogMenusItem ? (
          <div className="blog-item__body">
            <div className="blog-item__date">
              <span>
                <Date />
              </span>
              {created_at_for_client}
            </div>

            {/*  {blogGridItem ? (
              <div className="blog-item__comments">
                <span>
                  <Comment />
                </span>
                Comments: {comments}
              </div>
            ) : null} */}

            <div className="blog-item__tags">
              <span>
                <Tags />
              </span>
              {tags?.map(({ id, name }, idx: number) => (
                <a key={id} href="/">
                  <span>{name}</span>
                  {/*   {idx < tags.length - 1 && ","} */}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      {blogMenusItem && (
        <Link
          to={`/blogs/${
            category?.slug || blog.category_slug
          }/blog-detail/${blogSlug}`}
        >
          <h2 className="blog-item__title">{title}</h2>
        </Link>
      )}

      {blogGridItem || blogListItem ? (
        <div className="blog-item__content">
          {blogListItem && (
            <div className="blog-item__body">
              <div className="blog-item__date">
                <span>
                  <Date />
                </span>
                {created_at_for_client}
              </div>

              {/*  {blogGridItem || blogListItem ? (
                <div className="blog-item__comments">
                  <span>
                    <Comment />
                  </span>
                  Comments: {comments}
                </div>
              ) : null} */}
            </div>
          )}
          <Link
            to={`/blogs/${
              category?.slug || blog.category_slug
            }/blog-detail/${blogSlug}`}
          >
            <h2 className="blog-item__title">
              {blogListItem ? title : title.slice(0, 41) + `...`}
            </h2>
          </Link>

          <p className="blog-item__description">
            {blogListItem
              ? description.slice(0, 121)
              : description.slice(0, 71) + `...`}
          </p>
          <button className="blog-item__btn button">
            <Link
              to={`/blogs/${
                category?.slug || blog.category_slug
              }/blog-detail/${blogSlug}`}
            >
              Read more
              <span>
                <ArrowRightLong />
              </span>
            </Link>
          </button>
        </div>
      ) : null}
    </div>
  );
};
