import type React from 'react';
import { PoseLandmarkerComponent } from '@/components/AI/createPoseLandmarker';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Pushup1 from '@/public/pushup1.webp';
import Pushup2 from '@/public/pushup2.webp';
import Pushup3 from '@/public/pushup3.webp';

const PushupCounter: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            <section className="py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                        AI Pushup Counter Guide
                    </h2>
                    <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        Position yourself correctly for accurate
                        pushup counting
                    </p>
                </div>

                <Card className="max-w-4xl mx-auto">
                    <CardContent className="p-6 space-y-8">
                        <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
                            <div className="relative aspect-[4/3] w-full max-w-[300px] lg:max-w-[400px]">
                                <Image
                                    src={Pushup1}
                                    alt="AI tracking points on person doing pushup"
                                    fill
                                    className="object-contain rounded-xl"
                                    priority
                                />
                            </div>
                            <div className="relative aspect-[4/3] w-full max-w-[300px] lg:max-w-[400px]">
                                <Image
                                    src={Pushup3}
                                    alt="Bac Camera Position"
                                    fill
                                    className="object-contain rounded-xl"
                                    priority
                                />
                            </div>
                            <div className="relative aspect-[4/3] w-full max-w-[300px] lg:max-w-[400px]">
                                <Image
                                    src={Pushup2}
                                    alt="Don't Place Your Camera Like This"
                                    fill
                                    className="object-contain rounded-xl"
                                    priority
                                />
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-3">
                                    Good Camera Position:
                                </h3>
                                <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                                    <li>
                                        ✅ Place device 6-8 feet away{' '}
                                    </li>
                                    <li>✅ Front Angle Only </li>
                                    <li>✅ Full body visible </li>
                                    <li>✅ Well-lit area </li>
                                </ul>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-3">
                                    Bad Camera Position:
                                </h3>
                                <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                                    <li>
                                        ❌ Wear Glasses Or Accessories{' '}
                                    </li>
                                    <li>❌ Side Angle </li>
                                    <li>❌ Face Out of Camera </li>
                                    <li>
                                        ❌ More than One People In
                                        Frame{' '}
                                    </li>
                                </ul>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-3">
                                    For Best Results:
                                </h3>
                                <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                                    <li>
                                        • Wear contrasting clothes
                                    </li>
                                    <li>• Clear area of obstacles</li>
                                    <li>• Stay in camera frame</li>
                                    <li>• Maintain proper form</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            <section>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className="text-2xl font-semibold mb-2">
                            Enable Webcam Access
                        </h1>
                        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                            Track Your Pushups Seemlessly, Give Access & Wait For Lines to track you!
                        </p>
                    </div>
                    <Card className="w-full max-w-[500px]">
                        <CardContent className="p-0">
                            <PoseLandmarkerComponent />
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default PushupCounter;
