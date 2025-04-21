import { Fragment, memo, Suspense, useCallback } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import {TAppRoutesProps} from "../../../types/router.ts";
import {routeConfig} from "../config/routeConfig.tsx";
import {PageLoader} from "../../../../shared/ui/PageLoader";

const RedirectWithParams = ({ to }: { to: string }) => {
    const params = useParams();
    const redirectPath = to.replace(':id', String(params.id));

    return <Navigate replace to={redirectPath} />;
};

const AppRouterComponent = () => {
    const renderWithWrapper = useCallback((route: TAppRoutesProps, index: number) => {
        const fallback = <PageLoader />;
        const element = <Suspense fallback={fallback}>{route.element}</Suspense>;

        return (
            <Fragment key={index}>
                {route.redirectFrom && (
                    <Route path={route.redirectFrom} element={<RedirectWithParams to={String(route.path)} />} />
                )}
                <Route path={route.path} element={element}>
                    {route.nestedRoutes && Object.values(route.nestedRoutes).map(renderWithWrapper)}
                </Route>
            </Fragment>
        );
    }, []);

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export const AppRouter = memo(AppRouterComponent);