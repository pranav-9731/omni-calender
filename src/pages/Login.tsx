import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, Lock, User, Sparkles, Shield, Zap, ArrowRight, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginProps {
  onLoginSuccess: () => void;
  onBackToLanding: () => void;
}

const Login = ({ onLoginSuccess, onBackToLanding }: LoginProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "🎉 Welcome back!",
        description: "Redirecting to your personalized calendar...",
      });
      
      // Redirect to main calendar
      setTimeout(() => {
        onLoginSuccess();
      }, 1000);
    }, 2000);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "🚀 Account created!",
        description: "Welcome to Omni-Calendar. Let's get started on your time mastery journey!",
      });
      
      // Redirect to main calendar
      setTimeout(() => {
        onLoginSuccess();
      }, 1000);
    }, 2000);
  };

  const benefits = [
    { icon: Zap, text: "AI-powered scheduling", color: "text-yellow-500" },
    { icon: Shield, text: "Enterprise-grade security", color: "text-green-500" },
    { icon: Calendar, text: "Unlimited integrations", color: "text-blue-500" }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-subtle relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.07'%3E%3Cpath d='m0 40 40-40h-40z'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="absolute top-20 right-20 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-info/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }}></div>

      {/* Back Button */}
      <Button
        onClick={onBackToLanding}
        variant="ghost"
        size="sm"
        className="absolute top-6 left-6 glass-button hover:shadow-glow transition-all"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Landing
      </Button>

      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Features */}
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="h-10 w-10 text-primary animate-pulse" />
              <div>
                <h1 className="text-4xl font-bold gradient-text">Join Omni-Calendar</h1>
                <p className="text-xl text-muted-foreground">Life in Perfect Sync</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Transform your productivity with:</h2>
              
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div 
                    key={index} 
                    className="flex items-center gap-4 p-4 glass-card hover:shadow-glow transition-all duration-300 group"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className={`p-3 rounded-xl bg-gradient-primary ${benefit.color} group-hover:scale-110 transition-transform`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-lg font-medium text-foreground">{benefit.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="text-sm px-3 py-1 glass-card">
                "The Timekeeper Who Cares"
              </Badge>
              <Badge variant="outline" className="text-sm px-3 py-1 glass-card">
                "Never Miss a Beat"
              </Badge>
            </div>
            <p className="text-muted-foreground italic">
              "Great meetings start with great time management"
            </p>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <Card className="glass-card p-8 shadow-elegant animate-scale-in hover:shadow-glow transition-all duration-500">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-gradient-primary">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold gradient-text">Welcome</h2>
            </div>
            <p className="text-muted-foreground">Your journey to time mastery begins here</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 glass-card p-1">
              <TabsTrigger value="login" className="relative">
                Sign In
                {activeTab === "login" && (
                  <div className="absolute inset-0 bg-gradient-primary rounded-md -z-10"></div>
                )}
              </TabsTrigger>
              <TabsTrigger value="signup" className="relative">
                Sign Up
                {activeTab === "signup" && (
                  <div className="absolute inset-0 bg-gradient-primary rounded-md -z-10"></div>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-6">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-base font-medium">Email Address</Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-12 h-12 glass-card border-0 focus:ring-2 focus:ring-primary/20 transition-all"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-base font-medium">Password</Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-12 h-12 glass-card border-0 focus:ring-2 focus:ring-primary/20 transition-all"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg font-semibold shadow-elegant hover:shadow-glow transition-all duration-300 group relative overflow-hidden" 
                  disabled={isLoading}
                >
                  <div className="absolute inset-0 bg-gradient-primary group-hover:scale-105 transition-transform"></div>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <Sparkles className="h-5 w-5 animate-spin" />
                        Signing you in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-6">
              <form onSubmit={handleSignup} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-base font-medium">Full Name</Label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="pl-12 h-12 glass-card border-0 focus:ring-2 focus:ring-primary/20 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="signup-email" className="text-base font-medium">Email Address</Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-12 h-12 glass-card border-0 focus:ring-2 focus:ring-primary/20 transition-all"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="signup-password" className="text-base font-medium">Password</Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-12 h-12 glass-card border-0 focus:ring-2 focus:ring-primary/20 transition-all"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg font-semibold shadow-elegant hover:shadow-glow transition-all duration-300 group relative overflow-hidden" 
                  disabled={isLoading}
                >
                  <div className="absolute inset-0 bg-gradient-primary group-hover:scale-105 transition-transform"></div>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <Sparkles className="h-5 w-5 animate-spin" />
                        Creating your account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              By continuing, you agree to our <span className="text-primary hover:underline cursor-pointer">Terms</span> and <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;