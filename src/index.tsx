import { createRoot } from 'react-dom/client';

import { App } from './components/App';
import { GrooveProvider } from './context/GrooveContext';
import { Sprite } from './icons';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <>
      <GrooveProvider>
        <App />
      </GrooveProvider>
      <Sprite />
    </>
  );
}
