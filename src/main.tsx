import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import './index.css';
import router from './routes/routes';
import { worker } from "./mocks/browser";
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from "react-hot-toast";

async function startApp() {
  if (import.meta.env.DEV) {
    await worker.start({ onUnhandledRequest: "bypass" });
  }

  createRoot(document.getElementById('root')!).render(

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
          <Toaster position="top-center" reverseOrder={false} />
        </PersistGate>
      </Provider>,
  );
}

startApp();
