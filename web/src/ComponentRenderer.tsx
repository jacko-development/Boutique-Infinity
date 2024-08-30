import React, { useState } from "react";
import { VisibilityProvider, useVisibility  } from './providers/VisibilityProvider';
import Boutique from './boutique/app';
import { isEnvBrowser } from './utils/misc';
import './index.css';

const ComponentRenderer: React.FC = () => {
    const { visibleComponents } = useVisibility();
  
    return (
        <VisibilityProvider>
             <Boutique />
        </VisibilityProvider>
    );
};

export default ComponentRenderer;