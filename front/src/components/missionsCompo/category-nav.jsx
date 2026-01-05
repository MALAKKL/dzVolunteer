"use client"

import { useState } from "react"

const categories = ["Nature", "Medical", "Social", "Youth", "Events", "Culture"]

function CategoryNav() {
  const [activeCategory, setActiveCategory] = useState("Nature")

  return (
    <section className="missions-category-section">
      <div className="missions-category-container">
        <h2 className="missions-category-title">Explore Our Missions</h2>
        <div className="missions-category-buttons">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={activeCategory === category ? "missions-category-btn missions-category-btn-active" : "missions-category-btn missions-category-btn-inactive"}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export { CategoryNav }
export default CategoryNav
