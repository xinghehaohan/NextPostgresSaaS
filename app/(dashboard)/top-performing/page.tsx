import TopPerformingTable from '../components/TopPerformingTable';
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarLayout, SidebarTrigger } from "@/components/ui/sidebar";

export const metadata = {
  title: 'Top Performing Analysts',
  description: 'View the top performing stock analysts and their performance metrics.',
};


export default async function TopPerformingPage() {
    const { cookies } = await import("next/headers");
    return (
      <SidebarLayout
        defaultOpen={cookies().get("sidebar:state")?.value === "true"}
      >
        <AppSidebar />
        <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
          <div className="h-full rounded-md border-2 border-dashed p-2">
            <SidebarTrigger />
            <TopPerformingTable />
          </div>
          </main>
      </SidebarLayout>
    );
  }