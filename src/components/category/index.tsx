import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { CategoryDto } from './dto';
type Props = {
  categories: CategoryDto[];
};

export const Category: React.FC<Props> = ({ categories }) => {
  const orderByAsc = (data: CategoryDto[]) => {
    data = data.sort((a, b) => a.order - b.order);
    for (let i = 0; i < data.length; i++) {
      data[i].details = data[i].details.sort((a, b) => a.order - b.order);
    }
    return data;
  };
  categories = orderByAsc(categories);

  return (
    <>
      {categories?.map((category, key) => (
        <Fragment key={key}>
          <div className="col-12 col-sm-12 col-md-4 mt-2">
            <div className="card">
              <div className="card-header font-size-16">
                <b>{category.name}</b>
              </div>
              <div className="card-body">
                <ul className="list-style-type-none padding-inline-start-10">
                  {category.startIndex === 0 ? (
                    <Fragment>
                      {category.details.map((categoryDetail, keyDetail) => (
                        <Fragment key={keyDetail}>
                          <li>
                            <Link to={categoryDetail.sheetId}>{`${
                              keyDetail + 1
                            }. ${categoryDetail.name}`}</Link>
                          </li>
                        </Fragment>
                      ))}
                    </Fragment>
                  ) : (
                    <Fragment>
                      {category.details.map((categoryDetail, keyDetail) => (
                        <Fragment key={keyDetail}>
                          <li>
                            <Link to={categoryDetail.sheetId}>{`${
                              category.startIndex + keyDetail + 1
                            }. ${categoryDetail.name}`}</Link>
                          </li>
                        </Fragment>
                      ))}
                    </Fragment>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </Fragment>
      ))}
    </>
  );
};
