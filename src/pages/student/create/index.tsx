import AxiosClient from 'api/axios-client';
import { useState, useRef } from 'react';

export const StudentCreate = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const scriptUrl =
    'https://script.google.com/macros/s/AKfycbyL50FiMvjX5fPOT-Y02u7b1-lwFKUbEPnGr40MlHzQS6TCW5N90kR30DK-0Y706E2p/exec';

  const sheetId = '15DO31mshPnP4OK3xeuMEm06ngda2TVgI2QgrqHPGi1M';
  const sheetName = 'Danh Sach';

  const [loadingFlg, setLoadingFlg] = useState(false);
  const handleCreate = async (e: any) => {
    e.preventDefault();
    setLoadingFlg(true);

    if (formRef.current) {
      const response = await AxiosClient.post(
        scriptUrl,
        new FormData(formRef.current),
      );
      console.log(response);

      if (response.status === 200) {
        console.log('SUCCESSFULLY SUBMITTED');
        setLoadingFlg(false);
      }
    }
  };

  return (
    <>
      <form ref={formRef} onSubmit={handleCreate} name="google-sheet">
        <input type="hidden" name="sheetId" value={sheetId} />
        <input type="hidden" name="sheetName" value={sheetName} />
        <input type="hidden" name="action" value="create" />
        {/* <input type="hidden" name="action" value="findRowId" /> */}
        <input type="hidden" name="id" value="2" />
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="name" className="col-form-label">
              Họ và tên
            </label>
            <input type="text" className="form-control" name="name" id="name" />
          </div>
          <div className="col-md-1"></div>

          <div className="col-md-5">
            <label htmlFor="gender" className="col-form-label">
              Giới tính
            </label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="inlineRadio1"
                  value="Nam"
                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  Nam
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="inlineRadio2"
                  value="Nữ"
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  Nữ
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-2">
            <label htmlFor="birthday" className="col-form-label">
              Ngày sinh
            </label>
            <input
              type="date"
              className="form-control"
              name="birthday"
              id="birthday"
            />
          </div>

          <div className="col-md-10">
            <label htmlFor="address" className="col-form-label">
              Địa chỉ
            </label>
            <input
              type="text"
              className="form-control"
              name="address"
              id="address"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-2 mt-4">
            <input
              type="submit"
              className="btn btn-primary"
              name="btn-submit"
              id="btn-submit"
              value={loadingFlg ? 'Loading...' : 'Lưu'}
            />
          </div>
        </div>
      </form>
    </>
  );
};
