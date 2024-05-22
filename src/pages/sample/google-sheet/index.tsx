import { PageTitle } from 'components/modules/page-title';
import { useEffect } from 'react';
import useGoogleSheets from 'use-google-sheets';

export const SampleGoogleSheet = () => {
  const REACT_APP_GOOGLE_API_KEY = 'AIzaSyDzMVLOCEoQjQes2bF0H9pc9HbzlKzOldQ';
  const REACT_APP_GOOGLE_SHEETS_ID =
    '1ONDr_ORP1VEShsj6JoN1YqDNCFz-xvbli-EtxzpT-2A';

  const sheetsOptions = [
    {
      id: 'projects', //headerRowIndex: 1
    },
  ];

  const { data, loading, error } = useGoogleSheets({
    apiKey: REACT_APP_GOOGLE_API_KEY,
    sheetId: REACT_APP_GOOGLE_SHEETS_ID,
    sheetsOptions,
  });

  if (loading) {
    console.log('loading....');
  }

  if (error) {
    console.log('Error!');
  }

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <PageTitle title="Sample Google Sheet"></PageTitle>
      <div className="row mt-2">
        <div className="col-12 col-sm-12 col-md-12"></div>
      </div>
    </>
  );
};
