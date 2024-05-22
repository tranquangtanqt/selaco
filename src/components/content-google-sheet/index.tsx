import { useEffect, useState } from 'react';
import { PageTitle } from 'components/modules/page-title';
import useGoogleSheets from 'use-google-sheets';
import { useParams } from 'react-router-dom';
import { IContent } from './dto/content.dto';
import { TAG_NAME } from 'utils/constants';
import parse from 'html-react-parser';
import Code from 'components/modules/code';

export const ContentGoogleSheet = () => {
  const param = useParams();
  const REACT_APP_GOOGLE_API_KEY = 'AIzaSyDzMVLOCEoQjQes2bF0H9pc9HbzlKzOldQ';
  const REACT_APP_GOOGLE_SHEETS_ID = param.sheetId || '';

  const [pageTitle, setPageTitle] = useState('');
  const [contents, setContents] = useState<IContent[]>([]);

  const { data, loading, error } = useGoogleSheets({
    apiKey: REACT_APP_GOOGLE_API_KEY,
    sheetId: REACT_APP_GOOGLE_SHEETS_ID,
  });
  if (loading) {
    console.log('loading....');
  }
  if (error) {
    console.log(error);
  }

  useEffect(() => {
    if (data && data[0]) {
      const sheetData = data[0].data;

      const contentData: IContent[] = [];

      for (let i = 0; i < sheetData.length; i++) {
        const element = sheetData[i] as IContent;
        if (element.tag_name === TAG_NAME.TITLE) {
          setPageTitle(element.content);
          continue;
        }

        contentData.push(element);
      }
      setContents(contentData);
    }
  }, [data, param]);

  return (
    <>
      <PageTitle title={pageTitle}></PageTitle>
      <div className="row mt-2">
        {contents &&
          contents.map((d, key) => (
            <div className="col-12 col-sm-12 col-md-12" key={key}>
              <div className={d.tab_number ? 'tab-' + d.tab_number : ''}>
                {d.tag_name === TAG_NAME.CODE ? (
                  <Code code={d.content} language={d.language} />
                ) : d.tag_name === TAG_NAME.PARAGRAPH ? (
                  <p>{d.content}</p>
                ) : d.tag_name === TAG_NAME.BOLD ? (
                  <b>{d.content}</b>
                ) : d.tag_name === TAG_NAME.ITALIC ? (
                  <p>
                    <i>{d.content}</i>
                  </p>
                ) : d.tag_name === TAG_NAME.HEADING_1 ? (
                  <h1>{d.content}</h1>
                ) : d.tag_name === TAG_NAME.HEADING_2 ? (
                  <h2>{d.content}</h2>
                ) : d.tag_name === TAG_NAME.HEADING_3 ? (
                  <h3>{d.content}</h3>
                ) : d.tag_name === TAG_NAME.HEADING_4 ? (
                  <h4>{d.content}</h4>
                ) : d.tag_name === TAG_NAME.HEADING_5 ? (
                  <h5>{d.content}</h5>
                ) : d.tag_name === TAG_NAME.HEADING_6 ? (
                  <h6>{d.content}</h6>
                ) : d.tag_name === TAG_NAME.HEADING_1_BOLD ? (
                  <h1>
                    <b>{d.content}</b>
                  </h1>
                ) : d.tag_name === TAG_NAME.HEADING_2_BOLD ? (
                  <h2>
                    <b>{d.content}</b>
                  </h2>
                ) : d.tag_name === TAG_NAME.HEADING_3_BOLD ? (
                  <h3>
                    <b>{d.content}</b>
                  </h3>
                ) : d.tag_name === TAG_NAME.HEADING_4_BOLD ? (
                  <h4>
                    <b>{d.content}</b>
                  </h4>
                ) : d.tag_name === TAG_NAME.HEADING_5_BOLD ? (
                  <h5>
                    <b>{d.content}</b>
                  </h5>
                ) : d.tag_name === TAG_NAME.HEADING_6_BOLD ? (
                  <h6>
                    <b>{d.content}</b>
                  </h6>
                ) : d.tag_name === TAG_NAME.IMAGE ? (
                  <div className="clearfix">
                    <input
                      type="image"
                      src={d.content}
                      className={
                        'img-thumbnail mb-full-width mb-3 mt-2 ' +
                        (d.align === 'left'
                          ? 'rounded float-start'
                          : d.align === 'center'
                          ? 'rounded mx-auto d-block'
                          : d.align === 'right'
                          ? 'rounded float-end'
                          : 'rounded float-start')
                      }
                      alt=""
                    />
                  </div>
                ) : (
                  <div>{parse(d.content)}</div>
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
