"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  fullName: string
  phoneNumber: string
  gender: "male" | "female"
  role: "admin" | "user"
  subscriptionCategory?: "yellow" | "green" | "blue"
}

interface AuthContextType {
  user: User | null
  login: (phoneNumber: string, password: string) => Promise<boolean>
  register: (userData: RegisterData) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

interface RegisterData {
  fullName: string
  gender: "male" | "female"
  dateOfBirth: string
  maritalStatus: "first" | "remarriage"
  phoneNumber: string
  password: string
  subscriptionCategory?: "yellow" | "green" | "blue"
}

const AuthContext = createContext<AuthContextType | null>(null)

// Mock data for demo
const mockUsers: (User & { password: string })[] = [
  {
    id: "1",
    fullName: "Admin User",
    phoneNumber: "9876543210",
    password: "admin123",
    gender: "male",
    role: "admin",
  },
  {
    id: "2",
    fullName: "Priya S",
    phoneNumber: "9876543211",
    password: "user123",
    gender: "female",
    role: "user",
    subscriptionCategory: "yellow",
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (phoneNumber: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers.find((u) => u.phoneNumber === phoneNumber && u.password === password)

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser: User = {
      id: Date.now().toString(),
      fullName: userData.fullName,
      phoneNumber: userData.phoneNumber,
      gender: userData.gender,
      role: "user",
      subscriptionCategory: userData.subscriptionCategory || "yellow",
    }

    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
