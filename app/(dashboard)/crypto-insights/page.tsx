import ChatLog from "../components/ChatLog"
import cryptoWavesData from '@/lib/db/jsonData/crypto-waves.json'
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarLayout, SidebarTrigger } from "@/components/ui/sidebar";


export default async function CryptoWavesPage() {
  const { cookies } = await import("next/headers");
  const messages = cryptoWavesData.filter(msg => msg.time || msg.body || msg.imageSrc)

  return (
    <SidebarLayout
      defaultOpen={cookies().get("sidebar:state")?.value === "true"}
    >
      <AppSidebar />
      <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
        <div className="h-full rounded-md border-2 border-dashed p-2">
          <SidebarTrigger />
          <div className="container mx-auto max-w-5xl py-4 sm:py-8 px-2 sm:px-4">
      <ChatLog messages={messages} />
    </div>
        </div>
      </main>
    </SidebarLayout>
  );
}
