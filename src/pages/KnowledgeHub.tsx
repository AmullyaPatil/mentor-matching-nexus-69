
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, Video, Newspaper, Calendar, ArrowRight, BookMarked } from "lucide-react";
import { motion } from "framer-motion";

// Mock articles
const MOCK_ARTICLES = [
  {
    id: "1",
    title: "How to Validate Your Startup Idea Before Building",
    category: "Startup",
    type: "article",
    description: "Learn the key methods to test your business idea before investing time and money.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "Jessica Miller",
    date: "June 15, 2023",
    readTime: "8 min read"
  },
  {
    id: "2",
    title: "The Ultimate Guide to Seed Fundraising",
    category: "Fundraising",
    type: "article",
    description: "A comprehensive guide to help founders navigate the seed fundraising process.",
    image: "https://images.unsplash.com/photo-1563986768817-257bf91c5e9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "Michael Chen",
    date: "May 22, 2023",
    readTime: "12 min read"
  },
  {
    id: "3",
    title: "Building a Product-Led Growth Strategy",
    category: "Growth",
    type: "article",
    description: "Strategies and tactics to implement a successful product-led growth model.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "Sarah Johnson",
    date: "April 10, 2023",
    readTime: "10 min read"
  },
  {
    id: "4",
    title: "Market Research Techniques for Early-Stage Startups",
    category: "Marketing",
    type: "video",
    description: "Learn how to conduct effective market research with limited resources.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "David Lee",
    date: "July 5, 2023",
    duration: "25 mins"
  },
  {
    id: "5",
    title: "How to Build a Minimum Viable Product",
    category: "Product",
    type: "video",
    description: "A step-by-step guide to creating your MVP and getting it to market quickly.",
    image: "https://images.unsplash.com/photo-1573164574511-73c773193279?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "Emma Wilson",
    date: "August 12, 2023",
    duration: "32 mins"
  },
  {
    id: "6",
    title: "Startup Legal Essentials Every Founder Should Know",
    category: "Legal",
    type: "video",
    description: "Key legal considerations for startups, from incorporation to IP protection.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "Robert Kim",
    date: "June 28, 2023",
    duration: "40 mins"
  },
  {
    id: "7",
    title: "AI and Machine Learning Trends for Startups",
    category: "Technology",
    type: "news",
    description: "The latest AI developments and how startups can leverage them for growth.",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "Tech Insights",
    date: "September 1, 2023"
  },
  {
    id: "8",
    title: "Venture Capital Outlook for Q4 2023",
    category: "Finance",
    type: "news",
    description: "Expert analysis on investment trends and predictions for the end of the year.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "Startup Weekly",
    date: "September 15, 2023"
  },
  {
    id: "9",
    title: "New Regulations Affecting Tech Startups in 2023",
    category: "Regulation",
    type: "news",
    description: "How recent policy changes will impact technology companies and what you need to know.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "Policy Watch",
    date: "August 30, 2023"
  }
];

