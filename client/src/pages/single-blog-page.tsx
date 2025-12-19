import { FC, Fragment, useState, ReactNode, useEffect } from "react";
import { useLocation } from "react-router";
import { useGetSingleBlogQuery } from "@src/redux/features/blog/blogApi";
import { useSelector } from "react-redux";
import type { RootState } from "@src/redux/store";
import { CustomAsyncSelect } from "@src/ui/async-select";
import { User } from "@svg/user";
import { Date } from "@svg/date";
import { Comment } from "@svg/comment";
import { Facebook } from "@svg/facebook";
import { Twitter } from "@svg/twitter";
import { Vimeo } from "@svg/vimeo";
import { In } from "@svg/in";
import { ArrowRightLong } from "@svg/arrow-right-long";
import { BlogSidebar } from "@src/components/blog-grid/blog-sidebar";
import { SinglePageDescription } from "@src/components/single-page/single-page-description";
import { useUpdateSingleBlogMutation } from "@src/redux/features/blog/blogApi";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as YUP from "yup";
import { ErrorMsg } from "@src/components/common/error-msg";
import type { Blog } from "@client_types/clientTypes";

type Inputs = {
  title?: string;
  slug?: string;
  category?: { label: string; value: string };
  author?: { label: string; value: string };
  read_time?: string;
  blog_image?: File | string;
  description?: string;
  tags?: { label: string; value: string }[];
};

