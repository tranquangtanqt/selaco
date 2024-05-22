import { useMonaco } from '@monaco-editor/react';
import { PageTitle } from 'components/modules/page-title';
import { useEffect, useRef } from 'react';

export const SampleMonacoEditorPage = () => {
  const refEditor = useRef<HTMLDivElement>(null);

  const monaco = useMonaco();

  useEffect(() => {
    if (refEditor.current) {
      if (monaco) {
        const originalModel = monaco.editor.createModel(
          'heLLo world!',
          'text/plain',
        );

        const modifiedModel = monaco.editor.createModel(
          'hello orlando!',
          'text/plain',
        );

        if (refEditor.current) {
          const diffEditor = monaco.editor.createDiffEditor(
            document.getElementById('container-editor') as HTMLElement,
            {
              originalEditable: true, // for left pane
              readOnly: false, // for right pane
              fontSize: 13,
            },
          );

          diffEditor.setModel({
            original: originalModel,
            modified: modifiedModel,
          });

          if (diffEditor.getModel()) {
            monaco.editor.setModelLanguage(
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              diffEditor.getModel()!.original,
              'javascript',
            );
          }
        }
      }
    }
  }, [monaco]);

  return (
    <>
      <PageTitle title="Monaco Editor Sample"></PageTitle>
      <div className="row mt-2">
        <div className="col-12 col-sm-12 col-md-12">
          <div
            id="container-editor"
            style={{ height: '70vh' }}
            ref={refEditor}
          ></div>
        </div>
      </div>
    </>
  );
};
