import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AccordionDto } from './dto';

type Props = {
  accordions: AccordionDto[];
};

export const Accordion: React.FC<Props> = ({ accordions }) => {
  const [data, setData] = useState<AccordionDto[]>([]);

  useEffect(() => {
    setData(accordions);
  }, [accordions]);

  const changeCollapse = (id: number) => {
    const temp = [...accordions];
    temp?.forEach((item) => {
      if (item.id !== id) {
        // item.collapse = false;
      } else {
        item.collapse = !item.collapse;
      }
    });
    setData(temp);
  };

  return (
    <>
      <div className={'row mt-2'}>
        <div className="col-12 col-sm-12 col-md-12">
          <div className="d-flex flex-row-reverse"></div>

          <div className="accordion mt-2" id="accordionExample">
            {data?.map((accordion, key) => (
              <div className="card" key={key}>
                <div className="card-header" id={key.toString()}>
                  <div className="d-flex justify-content-between">
                    <p
                      className="mb-0"
                      onClick={() => changeCollapse(accordion.id)}
                    >
                      <input
                        className="btn btn-link btn-link-custom font-size-14"
                        type="button"
                        value={accordion.display.toString() || ''}
                      />
                    </p>
                  </div>
                </div>

                <div
                  id="collapseOne"
                  className={accordion.collapse ? 'collapse show' : 'collapse'}
                >
                  <div className="card-body">
                    <ul className="list-style-type-none">
                      {accordion.details?.map((detail, keyDetail) => (
                        <Fragment key={keyDetail}>
                          <li>
                            <Link to={detail.sheetId}>
                              {`${accordion.startIndex + keyDetail + 1}. ${
                                detail.name
                              }`}
                            </Link>
                          </li>
                        </Fragment>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
