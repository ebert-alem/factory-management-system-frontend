import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { PrivateRoutes } from '../models';
import { AppStore } from '../redux/store';

// interface Props {
//   charge: "admin" || "user";
// }

function RolGuard() {
  const userState = useSelector((store: AppStore) => store.user);
  return userState.Charge === "admin" ? <Outlet /> : <Navigate replace to={PrivateRoutes.HOME} />;
}
export default RolGuard;
