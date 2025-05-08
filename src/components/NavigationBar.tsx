import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/NavigationMenu';
import { authService, type MeResponse } from '@/lib/api/auth/auth.service';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const OrderDeliveryNavigationItems = [
  {
    title: '퀵 접수',
    href: '/quick-order',
    description: '빠른 주문을 통해 간편하게 주문을 생성하세요.',
  },
];

const SeachDeliveryNavigationItems = [
  {
    title: '주문 목록',
    href: '/quick-order-list',
    description: '생성된 주문 목록을 확인하세요.',
  },
];

const ListItem = React.forwardRef<React.ComponentRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <span
            ref={ref}
            className={cn(
              'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none',
              className
            )}
            {...props}
          >
            <div className="text-sm leading-none font-medium">{title}</div>
            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
          </span>
        </NavigationMenuLink>
      </li>
    );
  }
);

const NavigationMenuSection = () => {
  return (
    <section className="flex flex-1 justify-center">
      <NavigationMenu>
        <NavigationMenuList className="space-x-5">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="hover:text-primary cursor-pointer text-lg font-medium transition-colors">
              주문접수
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-[280px] bg-white p-1">
                {OrderDeliveryNavigationItems.map((item) => (
                  <Link to={item.href} key={item.title}>
                    <ListItem title={item.title} href={item.href} className="hover:bg-gray-50">
                      {item.description}
                    </ListItem>
                  </Link>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="hover:text-primary cursor-pointer text-lg font-medium transition-colors">
              배송조회
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-[280px] bg-white p-1">
                {SeachDeliveryNavigationItems.map((item) => (
                  <Link to={item.href} key={item.title}>
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                      className="hover:bg-gray-50"
                    >
                      {item.description}
                    </ListItem>
                  </Link>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </section>
  );
};

export function NavigationBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<MeResponse | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    const checkLogin = async () => {
      const response = await authService.me();
      if (response.success) {
        setIsLoggedIn(true);
        setUser(response.data);
      }
    };
    checkLogin();
  }, []);

  return (
    <nav className="min-w-[700px] border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
        <LogoSection />
        <NavigationMenuSection />
        <UserSection isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
      </div>
    </nav>
  );
}

const LogoSection = () => {
  return (
    <section className="flex min-w-[120px] items-center">
      <Link to="/">
        <h1 className="text-2xl font-bold">HPOST</h1>
      </Link>
    </section>
  );
};

const UserSection = ({
  isLoggedIn,
  user,
  onLogout,
}: {
  isLoggedIn: boolean;
  user: MeResponse | null;
  onLogout: () => void;
}) => {
  if (!isLoggedIn) {
    return (
      <section className="flex min-w-[120px] items-center gap-3">
        <Link to="/login">
          <button className="cursor-pointer text-sm font-medium">로그인</button>
        </Link>
        <div className="text-sm font-medium">|</div>
        <Link to="/signup">
          <button className="cursor-pointer text-sm font-medium">회원가입</button>
        </Link>
      </section>
    );
  }

  return (
    <section className="flex min-w-[120px] items-center gap-3">
      <div className="text-sm font-medium">{user?.name} 님</div>
      <div className="text-sm font-medium">|</div>
      <button className="cursor-pointer text-sm font-medium" onClick={onLogout}>
        로그아웃
      </button>
    </section>
  );
};
