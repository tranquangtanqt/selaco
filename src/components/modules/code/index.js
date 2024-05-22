import Editor from 'react-prism-editor';

const Code = ({ code, language }) => {
  return (
    <>
      <div className="mt-2 mb-2">
        <Editor
          language={language}
          theme="okaidia"
          code={code}
          lineNumber
          readOnly
          clipboard
          showLanguage
        />
      </div>
    </>
  );
};

export default Code;

/*
------ language of the code ------
language: json,javascript,jsx,tsx,typescript
html,vue,angular,css,sass,markup
java,php,csharp,c,cpp,sql,xml
*/
