import { Fragment } from 'react';

export const Home = () => {
  interface ILink {
    title: string;
    contents: {
      text: string;
      links: {
        href: string;
        title?: string;
        target?: string;
      };
    }[];
  }
  [];

  const data: ILink[] = [
    {
      title: 'Thông tin',
      contents: [
        {
          text: `Du học`,
          links: {
            href: 'https://dev.to/',
          },
        },
        {
          text: `Thực tập sinh`,
          links: {
            href: 'https://hackr.io/',
          },
        },
      ],
    },
  ];

  return (
    <>
      <div className="row">
        {data.map((value, key) => (
          <Fragment key={key}>
            <div className="col-12 col-sm-12 col-md-3 mt-2">
              <div className="card">
                <div className="card-header font-size-16">
                  <b>{value.title}</b>
                </div>
                <div className="card-body">
                  <ol>
                    {value.contents.map((content, contentKey) => (
                      <Fragment key={contentKey}>
                        <li>
                          <a
                            href={content.links.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={content.links.title}
                          >
                            {content.text}
                          </a>
                        </li>
                      </Fragment>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
};
