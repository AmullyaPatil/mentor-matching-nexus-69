
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MOCK_USERS } from "@/lib/constants";
import { toast } from "sonner";
import { Video, Mic, MessageSquare } from "lucide-react";

export default function ConnectionInterface() {
  const [selectedTab, setSelectedTab] = useState("chat");
  const [message, setMessage] = useState("");
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // In a real app, you would send the message to a backend
    toast.success("Message sent successfully");
    setMessage("");
  };
  
  const handleCall = (type: 'voice' | 'video') => {
    // In a real app, you would initiate a call here
    toast.success(`Initiating ${type} call...`);
  };
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <Tabs defaultValue="chat" onValueChange={setSelectedTab}>
        <div className="border-b border-gray-200">
          <TabsList className="w-full h-12 bg-gray-50 rounded-none border-b">
            <TabsTrigger value="chat" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-none">
              <MessageSquare className="h-4 w-4" />
              <span>Chat</span>
            </TabsTrigger>
            <TabsTrigger value="voice" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-none">
              <Mic className="h-4 w-4" />
              <span>Voice Call</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-none">
              <Video className="h-4 w-4" />
              <span>Video Call</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="chat" className="p-0">
          <div className="h-[400px] flex flex-col">
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
              {/* Demo messages */}
              <div className="flex gap-3">
                <img src={MOCK_USERS[0].avatar} alt="User" className="w-8 h-8 rounded-full" />
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">Hi there! How can I help you today?</p>
                  <span className="text-xs text-muted-foreground mt-1">10:30 AM</span>
                </div>
              </div>
              
              <div className="flex gap-3 justify-end">
                <div className="bg-primary/10 rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">I have a question about my startup's go-to-market strategy.</p>
                  <span className="text-xs text-muted-foreground mt-1">10:32 AM</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <img src={MOCK_USERS[0].avatar} alt="User" className="w-8 h-8 rounded-full" />
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">Great question! Let's discuss. Could you tell me more about your target market and current approach?</p>
                  <span className="text-xs text-muted-foreground mt-1">10:33 AM</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <Textarea 
                  placeholder="Type your message..." 
                  className="min-h-10 resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button onClick={handleSendMessage} className="bg-primary hover:bg-primary/90">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="voice" className="p-6 h-[400px] flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="mb-6">
              <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Mic className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-medium">Voice Call</h3>
              <p className="text-muted-foreground mt-2">Connect with mentors and peers using voice calls</p>
            </div>
            
            <div className="space-y-2">
              <Button 
                onClick={() => handleCall('voice')} 
                className="w-full bg-primary hover:bg-primary/90"
              >
                Start Voice Call
              </Button>
              <p className="text-sm text-muted-foreground">
                High-quality audio for clear conversations
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="video" className="p-6 h-[400px] flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="mb-6">
              <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Video className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-medium">Video Call</h3>
              <p className="text-muted-foreground mt-2">Face-to-face meetings with your connections</p>
            </div>
            
            <div className="space-y-2">
              <Button 
                onClick={() => handleCall('video')} 
                className="w-full bg-primary hover:bg-primary/90"
              >
                Start Video Call
              </Button>
              <p className="text-sm text-muted-foreground">
                HD video for a more personal experience
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
