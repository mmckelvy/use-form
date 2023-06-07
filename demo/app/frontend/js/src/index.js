import React from 'react';
import { createRoot } from 'react-dom/client';

import Root from './views/Root';

const container = document.getElementById('container');
const root = createRoot(container);

root.render(<Root />);
