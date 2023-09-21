import { Route } from "react-router-dom"
import { RoutesWithNotFound } from "../../utilities"
import { PrivateRoutes } from "../../models"
import { Home, Materials, Users } from "."
import { Layout } from "../../components/layout"
import RolGuard from "../../guards/rol.guard"


export const Private = () => {

    return (
        <RoutesWithNotFound>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route element={<RolGuard />}>
                    <Route path={PrivateRoutes.MATERIALS} element={<Materials />} />
                    <Route path={PrivateRoutes.USERS} element={<Users />} />                    
                </Route>
                <Route path="*" element={<h2>404 Not Found</h2>} />
            </Route>
        </RoutesWithNotFound>
    )
}

export default Private;