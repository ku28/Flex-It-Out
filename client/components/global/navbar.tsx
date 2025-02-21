'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
    title: string;
    href: string;
    requiresAuth?: boolean;
}

const navItems: NavItem[] = [
    {
        title: 'Body Composition',
        href: '/calculators/body-composition',
    },
    {
        title: 'Diet Calculators',
        href: '/calculators/diet',
    },
    {
        title: 'Activity AI',
        href: '/activity/pushups',
        requiresAuth: true,
    },
    {
        title: 'Blogs',
        href: '/blogs',
    },
];

export function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const pathname = usePathname();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setTimeout(() => {
            window.location.href = '/auth';
        }, 2000);
    };

    useEffect(() => {
        setIsLoggedIn(false);
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, [pathname, isLoggedIn]);

    return (
        <header className="px-4 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 font-medium">
            <nav className="container flex h-16 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link
                        href="/"
                        className="mr-6 flex items-center space-x-2"
                    >
                        <span className="font-bold text-xl">
                            FitTrack
                        </span>
                    </Link>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'px-4 py-2 text-sm transition-colors hover:text-primary',
                                pathname === item.href
                                    ? 'text-foreground'
                                    : 'text-foreground/60'
                            )}
                        >
                            {item.title}
                        </Link>
                    ))}
                </div>

                <div className="flex md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                            >
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">
                                    Toggle Menu
                                </span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="pr-0">
                            <Link
                                href="/"
                                className="flex items-center space-x-2"
                            >
                                <span className="font-bold">
                                    FitTrack
                                </span>
                            </Link>
                            <div className="flex flex-col space-y-3 mt-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            'px-4 py-2 text-sm transition-colors hover:text-primary',
                                            pathname === item.href
                                                ? 'text-foreground'
                                                : 'text-foreground/60'
                                        )}
                                        onClick={() =>
                                            setIsOpen(false)
                                        }
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                    <Link
                        href="/"
                        className="ml-2 flex items-center space-x-2"
                    >
                        <span className="font-bold">FitTrack</span>
                    </Link>
                </div>

                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-2">
                        {isLoggedIn ? (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="px-4"
                                onClick={handleLogout}
                            >
                                <LogOut className="h-5 w-5 mr-2" />
                                Sign Out
                            </Button>
                        ) : (
                            <Link href="/auth">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="px-4"
                                >
                                    <User className="h-5 w-5 mr-2" />
                                    Sign In
                                </Button>
                            </Link>
                        )}
                    </nav>
                </div>
            </nav>
        </header>
    );
}