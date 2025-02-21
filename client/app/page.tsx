'use client';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from '@/components/ui/card';
import Link from 'next/link';
import {
    ArrowRight,
    Calculator,
    Activity,
    Brain,
    BookOpen,
    Star,
    Users,
    Heart,
    Shield,
} from 'lucide-react';

export default function Home() {
    // useEffect(() => {
    //     document.title = 'Fitness Tracker | Home';
    //     fetch('http://172.16.20.38:8000/generate/', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             prompt: "What is advantages of pushups?"
    //         }),
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    // }, []);
    return (
        <>
            <section className="text-center py-20 my-20">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">
                    Transform Your Fitness Journey
                </h1>
                <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
                    Advanced calculators, AI-powered tracking, and
                    expert guidance - all in one place
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/auth">
                        <Button
                            size="lg"
                            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                            Get Started
                        </Button>
                    </Link>
                    <Link href="/calculators/body-composition">
                        <Button
                            size="lg"
                            variant="outline"
                            className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900"
                        >
                            Try Calculators
                        </Button>
                    </Link>
                </div>
            </section>

            <section className="container mx-auto px-4 py-16 lg:px-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                        Why Choose Us?
                    </h2>
                    <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        Discover the features that make us the best
                        choice for your fitness journey
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <Card className="hover:shadow-lg transition-shadow bg-blue-50 dark:bg-blue-900">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                <Star className="w-6 h-6" />
                                Expert Guidance
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                Get personalized advice from certified
                                fitness experts
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow bg-green-50 dark:bg-green-900">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                <Activity className="w-6 h-6" />
                                AI Tracking
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                Track your workouts with AI-powered
                                tools
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow bg-purple-50 dark:bg-purple-900">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                                <Heart className="w-6 h-6" />
                                Health Focused
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                Tools designed to improve your overall
                                health
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow bg-orange-50 dark:bg-orange-900">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                                <Shield className="w-6 h-6" />
                                Secure & Private
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                Your data is safe with our secure
                                platform
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section className="container mx-auto px-4 py-16 lg:px-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                        Explore Our Tools
                    </h2>
                    <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        Advanced tools to help you achieve your
                        fitness goals
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                <Calculator className="w-6 h-6" />
                                Body Composition
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                Calculate BMI, body fat percentage,
                                and lean body mass
                            </p>
                            <Link href="/calculators/body-composition">
                                <Button
                                    variant="ghost"
                                    className="w-full text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-800"
                                >
                                    Try Now{' '}
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                <Brain className="w-6 h-6" />
                                Diet Planning
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                Calculate calories, macros, BMR, and
                                water intake
                            </p>
                            <Link href="/calculators/diet-planning">
                                <Button
                                    variant="ghost"
                                    className="w-full text-green-600 hover:bg-green-100 dark:hover:bg-green-800"
                                >
                                    Try Now{' '}
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                                <Activity className="w-6 h-6" />
                                AI Exercise Tracking
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                Track pushups and pullups with
                                AI-powered counting
                            </p>
                            <Link href="/activity/pushups">
                                <Button
                                    variant="ghost"
                                    className="w-full text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-800"
                                >
                                    Try Now{' '}
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                                <BookOpen className="w-6 h-6" />
                                Health Blogs
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                Expert advice and latest fitness
                                research
                            </p>
                            <Link href="/blogs">
                                <Button
                                    variant="ghost"
                                    className="w-full text-orange-600 hover:bg-orange-100 dark:hover:bg-orange-800"
                                >
                                    Read More{' '}
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 py-16 lg:px-10">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                            What Our Users Say
                        </h2>
                        <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                            Hear from our satisfied users
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <Users className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                                    <div>
                                        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                                            John Doe
                                        </h3>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                            Fitness Enthusiast
                                        </p>
                                    </div>
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-400">
                                    "This platform has transformed my
                                    fitness journey. The AI tools are
                                    incredible!"
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <Users className="w-10 h-10 text-green-600 dark:text-green-400" />
                                    <div>
                                        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                                            Jane Smith
                                        </h3>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                            Health Coach
                                        </p>
                                    </div>
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-400">
                                    "The diet planning tools are a
                                    game-changer for my clients.
                                    Highly recommend!"
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <Users className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                                    <div>
                                        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                                            Alex Johnson
                                        </h3>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                            Personal Trainer
                                        </p>
                                    </div>
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-400">
                                    "The exercise tracking feature is
                                    so accurate. It saves me so much
                                    time!"
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                        Ready to Transform Your Fitness Journey?
                    </h2>
                    <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
                        Join thousands of users who have already
                        achieved their goals with us
                    </p>
                    <Link href="/auth">
                        <Button
                            size="lg"
                            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                            Get Started Now
                        </Button>
                    </Link>
                </div>
            </section>
        </>
    );
}