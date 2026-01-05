import Header from "../components/missionsCompo/header"
import { HeroSection } from "../components/missionsCompo/hero-section"
import { CategoryNav } from "../components/missionsCompo/category-nav"
import { MissionsList } from "../components/missionsCompo/missions-list"
import { OrganizationsSection } from "../components/missionsCompo/organizations-section"
import { Footer } from "../components/missionsCompo/footer"
import "../styles/missionspage.css"

export default function MissionsPage() {
  return (
    <div className="missions-page">
      <Header />
      <main style={{flex: 1}}>
        <HeroSection />
        <CategoryNav />
        <MissionsList />
        <OrganizationsSection />
      </main>
      <Footer />
    </div>
  )
}