// Mock events
const MOCK_EVENTS = [
  {
    id: "1",
    title: "Startup Pitch Competition",
    date: "October 15, 2023",
    time: "6:00 PM - 9:00 PM",
    location: "San Francisco, CA",
    description: "Present your startup to a panel of investors and industry experts.",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: "2",
    title: "Founder Networking Breakfast",
    date: "October 10, 2023",
    time: "8:00 AM - 10:00 AM",
    location: "New York, NY",
    description: "Connect with fellow entrepreneurs over coffee and build valuable relationships.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: "3",
    title: "VC Panel: What Investors Look For",
    date: "October 25, 2023",
    time: "5:30 PM - 7:30 PM",
    location: "Virtual",
    description: "Hear directly from top venture capitalists about what makes them invest in startups.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  }
];

export default function KnowledgeHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter content based on search and active tab
  const filteredContent = MOCK_ARTICLES.filter(item => {
    const matchesSearch = searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesTab = activeTab === "all" || 
      (activeTab === "articles" && item.type === "article") ||
      (activeTab === "videos" && item.type === "video") ||
      (activeTab === "news" && item.type === "news");
      
    return matchesSearch && matchesTab;
  });
  
  // Filter events
  const filteredEvents = MOCK_EVENTS.filter(event => 
    searchQuery === "" || 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <section className="bg-teal-600 py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-8"
            >
              <h1 className="text-3xl md:text-4xl font-display font-medium mb-4 text-white">
                Knowledge Hub
              </h1>
              <p className="text-lg text-white/80">
                Discover valuable insights, resources, and learning materials for startup growth
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-3xl mx-auto mb-12"
            >
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search articles, videos, news, and events..."
                  className="w-full h-14 px-6 py-4 border-0 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  className="absolute right-3 top-3 bg-teal-700 hover:bg-teal-800 text-white p-2 rounded-full transition-colors duration-200"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-between items-center mb-8">
                <TabsList className="bg-gray-100">
                  <TabsTrigger value="all" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="articles" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Articles
                  </TabsTrigger>
                  <TabsTrigger value="videos" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                    <Video className="h-4 w-4 mr-2" />
                    Videos
                  </TabsTrigger>
                  <TabsTrigger value="news" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                    <Newspaper className="h-4 w-4 mr-2" />
                    News
                  </TabsTrigger>
                </TabsList>
                
                <Button variant="ghost" className="text-teal-600 hover:text-teal-800 hover:bg-teal-50">
                  Browse All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <TabsContent value="all" className="mt-0">
                {filteredContent.length > 0 ? (
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {filteredContent.map((item) => (
                      <motion.div key={item.id} variants={itemVariants}>
                        <Card className="overflow-hidden h-full flex flex-col">
                          <div className="relative h-48 overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                            <div className="absolute top-3 left-3">
                              <Badge type={item.type} />
                            </div>
                          </div>
                          <CardHeader>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-medium text-teal-600 uppercase">{item.category}</span>
                              <span className="text-xs text-gray-500">{item.date}</span>
                            </div>
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                            <CardDescription className="line-clamp-2">
                              {item.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <div className="flex items-center text-sm text-gray-500">
                              <img 
                                src={`https://ui-avatars.com/api/?name=${item.author}&background=random`} 
                                alt={item.author} 
                                className="w-6 h-6 rounded-full mr-2"
                              />
                              <span>{item.author}</span>
                              <span className="mx-2">•</span>
                              <span>{item.readTime || item.duration}</span>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" className="w-full text-teal-600 border-teal-200 hover:bg-teal-50">
                              {item.type === "video" ? "Watch Video" : "Read More"}
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="text-center py-12 border border-dashed border-gray-200 rounded-lg bg-white">
                    <BookMarked className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No content found</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Try adjusting your search to find what you're looking for
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="articles" className="mt-0">
                {/* Same structure as "all" tab but filtered to articles only */}
                {filteredContent.length > 0 ? (
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {filteredContent.map((item) => (
                      <motion.div key={item.id} variants={itemVariants}>
                        <Card className="overflow-hidden h-full flex flex-col">
                          {/* Same card structure as above */}
                          <div className="relative h-48 overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                            <div className="absolute top-3 left-3">
                              <Badge type={item.type} />
                            </div>
                          </div>
                          <CardHeader>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-medium text-teal-600 uppercase">{item.category}</span>
                              <span className="text-xs text-gray-500">{item.date}</span>
                            </div>
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                            <CardDescription className="line-clamp-2">
                              {item.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <div className="flex items-center text-sm text-gray-500">
                              <img 
                                src={`https://ui-avatars.com/api/?name=${item.author}&background=random`} 
                                alt={item.author} 
                                className="w-6 h-6 rounded-full mr-2"
                              />
                              <span>{item.author}</span>
                              <span className="mx-2">•</span>
                              <span>{item.readTime || item.duration}</span>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" className="w-full text-teal-600 border-teal-200 hover:bg-teal-50">
                              Read More
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="text-center py-12 border border-dashed border-gray-200 rounded-lg bg-white">
                    <BookOpen className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No articles found</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Try adjusting your search to find what you're looking for
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="videos" className="mt-0">
                {/* Similar structure for videos tab */}
                {filteredContent.length > 0 ? (
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {filteredContent.map((item) => (
                      <motion.div key={item.id} variants={itemVariants}>
                        <Card className="overflow-hidden h-full flex flex-col">
                          {/* Similar card content for videos */}
                          <div className="relative h-48 overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-black/30 p-4 rounded-full">
                                <Video className="h-8 w-8 text-white" />
                              </div>
                            </div>
                            <div className="absolute top-3 left-3">
                              <Badge type={item.type} />
                            </div>
                          </div>
                          <CardHeader>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-medium text-teal-600 uppercase">{item.category}</span>
                              <span className="text-xs text-gray-500">{item.date}</span>
                            </div>
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                            <CardDescription className="line-clamp-2">
                              {item.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <div className="flex items-center text-sm text-gray-500">
                              <img 
                                src={`https://ui-avatars.com/api/?name=${item.author}&background=random`} 
                                alt={item.author} 
                                className="w-6 h-6 rounded-full mr-2"
                              />
                              <span>{item.author}</span>
                              <span className="mx-2">•</span>
                              <span>{item.duration}</span>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" className="w-full text-teal-600 border-teal-200 hover:bg-teal-50">
                              Watch Video
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="text-center py-12 border border-dashed border-gray-200 rounded-lg bg-white">
                    <Video className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No videos found</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Try adjusting your search to find what you're looking for
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="news" className="mt-0">
                {/* Similar structure for news tab */}
                {filteredContent.length > 0 ? (
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {filteredContent.map((item) => (
                      <motion.div key={item.id} variants={itemVariants}>
                        <Card className="overflow-hidden h-full flex flex-col">
                          {/* Similar card content for news */}
                          <div className="relative h-48 overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                            <div className="absolute top-3 left-3">
                              <Badge type={item.type} />
                            </div>
                          </div>
                          <CardHeader>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-medium text-teal-600 uppercase">{item.category}</span>
                              <span className="text-xs text-gray-500">{item.date}</span>
                            </div>
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                            <CardDescription className="line-clamp-2">
                              {item.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <div className="flex items-center text-sm text-gray-500">
                              <img 
                                src={`https://ui-avatars.com/api/?name=${item.author}&background=random`} 
                                alt={item.author} 
                                className="w-6 h-6 rounded-full mr-2"
                              />
                              <span>{item.author}</span>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" className="w-full text-teal-600 border-teal-200 hover:bg-teal-50">
                              Read More
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="text-center py-12 border border-dashed border-gray-200 rounded-lg bg-white">
                    <Newspaper className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No news found</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Try adjusting your search to find what you're looking for
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
            
            {/* Upcoming Events Section */}
            <div className="mt-16">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-display font-medium">Upcoming Events</h2>
                <Button variant="ghost" className="text-teal-600 hover:text-teal-800 hover:bg-teal-50">
                  View All Events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              {filteredEvents.length > 0 ? (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  {filteredEvents.map((event) => (
                    <motion.div key={event.id} variants={itemVariants}>
                      <Card className="overflow-hidden h-full flex flex-col">
                        <div className="relative h-40 overflow-hidden">
                          <img 
                            src={event.image} 
                            alt={event.title} 
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <div className="absolute top-3 left-3">
                            <div className="bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                              Event
                            </div>
                          </div>
                        </div>
                        <CardHeader>
                          <div className="flex items-center mb-2">
                            <Calendar className="h-4 w-4 text-teal-600 mr-2" />
                            <span className="text-sm text-gray-700">{event.date} • {event.time}</span>
                          </div>
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <CardDescription>
                            {event.location}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-sm text-gray-600 line-clamp-3">
                            {event.description}
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full text-teal-600 border-teal-200 hover:bg-teal-50">
                            Register Now
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12 border border-dashed border-gray-200 rounded-lg bg-white">
                  <Calendar className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No upcoming events</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Check back later for new events
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Badge({ type }: { type: string }) {
  let bgColor, textColor, icon;
  
  switch (type) {
    case 'article':
      bgColor = 'bg-purple-100';
      textColor = 'text-purple-700';
      icon = <BookOpen className="h-3 w-3 mr-1" />;
      break;
    case 'video':
      bgColor = 'bg-red-100';
      textColor = 'text-red-700';
      icon = <Video className="h-3 w-3 mr-1" />;
      break;
    case 'news':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-700';
      icon = <Newspaper className="h-3 w-3 mr-1" />;
      break;
    default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-700';
      icon = null;
  }
  
  return (
    <div className={`${bgColor} ${textColor} px-3 py-1 rounded-full text-xs font-medium flex items-center`}>
      {icon}
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </div>
  );
}
