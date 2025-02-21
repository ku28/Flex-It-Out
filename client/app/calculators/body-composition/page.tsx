import { BMICalculator } from '@/components/calculators/BmiCalculator';
import FeetInchesCalculator from '@/components/calculators/FeetToInchesCalculator';

export default function BodyComposition() {
    return (
        <div>
            <div className="max-w-7xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
                    Body Composition Calculators
                </h1>
                <p className="text-lg text-gray-600">
                    Use our interactive tools to track your body
                    composition and health.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white shadow-lg rounded-lg transform hover:scale-[1.01] transition-transform duration-300">
                    <BMICalculator />
                </div>

                <div className="bg-white shadow-lg rounded-lg transform hover:scale-[1.01] transition-transform duration-300">
                    <FeetInchesCalculator />
                </div>

                {/* Add other calculators here */}
                {/* <div className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Body Fat Calculator</h2>
                    <BodyFatCalculator />
                </div> */}
            </div>
        </div>
    );
}
