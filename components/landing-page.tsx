"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/contexts/language-context"
import { Search, Heart, Users, Shield } from "lucide-react"

interface LandingPageProps {
  onNavigate: (page: string) => void
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const { t } = useLanguage()
  const [searchForm, setSearchForm] = useState({
    lookingFor: "",
    ageFrom: "",
    ageTo: "",
    religion: "",
  })

  const handleSearch = () => {
    onNavigate("search")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-700 to-red-800 text-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 opacity-20">
          <div className="w-full h-full border-4 border-yellow-400 rounded-full"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-40 h-40 opacity-20">
          <div className="w-full h-full border-4 border-yellow-400 rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">{t("matrimony")}</h1>
              <p className="text-lg md:text-xl mb-8 text-red-100">{t("tagline")}</p>

              {/* Search Form */}
              <Card className="bg-white/95 backdrop-blur">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-red-800 mb-4">{t("searchPartner")}</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <Select
                      value={searchForm.lookingFor}
                      onValueChange={(value) => setSearchForm({ ...searchForm, lookingFor: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("lookingFor")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bride">{t("female")}</SelectItem>
                        <SelectItem value="groom">{t("male")}</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="grid grid-cols-2 gap-2">
                      <Select
                        value={searchForm.ageFrom}
                        onValueChange={(value) => setSearchForm({ ...searchForm, ageFrom: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={`${t("age")} From`} />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 50 }, (_, i) => i + 18).map((age) => (
                            <SelectItem key={age} value={age.toString()}>
                              {age}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select
                        value={searchForm.ageTo}
                        onValueChange={(value) => setSearchForm({ ...searchForm, ageTo: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="To" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 50 }, (_, i) => i + 18).map((age) => (
                            <SelectItem key={age} value={age.toString()}>
                              {age}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Select
                      value={searchForm.religion}
                      onValueChange={(value) => setSearchForm({ ...searchForm, religion: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("religion")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hindu">Hindu</SelectItem>
                        <SelectItem value="christian">Christian</SelectItem>
                        <SelectItem value="muslim">Muslim</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={handleSearch} className="w-full bg-red-700 hover:bg-red-800 text-white">
                    <Search className="w-4 h-4 mr-2" />
                    {t("search")}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Content - Hero Image */}
            <div className="hidden lg:block">
              <div className="relative">
                <img
                  src="/images/design-inspiration.png"
                  alt="Happy Couple"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-red-800 mb-6">{t("welcome")}</h2>
            <p className="text-lg text-gray-600 mb-8">
              Providing matrimony services to Kannada Devalanger Community since 2013.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-red-800 mb-2">1000+ Profiles</h3>
                <p className="text-gray-600">Verified profiles from our community</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-red-800 mb-2">500+ Matches</h3>
                <p className="text-gray-600">Successful marriages facilitated</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-red-800 mb-2">100% Secure</h3>
                <p className="text-gray-600">Privacy and security guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-700 to-red-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your Journey Today</h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Join thousands of happy couples who found their life partner through our platform
          </p>
          <div className="space-x-4">
            <Button
              onClick={() => onNavigate("register")}
              size="lg"
              className="bg-yellow-500 text-red-900 hover:bg-yellow-400"
            >
              {t("register")} Now
            </Button>
            <Button
              onClick={() => onNavigate("login")}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-red-800"
            >
              {t("login")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
