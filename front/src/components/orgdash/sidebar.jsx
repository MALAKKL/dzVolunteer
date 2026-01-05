"use client"

import { FiUsers, FiBriefcase, FiUser, FiBell, FiLogOut, FiLayout } from "react-icons/fi"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../../styles/orgdash.css"
export default function Sidebar({ currentPage, onNavigate }) {
  const [hoveredItem, setHoveredItem] = useState(null)
  const [hoveredLogout, setHoveredLogout] = useState(false)
  const navigate = useNavigate();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: FiLayout },
    { id: "profile", label: "Profile", icon: FiUser },
    { id: "missions", label: "Missions", icon: FiBriefcase },
    { id: "volunteers", label: "Volunteers", icon: FiUsers },
    { id: "notifications", label: "Notifications", icon: FiBell },
  ]

  return (
    <aside 
      className="w-64 text-white flex flex-col shadow-2xl relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #0a2d2f, #0f393b, #0a2d2f)',
        borderRight: '1px solid rgba(52, 178, 106, 0.2)'
      }}
    >
      {/* Animated background effects */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom right, rgba(52, 178, 106, 0.05), transparent, rgba(52, 115, 98, 0.05))'
        }}
      ></div>
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(52, 178, 106, 0.15) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      ></div>
      
      {/* Animated glow effect */}
      <div 
        className="absolute top-0 left-0 w-full h-1 animate-pulse"
        style={{
          background: 'linear-gradient(to right, transparent, #34b26a, transparent)'
        }}
      ></div>
      
      {/* Logo Section */}
      <div 
        className="px-6 py-8 relative z-10"
        style={{
          borderBottom: '1px solid rgba(26, 91, 96, 0.3)',
          backdropFilter: 'blur(8px)',
          background: 'linear-gradient(to bottom, rgba(15, 57, 59, 0.5), transparent)'
        }}
      >
        <img 
          src="/logo2.svg" 
          alt="VolunteerHub Logo" 
          style={{ 
            width: 'auto', 
            height: '100px',
            maxWidth: '100%'
          }}
        />
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-6 relative z-10" style={{ paddingLeft: '1rem', paddingRight: '0.75rem', paddingTop: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          const isHovered = hoveredItem === item.id && !isActive
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className="group relative w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 overflow-hidden"
              style={isActive ? {
                background: 'linear-gradient(to right, #34b26a, #2ea85a, #34b26a)',
                color: 'white',
                boxShadow: '0 10px 15px -3px rgba(52, 178, 106, 0.4)',
                transform: 'scale(1.02)',
                fontWeight: '600'
              } : isHovered ? {
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                transform: 'scale(1.01)',
                boxShadow: '0 10px 15px -3px rgba(52, 178, 106, 0.1)'
              } : {
                color: 'rgba(255, 255, 255, 0.7)'
              }}
            >
              {/* Active indicator bar */}
              {isActive && (
                <div 
                  className="absolute left-0 top-0 bottom-0 rounded-r-full shadow-lg"
                  style={{
                    width: '4px',
                    background: 'white',
                    boxShadow: '0 10px 15px -3px rgba(255, 255, 255, 0.5)'
                  }}
                ></div>
              )}
              
              {/* Hover background effect */}
              {isHovered && (
                <div 
                  className="absolute inset-0 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(to right, rgba(52, 178, 106, 0.1), transparent)'
                  }}
                ></div>
              )}
              
              <Icon 
                className="w-5 h-5 relative z-10 transition-all duration-300"
                style={isActive ? {
                  transform: 'scale(1.1)',
                  filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
                } : isHovered ? {
                  transform: 'scale(1.1)',
                  color: '#34b26a'
                } : {}}
              />
              <span className="font-medium relative z-10">{item.label}</span>
              
              {isActive && (
                <div className="ml-auto relative z-10">
                  <div 
                    className="w-2 h-2 rounded-full bg-white animate-pulse shadow-lg"
                    style={{ boxShadow: '0 10px 15px -3px rgba(255, 255, 255, 0.5)' }}
                  ></div>
                  <div 
                    className="absolute inset-0 w-2 h-2 rounded-full animate-ping"
                    style={{ background: 'rgba(255, 255, 255, 0.5)' }}
                  ></div>
                </div>
              )}
            </button>
          )
        })}
        </div>
      </nav>

      {/* Logout Section */}
      <div 
        className="px-3 py-6 relative z-10"
        style={{
          borderTop: '1px solid rgba(26, 91, 96, 0.3)',
          backdropFilter: 'blur(8px)',
          background: 'linear-gradient(to top, rgba(15, 57, 59, 0.5), transparent)'
        }}
      >
        <button 
          className="group relative w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 overflow-hidden"
          style={hoveredLogout ? {
            color: '#ef8451',
            transform: 'scale(1.01)',
            boxShadow: '0 10px 15px -3px rgba(239, 132, 81, 0.2)'
          } : {
            color: 'rgba(255, 255, 255, 0.7)'
          }}
          onMouseEnter={() => setHoveredLogout(true)}
          onMouseLeave={() => setHoveredLogout(false)}
          onClick={() => navigate("/home")}
        >
          {/* Hover background */}
          {hoveredLogout && (
            <div 
              className="absolute inset-0 transition-all duration-300"
              style={{
                background: 'linear-gradient(to right, rgba(239, 132, 81, 0.1), transparent)'
              }}
            ></div>
          )}
          
          <FiLogOut 
            className="w-5 h-5 relative z-10 transition-all duration-300"
            style={hoveredLogout ? {
              transform: 'rotate(12deg) scale(1.1)'
            } : {}}
          />
          <span className="font-medium relative z-10">Logout</span>
          
          {/* Animated underline */}
          {hoveredLogout && (
            <div 
              className="absolute bottom-0 left-4 right-4 h-0.5 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(to right, transparent, #ef8451, transparent)',
                opacity: 1
              }}
            ></div>
          )}
        </button>
      </div>
    </aside>
  )
}
