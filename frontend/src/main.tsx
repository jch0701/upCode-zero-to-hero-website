import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Toaster } from 'sonner'
import { store } from './store/index.ts'
import './index.css'
import App from './App.tsx'
// const App = () => (
//   <div style={{color:'white', background: 'red', height: '100vh', padding: '20px'}}>
//     <h1>INLINED APP TEST (RED BG)</h1>
//     <p>If you see this, the previous error was just white-on-white text.</p>
//   </div>
// );
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from "./api/index.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
        {/* <div style={{ color: 'white', background: '#222', height: '100vh', padding: '20px' }}>
             <h1>DEBUG STEP 2: STORE LOADED</h1>
             <p>Redux Store and Query Client initialized successfully.</p>
        </div> */}
        <Toaster position="top-center" richColors />
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
