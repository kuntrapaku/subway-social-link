
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Bell, Shield, User, Mail, MapPin, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Director',
    location: 'Mumbai, India',
    bio: 'Passionate filmmaker with 10+ years of experience in creating compelling stories.',
    website: 'johndoe.com',
    phone: '+91 98765 43210'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
    connections: true,
    messages: true,
    projects: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    searchable: true
  });

  const { toast } = useToast();

  const handleSave = (section: string) => {
    toast({
      title: "Settings saved",
      description: `Your ${section} settings have been updated successfully.`,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-orange-50">
            <TabsTrigger 
              value="profile" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white"
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="notifications"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white"
            >
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger 
              value="privacy"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white"
            >
              <Shield className="h-4 w-4 mr-2" />
              Privacy
            </TabsTrigger>
            <TabsTrigger 
              value="account"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white"
            >
              <Mail className="h-4 w-4 mr-2" />
              Account
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <Card className="border-orange-100">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-to-r from-orange-400 to-red-400 text-white text-2xl">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                    <Camera className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      className="border-orange-200 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="border-orange-200 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Professional Role</Label>
                    <Select value={profile.role} onValueChange={(value) => setProfile({...profile, role: value})}>
                      <SelectTrigger className="border-orange-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Director">Director</SelectItem>
                        <SelectItem value="Actor">Actor</SelectItem>
                        <SelectItem value="Producer">Producer</SelectItem>
                        <SelectItem value="Cinematographer">Cinematographer</SelectItem>
                        <SelectItem value="Editor">Editor</SelectItem>
                        <SelectItem value="Writer">Writer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile({...profile, location: e.target.value})}
                      className="border-orange-200 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={profile.website}
                      onChange={(e) => setProfile({...profile, website: e.target.value})}
                      className="border-orange-200 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      className="border-orange-200 focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    className="border-orange-200 focus:border-orange-500"
                    rows={4}
                  />
                </div>

                <Button 
                  onClick={() => handleSave('profile')}
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                >
                  Save Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <Card className="border-orange-100">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-gray-600">Receive push notifications</p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketing-notifications">Marketing Updates</Label>
                      <p className="text-sm text-gray-600">Receive marketing and promotional emails</p>
                    </div>
                    <Switch
                      id="marketing-notifications"
                      checked={notifications.marketing}
                      onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="connection-notifications">Connection Requests</Label>
                      <p className="text-sm text-gray-600">Get notified about new connection requests</p>
                    </div>
                    <Switch
                      id="connection-notifications"
                      checked={notifications.connections}
                      onCheckedChange={(checked) => setNotifications({...notifications, connections: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="message-notifications">Messages</Label>
                      <p className="text-sm text-gray-600">Get notified about new messages</p>
                    </div>
                    <Switch
                      id="message-notifications"
                      checked={notifications.messages}
                      onCheckedChange={(checked) => setNotifications({...notifications, messages: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="project-notifications">Project Updates</Label>
                      <p className="text-sm text-gray-600">Get notified about project updates and opportunities</p>
                    </div>
                    <Switch
                      id="project-notifications"
                      checked={notifications.projects}
                      onCheckedChange={(checked) => setNotifications({...notifications, projects: checked})}
                    />
                  </div>
                </div>

                <Button 
                  onClick={() => handleSave('notification')}
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                >
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="mt-6">
            <Card className="border-orange-100">
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="profile-visibility">Profile Visibility</Label>
                  <Select value={privacy.profileVisibility} onValueChange={(value) => setPrivacy({...privacy, profileVisibility: value})}>
                    <SelectTrigger className="border-orange-200 mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Anyone can view</SelectItem>
                      <SelectItem value="connections">Connections Only</SelectItem>
                      <SelectItem value="private">Private - Invite Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-email">Show Email</Label>
                      <p className="text-sm text-gray-600">Display your email on your profile</p>
                    </div>
                    <Switch
                      id="show-email"
                      checked={privacy.showEmail}
                      onCheckedChange={(checked) => setPrivacy({...privacy, showEmail: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-phone">Show Phone</Label>
                      <p className="text-sm text-gray-600">Display your phone number on your profile</p>
                    </div>
                    <Switch
                      id="show-phone"
                      checked={privacy.showPhone}
                      onCheckedChange={(checked) => setPrivacy({...privacy, showPhone: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="searchable">Searchable Profile</Label>
                      <p className="text-sm text-gray-600">Allow others to find you in search</p>
                    </div>
                    <Switch
                      id="searchable"
                      checked={privacy.searchable}
                      onCheckedChange={(checked) => setPrivacy({...privacy, searchable: checked})}
                    />
                  </div>
                </div>

                <Button 
                  onClick={() => handleSave('privacy')}
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                >
                  Save Privacy Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="mt-6">
            <Card className="border-orange-100">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        className="border-orange-200 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        className="border-orange-200 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        className="border-orange-200 focus:border-orange-500"
                      />
                    </div>
                    <Button 
                      onClick={() => handleSave('password')}
                      className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                    >
                      Update Password
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4 text-red-600">Danger Zone</h3>
                  <div className="space-y-4">
                    <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                      <h4 className="font-semibold text-red-800">Delete Account</h4>
                      <p className="text-sm text-red-700 mt-1">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <Button variant="destructive" className="mt-3">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
