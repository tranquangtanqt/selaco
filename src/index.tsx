import ReactDOM from 'react-dom/client';
import { RoutesRoot } from './route';
import $ from 'jquery';
import './index.css';

declare let window: any;
window.$ = window.jQuery = $;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <>
    <RoutesRoot />
  </>,
);
