import cls from './PageLoader.module.scss';

interface IPageLoaderProps {
    className?: string;
}

export const PageLoader = ({ className }: IPageLoaderProps) => (
    <div className={className ? `${cls.PageLoader} ${className}` : cls.PageLoader} />
);