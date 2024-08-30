import React, { useState } from "react";
import { VisibilityProvider, useVisibility  } from './providers/VisibilityProvider';
import Inventory from './inventory/app';
import { isEnvBrowser } from './utils/misc';
import './index.css';

const ComponentRenderer: React.FC = () => {
    const { visibleComponents } = useVisibility();
  
    return (
        <VisibilityProvider>
             <Inventory />
        </VisibilityProvider>
    );
};

export default ComponentRenderer;