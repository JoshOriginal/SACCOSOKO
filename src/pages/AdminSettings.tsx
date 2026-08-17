import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Lock, Bell, Palette, Users, ShieldAlert, LogOut, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { ThemeColor } from '@/contexts/themeContextType';
import { useState } from 'react';

export default function AdminSettings() {
  const { color, darkMode, setColor, setDarkMode } = useTheme();
  const [showPasswords, setShowPasswords] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;
  const passwordMismatch = newPassword && confirmPassword && newPassword !== confirmPassword;
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your admin account and platform settings</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                  <Input defaultValue="SACCO-SOKO Kenya" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Email</label>
                  <Input type="email" defaultValue="admin@sacco-soko.ke" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <Input defaultValue="+254 700 000 000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  <Input defaultValue="sacco-soko.co.ke" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
                <Input defaultValue="Nairobi CBD, Kenya" />
              </div>
              <Button className="bg-primary hover:bg-secondary">Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Platform Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Commission Rate</p>
                    <p className="text-sm text-gray-600">Platform fee on seller orders</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input type="number" defaultValue="5" className="w-20" />
                    <span className="text-gray-600">%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Minimum Order Value</p>
                    <p className="text-sm text-gray-600">Minimum purchase amount</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">₦</span>
                    <Input type="number" defaultValue="500" className="w-24" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Return Period (Days)</p>
                    <p className="text-sm text-gray-600">Days allowed for returns</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input type="number" defaultValue="30" className="w-20" />
                    <span className="text-gray-600">days</span>
                  </div>
                </div>
              </div>
              <Button className="bg-primary hover:bg-secondary">Save Configuration</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell size={20} />
                Email Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { title: 'New Orders', desc: 'Receive alerts when new orders are placed' },
                  { title: 'Low Stock Alerts', desc: 'Get notified when products run low on inventory' },
                  { title: 'Customer Messages', desc: 'Receive notifications for customer inquiries' },
                  { title: 'Payment Notifications', desc: 'Get alerted for payment confirmations' },
                  { title: 'Seller Applications', desc: 'Notifications when sellers apply to join' },
                ].map((notif, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{notif.title}</p>
                      <p className="text-sm text-gray-600">{notif.desc}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>
              <Button className="bg-primary hover:bg-secondary">Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock size={20} />
                Password & Authentication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Show/Hide Password Toggle */}
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2">
                  {showPasswords ? <Eye size={18} className="text-blue-600" /> : <EyeOff size={18} className="text-blue-600" />}
                  <p className="font-medium text-blue-900">{showPasswords ? 'Hide Passwords' : 'Show Passwords'}</p>
                </div>
                <Switch 
                  checked={showPasswords} 
                  onCheckedChange={setShowPasswords}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <Input 
                  type={showPasswords ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <Input 
                  type={showPasswords ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <Input 
                  type={showPasswords ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`${
                    passwordMismatch 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : passwordsMatch 
                      ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                      : ''
                  }`}
                />
              </div>

              {/* Password Match Notification */}
              {confirmPassword && (
                <div className={`flex items-center gap-2 p-3 rounded-lg ${
                  passwordsMatch 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  {passwordsMatch ? (
                    <>
                      <CheckCircle size={18} className="text-green-600" />
                      <p className="text-sm font-medium text-green-700">Passwords match</p>
                    </>
                  ) : (
                    <>
                      <AlertCircle size={18} className="text-red-600" />
                      <p className="text-sm font-medium text-red-700">Passwords do not match</p>
                    </>
                  )}
                </div>
              )}

              <Button 
                className="bg-primary hover:bg-secondary"
                disabled={!currentPassword || !passwordsMatch}
              >
                Change Password
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldAlert size={20} />
                Two-Factor Authentication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">Enhance your account security with 2FA</p>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">2FA Status</p>
                  <p className="text-sm text-gray-600">Not enabled</p>
                </div>
                <Button variant="outline">Enable 2FA</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users size={20} />
                Active Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-900">Windows - Chrome</p>
                    <p className="text-sm text-gray-600">192.168.1.1 • Active now</p>
                  </div>
                  <Button variant="outline" size="sm">Sign Out</Button>
                </div>
              </div>
              <Button variant="outline" className="w-full">Sign Out All Other Sessions</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette size={20} />
                Theme & Display
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Color Theme</label>
                <div className="grid grid-cols-4 gap-3">
                  {(['orange', 'blue', 'green', 'purple'] as ThemeColor[]).map((themeColor) => (
                    <button
                      key={themeColor}
                      onClick={() => setColor(themeColor)}
                      className={`p-4 rounded-lg border-2 font-medium text-sm transition-all ${
                        color === themeColor
                          ? `border-${themeColor === 'orange' ? 'orange' : themeColor === 'blue' ? 'blue' : themeColor === 'green' ? 'green' : 'purple'}-500 bg-${themeColor === 'orange' ? 'orange' : themeColor === 'blue' ? 'blue' : themeColor === 'green' ? 'green' : 'purple'}-50 text-${themeColor === 'orange' ? 'orange' : themeColor === 'blue' ? 'blue' : themeColor === 'green' ? 'green' : 'purple'}-600 ring-2 ring-${themeColor === 'orange' ? 'orange' : themeColor === 'blue' ? 'blue' : themeColor === 'green' ? 'green' : 'purple'}-300`
                          : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {themeColor.charAt(0).toUpperCase() + themeColor.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Dark Mode</p>
                  <p className="text-sm text-gray-600">Enable dark theme</p>
                </div>
                <Switch 
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>

              <Button className="bg-primary hover:bg-secondary" disabled>
                Theme Saved
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Danger Zone */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-900">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-red-800">These actions are irreversible. Proceed with caution.</p>
          <div className="flex gap-2">
            <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
              <LogOut size={18} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
