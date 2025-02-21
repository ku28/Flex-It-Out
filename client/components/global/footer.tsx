import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export function Footer() {
    return (
        <footer className="px-4 border-t bg-background">
            <div className="container flex flex-col gap-8 py-8">
                <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            FitTrack
                        </h3>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Transform your fitness journey with our
                            advanced calculators and AI-powered
                            tracking tools.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div className="space-y-3">
                            <h4 className="text-sm font-medium">
                                Calculators
                            </h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="/calculators/body-composition"
                                        className="text-sm text-muted-foreground hover:text-primary"
                                    >
                                        Body Composition
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/calculators/diet"
                                        className="text-sm text-muted-foreground hover:text-primary"
                                    >
                                        Diet Planning
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-sm font-medium">
                                Features
                            </h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="/activity/pushups"
                                        className="text-sm text-muted-foreground hover:text-primary"
                                    >
                                        Activity AI
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/blogs"
                                        className="text-sm text-muted-foreground hover:text-primary"
                                    >
                                        Health Blogs
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-sm font-medium">
                                Company
                            </h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="/about"
                                        className="text-sm text-muted-foreground hover:text-primary"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact"
                                        className="text-sm text-muted-foreground hover:text-primary"
                                    >
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/privacy"
                                        className="text-sm text-muted-foreground hover:text-primary"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <Separator />

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© 2024 FitTrack. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/terms"
                            className="hover:text-primary"
                        >
                            Terms of Service
                        </Link>
                        <Link
                            href="/privacy"
                            className="hover:text-primary"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/cookies"
                            className="hover:text-primary"
                        >
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}