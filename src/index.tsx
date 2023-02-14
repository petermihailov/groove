import { createRoot } from 'react-dom/client';

import { App } from './components/App';
import { ErrorBoundary } from './components/ErrorBoundary';
import { GrooveProvider } from './context/GrooveContext';
import { Sprite } from './icons';

const container = document.querySelector('[data-react-root]');

if (container) {
  const root = createRoot(container);

  root.render(
    <ErrorBoundary>
      <GrooveProvider>
        <App />
      </GrooveProvider>
      <Sprite />
    </ErrorBoundary>,
  );
}
