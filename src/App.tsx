import './styles/variables.scss'
import './styles/global.scss'
import {
  Route,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import AuthGuard from './guards/auth.guard';
import { PrivateRoutes, PublicRoutes } from './models';
import { Suspense, lazy } from 'react';
import { RoutesWithNotFound } from './utilities';
import { Box, CircularProgress, ThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from './styles/theme';

const Login = lazy(() => import('./pages/login/Login'));
const Private = lazy(() => import('./pages/private/Private'));

export const App = () => {
  const getTheme = () => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme === 'dark' ? darkTheme : lightTheme;
};
  return (
    <ThemeProvider theme={getTheme()}>
    <Suspense fallback={<Box sx={{ height: '100vh', backgroundColor: "background.default", display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></Box>}>
      <Provider store={store}>
        <BrowserRouter>
          <RoutesWithNotFound>
            <Route path="/" element={<Navigate to={PrivateRoutes.PRIVATE} />} />
            <Route path={PublicRoutes.LOGIN} element={<Login />} />
            <Route element={<AuthGuard privateValidation={true} />}>
              <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
            </Route>
          </RoutesWithNotFound>
        </BrowserRouter>
      </Provider>
    </Suspense>
    </ThemeProvider>
  )
}
