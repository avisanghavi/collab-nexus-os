import React from "react";

const ClosingSection = () => {
  return (
    <section className="min-h-screen bg-white py-24">
      <div className="container px-6 mx-auto">
        {/* ROI Calculator Placeholder */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-center mb-12">
            Calculate Your ROI
          </h2>
          <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-2xl">
            <p className="text-center text-gray-600">
              ROI Calculator component will go here
            </p>
          </div>
        </div>

        {/* Get in Touch Form Placeholder */}
        <div>
          <h2 className="text-4xl font-bold text-center mb-12">
            Get in Touch
          </h2>
          <div className="max-w-2xl mx-auto p-8 bg-gray-50 rounded-2xl">
            <p className="text-center text-gray-600">
              Contact form will go here
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClosingSection;
