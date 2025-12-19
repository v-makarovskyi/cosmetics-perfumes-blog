import { FC } from "react";
import { Link } from "react-router";

type CommonBreadcrumbProps = {
  title?: string;
  subtitle?: string;
  bg_clr?: boolean;
  center: boolean;
  img?: string;
  home?: boolean;
  searchResultsPage?: boolean
};

export const CommonBreadcrumb: FC<CommonBreadcrumbProps> = ({
  title,
  subtitle,
  center = false,
  bg_clr = false,
  home = false,
  searchResultsPage = false, 
  img = "",
}): JSX.Element => {
  return (
    <section
      className={`breadcrumb ${center ? "text-center" : ""} include-bg ${
        home ? "breadcrumb__parallex breadcrumb--home " : " "
      }`}
      style={
        home
          ? { backgroundImage: `url(${img})` }
          : { backgroundColor: bg_clr ? `#EFF1F5` : "" }
      }
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="breadcrumb__content">
              {home ? (
                <p className="breadcrumb__title breadcrumb__title--home">
                  {title}
                </p>
              ) : (
                <h3 className="breadcrumb__title">{title}</h3>
              )}

              {home ? (
                <span>{subtitle}</span>
              ) : (
                <ul className="breadcrumb__list">
                  <li className="breadcrumb__item">
                    <span>
                      <Link to="/">Домой</Link>
                    </span>
                  </li>
                  <li className="breadcrumb__item">
                    <span>{subtitle}</span>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
