export const NAVBAR_LEFT = [
  {
    id: 0,
    active: true,
    open: false,
    link: '',
    text: 'Danh sách',
    linkClass: 'dropdown-toggle collapsed',
    ulClass: 'collapse list-unstyled',
    children: [
      {
        id: 0,
        link: '/hocvien',
        text: 'Học viên',
        active: false,
      },
    ],
  },
  {
    id: 1,
    active: false,
    open: false,
    text: 'Sample',
    linkClass: 'dropdown-toggle collapsed',
    ulClass: 'collapse list-unstyled',
    children: [
      {
        id: 0,
        link: '/sample/create-content-page',
        text: 'Create Page 1',
        active: false,
      },
      {
        id: 1,
        link: '/sample/content-page',
        text: 'Create page 2',
        active: false,
      },
      {
        id: 2,
        link: '/sample/monaco-editor-page',
        text: 'Monaco Editor',
        active: false,
      },
      {
        id: 3,
        link: '/sample/google-sheet',
        text: 'Google sheet',
        active: false,
      },
      {
        id: 3,
        link: '/sample/crud-google-sheet',
        text: 'CRUD Google sheet',
        active: false,
      },
    ],
  },
];
