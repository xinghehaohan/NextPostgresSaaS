import { redirect } from 'next/navigation';
import { getUser } from '@/lib/db/queries';
import Link from 'next/link';

export default async function PanteraHubCapitalPage() {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Pantera Hub Capital Insights</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Industry Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/blockchain-letters" className="p-4 border rounded hover:bg-gray-100">
            Blockchain Letters
          </Link>
          <Link href="/blog" className="p-4 border rounded hover:bg-gray-100">
            Blog
          </Link>
          <Link href="/press" className="p-4 border rounded hover:bg-gray-100">
            Press
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Quote</h2>
        <blockquote className="italic border-l-4 border-blue-500 pl-4 py-2">
          "Blockchain is a global, borderless thing - regulators need to think about it in a global context,"
          <footer className="text-sm mt-2">- Dan Morehead, Bloomberg Invest, 06/08/2023</footer>
        </blockquote>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Latest Blockchain Letters</h2>
        <ul className="space-y-4">
          <li>
            <Link href="/blockchain-letter/progressive-dream" className="text-blue-600 hover:underline">
              Progressive's Dream
            </Link>
            <span className="text-sm text-gray-500 ml-2">10/01/2024</span>
          </li>
          <li>
            <Link href="/blockchain-letter/crypto-national-stage" className="text-blue-600 hover:underline">
              Crypto Takes The National Political Stage
            </Link>
            <span className="text-sm text-gray-500 ml-2">08/13/2024</span>
          </li>
          <li>
            <Link href="/blockchain-letter/political-pivot" className="text-blue-600 hover:underline">
              Political Pivot On Blockchain
            </Link>
            <span className="text-sm text-gray-500 ml-2">07/23/2024</span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Latest Blog Posts</h2>
        <ul className="space-y-4">
          <li>
            <Link href="/blog/joining-pantera-ishanee-nagpurkar" className="text-blue-600 hover:underline">
              Joining Pantera, Ishanee Nagpurkar
            </Link>
            <span className="text-sm text-gray-500 ml-2">09/24/2024</span>
          </li>
          <li>
            <Link href="/blog/zero-to-ten-founding-team" className="text-blue-600 hover:underline">
              Zero-to-Ten: Building a Founding Team in Crypto
            </Link>
            <span className="text-sm text-gray-500 ml-2">09/17/2024</span>
          </li>
          <li>
            <Link href="/blog/investing-in-b3" className="text-blue-600 hover:underline">
              Investing in B3 (NPC Labs)
            </Link>
            <span className="text-sm text-gray-500 ml-2">08/16/2024</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
