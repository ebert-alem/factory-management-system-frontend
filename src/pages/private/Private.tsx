import { Route, useNavigate } from "react-router-dom"
import { RoutesWithNotFound } from "../../utilities"
import { PrivateRoutes, PublicRoutes } from "../../models"
import { Home, Materials, MaterialTypes, Users } from "."
import { Layout } from "../../components/layout"
import RolGuard from "../../guards/rol.guard"
import { useEffect } from "react"
import { isTokenExpired } from "../../services"


export const Private = () => {

    const navigate = useNavigate();

    useEffect(() => {
      const userString = localStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        const token = user.Token;
        const expired =isTokenExpired(token);
        console.log(expired);
        if (expired) {
          localStorage.removeItem('user');
          navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
        }
      }
    }, [])

    return (
        <RoutesWithNotFound>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route element={<RolGuard />}>
                    <Route path={PrivateRoutes.MATERIALS} element={<Materials />} />
                    <Route path={PrivateRoutes.USERS} element={<Users />} />
                    <Route path={PrivateRoutes.TYPEOFMATERIALS} element={<MaterialTypes />} />                 
                </Route>
                <Route path="*" element={<h2>404 Not Found</h2>} />
            </Route>
        </RoutesWithNotFound>
    )
}

export default Private;