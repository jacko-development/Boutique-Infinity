
import React from 'react';
import ReactDOM from 'react-dom/client';
import { VisibilityProvider, useVisibility  } from './providers/VisibilityProvider';
import Componentrenderer from './ComponentRenderer';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <VisibilityProvider>
      <Componentrenderer />
    </VisibilityProvider>
  </React.StrictMode>
);
