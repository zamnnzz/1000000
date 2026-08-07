import App from "./App.js";

const React = window.React;
const ReactDOM = window.ReactDOM;

if (!React || !ReactDOM) {
  document.getElementById("root").innerHTML = '<div style="padding:40px;text-align:center;font-family:sans-serif">تعذر تحميل مكونات الموقع. أعد تحميل الصفحة.</div>';
  throw new Error("React/ReactDOM لم يتم تحميلهما");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  React.createElement(React.StrictMode, null, React.createElement(App, null))
);
