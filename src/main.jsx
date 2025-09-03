import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ChannelListCD from "./pages/ChannelListCD.jsx";
import CssBaseline from '@mui/material/CssBaseline';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ChannelListCD />,
  },
  {
    path: '/add',
    element: <ChannelListCD />
  },
  {
    path: '/edit/:channelId',
    element: <ChannelListCD />
  },
  {
    path: '/queue/:channelId',
    element: <ChannelListCD />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CssBaseline />
    <RouterProvider router={router} />
  </StrictMode>,
)
