import { PageTitle } from 'components/modules/page-title';
import { PageContent } from 'components/modules/page-content';
import IContent from 'utils/interface';

export const SampleContentPage = () => {
  const data: IContent[] = [
    {
      title: 'Get size in folder',
      contents: [
        {
          p: 'tag p <b>tag b</b>',
          code: {
            src: `SELECT * FROM information_schema.tables;`,
            language: 'sql',
          },
          image: {
            src: require(`resources/img/_layout/logo.jpg`),
          },
        },
      ],
    },
  ];

  return (
    <>
      <PageTitle title="Create page"></PageTitle>
      <PageContent content={data}></PageContent>
    </>
  );
};
