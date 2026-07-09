import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Sparkles, Clock, Target, Zap, Calendar as CalendarIcon, Star, TrendingUp } from "lucide-react";

interface LandingProps {
  onGetStarted: () => void;
}

const Landing = ({ onGetStarted }: LandingProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const features = [
    {
      icon: Clock,
      title: "Where Plans Meet Action",
      description: "Seamlessly integrate tasks with your calendar for perfect workflow harmony",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Target,
      title: "Master your Minutes",
      description: "Events, reminders, and notes orchestrated in perfect synchronization",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Sparkles,
      title: "Not just Dates... Your Stories",
      description: "Track moods, goals, and life moments with intelligent insights",
      color: "from-emerald-500 to-teal-500"
    }
  ];

  const stats = [
    { label: "Time Saved Daily", value: "2.5h", icon: Clock },
    { label: "Task Completion", value: "94%", icon: Target },
    { label: "User Satisfaction", value: "4.9★", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center p-6">
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
        </div>
        <div className="absolute bottom-40 right-20 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-32 h-32 bg-info/10 rounded-full blur-2xl"></div>
        </div>

        {/* Main Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <CalendarIcon className="h-12 w-12 text-primary animate-glow" />
              <div className="absolute inset-0 h-12 w-12 text-primary-glow animate-pulse"></div>
            </div>
            <h1 className="text-7xl font-bold text-foreground tracking-tight drop-shadow-lg">
              Omni-Calendar
            </h1>
          </div>
          <p className="text-2xl text-foreground/90 mb-4 font-medium">One app for your every task</p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="text-lg px-6 py-3 bg-white/90 text-foreground border-2 border-primary/20 shadow-lg cursor-pointer">
              Your Personal Time Strategist
            </Badge>
            <Badge className="text-lg px-6 py-3 bg-white/90 text-foreground border-2 border-primary/20 shadow-lg cursor-pointer">
              Life in Perfect Sync
            </Badge>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 max-w-4xl animate-fade-in-up">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="bg-white/95 backdrop-blur-sm border-2 border-primary/20 p-8 text-center hover:bg-white hover:border-primary/40 hover:shadow-2xl transition-all duration-500 group rounded-2xl cursor-pointer">
                <IconComponent className="h-10 w-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-base font-medium text-foreground/80">{stat.label}</div>
              </Card>
            );
          })}
        </div>

        {/* Calendar Section */}
        <Card className="bg-white/95 backdrop-blur-sm border-2 border-primary/20 p-8 shadow-2xl mb-16 animate-scale-in hover:bg-white hover:border-primary/40 hover:shadow-glow transition-all duration-500 group rounded-2xl max-w-4xl w-full">
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <p className="text-3xl font-bold text-primary mb-2">
                {new Date().toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
              <div className="absolute -inset-4 bg-gradient-primary opacity-10 rounded-lg blur-xl group-hover:opacity-20 transition-opacity"></div>
            </div>
            <p className="text-6xl font-bold text-foreground mt-4 mb-2">
              {new Date().getDate()}
            </p>
            <p className="text-xl text-foreground/80 font-medium">
              {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
            </p>
            {/* Weather Section and Content Layout */}
            <div className="flex flex-col lg:flex-row gap-8 w-full mt-8">
              {/* Left Column - Weather */}
              <div className="lg:w-1/3">
                <Card className="bg-white/95 backdrop-blur-sm border-2 border-primary/20 p-6 shadow-2xl hover:bg-white hover:border-primary/40 hover:shadow-glow transition-all duration-500 rounded-2xl cursor-pointer">
                  <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Today's Weather</h3>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-primary mb-2">24°C</div>
                    <div className="text-lg text-foreground/80 mb-4">Partly Cloudy</div>
                    <div className="flex justify-between text-sm text-foreground/70">
                      <span>High: 28°C</span>
                      <span>Low: 18°C</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-primary/20">
                      <div className="flex justify-between text-sm text-foreground/70">
                        <span>Humidity: 65%</span>
                        <span>Wind: 12 km/h</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Column - Schedule Meeting */}
              <div className="lg:w-2/3">
                <Card className="bg-white/95 backdrop-blur-sm border-2 border-primary/20 p-6 shadow-2xl hover:bg-white hover:border-primary/40 hover:shadow-glow transition-all duration-500 rounded-2xl h-full cursor-pointer">
                  <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Schedule Meeting</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="p-4 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                        <div className="text-sm font-medium text-foreground/80">This Week</div>
                        <div className="text-2xl font-bold text-foreground">12</div>
                        <div className="text-xs text-foreground/60">Meetings</div>
                      </Card>
                      <Card className="p-4 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                        <div className="text-sm font-medium text-foreground/80">Upcoming</div>
                        <div className="text-2xl font-bold text-foreground">3</div>
                        <div className="text-xs text-foreground/60">Today</div>
                      </Card>
                      <Card className="p-4 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                        <div className="text-sm font-medium text-foreground/80">Event Categories</div>
                        <div className="text-2xl font-bold text-foreground">8</div>
                        <div className="text-xs text-foreground/60">Active</div>
                      </Card>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3">
                      Schedule New Meeting
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Card>



        {/* Feature Cards */}
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={index}
                className={`bg-white/95 backdrop-blur-sm border-2 border-primary/20 p-8 text-center hover:bg-white hover:border-primary/40 hover:shadow-2xl transition-all duration-500 group animate-fade-in-up rounded-2xl flex-1 min-w-[300px] max-w-[350px]`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`relative inline-block p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <IconComponent className="h-8 w-8 text-white" />
                  <div className="absolute inset-0 bg-white/20 rounded-2xl group-hover:bg-white/30 transition-colors"></div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">{feature.title}</h3>
                <p className="text-foreground/80 leading-relaxed">{feature.description}</p>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center animate-slide-up mb-12">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-foreground mb-4 drop-shadow-lg">Ready to Transform Your Time?</h2>
            <p className="text-xl text-foreground/90 max-w-2xl mx-auto font-medium">
              Join thousands who've already discovered the magic of intelligent time management
            </p>
          </div>

          <Button
            onClick={onGetStarted}
            size="lg"
            className="px-12 py-6 text-xl font-bold shadow-elegant hover:shadow-glow transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-primary group-hover:scale-105 transition-transform duration-300"></div>
            <span className="relative z-10 flex items-center gap-3">
              Start Your Journey
              <div className="flex items-center">
                <ChevronDown className="h-6 w-6 animate-bounce" />
                <Zap className="h-5 w-5 ml-1 group-hover:rotate-12 transition-transform" />
              </div>
            </span>
          </Button>

          <p className="text-sm text-foreground/80 mt-4 font-medium">
            "Plan, Play, Repeat" - Your journey starts here
          </p>
        </div>


      </div>
    </div>
  );
};

=======
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ChevronDown, Sparkles, Clock, Target, Zap, Calendar as CalendarIcon, Star, TrendingUp } from "lucide-react";
import { AnyARecord } from "dns";
import { Navigate } from "react-router-dom";

interface LandingProps {
  onGetStarted: () => void;
}

const Landing = ({ onGetStarted }: LandingProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [weather, setWeather] = useState<{ temp: number; description: string; icon: string; emoji?: string; code?: number } | null>(null);
  const [weatherLoading, setWeatherLoading] = useState<boolean>(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [weatherSource, setWeatherSource] = useState<'ow' | 'om' | null>(null);
  const [city, setCity] = useState<string>("New Delhi");
  const [cityInput, setCityInput] = useState<string>("New Delhi");

  useEffect(() => {
    const getWmoInfo = (code: number): { description: string; emoji: string } => {
      const map: Record<number, { description: string; emoji: string }> = {
        0: { description: "Clear sky", emoji: "☀️" },
        1: { description: "Mostly clear", emoji: "🌤️" },
        2: { description: "Partly cloudy", emoji: "⛅" },
        3: { description: "Cloudy", emoji: "☁️" },
        45: { description: "Foggy", emoji: "🌫️" },
        48: { description: "Freezing fog", emoji: "🌫️" },
        51: { description: "Light drizzle", emoji: "🌦️" },
        53: { description: "Drizzle", emoji: "🌦️" },
        55: { description: "Heavy drizzle", emoji: "🌧️" },
        56: { description: "Freezing drizzle", emoji: "🌧️" },
        57: { description: "Heavy freezing drizzle", emoji: "🌧️" },
        61: { description: "Light rain", emoji: "🌧️" },
        63: { description: "Rain", emoji: "🌧️" },
        65: { description: "Heavy rain", emoji: "🌧️" },
        66: { description: "Freezing rain", emoji: "🌧️" },
        67: { description: "Heavy freezing rain", emoji: "🌧️" },
        71: { description: "Light snow", emoji: "🌨️" },
        73: { description: "Snow", emoji: "🌨️" },
        75: { description: "Heavy snow", emoji: "❄️" },
        77: { description: "Snow grains", emoji: "❄️" },
        80: { description: "Light rain showers", emoji: "🌦️" },
        81: { description: "Rain showers", emoji: "🌧️" },
        82: { description: "Heavy rain showers", emoji: "🌧️" },
        85: { description: "Snow showers", emoji: "🌨️" },
        86: { description: "Heavy snow showers", emoji: "❄️" },
        95: { description: "Thunderstorm", emoji: "⛈️" },
        96: { description: "Thunderstorm with hail", emoji: "⛈️" },
        99: { description: "Severe thunderstorm with hail", emoji: "🌩️" },
      };
      return map[code] ?? { description: `Current conditions`, emoji: "🔆" };
    };
    const normalizeOpenWeatherDescription = (raw: string | undefined): string => {
      if (!raw) return "Current conditions";
      const d = raw.toLowerCase();
      if (d.includes("overcast clouds")) return "Cloudy";
      if (d.includes("broken clouds")) return "Mostly cloudy";
      if (d.includes("scattered clouds")) return "Partly cloudy";
      if (d.includes("few clouds")) return "Mostly clear";
      if (d.includes("clear sky")) return "Clear sky";
      return raw;
    };
    const fetchOpenMeteoByCoords = async (latitude: number, longitude: number) => {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
      );
      if (!res.ok) throw new Error("Fallback weather fetch failed");
      const data = await res.json();
      const temp = Number(data?.current?.temperature_2m);
      const code = Number(data?.current?.weather_code);
      const info = Number.isFinite(code) ? getWmoInfo(code) : { description: "Current conditions", emoji: "🔆" };
      setWeather({ temp, description: info.description, emoji: info.emoji, icon: "" , code });
      setWeatherSource('om');
    };
    const fetchOpenMeteoByCity = async (query: string) => {
      const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1`).then(r => r.json());
      const place = geo?.results?.[0];
      if (!place) throw new Error("City not found");
      await fetchOpenMeteoByCoords(place.latitude, place.longitude);
    };
    const API_KEY = (import.meta as any).env?.VITE_OPENWEATHER_API_KEY as string | undefined;
    const refreshWeather = (query: string) => {
      setWeatherLoading(true);
      setWeatherError(null);
      if (!API_KEY) {
        fetchOpenMeteoByCity(query)
          .then(() => setWeatherError(null))
          .catch((err: unknown) => {
            const message = err instanceof Error ? err.message : "Unable to load weather";
            setWeatherError(message);
          })
          .finally(() => setWeatherLoading(false));
        return;
      }

      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&units=metric&appid=${API_KEY}`)
        .then(async (res) => {
          const payload = await res.json().catch(() => null);
          if (!res.ok) {
            const apiMessage = (payload && (payload.message || payload.cod)) ? String(payload.message || payload.cod) : "Failed to fetch weather";
            throw new Error(apiMessage);
          }
          return payload;
        })
        .then((data) => {
          setWeather({
            temp: Number(data?.main?.temp),
            description: normalizeOpenWeatherDescription(data?.weather?.[0]?.description) ?? "N/A",
            icon: data?.weather?.[0]?.icon ?? "01d",
          });
          setWeatherSource('ow');
        })
        .catch((err: unknown) => {
          const message = err instanceof Error ? err.message : "Unable to load weather";
          const isInvalid = typeof message === 'string' && (message.toLowerCase().includes('invalid') || message.includes('401'));
          if (isInvalid) {
            fetchOpenMeteoByCity(query)
              .then(() => setWeatherError(null))
              .catch((fallbackErr: unknown) => {
                const fb = fallbackErr instanceof Error ? fallbackErr.message : message;
                setWeatherError(fb);
              });
          } else {
            setWeatherError(message);
          }
        })
        .finally(() => setWeatherLoading(false));
    };

    refreshWeather(city);
  }, [city]);

  const features = [
    {
      icon: Clock,
      title: "Where Plans Meet Action",
      description: "Seamlessly integrate tasks with your calendar for perfect workflow harmony",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Target,
      title: "Master your Minutes",
      description: "Events, reminders, and notes orchestrated in perfect synchronization",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Sparkles,
      title: "Not just Dates... Your Stories",
      description: "Track moods, goals, and life moments with intelligent insights",
      color: "from-emerald-500 to-teal-500"
    }
  ];

  const stats = [
    { label: "Time Saved Daily", value: "8h", icon: Clock },
    { label: "Task Completion", value: "90%", icon: Target },
    { label: "User Satisfaction", value: "4.8★", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center p-6">
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
        </div>
        <div className="absolute bottom-40 right-20 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-32 h-32 bg-info/10 rounded-full blur-2xl"></div>
        </div>

        {/* Main Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <CalendarIcon className="h-12 w-12 text-black animate-pulse" />
              <div className="absolute inset-0 h-12 w-12 text-white-glow animate-pulse"></div>
            </div>
            <h1 className="text-7xl font-bold text-foreground tracking-tight drop-shadow-lg">
              Omni-Calendar
            </h1>
          </div>
          <p className="text-2xl text-foreground/90 mb-4 font-medium">One app for your every task</p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="text-lg px-6 py-3 bg-white/90 text-foreground border-2 border-primary/20 shadow-lg">
              Your Personal Time Strategist
            </Badge>
            <Badge className="text-lg px-6 py-3 bg-white/90 text-foreground border-2 border-primary/20 shadow-lg">
              Life in Perfect Sync
            </Badge>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 max-w-4xl animate-fade-in-up">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="bg-white/95 backdrop-blur-sm border-2 border-primary/20 p-8 text-center hover:bg-white hover:border-primary/40 hover:shadow-2xl transition-all duration-500 group rounded-2xl cursor-pointer">
                <IconComponent className="h-10 w-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-base font-medium text-foreground/80">{stat.label}</div>
              </Card>
            );
          })}
        </div>

        {/* Calendar Section */}
          {/* Time Section */}
        <Card className="bg-white/95 backdrop-blur-sm border-2 border-primary/20 p-8 shadow-2xl mb-16 animate-scale-in hover:bg-white hover:border-primary/40 hover:shadow-glow transition-all duration-500 group rounded-2xl max-w-4xl w-full">
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <p className="text-3xl font-bold text-primary mb-2">
                {new Date().toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
              <div className="absolute -inset-4 bg-gradient-primary opacity-10 rounded-lg blur-xl group-hover:opacity-20 transition-opacity"></div>
            </div>
            <p className="text-6xl font-bold text-foreground mt-4 mb-2">
              {new Date().getDate()}
            </p>
            <p className="text-xl text-foreground/80 font-medium">
              {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
            </p>
            {/* Weather Section and Content Layout */}
            <div className="flex flex-col lg:flex-row gap-8 w-full mt-8">
              {/* Left Column - Weather */}
              <div className="lg:w-1/3">
                <Card className="bg-white/95 backdrop-blur-sm border-2 border-primary/20 p-6 shadow-2xl hover:bg-white hover:border-primary/40 hover:shadow-glow transition-all duration-500 rounded-2xl h-full cursor-default">
                  <h3 className="text-2xl font-bold text-foreground mb-4 text-center">Weather</h3>
                  <div className="flex gap-2 mb-4">
                    <Input
                      value={cityInput}
                      onChange={(e) => setCityInput(e.target.value)}
                      placeholder="City,CountryCode (e.g., Mumbai,IN)"
                      className="flex-1"
                    />
                    <Button size="sm" onClick={() => setCity(cityInput)}>Go</Button>
                  </div>
                  {weatherLoading && (
                    <p className="text-foreground/70 text-center">Loading...</p>
                  )}
                  {weatherError && (
                    <p className="text-destructive text-center text-sm">{weatherError}</p>
                  )}
                  {weather && (
                    <div className="flex flex-col items-center gap-2">
                      {weather.emoji ? (
                        <div className="text-4xl" aria-hidden>{weather.emoji}</div>
                      ) : (
                        <img
                          alt={weather.description}
                          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                          className="h-16 w-16"
                        />
                      )}
                      <p className="text-4xl font-bold text-foreground">{Math.round(weather.temp)}°C</p>
                      <p className="text-foreground/80 capitalize">{weather.description}</p>
                      {weatherSource && (
                        <p className="text-xs text-muted-foreground">source: {weatherSource === 'ow' ? 'OpenWeather' : 'Open-Meteo'}</p>
                      )}
                    </div>
                  )}
                </Card>
              </div>

              {/* Right Column - Schedule Meeting */}
              <div className="lg:w-2/3">
                <Card className="bg-white/95 backdrop-blur-sm border-2 border-primary/20 p-6 shadow-2xl hover:bg-white hover:border-primary/40 hover:shadow-glow transition-all duration-500 rounded-2xl h-full cursor-pointer">
                  <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Schedule Meeting</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="p-4 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                        <div className="text-sm font-medium text-foreground/80">This Week</div>
                        <div className="text-2xl font-bold text-foreground">12</div>
                        <div className="text-xs text-foreground/60">Meetings</div>
                      </Card>
                      <Card className="p-4 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                        <div className="text-sm font-medium text-foreground/80">Upcoming</div>
                        <div className="text-2xl font-bold text-foreground">3</div>
                        <div className="text-xs text-foreground/60">Today</div>
                      </Card>
                      <Card className="p-4 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                        <div className="text-sm font-medium text-foreground/80">Event Categories</div>
                        <div className="text-2xl font-bold text-foreground">8</div>
                        <div className="text-xs text-foreground/60">Active</div>
                      </Card>
                    </div>
                    <Button onClick={ onGetStarted } className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3">
                      Schedule New Meeting
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Card>



        {/* Feature Cards */}
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={index}
                className={`bg-white/95 backdrop-blur-sm border-2 border-primary/20 p-8 text-center hover:bg-white hover:border-primary/40 hover:shadow-2xl transition-all duration-500 group animate-fade-in-up rounded-2xl flex-1 min-w-[300px] max-w-[350px]`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`relative inline-block p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <IconComponent className="h-8 w-8 text-white" />
                  <div className="absolute inset-0 bg-white/20 rounded-2xl group-hover:bg-white/30 transition-colors"></div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">{feature.title}</h3>
                <p className="text-foreground/80 leading-relaxed">{feature.description}</p>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center animate-slide-up mb-12">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-foreground mb-4 drop-shadow-lg">Ready to Transform Your Time?</h2>
            <p className="text-xl text-foreground/90 max-w-2xl mx-auto font-medium">
              Join thousands who've already discovered the magic of intelligent time management
            </p>
          </div>

          <Button
            onClick={ onGetStarted}
            size="lg"
            className="px-12 py-6 text-xl font-bold shadow-elegant hover:shadow-glow transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-primary group-hover:scale-105 transition-transform duration-300"></div>
            <span className="relative z-10 flex items-center gap-3">
              Start Your Journey
              <div className="flex items-center">
                <ChevronDown className="h-6 w-6 animate-bounce" />
                <Zap className="h-5 w-5 ml-1 group-hover:rotate-12 transition-transform" />
              </div>
            </span>
          </Button>

          <p className="text-sm text-foreground/80 mt-4 font-medium">
            "Plan, Play, Repeat" - Your journey starts here
          </p>
        </div>


      </div>
    </div>
  );
};

export default Landing;