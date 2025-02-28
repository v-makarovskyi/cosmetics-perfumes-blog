import { FC } from "react";

type CommonBreadcrumbProps = {
  title: string;
  subtitle: string;
  bg_clr?: boolean;
  center: boolean;
};

export const CommonBreadcrumb: FC<CommonBreadcrumbProps> = ({
  title,
  subtitle,
  center = false,
  bg_clr = false,
}): JSX.Element => {
  return (
    <section
      className={`breadcrumb ${center ? "text-center" : ""} include-bg`}
      style={{ backgroundColor: bg_clr ? `#EFF1F5` : "" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="breascrumb__content">
              <h3 className="breadcrumb__title">{title}</h3>
              <ul className="breadcrumb__list">
                <li className="breadcrumb__item">
                  <span>
                    <a href="/">Домой</a>
                  </span>
                </li>
                <li className="breadcrumb__item">
                  <span>{subtitle}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
