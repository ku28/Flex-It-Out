import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="p-5 font-sans">
            <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
            <p className="mb-4">Last updated: October 2023</p>
            <p className="mb-4">
                Welcome to our Privacy Policy page! When you use our web services, you trust us with your information. This Privacy Policy is meant to help you understand what data we collect, why we collect it, and what we do with it. This is important; we hope you will take time to read it carefully.
            </p>
            <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
            <p className="mb-4">
                We collect information to provide better services to all our users. We collect information in the following ways:
            </p>
            <ul className="list-disc list-inside mb-4">
                <li className="mb-2">Information you give us. For example, our services require you to sign up for an account. When you do, we’ll ask for personal information, like your name, email address, and telephone number.</li>
                <li className="mb-2">Information we get from your use of our services. We collect information about the services that you use and how you use them, like when you visit a website that uses our advertising services or view and interact with our ads and content.</li>
            </ul>
            <h2 className="text-2xl font-semibold mb-2">How We Use Information We Collect</h2>
            <p className="mb-4">
                We use the information we collect from all of our services to provide, maintain, protect, and improve them, to develop new ones, and to protect our users. We also use this information to offer you tailored content – like giving you more relevant search results and ads.
            </p>
            <h2 className="text-2xl font-semibold mb-2">Information We Share</h2>
            <p className="mb-4">
                We do not share personal information with companies, organizations, and individuals outside of our organization unless one of the following circumstances applies:
            </p>
            <ul className="list-disc list-inside mb-4">
                <li className="mb-2">With your consent. We will share personal information with companies, organizations, or individuals outside of our organization when we have your consent to do so.</li>
                <li className="mb-2">For legal reasons. We will share personal information with companies, organizations, or individuals outside of our organization if we have a good-faith belief that access, use, preservation, or disclosure of the information is reasonably necessary to meet any applicable law, regulation, legal process, or enforceable governmental request.</li>
            </ul>
            <h2 className="text-2xl font-semibold mb-2">Security</h2>
            <p className="mb-4">
                We work hard to protect our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold. In particular:
            </p>
            <ul className="list-disc list-inside mb-4">
                <li className="mb-2">We encrypt many of our services using SSL.</li>
                <li className="mb-2">We review our information collection, storage, and processing practices, including physical security measures, to guard against unauthorized access to systems.</li>
                <li className="mb-2">We restrict access to personal information to our employees, contractors, and agents who need to know that information in order to process it for us and who are subject to strict contractual confidentiality obligations and may be disciplined or terminated if they fail to meet these obligations.</li>
            </ul>
            <h2 className="text-2xl font-semibold mb-2">Changes</h2>
            <p className="mb-4">
                Our Privacy Policy may change from time to time. We will not reduce your rights under this Privacy Policy without your explicit consent. We will post any privacy policy changes on this page and, if the changes are significant, we will provide a more prominent notice (including, for certain services, email notification of privacy policy changes).
            </p>
            <p>
                If you have any questions about this Privacy Policy, please contact us.
            </p>
        </div>
    );
};

export default PrivacyPolicy;