
import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MOCK_POSTS, MOCK_USERS } from "@/lib/constants";
import Post from "@/components/Post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { UserRole } from "@/lib/constants";
import { useAuth } from "@/context/AuthContext";
import { Search, Paperclip, Image, X, FileText } from "lucide-react";

export default function Community() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'featured' | 'recent' | 'popular'>('featured');
  const [postContent, setPostContent] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [attachments, setAttachments] = useState<{type: 'image' | 'file', file: File}[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleTabChange = (tab: 'featured' | 'recent' | 'popular') => {
    setActiveTab(tab);
  };

  const handlePostSubmit = () => {
    if (!postTitle.trim()) {
      toast({
        title: "Error",
        description: "Post title cannot be empty",
        variant: "destructive"
      });
      return;
    }

    if (!postContent.trim()) {
      toast({
        title: "Error",
        description: "Post content cannot be empty",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would send the post and attachments to the backend
    toast({
      title: "Success",
      description: `Your post has been published with ${attachments.length} attachment(s)`
    });
    setPostContent('');
    setPostTitle('');
    setAttachments([]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'file') => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // In a real app, you would upload this file to a server and get a URL back
      // For now, we'll just add it to our attachments array
      setAttachments([...attachments, { type, file }]);
      
      // Reset the file input
      e.target.value = '';
    }
  };

  const handleRemoveAttachment = (index: number) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  // Filter posts based on active tab and search query
  let filteredPosts = [...MOCK_POSTS];
  
  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredPosts = filteredPosts.filter(post => 
      post.content.toLowerCase().includes(query) || 
      post.author.name.toLowerCase().includes(query) ||
      post.title.toLowerCase().includes(query) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  }
  
  // Sort based on active tab
  if (activeTab === 'recent') {
    filteredPosts.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } else if (activeTab === 'popular') {
    filteredPosts.sort((a, b) => b.likes - a.likes);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <section className="bg-gradient-to-br from-navy-50 to-cobalt-100 py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h1 className="text-3xl md:text-4xl font-display font-medium mb-4 text-navy-900">
                Community Hub
              </h1>
              <p className="text-lg text-navy-700">
                Connect, share knowledge, and grow with other startup enthusiasts
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative mb-6">
              <Input
                type="text"
                placeholder="Search posts, topics, or keywords..."
                className="pl-10 h-12 rounded-full border-cobalt-200 focus:border-cobalt-400 focus:ring focus:ring-cobalt-300 focus:ring-opacity-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cobalt-500 h-5 w-5" />
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main content */}
              <div className="lg:w-2/3">
                {/* New post form */}
                {user && (
                  <div className="mb-8 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-medium mb-4 text-navy-900">Share your thoughts</h2>
                    <div className="mb-4">
                      <Input 
                        placeholder="Post title"
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                        className="mb-3 focus:border-cobalt-400 focus:ring focus:ring-cobalt-300 focus:ring-opacity-50"
                      />
                      <textarea 
                        className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cobalt-500"
                        rows={4}
                        placeholder="What's on your mind?"
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                      ></textarea>
                    </div>

                    {/* Display attached files */}
                    {attachments.length > 0 && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <h4 className="text-sm font-medium mb-2 text-gray-700">Attachments</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {attachments.map((attachment, index) => (
                            <div key={index} className="flex items-center p-2 bg-white rounded border border-gray-200 group">
                              {attachment.type === 'image' ? (
                                <>
                                  <Image className="h-4 w-4 text-cobalt-600 mr-2" />
                                  <span className="text-sm truncate flex-grow">{attachment.file.name}</span>
                                </>
                              ) : (
                                <>
                                  <FileText className="h-4 w-4 text-cobalt-600 mr-2" />
                                  <span className="text-sm truncate flex-grow">{attachment.file.name}</span>
                                </>
                              )}
                              <button 
                                onClick={() => handleRemoveAttachment(index)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-4 w-4 text-gray-500 hover:text-red-500" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap justify-between items-center">
                      <div className="flex space-x-2 mb-2 sm:mb-0">
                        <input
                          ref={imageInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, 'image')}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => imageInputRef.current?.click()}
                          className="flex items-center border-cobalt-200 text-cobalt-700 hover:bg-cobalt-50"
                        >
                          <Image className="h-4 w-4 mr-2" />
                          Add Image
                        </Button>
                        
                        <input
                          ref={fileInputRef}
                          type="file"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, 'file')}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center border-cobalt-200 text-cobalt-700 hover:bg-cobalt-50"
                        >
                          <Paperclip className="h-4 w-4 mr-2" />
                          Add File
                        </Button>
                      </div>
                      
                      <Button 
                        onClick={handlePostSubmit}
                        className="bg-cobalt-600 hover:bg-cobalt-700"
                      >
                        Post
                      </Button>
                    </div>
                  </div>
                )}

                {/* Tabs */}
                <div className="mb-6 border-b border-gray-200">
                  <div className="flex space-x-6">
                    <button
                      className={`pb-4 text-sm font-medium ${
                        activeTab === 'featured'
                          ? 'text-cobalt-600 border-b-2 border-cobalt-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => handleTabChange('featured')}
                    >
                      Featured
                    </button>
                    <button
                      className={`pb-4 text-sm font-medium ${
                        activeTab === 'recent'
                          ? 'text-cobalt-600 border-b-2 border-cobalt-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => handleTabChange('recent')}
                    >
                      Recent
                    </button>
                    <button
                      className={`pb-4 text-sm font-medium ${
                        activeTab === 'popular'
                          ? 'text-cobalt-600 border-b-2 border-cobalt-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => handleTabChange('popular')}
                    >
                      Popular
                    </button>
                  </div>
                </div>

                {/* Search results counter when searching */}
                {searchQuery.trim() && (
                  <div className="mb-4 text-sm text-gray-500">
                    Found {filteredPosts.length} results for "{searchQuery}"
                  </div>
                )}

                {/* Posts */}
                {filteredPosts.length > 0 ? (
                  <div className="space-y-6">
                    {filteredPosts.map((post) => (
                      <Post key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border border-dashed border-gray-200 rounded-lg">
                    <p className="text-gray-500">No posts found matching your search criteria</p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:w-1/3 space-y-6">
                {/* Community stats */}
                <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-medium mb-4 text-navy-900">Community Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Members</span>
                      <span className="font-semibold">1,246</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Posts</span>
                      <span className="font-semibold">452</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Active today</span>
                      <span className="font-semibold">128</span>
                    </div>
                  </div>
                </div>

                {/* Featured members */}
                <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-medium mb-4 text-navy-900">Featured Members</h3>
                  <div className="space-y-4">
                    {MOCK_USERS.slice(0, 3).map((user) => (
                      <div key={user.id} className="flex items-center">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full mr-3 object-cover"
                        />
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <a href="/search" className="text-sm text-cobalt-600 hover:text-cobalt-700 font-medium">
                      View all members →
                    </a>
                  </div>
                </div>

                {/* Trending topics */}
                <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-medium mb-4 text-navy-900">Trending Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-cobalt-50 text-cobalt-700 rounded-full text-sm">#fundraising</span>
                    <span className="px-3 py-1 bg-cobalt-50 text-cobalt-700 rounded-full text-sm">#productmarket</span>
                    <span className="px-3 py-1 bg-cobalt-50 text-cobalt-700 rounded-full text-sm">#seed</span>
                    <span className="px-3 py-1 bg-cobalt-50 text-cobalt-700 rounded-full text-sm">#ux</span>
                    <span className="px-3 py-1 bg-cobalt-50 text-cobalt-700 rounded-full text-sm">#saas</span>
                    <span className="px-3 py-1 bg-cobalt-50 text-cobalt-700 rounded-full text-sm">#growth</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
