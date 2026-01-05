import Header from "../components/orgpage/header";
import { SearchSection } from "../components/orgpage/search-sec";
import { OrganizationsList } from "../components/orgpage/orga-list";
import { MissionsSection } from "../components/orgpage/mission-section";
import { Footer } from "../components/orgpage/Footer";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <SearchSection />
        <Suspense fallback={null}>
          <OrganizationsList />
        </Suspense>
        <MissionsSection />
      </main>
      <Footer />
    </div>
  )
}
