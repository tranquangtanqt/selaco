import AxiosClient from 'api/axios-client';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StudentDto } from '../dto';

export const StudentUpdate = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState<StudentDto>();

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const studentStorage = localStorage.getItem('student-update');
    console.log(studentStorage);

    if (studentStorage === null) {
      navigate('/student');
      return;
    }

    setStudent(JSON.parse(studentStorage) as StudentDto);
  }, []);

  const handleChangeName = (value: string) => {
    const temp = { ...student } as StudentDto;
    temp.name = value;
    setStudent(temp);
  };

  const handleChangeGender = (value: string) => {
    const temp = { ...student } as StudentDto;
    temp.gender = value;
    setStudent(temp);
  };

  const handleChangeAddress = (value: string) => {
    const temp = { ...student } as StudentDto;
    temp.address = value;
    setStudent(temp);
  };

  const handleChangeBirthday = (value: string) => {
    const temp = { ...student } as StudentDto;
    temp.birthday = value;
    setStudent(temp);
  };

  const scriptUrl =
    'https://script.google.com/macros/s/AKfycbyL50FiMvjX5fPOT-Y02u7b1-lwFKUbEPnGr40MlHzQS6TCW5N90kR30DK-0Y706E2p/exec';

  const sheetId = '15DO31mshPnP4OK3xeuMEm06ngda2TVgI2QgrqHPGi1M';
  const sheetName = 'Danh Sach';

  const [loadingFlg, setLoadingFlg] = useState(false);
  const handleUpdate = async (e: any) => {
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
      {student != null && (
        <form ref={formRef} onSubmit={handleUpdate} name="google-sheet">
          <input type="hidden" name="sheetId" value={sheetId} />
          <input type="hidden" name="sheetName" value={sheetName} />
          <input type="hidden" name="action" value="update" />
          <input type="hidden" name="id" value={student.id} />
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="name" className="col-form-label">
                Họ và tên
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                value={student.name}
                onChange={(e) => handleChangeName(e.target.value)}
              />
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
                    checked={student.gender === 'Nam'}
                    onChange={(e) => handleChangeGender(e.target.value)}
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
                    checked={student.gender === 'Nữ'}
                    onChange={(e) => handleChangeGender(e.target.value)}
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
                value={student.birthday}
                onChange={(e) => handleChangeBirthday(e.target.value)}
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
                value={student.address}
                onChange={(e) => handleChangeAddress(e.target.value)}
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
                value={loadingFlg ? 'Đang tải...' : 'Lưu'}
                disabled={loadingFlg}
              />
            </div>
          </div>
        </form>
      )}
    </>
  );
};
