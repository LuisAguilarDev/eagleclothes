import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Truck,
  RotateCcw,
  CreditCard,
  Mail,
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What are your shipping times?',
    answer:
      'We offer worldwide shipping with different options: Standard shipping (5-7 business days), Express shipping (2-3 business days). Free shipping on orders over $100.',
  },
  {
    question: "What's your return policy?",
    answer:
      'We offer a 30-day return policy for unworn items with original tags. Returns are free for customers in the United States. International returns may be subject to shipping fees.',
  },
  {
    question: 'How can I track my order?',
    answer:
      "Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order through your account dashboard.",
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay for secure transactions.',
  },
  {
    question: 'How do I find my size?',
    answer:
      'Each product page includes a detailed size guide. For additional assistance, our customer service team can provide specific measurements for any item.',
  },
];

const FAQAccordion = ({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) => (
  <div className="border-b border-gray-200 last:border-0">
    <button
      className="w-full py-6 flex justify-between items-center text-left hover:bg-gray-50 transition-colors duration-200"
      onClick={onClick}
    >
      <span className="font-medium text-gray-900">{question}</span>
      {isOpen ? (
        <ChevronUp className="h-5 w-5 text-gray-500" />
      ) : (
        <ChevronDown className="h-5 w-5 text-gray-500" />
      )}
    </button>
    {isOpen && (
      <div className="pb-6 pr-12 text-gray-600 leading-relaxed">{answer}</div>
    )}
  </div>
);

const HelpCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
    <div className="flex items-center gap-4 mb-3">
      <div className="p-2 bg-gray-50 rounded-lg">
        <Icon className="h-6 w-6 text-gray-600" />
      </div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

function Help() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex w-full items-center justify-center gap-3">
            <HelpCircle className="h-8 w-8 text-gray-600" />
            <h1 className="text-2xl font-bold text-gray-900">Help Center</h1>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-gray-900 mb-8">
            Quick Help
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <HelpCard
              icon={Truck}
              title="Shipping Information"
              description="Track your order and learn about our shipping options"
            />
            <HelpCard
              icon={RotateCcw}
              title="Returns & Exchanges"
              description="Learn how to return or exchange your items"
            />
            <HelpCard
              icon={CreditCard}
              title="Payment Options"
              description="View accepted payment methods and billing information"
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <FAQAccordion
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-center">
          <div className="bg-gray-50 rounded-xl p-8 inline-block">
            <Mail className="h-8 w-8 text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Still need help?
            </h2>
            <p className="text-gray-600 mb-4">
              Our customer service team is here to assist you
            </p>
            <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
              Contact Support
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Help;
