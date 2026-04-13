/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Menu, 
  Video, 
  Bell, 
  User, 
  Home, 
  Compass, 
  PlaySquare, 
  Clock, 
  ThumbsUp, 
  MoreVertical,
  CheckCircle2,
  Plus,
  Trash2,
  Image as ImageIcon,
  Edit3,
  Eye,
  Settings,
  X,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ChannelData, Video as VideoType, DEFAULT_CHANNEL } from "./types";
import { cn } from "@/lib/utils";

export default function App() {
  const [channel, setChannel] = useState<ChannelData>(() => {
    const saved = localStorage.getItem("tubecraft-channel");
    return saved ? JSON.parse(saved) : DEFAULT_CHANNEL;
  });
  const [activeTab, setActiveTab] = useState("page");
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

  useEffect(() => {
    localStorage.setItem("tubecraft-channel", JSON.stringify(channel));
  }, [channel]);

  useEffect(() => {
    const seen = localStorage.getItem("tubecraft-tutorial-seen");
    if (!seen) {
      setShowTutorial(true);
    }
  }, []);

  const finishTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem("tubecraft-tutorial-seen", "true");
  };

  const tutorialSteps = [
    {
      title: "Welcome to TubeCraft!",
      description: "Create your own professional-looking YouTube channel page in seconds. Perfect for mockups, jokes, or storytelling.",
      icon: <Video className="w-12 h-12 text-red-600" />
    },
    {
      title: "Customize Everything",
      description: "Use the 'Customize page' tab to change your channel name, banner, profile picture, and even add fake videos with custom view counts.",
      icon: <Edit3 className="w-12 h-12 text-blue-600" />
    },
    {
      title: "Real-time Preview",
      description: "Switch back to the 'Page' tab anytime to see how your channel looks to the world. It's fully responsive!",
      icon: <Eye className="w-12 h-12 text-green-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-sans selection:bg-red-500/30">
      {/* Main Content Area */}
      <div className="pb-24">
        <AnimatePresence mode="wait">
          {activeTab === "page" ? (
            <motion.div
              key="page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ChannelPreview channel={channel} />
            </motion.div>
          ) : (
            <motion.div
              key="customize"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ChannelEditor channel={channel} setChannel={setChannel} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation Tabs */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0f0f0f] border-t border-white/10 p-4 z-50">
        <div className="max-w-md mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-[#272727]">
              <TabsTrigger value="page" className="data-[state=active]:bg-[#3f3f3f] data-[state=active]:text-white">
                <Eye className="w-4 h-4 mr-2" />
                Page
              </TabsTrigger>
              <TabsTrigger value="customize" className="data-[state=active]:bg-[#3f3f3f] data-[state=active]:text-white">
                <Settings className="w-4 h-4 mr-2" />
                Customize page
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Tutorial Dialog */}
      <Dialog open={showTutorial} onOpenChange={setShowTutorial}>
        <DialogContent className="bg-[#1f1f1f] border-white/10 text-white sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              {tutorialSteps[tutorialStep].icon}
            </div>
            <DialogTitle className="text-2xl font-bold text-center">
              {tutorialSteps[tutorialStep].title}
            </DialogTitle>
            <DialogDescription className="text-gray-400 text-center text-lg mt-2">
              {tutorialSteps[tutorialStep].description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-between items-center mt-6">
            <div className="flex gap-1">
              {tutorialSteps.map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === tutorialStep ? "w-6 bg-red-600" : "w-1.5 bg-gray-600"
                  )} 
                />
              ))}
            </div>
            <div className="flex gap-2">
              {tutorialStep > 0 && (
                <Button variant="ghost" onClick={() => setTutorialStep(s => s - 1)}>
                  Back
                </Button>
              )}
              {tutorialStep < tutorialSteps.length - 1 ? (
                <Button className="bg-red-600 hover:bg-red-700" onClick={() => setTutorialStep(s => s + 1)}>
                  Next
                </Button>
              ) : (
                <Button className="bg-red-600 hover:bg-red-700" onClick={finishTutorial}>
                  Get Started
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ChannelPreview({ channel }: { channel: ChannelData }) {
  return (
    <div className="max-w-[1280px] mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0f0f0f] flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
            <Menu className="w-6 h-6" />
          </Button>
          <div className="flex items-center gap-1 cursor-pointer">
            <div className="bg-red-600 p-1 rounded-lg">
              <PlaySquare className="w-5 h-5 fill-white text-red-600" />
            </div>
            <span className="font-bold text-xl tracking-tighter">YouTube</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center flex-1 max-w-2xl px-8">
          <div className="flex w-full">
            <div className="relative flex-1">
              <Input 
                placeholder="Search" 
                className="w-full bg-[#121212] border-white/10 rounded-l-full pl-4 focus-visible:ring-1 focus-visible:ring-blue-500"
              />
            </div>
            <Button variant="secondary" className="bg-[#222222] border-l-0 border-white/10 rounded-r-full px-5 hover:bg-[#333333]">
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 hidden sm:flex">
            <Video className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 hidden sm:flex">
            <Bell className="w-6 h-6" />
          </Button>
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-medium ml-2">
            {channel.name[0]}
          </div>
        </div>
      </header>

      {/* Banner */}
      <div className="w-full aspect-[6/1] overflow-hidden bg-[#222222]">
        <img 
          src={channel.bannerImage} 
          alt="Channel Banner" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Channel Info */}
      <div className="px-4 md:px-16 py-6 flex flex-col md:flex-row gap-6 items-start">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shrink-0 bg-[#222222]">
          <img 
            src={channel.profilePicture} 
            alt={channel.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl md:text-4xl font-bold">{channel.name}</h1>
            {channel.isVerified && <CheckCircle2 className="w-5 h-5 text-gray-400 fill-gray-400/20" />}
          </div>
          <div className="flex flex-wrap items-center gap-x-2 text-gray-400 text-sm md:text-base">
            <span>{channel.handle}</span>
            <span className="text-xs opacity-50">•</span>
            <span>{channel.subscribers} subscribers</span>
            <span className="text-xs opacity-50">•</span>
            <span>{channel.videos.length} videos</span>
          </div>
          <p className="text-gray-400 text-sm line-clamp-2 max-w-2xl">
            {channel.description}
          </p>
          <div className="pt-2 flex gap-3">
            <Button className="bg-white text-black hover:bg-gray-200 rounded-full font-medium px-6">
              Subscribe
            </Button>
            <Button variant="secondary" className="bg-white/10 text-white hover:bg-white/20 rounded-full font-medium px-6">
              Join
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 md:px-16 border-b border-white/10">
        <div className="flex gap-8">
          {["Home", "Videos", "Shorts", "Live", "Playlists", "Community"].map((tab, i) => (
            <div 
              key={tab} 
              className={cn(
                "pb-3 text-sm font-medium cursor-pointer transition-colors",
                i === 1 ? "border-b-2 border-white text-white" : "text-gray-400 hover:text-white"
              )}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      {/* Videos Grid */}
      <div className="px-4 md:px-16 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
          {channel.videos.map((video) => (
            <div key={video.id} className="group cursor-pointer space-y-3">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-[#222222]">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">
                  {video.duration}
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-600 shrink-0 flex items-center justify-center text-xs font-medium">
                  {channel.name[0]}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold line-clamp-2 leading-snug">
                    {video.title}
                  </h3>
                  <div className="text-gray-400 text-sm mt-1">
                    <div className="flex items-center gap-1">
                      {channel.name}
                      {channel.isVerified && <CheckCircle2 className="w-3 h-3" />}
                    </div>
                    <div>
                      {video.views} • {video.postedAt}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChannelEditor({ channel, setChannel }: { channel: ChannelData, setChannel: (c: ChannelData) => void }) {
  const [newVideo, setNewVideo] = useState<Partial<VideoType>>({
    title: "",
    views: "0 views",
    postedAt: "Just now",
    duration: "0:00",
    thumbnail: `https://picsum.photos/seed/${Math.random()}/640/360`
  });

  const addVideo = () => {
    if (!newVideo.title) return;
    const video: VideoType = {
      id: Date.now().toString(),
      title: newVideo.title || "Untitled Video",
      thumbnail: newVideo.thumbnail || "https://picsum.photos/seed/default/640/360",
      views: newVideo.views || "0 views",
      postedAt: newVideo.postedAt || "Just now",
      duration: newVideo.duration || "0:00"
    };
    setChannel({
      ...channel,
      videos: [video, ...channel.videos]
    });
    setNewVideo({
      title: "",
      views: "0 views",
      postedAt: "Just now",
      duration: "0:00",
      thumbnail: `https://picsum.photos/seed/${Math.random()}/640/360`
    });
  };

  const removeVideo = (id: string) => {
    setChannel({
      ...channel,
      videos: channel.videos.filter(v => v.id !== id)
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Settings className="w-8 h-8 text-red-600" />
          Channel Customization
        </h2>
        <p className="text-gray-400">Modify your channel's branding and content.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Info */}
        <Card className="bg-[#1f1f1f] border-white/10 text-white">
          <CardContent className="p-6 space-y-6">
            <h3 className="text-xl font-semibold border-b border-white/10 pb-2">Branding</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Channel Name</Label>
                <Input 
                  id="name" 
                  value={channel.name} 
                  onChange={(e) => setChannel({ ...channel, name: e.target.value })}
                  className="bg-[#0f0f0f] border-white/10"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="handle">Handle</Label>
                <Input 
                  id="handle" 
                  value={channel.handle} 
                  onChange={(e) => setChannel({ ...channel, handle: e.target.value })}
                  className="bg-[#0f0f0f] border-white/10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subs">Subscriber Count</Label>
                <Input 
                  id="subs" 
                  value={channel.subscribers} 
                  onChange={(e) => setChannel({ ...channel, subscribers: e.target.value })}
                  className="bg-[#0f0f0f] border-white/10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="desc">Description</Label>
                <textarea 
                  id="desc" 
                  value={channel.description} 
                  onChange={(e) => setChannel({ ...channel, description: e.target.value })}
                  className="w-full min-h-[100px] bg-[#0f0f0f] border border-white/10 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Visuals */}
        <Card className="bg-[#1f1f1f] border-white/10 text-white">
          <CardContent className="p-6 space-y-6">
            <h3 className="text-xl font-semibold border-b border-white/10 pb-2">Visual Assets</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Profile Picture URL</Label>
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border border-white/10">
                    <img src={channel.profilePicture} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <Input 
                    value={channel.profilePicture} 
                    onChange={(e) => setChannel({ ...channel, profilePicture: e.target.value })}
                    className="bg-[#0f0f0f] border-white/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Banner Image URL</Label>
                <div className="space-y-2">
                  <div className="w-full aspect-[4/1] rounded-lg overflow-hidden border border-white/10">
                    <img src={channel.bannerImage} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <Input 
                    value={channel.bannerImage} 
                    onChange={(e) => setChannel({ ...channel, bannerImage: e.target.value })}
                    className="bg-[#0f0f0f] border-white/10"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox" 
                  id="verified" 
                  checked={channel.isVerified} 
                  onChange={(e) => setChannel({ ...channel, isVerified: e.target.checked })}
                  className="w-4 h-4 rounded border-white/10 bg-[#0f0f0f]"
                />
                <Label htmlFor="verified" className="cursor-pointer">Verified Channel Badge</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Videos Manager */}
      <Card className="bg-[#1f1f1f] border-white/10 text-white">
        <CardContent className="p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <h3 className="text-xl font-semibold">Manage Videos</h3>
            <span className="text-sm text-gray-400">{channel.videos.length} videos</span>
          </div>

          {/* Add New Video Form */}
          <div className="bg-[#2a2a2a] p-4 rounded-xl space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add New Video
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Video Title</Label>
                <Input 
                  placeholder="Enter title" 
                  value={newVideo.title}
                  onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                  className="bg-[#0f0f0f] border-white/10"
                />
              </div>
              <div className="space-y-2">
                <Label>Views</Label>
                <Input 
                  placeholder="e.g. 1.2M views" 
                  value={newVideo.views}
                  onChange={(e) => setNewVideo({ ...newVideo, views: e.target.value })}
                  className="bg-[#0f0f0f] border-white/10"
                />
              </div>
              <div className="space-y-2">
                <Label>Posted At</Label>
                <Input 
                  placeholder="e.g. 2 days ago" 
                  value={newVideo.postedAt}
                  onChange={(e) => setNewVideo({ ...newVideo, postedAt: e.target.value })}
                  className="bg-[#0f0f0f] border-white/10"
                />
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <Input 
                  placeholder="e.g. 10:05" 
                  value={newVideo.duration}
                  onChange={(e) => setNewVideo({ ...newVideo, duration: e.target.value })}
                  className="bg-[#0f0f0f] border-white/10"
                />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <Label>Thumbnail URL</Label>
                <Input 
                  placeholder="Image URL" 
                  value={newVideo.thumbnail}
                  onChange={(e) => setNewVideo({ ...newVideo, thumbnail: e.target.value })}
                  className="bg-[#0f0f0f] border-white/10"
                />
              </div>
            </div>
            <Button 
              onClick={addVideo}
              disabled={!newVideo.title}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              Add Video to Channel
            </Button>
          </div>

          {/* Video List */}
          <div className="space-y-3">
            <h4 className="font-medium">Existing Videos</h4>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                {channel.videos.map((video) => (
                  <div key={video.id} className="flex gap-4 p-3 bg-[#0f0f0f] rounded-lg border border-white/5 group">
                    <div className="w-32 aspect-video rounded overflow-hidden shrink-0">
                      <img src={video.thumbnail} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium truncate">{video.title}</h5>
                      <p className="text-xs text-gray-400 mt-1">{video.views} • {video.postedAt}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeVideo(video.id)}
                      className="text-gray-500 hover:text-red-500 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>

      {/* Reset Button */}
      <div className="flex justify-center pt-4">
        <Button 
          variant="outline" 
          className="border-red-500/50 text-red-500 hover:bg-red-500/10"
          onClick={() => {
            if (confirm("Are you sure you want to reset all changes?")) {
              setChannel(DEFAULT_CHANNEL);
            }
          }}
        >
          Reset to Default Channel
        </Button>
      </div>
    </div>
  );
}
