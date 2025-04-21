import {AppRoutesEnum, RootRoutesEnum} from "../../../const/router.ts";
import {TAppRoutesProps} from "../../../types/router.ts";
import {PageLayout} from "../../../../pages/PageLayout";
import {NotFoundPage} from "../../../../pages/NotFoundPage";
import {HomePage} from "../../../../pages/HomePage";


export const routeConfig: Record<RootRoutesEnum, TAppRoutesProps> = {
    [RootRoutesEnum.PageLayout]: {
        path: '/',
        element: <PageLayout />,
        nestedRoutes: {
            [AppRoutesEnum.Main]: {
                path: '/',
                element: <HomePage />,
            },
        },
    },
    [RootRoutesEnum.NotFound]: {
        path: '*',
        element: <NotFoundPage />,
    },
};