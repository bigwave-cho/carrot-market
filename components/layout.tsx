import { cls } from '@/libs/utils';

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

export default function Layout({
  title,
  canGoBack,
  hasTabBar,
  children,
}: LayoutProps) {
  return (
    <div>
      <div className="fixed top-0 flex w-full items-center justify-center border-b bg-white py-3 text-lg font-medium text-gray-800">
        {title ? <span>{title}</span> : null}
      </div>
      <div
        //Home index에서 hasTabBar를 넘겨주고 있기 때문에 pb-16이 적용되는 모습이다.
        className={cls('pt-16', hasTabBar ? 'pb-16' : '')}
      >
        {children}
      </div>
      {hasTabBar ? (
        <nav className="fixed bottom-0 flex items-center justify-between border-t bg-white pb-10 pt-3 text-gray-900"></nav>
      ) : null}
    </div>
  );
}
