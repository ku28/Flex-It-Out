'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/card';

export function BMICalculator() {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBMI] = useState<number | null>(null);

    const calculateBMI = () => {
        const heightInM = parseFloat(height) / 100;
        const weightInKg = parseFloat(weight);
        const calculatedBMI = weightInKg / (heightInM * heightInM);
        setBMI(parseFloat(calculatedBMI.toFixed(1)));
    };

    return (
        <Card className="p-6 shadow-lg rounded-lg transform transition-transform duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                BMI Calculator
            </h2>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Height (cm)
                    </label>
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="Enter your height in cm"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weight (kg)
                    </label>
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="Enter your weight in kg"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    onClick={calculateBMI}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Calculate BMI
                </button>
                {bmi !== null && (
                    <div className="mt-6">
                        <p className="text-lg font-semibold text-gray-800">
                            Your BMI: {bmi}
                        </p>
                        <p className="text-sm text-gray-600">
                            {bmi < 18.5
                                ? 'Underweight'
                                : bmi < 25
                                ? 'Normal weight'
                                : bmi < 30
                                ? 'Overweight'
                                : 'Obese'}
                        </p>
                    </div>
                )}
            </div>
        </Card>
    );
}
