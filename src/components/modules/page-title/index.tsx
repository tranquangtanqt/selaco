import React from 'react';
type Props = {
  title: string;
};

export const PageTitle: React.FC<Props> = ({ title }) => {
  return (
    <>
      <div className="row mb-2">
        <div className="col-12 col-sm-12 col-md-12">
          <b>
            <h4 className="font-weight-700">{title}</h4>
          </b>
        </div>
        <hr className="text-secondary mt-1" />
      </div>
    </>
  );
};
