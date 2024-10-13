import { Button } from "@/components/ui/button";
import { ArrowRight, LineChart, BarChart3, Wallet,Magnet } from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: LineChart,
      title: "Expert Analysis",
      description:
        "Get in-depth research and analysis from top financial experts to guide your investment decisions.",
    },
    {
      icon: BarChart3,
      title: "Comprehensive Data",
      description:
        "Access a vast database of financial information, market trends, and company profiles.",
    },
    {
      icon: Wallet,
      title: "Flexible Subscriptions",
      description:
        "Choose from various subscription plans tailored to your investment needs and budget.",
    },
    {
      icon: Magnet,
      title: "Flexible Subscriptions",
      description:
        "Choose from various subscription plans tailored to your investment needs and budget.",
    },
  ];

  const subFeatures = [
    {
      icon: LineChart,
      title: "Expert Analysis",
      description:
        "Get in-depth research and analysis from top financial experts to guide your investment decisions.",
    },
    {
      icon: BarChart3,
      title: "Comprehensive Data",
      description:
        "Access a vast database of financial information, market trends, and company profiles.",
    },
    {
      icon: Wallet,
      title: "Flexible Subscriptions",
      description:
        "Choose from various subscription plans tailored to your investment needs and budget.",
    }
  ];

  return (
    <main className="flex-1">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <div className="flex flex-col justify-center space-y-6">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Empower Your Investments
                  <span className="block text-primary">with PanteraHub</span>
                </h1>
                <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl">
                  Join the premier investment research platform. Get expert
                  analysis, market insights, and powerful tools to make informed
                  financial decisions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <a href="#" target="_blank">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto inline-flex items-center justify-center"
                    >
                      Start Your Free Trial
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                </div>
              </div>
              <div className="mt-8 lg:mt-0 grid gap-6 md:grid-cols-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex flex-col items-center text-center p-4 bg-secondary rounded-lg">
                    <feature.icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 w-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {subFeatures.map((feature, index) => (
                <div className="flex flex-col items-center space-y-4 text-center" key={`${index}-subFeature`}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h2 className="text-xl font-bold">{feature.title}</h2>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 w-full">
          <div className=" container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Ready to elevate your investment strategy?
                </h2>
                <p className="mt-3 max-w-3xl text-muted-foreground">
                  Join PanteraHub today and gain access to premium investment
                  research, real-time market data, and powerful analytics tools
                  to help you make smarter investment decisions.
                </p>
              </div>
              <div className="flex justify-center lg:justify-end">
                <a href="#" target="_blank">
                  <Button size="lg" className="rounded-full text-xl px-12 py-6">
                    Join PanteraHub
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
