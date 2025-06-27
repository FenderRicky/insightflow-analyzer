
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Search, MessageSquare, Users, Trophy, TrendingUp, Heart, Share2, BookmarkPlus, Star, Clock, Eye } from 'lucide-react';

const Community = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const discussions = [
    {
      id: 1,
      title: "How to make your GitHub profile stand out to recruiters?",
      author: { name: "Sarah Chen", avatar: "", initials: "SC" },
      category: "GitHub Tips",
      replies: 23,
      likes: 45,
      views: 234,
      timeAgo: "2 hours ago",
      isHot: true
    },
    {
      id: 2,
      title: "Portfolio review: Frontend developer seeking feedback",
      author: { name: "Mike Johnson", avatar: "", initials: "MJ" },
      category: "Portfolio Review",
      replies: 12,
      likes: 18,
      views: 156,
      timeAgo: "4 hours ago",
      isHot: false
    },
    {
      id: 3,
      title: "LinkedIn headline optimization for career changers",
      author: { name: "Alex Rivera", avatar: "", initials: "AR" },
      category: "LinkedIn",
      replies: 31,
      likes: 67,
      views: 445,
      timeAgo: "1 day ago",
      isHot: true
    }
  ];

  const topContributors = [
    { name: "Emma Wilson", contributions: 156, badge: "Community Expert", avatar: "", initials: "EW" },
    { name: "David Park", contributions: 134, badge: "Mentor", avatar: "", initials: "DP" },
    { name: "Lisa Zhang", contributions: 98, badge: "Rising Star", avatar: "", initials: "LZ" },
    { name: "James Brown", contributions: 87, badge: "Helper", avatar: "", initials: "JB" }
  ];

  const templates = [
    {
      name: "Minimalist Developer",
      author: "Sarah Chen",
      downloads: 1234,
      rating: 4.9,
      preview: "",
      tags: ["React", "Minimalist", "Developer"]
    },
    {
      name: "Creative Designer Showcase",
      author: "Mike Johnson", 
      downloads: 890,
      rating: 4.7,
      preview: "",
      tags: ["Creative", "Designer", "Portfolio"]
    },
    {
      name: "Professional Business",
      author: "Alex Rivera",
      downloads: 756,
      rating: 4.8,
      preview: "",
      tags: ["Business", "Professional", "Clean"]
    }
  ];

  const challenges = [
    {
      title: "30-Day Portfolio Challenge",
      description: "Improve your portfolio with daily tasks",
      participants: 456,
      timeLeft: "12 days left",
      difficulty: "Beginner",
      reward: "Portfolio Pro Badge"
    },
    {
      title: "GitHub Profile Makeover",
      description: "Transform your GitHub presence",
      participants: 234,
      timeLeft: "5 days left", 
      difficulty: "Intermediate",
      reward: "GitHub Master Badge"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gradient mb-2">Community Hub</h1>  
          <p className="text-xl text-muted-foreground">Connect, share, and grow with fellow professionals</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass border-white/10 text-center">
            <CardContent className="pt-4">
              <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gradient">12.5K</div>
              <p className="text-sm text-muted-foreground">Members</p>
            </CardContent>
          </Card>
          <Card className="glass border-white/10 text-center">
            <CardContent className="pt-4">
              <MessageSquare className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gradient">3.2K</div>
              <p className="text-sm text-muted-foreground">Discussions</p>
            </CardContent>
          </Card>
          <Card className="glass border-white/10 text-center">
            <CardContent className="pt-4">
              <Share2 className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gradient">856</div>
              <p className="text-sm text-muted-foreground">Templates</p>
            </CardContent>
          </Card>
          <Card className="glass border-white/10 text-center">
            <CardContent className="pt-4">
              <Trophy className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gradient">24</div>
              <p className="text-sm text-muted-foreground">Challenges</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="discussions" className="w-full">
          <TabsList className="grid w-full grid-cols-4 glass p-1 mb-8">
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          {/* Discussions */}
          <TabsContent value="discussions" className="space-y-6">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 glass border-white/20"
                />
              </div>
              <Button className="glass border-white/20 hover:border-white/40">
                New Discussion
              </Button>
            </div>

            <div className="space-y-4">
              {discussions.map((discussion) => (
                <Card key={discussion.id} className="glass border-white/10 hover:border-white/20 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={discussion.author.avatar} />
                        <AvatarFallback>{discussion.author.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold hover:text-brand-400 cursor-pointer">
                            {discussion.title}
                          </h3>
                          {discussion.isHot && (
                            <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                              🔥 Hot
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>by {discussion.author.name}</span>
                          <Badge variant="outline" className="glass border-white/20">
                            {discussion.category}
                          </Badge>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {discussion.timeAgo}
                          </span>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            {discussion.replies} replies
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            {discussion.likes} likes
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {discussion.views} views
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Templates */}
          <TabsContent value="templates" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gradient">Community Templates</h2>
              <Button className="glass border-white/20 hover:border-white/40">
                Submit Template
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template, index) => (
                <Card key={index} className="glass border-white/10 hover:border-white/20 transition-colors">
                  <div className="aspect-video bg-gradient-to-br from-brand-500/20 to-purple-500/20 rounded-t-lg flex items-center justify-center">
                    <Eye className="h-8 w-8 text-white/50" />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm">{template.rating}</span>
                      </div>
                    </div>
                    <CardDescription>by {template.author}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {template.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs glass border-white/20">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                      <span>{template.downloads} downloads</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 glass border-white/20 hover:border-white/40">
                        Preview
                      </Button>
                      <Button size="sm" variant="outline" className="glass border-white/20">
                        <BookmarkPlus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Challenges */}
          <TabsContent value="challenges" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gradient mb-2">Community Challenges</h2>
              <p className="text-muted-foreground">Join challenges to improve your skills and earn badges</p>
            </div>

            <div className="grid gap-6">
              {challenges.map((challenge, index) => (
                <Card key={index} className="glass border-white/10">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-2">{challenge.title}</CardTitle>
                        <CardDescription className="text-base mb-4">{challenge.description}</CardDescription>
                        <div className="flex items-center gap-4">
                          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                            {challenge.difficulty}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {challenge.participants} participants
                          </span>
                          <span className="text-sm text-yellow-400">
                            🏆 {challenge.reward}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground mb-2">{challenge.timeLeft}</div>
                        <Button className="glass border-white/20 hover:border-white/40">
                          Join Challenge
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Leaderboard */}
          <TabsContent value="leaderboard" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gradient mb-2">Community Leaders</h2>
              <p className="text-muted-foreground">Our most helpful community members</p>
            </div>

            <div className="grid gap-4">
              {topContributors.map((contributor, index) => (
                <Card key={index} className="glass border-white/10">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-gradient w-8">
                          #{index + 1}
                        </div>
                        <Avatar>
                          <AvatarImage src={contributor.avatar} />
                          <AvatarFallback>{contributor.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{contributor.name}</h3>
                          <Badge variant="outline" className="glass border-white/20">
                            {contributor.badge}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gradient">
                          {contributor.contributions}
                        </div>
                        <p className="text-sm text-muted-foreground">contributions</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Community;
