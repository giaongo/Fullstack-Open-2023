import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import { QueryClient, QueryClientProvider } from 'react-query'
import { NotiContextProvider } from './NotiContext'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <NotiContextProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </NotiContextProvider>
)