import { Fragment, useState } from 'react';
import { CONSTANTS } from 'utils/constants';
import StringUtils from 'utils/string-utils';
import { TAGS, LANGUAGES, LIST } from './data';

export const SampleCreateContentPage = () => {
  const [tag, setTag] = useState('b');
  const [language, setLanguage] = useState('sql');
  const [displaylanguage, setDisplayLanguage] = useState(false);
  const [listType, setListType] = useState('ul');
  const [displayList, setDisplayList] = useState(false);
  const [tab, setTab] = useState('0');
  const [textIndent, setTextIndent] = useState('0');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const onChangeTag = (value: string) => {
    if (value === 'code') {
      setDisplayLanguage(true);
      setTab('2');
    } else if (value === 'p') {
      setDisplayLanguage(false);
      setTab('1');
    } else {
      setDisplayLanguage(false);
      setTab('0');
    }

    if (value === 'list') {
      setTab('2');
      setDisplayList(true);
    } else {
      setDisplayList(false);
    }

    if (value === 'table') {
      setTab('2');
    }

    setTag(value);
    document.getElementById('input')?.focus();
  };
  const onChangeLanguage = (value: string) => {
    setLanguage(value);
    document.getElementById('input')?.focus();
  };
  const onChangeList = (value: string) => {
    setListType(value);
    document.getElementById('input')?.focus();
  };

  const handleChangeCol = (value: string) => {
    setTab(value);
    document.getElementById('input')?.focus();
  };

  const handleChangeTextIndent = (value: string) => {
    setTextIndent(value);
    document.getElementById('input')?.focus();
  };

  const addContent = () => {
    let outputStr = output;
    if (input.trim() === '') return;
    let inputCurrentValue = input;
    if (tag !== 'code') {
      inputCurrentValue = StringUtils.replaceAll(
        inputCurrentValue,
        '{',
        `{"{"###?###`,
      );
      inputCurrentValue = StringUtils.replaceAll(
        inputCurrentValue,
        '}',
        `{"}"}`,
      );
      inputCurrentValue = StringUtils.replaceAll(
        inputCurrentValue,
        '###?###',
        `}`,
      );
      inputCurrentValue = StringUtils.replaceAll(
        inputCurrentValue,
        '<',
        `{"<"}`,
      );
      inputCurrentValue = StringUtils.replaceAll(
        inputCurrentValue,
        '>',
        `{">"}`,
      );
    }

    outputStr += startWithTabAndTextIndent();

    switch (tag) {
      case 'code':
        outputStr += `<Code code={\`${inputCurrentValue}\`} language="${language}" />`;
        break;
      case 'table':
        outputStr += makeTableStr(inputCurrentValue);
        break;
      case 'list':
        const element = inputCurrentValue.split('\n');
        outputStr += `<${listType}>\n`;
        element.forEach((val) => {
          if (val.trim() !== '') {
            outputStr += `<li>${val}</li>\n`;
          }
        });
        outputStr += `</${listType}>\n`;
        break;
      case 'p':
        const elp = inputCurrentValue.split('\n');
        elp.forEach((val) => {
          if (val.trim() !== '') {
            outputStr += `<p>${val}</p>\n`;
          }
        });
        break;
      default:
        outputStr += `<${tag}>${inputCurrentValue}</${tag}>`;
        break;
    }

    outputStr += endWithTabAndTextIndent();
    setOutput(outputStr);
    setInput('');

    switch (tag) {
      case 'p':
        setTab('2');
        setTag('code');
        setDisplayLanguage(true);
        break;
      default:
        setTab('1');
        setTag('p');
        setDisplayLanguage(false);
        break;
    }
    document.getElementById('input')?.focus();
  };

  const startWithTabAndTextIndent = () => {
    let result = '';
    if (tab !== '0' || textIndent !== '0') {
      result += `<div className="`;
      if (tab !== '0' && textIndent !== '0') {
        result += `tab-${tab} text-indent-${textIndent}">`;
      } else if (tab !== '0') {
        result += `tab-${tab}">`;
      } else {
        result += `text-indent-${textIndent}">`;
      }
    }
    return result;
  };

  const endWithTabAndTextIndent = () => {
    let result = '';
    if (tab !== '0' || textIndent !== '0') {
      result += `</div>\n`;
    } else {
      result += `\n`;
    }
    return result;
  };

  const makeTableStr = (_input: string) => {
    let result = '';
    result += `<table className="table table-striped table-hover table-bordered table-sm">\n`;
    const rows = _input.split('\n');
    rows.forEach((item, index) => {
      const cells = item.split(CONSTANTS.TABLE_SEPARATOR);
      if (index === 0) {
        result += `<thead>\n`;
        result += `<tr className="table-dark">\n`;

        cells.forEach((cell) => {
          result += `<th>${cell}</th>\n`;
        });

        result += `</tr>\n`;
        result += `</thead>\n`;
      } else {
        if (index === 1) {
          result += `<tbody>\n`;
        }
        result += `<tr>\n`;

        cells.forEach((cell) => {
          result += `<td>${cell}</td>\n`;
        });

        result += `</tr>\n`;
      }
    });
    result += `</tbody>\n`;
    result += `</table>`;
    return result;
  };

  const clearContent = () => {
    setInput('');
    setOutput('');
    setTab('0');
    setTag('b');
    setDisplayLanguage(false);
    setDisplayList(false);
  };

  return (
    <>
      <div className="row">
        <div className="col-2 col-sm-2 col-md-2">
          <b>Tab</b>
          <select
            className="form-select form-select-sm"
            value={tab}
            onChange={(e) => handleChangeCol(e.target.value)}
          >
            {Array.from(Array(12), (e, i) => {
              return (
                <option key={i} value={i}>
                  {i}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-2 col-sm-2 col-md-2">
          <b>Text Indent</b>
          <select
            className="form-select form-select-sm"
            value={textIndent}
            onChange={(e) => handleChangeTextIndent(e.target.value)}
          >
            {Array.from(Array(5), (e, i) => {
              return (
                <option key={i} value={i}>
                  {i}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 mt-3">
          <div className="d-flex">
            {TAGS.map((tagObj, key) => (
              <Fragment key={key}>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="tag-radio"
                    id={`tag-${tagObj.text}`}
                    value={tagObj.text}
                    checked={tag === tagObj.text}
                    onChange={(e) => onChangeTag(e.target.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`tag-${tagObj.text}`}
                  >
                    {tagObj.text}
                  </label>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className={displaylanguage ? 'row' : 'row d-none'}>
        <div className="col-12 col-sm-12 col-md-12 mt-3">
          <div className="d-flex">
            {LANGUAGES.map((laguageObj, key) => (
              <Fragment key={key}>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="language-radio"
                    id={`language-${laguageObj.name}`}
                    value={laguageObj.name}
                    checked={language === laguageObj.name}
                    onChange={(e) => onChangeLanguage(e.target.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`language-${laguageObj.name}`}
                  >
                    {laguageObj.name}
                  </label>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className={displayList ? 'row' : 'row d-none'}>
        <div className="col-12 col-sm-12 col-md-12 mt-3">
          <div className="d-flex">
            {LIST.map((listObj, key) => (
              <Fragment key={key}>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="list-radio"
                    id={`list-${listObj.item}`}
                    value={listObj.item}
                    checked={listType === listObj.item}
                    onChange={(e) => onChangeList(e.target.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`list-${listObj.item}`}
                  >
                    {listObj.item}
                  </label>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 mt-2">
          <textarea
            value={input}
            id="input"
            onChange={(e) => setInput(e.target.value)}
            style={{ height: 100, width: '100%' }}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 mt-2">
          <div className="d-flex justify-content-between">
            <div>
              <button
                className="btn btn-primary"
                type="button"
                onClick={addContent}
              >
                Submit
              </button>
            </div>
            <div></div>
            <div>
              <button
                className="btn btn-warning"
                type="button"
                onClick={clearContent}
              >
                Clear Input
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-sm-10 col-md-12 mt-2">
          <textarea
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            style={{ height: 400, width: '100%' }}
          />
        </div>
      </div>

      <div className="col-12 col-sm-10 col-md-12 mt-2">
        <div dangerouslySetInnerHTML={{ __html: output }} />
      </div>
    </>
  );
};
