import React, { FC } from "react";
import { ArrowRightLong } from "@svg/arrow-right-long";

export const Pagination: FC = (): JSX.Element => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="pagination">
          <div className="pagination__wrapper">
            <ul className="pagination__list">
              <li className="pagination__item pagination__item--active">
                <span>1</span>
              </li>
              <li className="pagination__item">
                <span>2</span>
              </li>
              <li className="pagination__item">
                <span>
                    <ArrowRightLong />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
