import type { RouteProps } from 'react-router-dom';

export type TAppRoutesProps = RouteProps & {
    redirectFrom?: string;
    nestedRoutes?: Record<string, TAppRoutesProps>;
};