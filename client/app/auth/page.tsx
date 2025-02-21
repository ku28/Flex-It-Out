'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleLogin } from '@react-oauth/google';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    loginWithEmail,
    registerWithEmail,
    loginAsGuest,
    loginWithGoogle,
} from '@/lib/auth';

export default function AuthPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        try {
            const response = await loginWithEmail(
                formData.get('email') as string,
                formData.get('password') as string
            );
            if (!response) {
                setError('Login failed! Check Your Credentials');
            }
            router.push('/dashboard');
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Login failed'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        try {
            const response = await registerWithEmail({
                email: formData.get('email') as string,
                password: formData.get('password') as string,
                name: formData.get('name') as string,
            });
            if (response) {
                await loginWithEmail(
                    formData.get('email') as string,
                    formData.get('password') as string
                );
            }
            router.push('/dashboard');
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Registration failed'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLoginSuccess = async (response: any) => {
        try {
            const token = await loginWithGoogle(response.credential);
            localStorage.setItem('token', token);
            window.location.href = '/';
        } catch (error) {
            console.error('Google Login Failed:', error);
        }
    };

    const handleGuestLogin = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await loginAsGuest();
            if (!response) {
                throw new Error('Guest login failed');
            }
            const token = response.token;
            localStorage.setItem('token', token);
            
            router.push('/');
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Guest login failed'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto flex items-center justify-center min-h-screen py-8">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Welcome to FitTrack</CardTitle>
                    <CardDescription>
                        Sign in to access all features
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertDescription>
                                {error}
                            </AlertDescription>
                        </Alert>
                    )}

                    <Tabs defaultValue="login">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="login">
                                Login
                            </TabsTrigger>
                            <TabsTrigger value="register">
                                Register
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="login">
                            <form
                                onSubmit={handleLogin}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <Label htmlFor="login-email">
                                        Email
                                    </Label>
                                    <Input
                                        id="login-email"
                                        name="email"
                                        type="email"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="login-password">
                                        Password
                                    </Label>
                                    <Input
                                        id="login-password"
                                        name="password"
                                        type="password"
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading
                                        ? 'Signing in...'
                                        : 'Sign In'}
                                </Button>
                            </form>
                        </TabsContent>

                        <TabsContent value="register">
                            <form
                                onSubmit={handleRegister}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <Label htmlFor="register-name">
                                        Name
                                    </Label>
                                    <Input
                                        id="register-name"
                                        name="name"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="register-email">
                                        Email
                                    </Label>
                                    <Input
                                        id="register-email"
                                        name="email"
                                        type="email"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="register-password">
                                        Password
                                    </Label>
                                    <Input
                                        id="register-password"
                                        name="password"
                                        type="password"
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading
                                        ? 'Creating account...'
                                        : 'Create Account'}
                                </Button>
                            </form>
                        </TabsContent>
                    </Tabs>

                    <div className="mt-6 space-y-4">
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={handleGuestLogin}
                            disabled={isLoading}
                        >
                            Continue as Guest
                        </Button>

                        <div id="googleButton" className="w-full">
                            <GoogleLogin
                                onSuccess={handleGoogleLoginSuccess}
                                onError={() =>
                                    console.error(
                                        'Google Login Failed'
                                    )
                                }
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
