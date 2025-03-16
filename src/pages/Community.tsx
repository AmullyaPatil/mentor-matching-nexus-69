
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MOCK_POSTS, MOCK_USERS } from "@/lib/constants";
import Post from "@/components/Post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { UserRole } from "@/lib/constants";
import { useAuth } from "@/context/AuthContext";
import { Search } from "lucide-react";

export default function Community() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'featured' | 'recent' | 'popular'>('featured');
  const [postContent, setPostContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabChange = (tab: 'featured' | 'recent' | 'popular') => {
    setActiveTab(tab);
  };

  const handlePostSubmit = () => {
    if (!postContent.trim()) {
      toast({
        title: "Error",
        description: "Post content cannot be empty",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would send the post to the backend
    toast({
      title: "Success",
      description: "Your post has been published"
    });
    setPostContent('');
  };

  // Filter posts based on active tab and search query
  let filteredPosts = [...MOCK_POSTS];
  
  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredPosts = filteredPosts.filter(post => 
      post.content.toLowerCase().includes(query) || 
      post.author.name.toLowerCase().includes(query) ||
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
        <section className="bg-gradient-to-br from-teal-50 to-blue-50 py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h1 className="text-3xl md:text-4xl font-display font-medium mb-4">
                Community Hub
              </h1>
              <p className="text-lg text-muted-foreground">
                Connect, share knowledge, and grow with other startup enthusiasts
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative mb-6">
              <Input
                type="text"
                placeholder="Search posts, topics, or keywords..."
                className="pl-10 h-12 rounded-full border-teal-200 focus:border-teal-400 focus:ring focus:ring-teal-300 focus:ring-opacity-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500 h-5 w-5" />
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
                    <h2 className="text-xl font-medium mb-4">Share your thoughts</h2>
                    <div className="mb-4">
                      <textarea 
                        className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        rows={4}
                        placeholder="What's on your mind?"
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        onClick={handlePostSubmit}
                        className="bg-teal-600 hover:bg-teal-700"
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
                          ? 'text-teal-600 border-b-2 border-teal-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => handleTabChange('featured')}
                    >
                      Featured
                    </button>
                    <button
                      className={`pb-4 text-sm font-medium ${
                        activeTab === 'recent'
                          ? 'text-teal-600 border-b-2 border-teal-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => handleTabChange('recent')}
                    >
                      Recent
                    </button>
                    <button
                      className={`pb-4 text-sm font-medium ${
                        activeTab === 'popular'
                          ? 'text-teal-600 border-b-2 border-teal-600'
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
                  <h3 className="text-lg font-medium mb-4">Community Stats</h3>
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
                  <h3 className="text-lg font-medium mb-4">Featured Members</h3>
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
                    <a href="/search" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                      View all members →
                    </a>
                  </div>
                </div>

                {/* Trending topics */}
                <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-medium mb-4">Trending Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm">#fundraising</span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">#productmarket</span>
                    <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">#seed</span>
                    <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm">#ux</span>
                    <span className="px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-sm">#saas</span>
                    <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">#growth</span>
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
