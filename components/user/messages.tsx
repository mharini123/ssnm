"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, Search, Phone, Video, MoreVertical, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

interface MessagesProps {
  onNavigate: (page: string) => void
  selectedProfileId?: string
}

const mockConversations = [
  {
    id: "1",
    profileId: "1",
    name: "Anitha K",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thank you for your interest. I would like to know more about you.",
    lastMessageTime: "2 hours ago",
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: "2",
    profileId: "2",
    name: "Lakshmi P",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Hi! I saw your profile and found it interesting.",
    lastMessageTime: "1 day ago",
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "3",
    profileId: "3",
    name: "Priya M",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Would you like to have a phone conversation?",
    lastMessageTime: "3 days ago",
    unreadCount: 1,
    isOnline: true,
  },
]

const mockMessages = [
  {
    id: "1",
    senderId: "1",
    senderName: "Anitha K",
    message: "Hi! Thank you for expressing interest in my profile.",
    timestamp: "2024-03-15T10:30:00Z",
    isOwn: false,
  },
  {
    id: "2",
    senderId: "current",
    senderName: "You",
    message: "Hello! I found your profile very interesting. Would you like to know more about me?",
    timestamp: "2024-03-15T10:35:00Z",
    isOwn: true,
  },
  {
    id: "3",
    senderId: "1",
    senderName: "Anitha K",
    message: "Yes, I would love to know more about you. Can you tell me about your family background?",
    timestamp: "2024-03-15T10:40:00Z",
    isOwn: false,
  },
  {
    id: "4",
    senderId: "current",
    senderName: "You",
    message:
      "I come from a traditional joint family. My father is in business and my mother is a homemaker. We have strong family values and believe in maintaining our cultural traditions.",
    timestamp: "2024-03-15T10:45:00Z",
    isOwn: true,
  },
  {
    id: "5",
    senderId: "1",
    senderName: "Anitha K",
    message: "That sounds wonderful. I also come from a traditional family. What are your hobbies and interests?",
    timestamp: "2024-03-15T11:00:00Z",
    isOwn: false,
  },
]

export function Messages({ onNavigate, selectedProfileId }: MessagesProps) {
  const { t } = useLanguage()
  const { user } = useAuth()
  const { toast } = useToast()
  const [selectedConversation, setSelectedConversation] = useState(selectedProfileId || "1")
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [messages, setMessages] = useState(mockMessages)
  const [conversations, setConversations] = useState(mockConversations)

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const currentConversation = conversations.find((conv) => conv.profileId === selectedConversation)
  const conversationMessages = messages.filter(
    (msg) => msg.senderId === selectedConversation || msg.senderId === "current",
  )

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message = {
      id: Date.now().toString(),
      senderId: "current",
      senderName: "You",
      message: newMessage,
      timestamp: new Date().toISOString(),
      isOwn: true,
    }

    setMessages((prev) => [...prev, message])

    // Update conversation last message
    setConversations((prev) =>
      prev.map((conv) =>
        conv.profileId === selectedConversation ? { ...conv, lastMessage: newMessage, lastMessageTime: "now" } : conv,
      ),
    )

    setNewMessage("")

    toast({
      title: t("messageSent"),
      description: `Message sent to ${currentConversation?.name}`,
    })
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return t("today")
    } else if (date.toDateString() === yesterday.toDateString()) {
      return t("yesterday")
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <div className="h-[calc(100vh-12rem)] flex">
      {/* Conversations List */}
      <div className={`w-full md:w-1/3 border-r ${selectedConversation ? "hidden md:block" : "block"}`}>
        <Card className="h-full rounded-none border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              {t("messages")}
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder={`${t("search")} ${t("messages").toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-20rem)]">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedConversation === conversation.profileId ? "bg-red-50 border-r-4 border-r-red-600" : ""
                  }`}
                  onClick={() => setSelectedConversation(conversation.profileId)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {conversation.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold truncate">{conversation.name}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{conversation.lastMessageTime}</span>
                          {conversation.unreadCount > 0 && (
                            <Badge className="bg-red-600 text-white text-xs px-2 py-1">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 ${selectedConversation ? "block" : "hidden md:block"}`}>
        {currentConversation ? (
          <Card className="h-full rounded-none border-0 flex flex-col">
            {/* Chat Header */}
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setSelectedConversation("")}>
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={currentConversation.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{currentConversation.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {currentConversation.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{currentConversation.name}</h3>
                    <p className="text-sm text-gray-600">
                      {currentConversation.isOnline ? "Online" : `Last seen ${currentConversation.lastMessageTime}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-[calc(100vh-24rem)] p-4">
                <div className="space-y-4">
                  {conversationMessages.map((message, index) => {
                    const showDate =
                      index === 0 ||
                      formatDate(message.timestamp) !== formatDate(conversationMessages[index - 1].timestamp)

                    return (
                      <div key={message.id}>
                        {showDate && (
                          <div className="text-center my-4">
                            <span className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-600">
                              {formatDate(message.timestamp)}
                            </span>
                          </div>
                        )}
                        <div className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.isOwn ? "bg-red-600 text-white" : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <p className="text-sm">{message.message}</p>
                            <p className={`text-xs mt-1 ${message.isOwn ? "text-red-100" : "text-gray-500"}`}>
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>
            </CardContent>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Textarea
                  placeholder={`${t("sendMessage")} ${currentConversation.name}...`}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 min-h-[40px] max-h-[120px] resize-none"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Select a conversation</h3>
              <p className="text-gray-500">Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
