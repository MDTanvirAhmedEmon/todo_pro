import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  RouterProvider,
} from "react-router-dom";
import './index.css'
import router from './routes/routes';
// import { worker } from "./mocks/browser";
// // if (process.env.NODE_ENV === "development") {
//   worker.start();
// // }

// async function deferRender() {
//   const { worker } = await import("./mocks/browser.ts")
//   return worker.start();
// }

import { worker } from "./mocks/browser";
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
// Start MSW before rendering the app
if (import.meta.env.DEV) {
  worker.start({
    onUnhandledRequest: "bypass", // let other requests pass through
  });
}
// deferRender().then(() => {
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
// })
