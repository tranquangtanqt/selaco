import React, { Fragment } from 'react';
import Code from '../code';
import IContent from 'utils/interface';

type Props = {
  content: IContent[];
};

export const PageContent: React.FC<Props> = ({ content }) => {
  return (
    <>
      {content && (
        <div className="row mt-2">
          {content.map((dataVal, dataKey) => (
            <div className="col-12 col-sm-12 col-md-12" key={dataKey}>
              <h5>
                {dataVal.no ? (
                  <b>
                    {dataKey + 1}. {dataVal.title}
                  </b>
                ) : (
                  <b>{dataVal.title}</b>
                )}
              </h5>
              {dataVal.contents.map((content, contentKey) => (
                <Fragment key={contentKey}>
                  <div className="tab-1">
                    {content.div && (
                      <div
                        dangerouslySetInnerHTML={{ __html: content.div }}
                      ></div>
                    )}
                    {content.p && (
                      <p dangerouslySetInnerHTML={{ __html: content.p }}></p>
                    )}
                    {content.code && (
                      <Code
                        code={content.code.src}
                        language={content.code.language}
                      />
                    )}
                    {content.image && (
                      <div className="clearfix">
                        <input
                          type="image"
                          src={content.image.src}
                          className={
                            'img-thumbnail mb-full-width ' +
                            (content.image.align === 'left'
                              ? 'rounded float-start'
                              : content.image.align === 'center'
                              ? 'rounded mx-auto d-block'
                              : content.image.align === 'right'
                              ? 'rounded float-end'
                              : '')
                          }
                          width={content.image.width ? content.image.width : ''}
                          alt=""
                        />
                      </div>
                    )}
                  </div>
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
