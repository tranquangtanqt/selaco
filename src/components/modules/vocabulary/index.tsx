type Props = {
  vocabularies: {
    no: number;
    hiragana: string;
    kanji: string;
    romanji: string;
    translate: string;
  }[];
};

export const Vocabulary: React.FC<Props> = ({ vocabularies }) => {
  return (
    <>
      <div className="row mt-2">
        <div className="col-12 col-sm-12 col-md-12">
          <table className="table table-striped table-hover table-bordered table-sm">
            <thead>
              <tr className="table-dark">
                <th>ひらがな</th>
                <th>漢字</th>
                <th>ベトナム</th>
              </tr>
            </thead>
            <tbody>
              {vocabularies.map((item: any, index: any) => (
                <tr key={index}>
                  <td>{item.hiragana}</td>
                  <td>{item.kanji}</td>
                  <td>{item.translate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
