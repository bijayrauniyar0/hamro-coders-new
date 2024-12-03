import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@Assets/css/index.css';
import '@Assets/css/tailwind.css';
import { BrowserRouter } from 'react-router-dom';
import store from '@Store/index.tsx';
import { Provider } from 'react-redux';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <BrowserRouter basename="/hamro-coders-new">
        <StrictMode>
          <App />
        </StrictMode>
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>,
);
