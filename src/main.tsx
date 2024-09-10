import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import { App } from './App';
import { client } from 'src/config';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={client}>
    <Router>
      <App />
      <Toaster />
    </Router>
    <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
  </QueryClientProvider>,
);
