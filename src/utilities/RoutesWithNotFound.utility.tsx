import { Route, Routes } from 'react-router-dom';

interface Props {
  children: JSX.Element[] | JSX.Element;
}
function RoutesWithNotFound({ children }: Props) {
  return (
    <Routes>
      {children}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}
export default RoutesWithNotFound;
