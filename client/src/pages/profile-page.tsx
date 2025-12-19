import {
  ChangeEvent,
  FC,
  ReactNode,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { Date } from "@svg/date";
import { User } from "@svg/user";
import { Facebook } from "@svg/facebook";
import { Twitter } from "@svg/twitter";
import { In } from "@svg/in";
import { Vimeo } from "@svg/vimeo";
import { useParams } from "react-router";
import { Link } from "react-router";
import { useGetUserProfileQuery } from "@src/redux/features/userApi";
import * as YUP from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMsg } from "@src/components/common/error-msg";
import {
  useUpdateUserProfileMutation,
  useDeleteBlogFromWishlistMutation,
} from "@src/redux/features/userApi";

import type { Blog } from "@client_types/clientTypes";
import { notifySuccess } from "@src/utils/toastConfig";

type Inputs = {
  name?: string;
  email?: string;
  user_image?: File;
};

const updatedProfileSchema = YUP.object().shape({
  name: YUP.string()
    .matches(/^([a-zA-Z'-]{0,50}|[а-яА-ЯёЁ'-]{0,21})$/, {
      excludeEmptyString: false,
      message: `Допустимы символы [a-z, A-z], [а-я, А-Я], [',-]. Не менее 3-х и не более 21 символов`,
    })
    .min(3, "поле NAME - не менее 3-х символов")
    .max(21, "поле NAME - не более 21 символов"),
  email: YUP.string().email("Вы должны предоставить действительный email"),
  user_image: YUP.mixed(),
});

export const ProfilePage: FC = (): JSX.Element => {
  const [isUpdateProfile, setIsUpdateProfile] = useState<boolean>(false);
  const params = useParams() as { id: string };
  const { data } = useGetUserProfileQuery(params.id);

  const [updateUserProfile, result] = useUpdateUserProfileMutation();
  const [
    deleteBlogFromWishlist,
    {
      isError: isErrorDeleteBlog,
      isSuccess: isSuccessDeleteBlog,
      status: statusDeleteBlog,
    },
  ] = useDeleteBlogFromWishlistMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: yupResolver(updatedProfileSchema),
  });

  //delete blog from wishlist
  const handleDeleteBlogFromWishlist = async (blogSlug: Blog["slug"]) => {
    try {
      const result = await deleteBlogFromWishlist(blogSlug);
      if(result.data) {
        notifySuccess(result.data.message)
      }
    } catch (error) {
      console.log("Error in profile-page", error);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = new FormData();
    formData.append("user_image", data.user_image?.[0] as File);
    formData.append("name", data.name as string);
    formData.append("email", data.email as string);
    try {
      await updateUserProfile({
        id: params.id,
        formData,
      });
      setIsUpdateProfile(false);
    } catch (error) {
      console.error(error);
    }
  };

  let updatedContent: ReactNode;

  if (!isUpdateProfile) {
    updatedContent = (
      <>
        <div className="profile__user-image-container">
          <a href="">
            <img src={data?.user_image as string} alt="" />
          </a>
        </div>
        <div className="profile__user-content">
          <div className="profile__user-name">
            Пользователь: <span>{data?.name}</span>
          </div>
          <div className="profile__user-email">
            Email: <span>{data?.email}</span>
          </div>
          <div className="profile__user-createdAt">
            Дата регистрации: <span>{data?.created_at}</span>
          </div>
          {!isUpdateProfile && (
            <button
              className="profile__user-update-btn button"
              onClick={() => setIsUpdateProfile(true)}
            >
              Обновить профиль
            </button>
          )}
        </div>
      </>
    );
  } else {
    updatedContent = (
      <>
        <div className="profile__user-image-container">
          <a href="">
            <img src={data?.user_image as string} alt="" />
          </a>
        </div>
        <div className="profile__user-content">
          <form
            /* encType="multipart/form-data" */
            id="updateUserProfileDataForm"
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: "contents" }}
          >
            <div className="profile__user-user-image">
              <label className="visually-hidden" htmlFor="user_image">
                Выбрать изображение
              </label>
              <input
                {...register(`user_image`)}
                type="file"
                id="user_image"
                //onChange={handleChangeUserImage}
              />
            </div>
            <div className="profile__user-name">
              <label htmlFor="name">Изменить имя пользователя:</label>
              <input
                {...register("name")}
                className="input"
                type="text"
                id="name"
                defaultValue={data?.name}
                name="name"
                placeholder="введите имя"
              />
              <ErrorMsg msg={errors.name?.message} />
            </div>
            <div className="profile__user-email">
              <label htmlFor="email">Изменить email</label>
              <input
                {...register("email")}
                className="input"
                id="email"
                type="email"
                defaultValue={data?.email}
                name="email"
                placeholder="Введите email"
              />
              <ErrorMsg msg={errors.email?.message} />
            </div>
            <div className="profile__user-createdAt">
              Дата регистрации: <span>{data?.created_at}</span>
            </div>
            <button
              form="updateUserProfileDataForm"
              className="profile__user-update-btn button"
              type="submit"
            >
              Сохранить
            </button>
          </form>
        </div>
      </>
    );
  }

  return (
    <section className="profile">
      <div className="container">
        <div className="row">
          <h3 className="profile__title">
            Привет{" "}
            <span>
              {data?.name}.{" "}
              <span> Комманда Ulta благодарит Вас за регистрации профиля.</span>
            </span>
          </h3>
          <div className="col-xl-5">
            <div className="profile__user">
              <div className="profile__user-wrapper">
                {/*  dynamic content start */}
                {updatedContent}
                {/*   dynamic content end */}
              </div>
            </div>
          </div>
          <div className="col-xl-7">
            <div className="profile__blogs">
              <h2 className="profile__blogs-title">Избранное</h2>
              <div className="profile__blogs-wrapper">
                <ul className="profile__blogs-list">
                  {data?.wishlist?.wishlist_blogs.map((el) => (
                    <WishlistItem
                      key={el.id}
                      blog={el}
                      onHandleDeleteBlogFromWishlist={
                        handleDeleteBlogFromWishlist
                      }
                    />
                  ))}
                </ul>
              </div>
            </div>
            <div className="profile__blogs-social">
              <ul>
                <li>
                  <a href="/">
                    <Facebook />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <Twitter />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <In />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <Vimeo />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

type WishlistItemProps = {
  blog: Partial<Blog>;
  onHandleDeleteBlogFromWishlist: (blogSlug: Blog["slug"]) => Promise<void>;
};

const WishlistItem: FC<WishlistItemProps> = ({
  blog,
  onHandleDeleteBlogFromWishlist,
}): JSX.Element => {
  return (
    <li className="profile__blogs-item">
      <div className="profile__blogs-item-content">
        <Link to={`/blogs/${blog.category?.slug}/blog-detail/${blog.slug}`}>
          <h4 className="profile__blogs-item-title">{blog.title}</h4>
        </Link>

        <div className="profile__blogs-item-meta">
          <div className="profile__blogs-item-date">
            <span>
              <Date /> {blog.created_at_for_client}
            </span>
          </div>
          <div className="profile__blogs-item-author">
            <span>
              <User />{" "}
              <span>
                {" "}
                {blog.author?.first_name} {blog.author?.last_name}{" "}
              </span>
            </span>
          </div>
          <div className="profile__blogs-item-write">
            <span>
              Время чтения: <span>{blog.read_time} min</span>
            </span>
          </div>
        </div>
      </div>
      <button
        className="profile__blogs-item-btn button"
        onClick={() => {
          onHandleDeleteBlogFromWishlist(blog.slug as string);
        }}
      >
        Удалить
      </button>
    </li>
  );
};
