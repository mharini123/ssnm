"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "ta"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Common
    home: "Home",
    search: "Search",
    about: "About",
    contact: "Contact",
    profile: "Profile",
    login: "Login",
    register: "Register",
    dashboard: "Dashboard",
    logout: "Logout",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    close: "Close",
    back: "Back",
    next: "Next",
    previous: "Previous",
    submit: "Submit",
    loading: "Loading",
    yes: "Yes",
    no: "No",

    // Navigation
    browseProfiles: "Browse Profiles",
    advancedSearch: "Advanced Search",
    favorites: "Favorites",
    messages: "Messages",
    settings: "Settings",
    myProfile: "My Profile",

    // Landing page
    matrimony: "MATRIMONY",
    tagline: "Providing matrimony services to Kannada Devangar community since 2013",
    searchPartner: "Search for Your Partner",
    lookingFor: "Looking For",
    age: "Age",
    religion: "Religion",
    welcome: "Welcome to Sri Sodeswari Amman Narpani Mandram",

    // Auth
    phoneNumber: "Phone Number",
    password: "Password",
    confirmPassword: "Confirm Password",
    fullName: "Full Name",
    gender: "Gender",
    male: "Male",
    female: "Female",
    dateOfBirth: "Date of Birth",
    maritalStatus: "Marital Status",
    first: "First",
    remarriage: "Remarriage",

    // Dashboard
    totalProfiles: "Total Profiles",
    pendingApprovals: "Pending Approvals",
    tamilUsers: "Tamil Users",
    recentMessages: "Recent Messages",
    profileViews: "Profile Views",
    interestsReceived: "Interests Received",
    activeUsers: "Active Users",
    successfulMatches: "Successful Matches",

    // Profile Details
    basicDetails: "Basic Details",
    height: "Height",
    weight: "Weight",
    neverMarried: "Never Married",
    divorced: "Divorced",
    widowed: "Widowed",
    separated: "Separated",
    education: "Education",
    occupation: "Occupation",
    income: "Annual Income",
    religiousInfo: "Religious Information",
    caste: "Caste",
    subCaste: "Sub Caste",
    gotra: "Gotra",
    star: "Star",
    rashi: "Rashi",
    motherTongue: "Mother Tongue",
    familyDetails: "Family Details",
    fatherName: "Father's Name",
    motherName: "Mother's Name",
    fatherOccupation: "Father's Occupation",
    motherOccupation: "Mother's Occupation",
    siblings: "Siblings",
    familyType: "Family Type",
    familyStatus: "Family Status",
    familyValues: "Family Values",
    aboutMe: "About Me",
    partnerPreferences: "Partner Preferences",
    contactDetails: "Contact Details",
    address: "Address",
    city: "City",
    state: "State",
    country: "Country",
    pincode: "Pincode",

    // Subscription
    subscriptionCategory: "Subscription Category",
    yellow: "Yellow",
    green: "Green",
    blue: "Blue",

    // Actions
    viewProfile: "View Profile",
    editProfile: "Edit Profile",
    block: "Block",
    unblock: "Unblock",
    view: "View",
    createUser: "Create User",
    bulkPrint: "Bulk Print",
    reportIssue: "Report Issue",
    sendMessage: "Send Message",
    expressInterest: "Express Interest",
    addToFavorites: "Add to Favorites",
    removeFromFavorites: "Remove from Favorites",
    shortlist: "Shortlist",
    contactNow: "Contact Now",

    // Search & Filters
    ageRange: "Age Range",
    heightRange: "Height Range",
    location: "Location",
    clearFilters: "Clear Filters",
    applyFilters: "Apply Filters",
    searchResults: "Search Results",
    noResultsFound: "No results found",
    refineSearch: "Refine your search",

    // Messages
    ageValidation: "Age must be above 18",
    passwordMatch: "Passwords must match",
    phoneValidation: "Phone number must be 10 digits",
    loginSuccess: "Login successful",
    registrationSuccess: "Registration successful",
    profileUpdated: "Profile updated successfully",
    messageSent: "Message sent successfully",
    interestSent: "Interest expressed successfully",
    addedToFavorites: "Added to favorites",
    removedFromFavorites: "Removed from favorites",

    // Profile Status
    active: "Active",
    inactive: "Inactive",
    pending: "Pending",
    blocked: "Blocked",
    verified: "Verified",
    unverified: "Unverified",

    // Lifestyle
    diet: "Diet",
    vegetarian: "Vegetarian",
    nonVegetarian: "Non-Vegetarian",
    vegan: "Vegan",
    jainVegetarian: "Jain Vegetarian",
    smoking: "Smoking",
    drinking: "Drinking",
    occasionally: "Occasionally",
    regularly: "Regularly",
    never: "Never",

    // Physical Attributes
    bodyType: "Body Type",
    complexion: "Complexion",
    physicalStatus: "Physical Status",
    normal: "Normal",
    physicallyDisabled: "Physically Disabled",

    // Education Levels
    highSchool: "High School",
    diploma: "Diploma",
    bachelors: "Bachelor's Degree",
    masters: "Master's Degree",
    phd: "PhD",
    professional: "Professional Degree",

    // Occupations
    software: "Software Professional",
    doctor: "Doctor",
    engineer: "Engineer",
    teacher: "Teacher",
    business: "Business",
    government: "Government Employee",
    lawyer: "Lawyer",
    accountant: "Accountant",
    nurse: "Nurse",
    other: "Other",

    // Family Types
    joint: "Joint Family",
    nuclear: "Nuclear Family",
    middleClass: "Middle Class",
    upperMiddleClass: "Upper Middle Class",
    rich: "Rich",
    orthodox: "Orthodox",
    traditional: "Traditional",
    moderate: "Moderate",
    liberal: "Liberal",

    // Time
    today: "Today",
    yesterday: "Yesterday",
    thisWeek: "This Week",
    thisMonth: "This Month",
    hoursAgo: "hours ago",
    daysAgo: "days ago",
    weeksAgo: "weeks ago",
    monthsAgo: "months ago",

    // Compatibility
    compatibility: "Compatibility",
    perfectMatch: "Perfect Match",
    goodMatch: "Good Match",
    averageMatch: "Average Match",
    lowMatch: "Low Match",

    // Contact & Support
    contactInformation: "Contact Information",
    whatsappSupport: "WhatsApp Support",
    responseTime: "Response Time",
    supportHours: "Support Hours",
    quickActions: "Quick Actions",
    profileHelp: "Profile Help",
    searchIssues: "Search Issues",
    messagingHelp: "Messaging Help",
    paymentSupport: "Payment Support",
  },
  ta: {
    // Common
    home: "முகப்பு",
    search: "தேடல்",
    about: "பற்றி",
    contact: "தொடர்பு",
    profile: "சுயவிவரம்",
    login: "உள்நுழைவு",
    register: "பதிவு",
    dashboard: "டாஷ்போர்டு",
    logout: "வெளியேறு",
    save: "சேமி",
    cancel: "ரத்து",
    edit: "திருத்து",
    delete: "நீக்கு",
    close: "மூடு",
    back: "பின்",
    next: "அடுத்து",
    previous: "முந்தைய",
    submit: "சமர்ப்பி",
    loading: "ஏற்றுகிறது",
    yes: "ஆம்",
    no: "இல்லை",

    // Navigation
    browseProfiles: "சுயவிவரங்களை உலாவு",
    advancedSearch: "மேம்பட்ட தேடல்",
    favorites: "விருப்பங்கள்",
    messages: "செய்திகள்",
    settings: "அமைப்புகள்",
    myProfile: "என் சுயவிவரம்",

    // Landing page
    matrimony: "திருமணம்",
    tagline: "2013 முதல் கன்னட தேவங்கர் சமுதாயத்திற்கு திருமண சேவைகள் வழங்குகிறது",
    searchPartner: "உங்கள் வாழ்க்கைத் துணையைத் தேடுங்கள்",
    lookingFor: "தேடுகிறேன்",
    age: "வயது",
    religion: "மதம்",
    welcome: "ஸ்ரீ சௌதேஸ்வரி அம்மன் நார்பணி மண்டலத்திற்கு வரவேற்கிறோம்",

    // Auth
    phoneNumber: "தொலைபேசி எண்",
    password: "கடவுச்சொல்",
    confirmPassword: "கடவுச்சொல்லை உறுதிப்படுத்து",
    fullName: "முழு பெயர்",
    gender: "பாலினம்",
    male: "ஆண்",
    female: "பெண்",
    dateOfBirth: "பிறந்த தேதி",
    maritalStatus: "திருமண நிலை",
    first: "முதல்",
    remarriage: "மறுமணம்",

    // Dashboard
    totalProfiles: "மொத்த சுயவிவரங்கள்",
    pendingApprovals: "நிலுவையில் உள்ள அனுமதிகள்",
    tamilUsers: "தமிழ் பயனர்கள்",
    recentMessages: "சமீபத்திய செய்திகள்",
    profileViews: "சுயவிவர பார்வைகள்",
    interestsReceived: "பெறப்பட்ட ஆர்வங்கள்",
    activeUsers: "செயலில் உள்ள பயனர்கள்",
    successfulMatches: "வெற்றிகரமான பொருத்தங்கள்",

    // Profile Details
    basicDetails: "அடிப்படை விவரங்கள்",
    height: "உயரம்",
    weight: "எடை",
    neverMarried: "திருமணமாகாதவர்",
    divorced: "விவாகரத்து",
    widowed: "விதவை",
    separated: "பிரிந்தவர்",
    education: "கல்வி",
    occupation: "தொழில்",
    income: "ஆண்டு வருமானம்",
    religiousInfo: "மத தகவல்",
    caste: "சாதி",
    subCaste: "துணை சாதி",
    gotra: "கோத்திரம்",
    star: "நட்சத்திரம்",
    rashi: "ராசி",
    motherTongue: "தாய்மொழி",
    familyDetails: "குடும்ப விவரங்கள்",
    fatherName: "தந்தையின் பெயர்",
    motherName: "தாயின் பெயர்",
    fatherOccupation: "தந்தையின் தொழில்",
    motherOccupation: "தாயின் தொழில்",
    siblings: "உடன்பிறந்தவர்கள்",
    familyType: "குடும்ப வகை",
    familyStatus: "குடும்ப நிலை",
    familyValues: "குடும்ப மதிப்புகள்",
    aboutMe: "என்னைப் பற்றி",
    partnerPreferences: "துணை விருப்பங்கள்",
    contactDetails: "தொடர்பு விவரங்கள்",
    address: "முகவரி",
    city: "நகரம்",
    state: "மாநிலம்",
    country: "நாடு",
    pincode: "அஞ்சல் குறியீடு",

    // Subscription
    subscriptionCategory: "சந்தா வகை",
    yellow: "மஞ்சள்",
    green: "பச்சை",
    blue: "நீலம்",

    // Actions
    viewProfile: "சுயவிவரம் பார்க்க",
    editProfile: "சுயவிவரம் திருத்து",
    block: "தடு",
    unblock: "தடையை நீக்கு",
    view: "பார்",
    createUser: "பயனர் உருவாக்கு",
    bulkPrint: "மொத்த அச்சு",
    reportIssue: "சிக்கலைப் புகாரளி",
    sendMessage: "செய்தி அனுப்பு",
    expressInterest: "ஆர்வம் தெரிவி",
    addToFavorites: "விருப்பங்களில் சேர்",
    removeFromFavorites: "விருப்பங்களில் இருந்து நீக்கு",
    shortlist: "குறுகிய பட்டியல்",
    contactNow: "இப்போது தொடர்பு கொள்ளுங்கள்",

    // Search & Filters
    ageRange: "வயது வரம்பு",
    heightRange: "உயர வரம்பு",
    location: "இடம்",
    clearFilters: "வடிகட்டிகளை அழி",
    applyFilters: "வடிகட்டிகளைப் பயன்படுத்து",
    searchResults: "தேடல் முடிவுகள்",
    noResultsFound: "முடிவுகள் எதுவும் கிடைக்கவில்லை",
    refineSearch: "உங்கள் தேடலை மேம்படுத்துங்கள்",

    // Messages
    ageValidation: "வயது 18க்கு மேல் இருக்க வேண்டும்",
    passwordMatch: "கடவுச்சொற்கள் பொருந்த வேண்டும்",
    phoneValidation: "தொலைபேசி எண் 10 இலக்கமாக இருக்க வேண்டும்",
    loginSuccess: "உள்நுழைவு வெற்றிகரமானது",
    registrationSuccess: "பதிவு வெற்றிகரமானது",
    profileUpdated: "சுயவிவரம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது",
    messageSent: "செய்தி வெற்றிகரமாக அனுப்பப்பட்டது",
    interestSent: "ஆர்வம் வெற்றிகரமாக தெரிவிக்கப்பட்டது",
    addedToFavorites: "விருப்பங்களில் சேர்க்கப்பட்டது",
    removedFromFavorites: "விருப்பங்களில் இருந்து நீக்கப்பட்டது",

    // Profile Status
    active: "செயலில்",
    inactive: "செயலில் இல்லை",
    pending: "நிலுவையில்",
    blocked: "தடுக்கப்பட்டது",
    verified: "சரிபார்க்கப்பட்டது",
    unverified: "சரிபார்க்கப்படவில்லை",

    // Lifestyle
    diet: "உணவு",
    vegetarian: "சைவம்",
    nonVegetarian: "அசைவம்",
    vegan: "வீகன்",
    jainVegetarian: "ஜைன சைவம்",
    smoking: "புகைபிடித்தல்",
    drinking: "குடித்தல்",
    occasionally: "எப்போதாவது",
    regularly: "தொடர்ந்து",
    never: "ஒருபோதும் இல்லை",

    // Physical Attributes
    bodyType: "உடல் வகை",
    complexion: "நிறம்",
    physicalStatus: "உடல் நிலை",
    normal: "சாதாரண",
    physicallyDisabled: "உடல் ஊனமுற்றவர்",

    // Education Levels
    highSchool: "உயர்நிலைப் பள்ளி",
    diploma: "டிப்ளோமா",
    bachelors: "இளங்கலை பட்டம்",
    masters: "முதுகலை பட்டம்",
    phd: "முனைவர் பட்டம்",
    professional: "தொழில்முறை பட்டம்",

    // Occupations
    software: "மென்பொருள் நிபுணர்",
    doctor: "மருத்துவர்",
    engineer: "பொறியாளர்",
    teacher: "ஆசிரியர்",
    business: "வணிகம்",
    government: "அரசு ஊழியர்",
    lawyer: "வழக்கறிஞர்",
    accountant: "கணக்காளர்",
    nurse: "செவிலியர்",
    other: "மற்றவை",

    // Family Types
    joint: "கூட்டுக் குடும்பம்",
    nuclear: "தனிக் குடும்பம்",
    middleClass: "நடுத்தர வர்க்கம்",
    upperMiddleClass: "உயர் நடுத்தர வர்க்கம்",
    rich: "பணக்காரர்",
    orthodox: "மரபுவழி",
    traditional: "பாரம்பரிய",
    moderate: "மிதமான",
    liberal: "தாராளவாத",

    // Time
    today: "இன்று",
    yesterday: "நேற்று",
    thisWeek: "இந்த வாரம்",
    thisMonth: "இந்த மாதம்",
    hoursAgo: "மணி நேரங்களுக்கு முன்",
    daysAgo: "நாட்களுக்கு முன்",
    weeksAgo: "வாரங்களுக்கு முன்",
    monthsAgo: "மாதங்களுக்கு முன்",

    // Compatibility
    compatibility: "பொருத்தம்",
    perfectMatch: "சரியான பொருத்தம்",
    goodMatch: "நல்ல பொருத்தம்",
    averageMatch: "சராசரி பொருத்தம்",
    lowMatch: "குறைந்த பொருத்தம்",

    // Contact & Support
    contactInformation: "தொடர்பு தகவல்",
    whatsappSupport: "வாட்ஸ்அப் ஆதரவு",
    responseTime: "பதில் நேரம்",
    supportHours: "ஆதரவு நேரம்",
    quickActions: "விரைவு செயல்கள்",
    profileHelp: "சுயவிவர உதவி",
    searchIssues: "தேடல் சிக்கல்கள்",
    messagingHelp: "செய்தி உதவி",
    paymentSupport: "கட்டண ஆதரவு",
  },
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language
    if (savedLang && (savedLang === "en" || savedLang === "ta")) {
      setLanguage(savedLang)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
