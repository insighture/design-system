// Scenes render the REAL compiled components from the bundle, so a README image
// can never drift from what the library actually produces.
const { React, ReactDOMClient } = window.Insighture;
window.h = React.createElement;
window.mount = (node, theme) => {
  const { InsightureProvider } = window.Insighture;
  ReactDOMClient.createRoot(document.getElementById('root')).render(
    h(InsightureProvider, { theme, fullBleed: false }, node),
  );
};
