import { Route, Routes, HashRouter } from 'react-router-dom';
import { Home } from 'pages/home';

import { MasterLayout } from 'pages/_layout/master-layout';

import { SampleContentPage } from 'pages/sample/content-page';
import { SampleMonacoEditorPage } from 'pages/sample/monaco-editor';
import { SampleGoogleSheet } from 'pages/sample/google-sheet';
import { SampleCreateContentPage } from 'pages/sample/create-content-page';
import { SampleCRUDGoogleSheet } from 'pages/sample/crud-google-sheet';
import { StudentList } from 'pages/student';
import { StudentCreate } from 'pages/student/create';

export const RoutesRoot = () => {
  return (
    <HashRouter>
      <MasterLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student" element={<StudentList />} />
          <Route path="/student/create" element={<StudentCreate />} />
          <Route path="/sample/create-content-page" element={<SampleCreateContentPage />} />
          <Route path="/sample/content-page" element={<SampleContentPage />} />
          <Route path="/sample/monaco-editor-page" element={<SampleMonacoEditorPage />} />
          <Route path="/sample/google-sheet" element={<SampleGoogleSheet />} />
          <Route path="/sample/crud-google-sheet" element={<SampleCRUDGoogleSheet />} />
        </Routes>
      </MasterLayout>
    </HashRouter>
  );
};