export const SingleBlogPage: FC = (): JSX.Element => {
  /* const updateSingleBlogSchema = YUP.object({
    title: YUP.string()
      .matches(/^([а-яА-ЯёЁ-\s.,]{3,100})$/, {
        excludeEmptyString: false,
        message: `Допустимы символы [а-я], [А-Я], [', -, .]. Не менее 3-х и не более 100 символов`,
      })
      .min(3, "поле NAME - не менее 3-х символов")
      .max(100, "поле NAME - не более 100 символов"),
    slug: YUP.string()
      .matches(/^([a-zA-z-]{5,50})$/, {
        excludeEmptyString: false,
        message: `Допустимы символы [a-z, A-Z], [-]. Не менее 5-х и не более 50 символов`,
      })
      .min(5, "Не менее 5-ти символов")
      .max(50, "Не более 50-ти символов"),
    category: YUP.mixed(),
    author: YUP.mixed(),
    read_time: YUP.string(),
    blog_image: YUP.mixed(),
  }); */

  const isAdmin = useSelector(
    (state: RootState) => state.auth.existUser?.["is_admin"]
  );
  const [isUpdatedSingleBlog, setIsUpdatedSingleBlog] =
    useState<boolean>(false);
  const { pathname } = useLocation();
  const queryAttrs = pathname.split("/").filter(Boolean);
  const [categorySlug, blogSlug] = [queryAttrs[1], queryAttrs[3]];

  const {
    data: singleBlog,
    isLoading,
    isError,
    error,
  } = useGetSingleBlogQuery({
    categorySlug,
    blogSlug,
  });

  const [updateSingleBlog, {}] = useUpdateSingleBlogMutation();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      author: {
        label: `${singleBlog && singleBlog?.author?.first_name} ${
          singleBlog && singleBlog?.author?.last_name
        }`,
        value: `${singleBlog && singleBlog?.author?.id}`,
      },
      category: {
        label: `${singleBlog && singleBlog?.category?.name}`,
        value: `${singleBlog?.category?.slug}`,
      },
      tags: singleBlog?.tags?.map((t) => ({ label: t.name, value: t.id })),
    },
    /* resolver: yupResolver(updateSingleBlogSchema), */
  });

  useEffect(() => {
    reset({
      author: {
        label: `${singleBlog && singleBlog?.author?.first_name} ${
          singleBlog && singleBlog?.author?.last_name
        }`,
        value: `${singleBlog && singleBlog?.author?.id}`,
      },
      category: {
        label: `${singleBlog && singleBlog?.category?.name}`,
        value: `${singleBlog?.category?.slug}`,
      },
      tags: singleBlog?.tags?.map((t) => ({ label: t.name, value: t.id })),
    });
  }, [singleBlog?.author, singleBlog?.category, singleBlog?.tags]);

  let updatedContent: ReactNode;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("data", data);
    try {
      const formData = new FormData();
      formData.append("title", data.title as string);
      formData.append("category", data.category?.["value"] as string);
      formData.append("author", data.author?.["value"] as string);
      formData.append("read_time", data.read_time as string);
      formData.append("blog_image", data.blog_image?.[0] as File);
      formData.append("description", data.description as string);
      formData.append(
        "tags",
        new Blob([JSON.stringify(data.tags)], { type: "application/json" })
      );
      console.log('FFDDD', formData)
      await updateSingleBlog({ blogSlug: blogSlug, formData });

      setIsUpdatedSingleBlog(false);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isAdmin) {
    updatedContent = (
      <>
        <div className="row">
          <div className="col-xl-9">
            <div className="single-page__top">
              <div
                className={
                  /* `single-page__category single-page__category--admin-actions` */
                  "single-page__category"
                }
              >
                <span>{singleBlog?.category?.name}</span>

                {/*  <div className="single-page__admin-actions">
                  <button
                    className="button single-page__admin-action-change"
                    type="button"
                    onClick={() => setIsUpdatedSingleBlog(true)}
                  >
                    Редактировать
                  </button>

                  <button
                    className="button single-page__admin-action-delete"
                    type="button"
                  >
                    Удалить
                  </button>
                </div> */}
              </div>

              <h2 className="single-page__title">{singleBlog?.title}</h2>

              <div className="single-page__meta">
                <span className="single-page__user">
                  <User />
                  Автор:{" "}
                  <a href="#">
                    {singleBlog?.author?.first_name}{" "}
                    {singleBlog?.author?.last_name}
                  </a>
                </span>
                <span className="single-page__date">
                  <Date /> Date: {singleBlog?.created_at_for_client}
                </span>
                <span className="single-page__comments">
                  <Comment />
                  Comments: 2
                </span>
                <span className="single-page__read">
                  Время чтения: {singleBlog?.read_time} мин
                </span>
              </div>
            </div>
          </div>
          <div className="col-xl-12">
            <div className="single-page__img-container">
              <img src={singleBlog?.main_image} alt="single-page-img" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-xl-9">
            <div className="single-page__content">
              <div className="single-page__content-wrapper">
                <SinglePageDescription
                  author={singleBlog?.author}
                  textData={singleBlog?.description}
                />
                <div className="single-page__share-wrapper">
                  <div className="row">
                    <div className="col-lg-6 col-xl-8">
                      <div className="single-page__tags tagscloud">
                        <span>Tags:</span>
                        {singleBlog?.tags?.map((tag, idx) => (
                          <Fragment key={tag.id}>
                            <a href="/">{tag.name}</a>
                          </Fragment>
                        ))}
                      </div>
                    </div>
                    <div className="col-lg-6 col-xl-4">
                      <div className="single-page__share">
                        <span>Share:</span>
                        <a href="#">
                          <Facebook />
                        </a>
                        <a href="#">
                          <Twitter />
                        </a>
                        <a href="#">
                          <Vimeo />
                        </a>
                        <a href="#">
                          <In />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="single-page__navigation">
                  <div className="single-page__navigation-item">
                    <div className="single-page__navigation-icon">
                      <span>
                        <a href="/">
                          <ArrowRightLong />
                        </a>
                      </span>
                    </div>
                    <div className="single-page__navigation-content">
                      <span>Previous post</span>
                      <h5 className="single-page__navigation-title">
                        <a href="/">
                          Ретинол – уже не топ? Познайомтесь із антивіковими
                          трендами 2025 року
                        </a>
                      </h5>
                    </div>
                  </div>
                  <div className="single-page__navigation-item single-page__navigation-item--right">
                    <div className="single-page__navigation-content">
                      <span>Next post</span>
                      <h5 className="single-page__navigation-title">
                        <a href="/">
                          Тренди зачісок 2025: вигорілий блонд і чубчик-шторка
                        </a>
                      </h5>
                    </div>
                    <div className="single-page__navigation-icon">
                      <span>
                        <a href="/">
                          <ArrowRightLong />
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-xl-3">
            <BlogSidebar blogSinglePage author={singleBlog?.author} />
          </div>
        </div>
      </>
    );
  } else if (isAdmin) {
    updatedContent = (
      <>
        {isUpdatedSingleBlog && (
          <form
            id="updateBlogForm"
            className="visually-hidden"
            onSubmit={handleSubmit(onSubmit)}
          ></form>
        )}
        <div className="row">
          <div className="col-xl-9">
            <div className="single-page__top">
              <div
                className={`single-page__category single-page__category--admin-actions`}
              >
                {isUpdatedSingleBlog ? (
                  <CustomAsyncSelect
                    form="updateBlogForm"
                    control={control}
                    placeholder="Выбрать категорию..."
                    name="category"
                  />
                ) : (
                  <span>{singleBlog?.category?.name}</span>
                )}

                <div className="single-page__admin-actions">
                  {isUpdatedSingleBlog && (
                    <button
                      className="button single-page__admin-action-change"
                      type="submit"
                      form="updateBlogForm"
                    >
                      Сохранить
                    </button>
                  )}
                  {!isUpdatedSingleBlog && (
                    <button
                      className="button single-page__admin-action-change"
                      type="button"
                      onClick={() => setIsUpdatedSingleBlog(true)}
                    >
                      Редактировать
                    </button>
                  )}
                  <button
                    className="button single-page__admin-action-delete"
                    type="button"
                  >
                    Удалить
                  </button>
                </div>
              </div>
              {isUpdatedSingleBlog ? (
                <div className="single-page__form-group">
                  <label htmlFor="title">Обновить заголовок</label>
                  <input
                    {...register("title")}
                    id="title"
                    name="title"
                    type="text"
                    className="input"
                    defaultValue={singleBlog?.title}
                    form="updateBlogForm"
                  />

                  <ErrorMsg msg={errors.title?.message} />
                </div>
              ) : (
                <h2 className="single-page__title">{singleBlog?.title}</h2>
              )}

              {isUpdatedSingleBlog ? (
                <div className="single-page__form-group">
                  <div className="single-page__form-group-meta-wrapper">
                    <div className="single-page__form-group-meta-author">
                      <label htmlFor="author">Выберите автора блога:</label>
                      <CustomAsyncSelect
                        name="author"
                        placeholder="Выбрать автора..."
                        control={control}
                        form="updateBlogForm"
                      />
                    </div>
                    <div className="single-page__form-group-meta-read-time">
                      <label htmlFor="read_time">Укажите время чтения:</label>
                      <input
                        {...register("read_time")}
                        id="read_time"
                        name="read_time"
                        type="number"
                        className="input"
                        form="updateBlogForm"
                        defaultValue={singleBlog?.read_time}
                      />{" "}
                      min
                    </div>
                    <div className="single-page__form-group-meta-image">
                      <label htmlFor="blog_image">Выберите изображение:</label>
                      <input
                        {...register("blog_image")}
                        id="blog_image"
                        name="blog_image"
                        type="file"
                        form="updateBlogForm"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="single-page__meta">
                  <span className="single-page__user">
                    <User />
                    Автор:{" "}
                    <a href="#">
                      {singleBlog?.author?.first_name}{" "}
                      {singleBlog?.author?.last_name}
                    </a>
                  </span>
                  <span className="single-page__date">
                    <Date /> Date: {singleBlog?.created_at_for_client}
                  </span>
                  <span className="single-page__comments">
                    <Comment />
                    Comments: 2
                  </span>
                  <span className="single-page__read">
                    Время чтения: {singleBlog?.read_time} мин
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="col-xl-12">
            <div className="single-page__img-container">
              <img src={singleBlog?.main_image} alt="single-page-img" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-xl-9">
            <div className="single-page__content">
              <div className="single-page__content-wrapper">
                {isUpdatedSingleBlog ? (
                  <div className="single-page__form-group">
                    <label htmlFor="description">Обновить содержание:</label>
                    <textarea
                      {...register("description")}
                      className="single-page__description single-page__description-update"
                      name="description"
                      id="description"
                      defaultValue={singleBlog?.description}
                      form="updateBlogForm"
                    ></textarea>
                  </div>
                ) : (
                  <SinglePageDescription
                    author={singleBlog?.author}
                    textData={singleBlog?.description}
                  />
                )}

                <div className="single-page__share-wrapper">
                  <div className="row">
                    <div className="col-lg-6 col-xl-8">
                      <div className="single-page__tags tagscloud">
                        {isUpdatedSingleBlog ? (
                          <CustomAsyncSelect
                            name="tags"
                            form="updateBlogForm"
                            control={control}
                            placeholder="Выбрать теги..."
                          />
                        ) : (
                          <>
                            <span>Tags:</span>
                            {singleBlog?.tags?.map((tag, idx) => (
                              <Fragment key={tag.id}>
                                <a href="/">{tag.name}</a>
                              </Fragment>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 col-xl-4">
                      <div className="single-page__share">
                        <span>Share:</span>
                        <a href="#">
                          <Facebook />
                        </a>
                        <a href="#">
                          <Twitter />
                        </a>
                        <a href="#">
                          <Vimeo />
                        </a>
                        <a href="#">
                          <In />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="single-page__navigation">
                  <div className="single-page__navigation-item">
                    <div className="single-page__navigation-icon">
                      <span>
                        <a href="/">
                          <ArrowRightLong />
                        </a>
                      </span>
                    </div>
                    <div className="single-page__navigation-content">
                      <span>Previous post</span>
                      <h5 className="single-page__navigation-title">
                        <a href="/">
                          Ретинол – уже не топ? Познайомтесь із антивіковими
                          трендами 2025 року
                        </a>
                      </h5>
                    </div>
                  </div>
                  <div className="single-page__navigation-item single-page__navigation-item--right">
                    <div className="single-page__navigation-content">
                      <span>Next post</span>
                      <h5 className="single-page__navigation-title">
                        <a href="/">
                          Тренди зачісок 2025: вигорілий блонд і чубчик-шторка
                        </a>
                      </h5>
                    </div>
                    <div className="single-page__navigation-icon">
                      <span>
                        <a href="/">
                          <ArrowRightLong />
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-xl-3">
            <BlogSidebar blogSinglePage author={singleBlog?.author} />
          </div>
        </div>
      </>
    );
  }

  return (
    <section className="single-page">
      <div className="container">{updatedContent}</div>
    </section>
  );
};
