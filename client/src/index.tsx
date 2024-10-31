import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { AuthProvider } from "./services/providers/AuthProvider";
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router.tsx';
import ToastMessage from './components/ToastMessage.tsx';
import './index.css';
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <ToastMessage/>
        <RouterProvider router={router}/>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);