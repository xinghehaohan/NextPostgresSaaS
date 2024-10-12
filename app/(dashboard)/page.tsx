import { Button } from '@/components/ui/button';
import { ArrowRight, LineChart, BarChart3, Wallet } from 'lucide-react';

export default function HomePage() {
  return (
    <main>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
                Empower Your Investments
                <span className="block text-blue-600">with PanteraHub</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Join the premier investment research platform. Get expert analysis,
                market insights, and powerful tools to make informed financial decisions.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <a href="#" target="_blank">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg px-8 py-4 inline-flex items-center justify-center">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                <LineChart className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  Expert Analysis
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  Get in-depth research and analysis from top financial experts to guide your investment decisions.
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  Comprehensive Data
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  Access a vast database of financial information, market trends, and company profiles.
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                <Wallet className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  Flexible Subscriptions
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  Choose from various subscription plans tailored to your investment needs and budget.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Ready to elevate your investment strategy?
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                Join PanteraHub today and gain access to premium investment research,
                real-time market data, and powerful analytics tools to help you make
                smarter investment decisions.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 flex justify-center lg:justify-end">
              <a href="#" target="_blank">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xl px-12 py-6 inline-flex items-center justify-center">
                  Join PanteraHub
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
