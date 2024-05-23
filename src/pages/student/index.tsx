import AxiosClient from 'api/axios-client';
import { useState, useRef, useEffect } from 'react';
import useGoogleSheets from 'use-google-sheets';
import { StudentDto } from './dto/student.dto';
import { useNavigate } from 'react-router-dom';

export const StudentList = () => {
  const navigate = useNavigate();

  const REACT_APP_GOOGLE_API_KEY = 'AIzaSyDzMVLOCEoQjQes2bF0H9pc9HbzlKzOldQ';
  const REACT_APP_GOOGLE_SHEETS_ID =
    '15DO31mshPnP4OK3xeuMEm06ngda2TVgI2QgrqHPGi1M';

  const sheetsOptions = [
    {
      id: 'Danh Sach', //headerRowIndex: 1
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

  const [students, setStudents] = useState<StudentDto[]>([]);

  useEffect(() => {
    if (data && data[0]) {
      const studentResApi = data[0].data;
      const studentDtos: StudentDto[] = [];

      for (let i = 0; i < studentResApi.length; i++) {
        const element = studentResApi[i] as StudentDto;

        element.id = +element.id;
        console.log(element);
        studentDtos.push(element);
      }

      setStudents(studentDtos);
    }
  }, [data]);

  const showModalCreate = () => {
    navigate('/student/create');
  };

  const showModalUpdate = (id: number) => {
    console.log(id);
  };
  const showModalDelete = () => {
    console.log('delete');
  };

  const handleDelete = (id: number) => {
    console.log(id);
  };

  const handleUpdate = (id: number) => {
    console.log(id);
  };
  const handleCreate = () => {
    console.log('Create');
  };

  // const formRef = useRef<HTMLFormElement>(null);
  // const scriptUrl =
  //   'https://script.google.com/macros/s/AKfycbxDj3LXDytTlKsK6XDRmite7ffZkP-Lc0SZNo05Y8zuRgkVfBoMDy5cm4FQDmWD7T-iOg/exec';

  // const sheetUrl =
  //   'https://docs.google.com/spreadsheets/d/1BGNLMd5AoaXK26OXKxOvDvjJer8jOizucG41FkIWMQQ/edit#gid=0';

  // const [loadingFlg, setLoadingFlg] = useState(false);
  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   setLoadingFlg(true);

  //   if (formRef.current) {
  //     const response = await AxiosClient.post(
  //       scriptUrl,
  //       new FormData(formRef.current),
  //     );
  //     console.log(response);

  //     if (response.status === 200) {
  //       console.log('SUCCESSFULLY SUBMITTED');
  //       setLoadingFlg(false);
  //     }
  // }
  // };

  return (
    <>
      <div className="row">
        <div className="col-md-12 mb-3">
          <button
            className="btn btn-sm btn-primary float-end"
            onClick={() => showModalCreate()}
          >
            Thêm
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Tên</th>
                <th>Ngày sinh</th>
                <th>Địa chỉ</th>
                <th>Giới tính</th>
                <th>Tùy chọn</th>
              </tr>
            </thead>
            <tbody>
              {students.map((item, key) => (
                <tr key={key}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.birthday}</td>
                  <td>{item.address}</td>
                  <td>{item.gender}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => showModalUpdate(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        className="modal fade"
        id="modal-create"
        aria-labelledby="modal-create1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modal-create1">
                Thêm công việc
              </h5>
              <input
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div>
                <label htmlFor="task-content-create" className="form-label">
                  Nội dung
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="task-content-create"
                  // value={todoTitle}
                  // onChange={(e) => setTodoTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <input
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                value={'Đóng'}
              />
              <input
                type="button"
                className="btn btn-primary"
                value="Lưu"
                // onClick={() => createTodo()}
              />
            </div>
          </div>
        </div>
      </div>
    </>

    // <div className="container">
    //   <form ref={formRef} onSubmit={handleSubmit} name="google-sheet">
    //     <div className="input-style">
    //       <input
    //         type="hidden"
    //         name="sheetUrl"
    //         value={sheetUrl}
    //         placeholder="Your Name *"
    //       />
    //       <label htmlFor="name">Name</label>
    //       <input type="text" id="name" name="name" placeholder="Your Name *" />
    //     </div>
    //     <div className="input-style">
    //       <label htmlFor="name">Email</label>
    //       <input type="email" name="email" placeholder="Your Email *" />
    //     </div>
    //     <div className="input-style">
    //       <label htmlFor="name">Phone No</label>
    //       <input type="number" name="phone" placeholder="Your Phone *" />
    //     </div>
    //     <div className="input-style">
    //       <input
    //         type="submit"
    //         value={loadingFlg ? 'Loading...' : 'SEND MESSAGE'}
    //       />
    //     </div>
    //   </form>
    // </div>
  );
};
