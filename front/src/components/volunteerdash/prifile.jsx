"use client"

import { useState } from "react"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Badge } from "../ui/badge"
import { FiUpload, FiBriefcase, FiUser, FiFileText, FiPlus, FiX } from "react-icons/fi"

export default function ProfilePage() {
  const [imagePreview, setImagePreview] = useState(null)
  const [skills, setSkills] = useState(["Leadership", "Communication", "Teamwork"])
  const [newSkill, setNewSkill] = useState("")
  const [certificates, setCertificates] = useState([])

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const handleCertificateUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setCertificates([...certificates, file.name])
    }
  }

  return (
    <div className="p-8 bg-gradient-to-br from-background to-muted/30 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and certifications</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Image */}
        <Card className="p-8 lg:col-span-1 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-muted mb-6 overflow-hidden flex items-center justify-center border-4 border-primary/20">
            {imagePreview ? (
              <img src={imagePreview || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <FiUser className="w-16 h-16 text-muted-foreground opacity-50" />
            )}
          </div>
          <label className="w-full">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            <Button
              variant="outline"
              className="w-full cursor-pointer bg-transparent border-primary text-primary hover:bg-primary/10"
            >
              <FiUpload className="w-4 h-4 mr-2" />
              Change Photo
            </Button>
          </label>
        </Card>

        {/* Personal Details */}
        <Card className="p-8 lg:col-span-2">
          <h2 className="text-2xl font-bold text-foreground mb-6">Personal Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">First Name</label>
              <Input defaultValue="John" className="bg-muted border-border text-foreground" />
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">Last Name</label>
              <Input defaultValue="Doe" className="bg-muted border-border text-foreground" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-foreground mb-2 block">Email Address</label>
              <Input
                defaultValue="john.doe@example.com"
                type="email"
                className="bg-muted border-border text-foreground"
              />
            </div>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <label className="text-sm font-semibold text-foreground mb-4 block flex items-center gap-2">
              <FiBriefcase className="w-4 h-4 text-primary" />
              My Skills
            </label>
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="px-3 py-1.5 flex items-center gap-2 bg-secondary/10 text-secondary hover:bg-secondary/20 border-none"
                >
                  {skill}
                  <FiX className="w-3 h-3 cursor-pointer" onClick={() => removeSkill(skill)} />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a skill..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addSkill()}
                className="bg-muted border-border text-foreground"
              />
              <Button onClick={addSkill} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <FiPlus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Certificates */}
          <div className="mb-8">
            <label className="text-sm font-semibold text-foreground mb-4 block flex items-center gap-2">
              <FiFileText className="w-4 h-4 text-accent" />
              Certificates (PDF or Images)
            </label>
            <div className="space-y-3 mb-4">
              {certificates.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border"
                >
                  <span className="text-sm text-foreground truncate max-w-[200px]">{cert}</span>
                  <Badge variant="outline" className="text-xs text-primary border-primary">
                    Verified
                  </Badge>
                </div>
              ))}
            </div>
            <label>
              <input type="file" className="hidden" onChange={handleCertificateUpload} />
              <Button variant="outline" className="w-full bg-transparent border-dashed border-2 hover:bg-muted">
                <FiUpload className="w-4 h-4 mr-2" />
                Upload Certified Skill Certificate
              </Button>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-border">
            <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">Save Profile</Button>
            <Button variant="outline" className="flex-1 bg-transparent border-border">
              Discard Changes
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
