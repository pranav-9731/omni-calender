import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Calendar as CalendarIcon,
  Plus,
  Clock,
  MapPin,
  Users,
  Target,
  Star,
  Zap,
  Heart,
  Coffee,
  Briefcase,
  TrendingUp,
  Bell,
  Settings,
  Filter,
  MoreHorizontal,
  Video,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  LogOut
} from "lucide-react";

interface EventItem {
  id: number | string;
  title: string;
  time: string;
  date?: string;
  duration?: string;
  type?: string;
  color?: string;
  participants?: number;
  location?: string;
}

interface MainCalendarProps {
  onBackToLogin: () => void;
}

const HOUR_HEIGHT = 64;
const DAY_START_HOUR = 7;
const DAY_END_HOUR = 19;

const to12HourLabel = (h: number) => {
  const suffix = h >= 12 ? "PM" : "AM";
  const hr = ((h + 11) % 12) + 1;
  return `${hr} ${suffix}`;
};

const timeToMinutes = (t: string) => {
  const parts = t.split(":").map(Number);
  const hh = parts[0] ?? 0;
  const mm = parts[1] ?? 0;
  return hh * 60 + mm;
};

const durationToMinutes = (d?: string) => {
  if (!d) return 60;
  if (d.endsWith("m")) return parseInt(d, 10);
  if (d.endsWith("h")) return Math.round(parseFloat(d) * 60);
  return 60;
};

const isSameIsoDate = (isoA?: string, dateB?: Date) => {
  if (!isoA || !dateB) return false;
  return isoA.slice(0, 10) === dateB.toISOString().slice(0, 10);
};

const STORAGE_KEY = "omni_events";

const MainCalendar: React.FC<MainCalendarProps> = ({ onBackToLogin }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<"day" | "week" | "month">("month");
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [titleInput, setTitleInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [durationInput, setDurationInput] = useState("");
  const [typeInput, setTypeInput] = useState("");
  const [posting, setPosting] = useState(false);

  const [tasks, setTasks] = useState<string[]>([]);
  const [taskInput, setTaskInput] = useState("");

  const mockEvents = useMemo<EventItem[]>(
    () => [
      { id: 1, title: "Team Standup", time: "09:00", duration: "30m", type: "meeting", color: "from-blue-500 to-cyan-500", participants: 6, location: "Conf A", date: undefined },
      { id: 2, title: "Workout", time: "18:00", duration: "1h", type: "personal", color: "from-rose-500 to-pink-500", location: "Gym", date: undefined },
      { id: 3, title: "Coffee w/ Sarah", time: "14:00", duration: "45m", type: "social", color: "from-amber-400 to-orange-400", location: "Cafe", date: undefined }
    ],
    []
  );

  const currentQuote = useMemo(() => {
    const quotes = [
      "The Timekeeper Who Cares",
      "Never Miss a Beat",
      "Great meetings start with great time",
      "Your Day, Your Rules"
    ];
    const idx = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % quotes.length;
    return quotes[idx];
  }, []);

  const times = useMemo(() => {
    const arr: string[] = [];
    for (let h = DAY_START_HOUR; h <= DAY_END_HOUR; h++) {
      arr.push(to12HourLabel(h));
    }
    return arr;
  }, []);

  // Frontend-only loader: reads from localStorage or seeds mockEvents
  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // read from localStorage
      let stored: any = null;
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        stored = raw ? JSON.parse(raw) : null;
      } catch (parseErr) {
        console.warn("Failed to read events from localStorage:", parseErr);
        stored = null;
      }

      if (Array.isArray(stored) && stored.length > 0) {
        setEvents(stored);
      } else {
        // seed with mock events and persist
        setEvents(mockEvents);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(mockEvents));
        } catch (e) {
          console.warn("Failed to persist mockEvents to localStorage", e);
        }
      }
    } catch (err: any) {
      setError(err?.message || "Failed to load events");
    } finally {
      setLoading(false);
    }
  }, [mockEvents]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const normalizeTimeDisplay = (time: string) => {
    if (/\b(?:AM|PM|am|pm)\b/.test(time)) return time;
    const m = time.match(/^(\d{1,2}):(\d{2})$/);
    if (!m) return time;
    let hh = parseInt(m[1], 10);
    const mm = m[2];
    const isPm = hh >= 12;
    if (hh === 0) hh = 12;
    const hh12 = ((hh + 11) % 12) + 1;
    return `${hh12}${mm !== "00" ? `:${mm}` : ""} ${isPm ? "PM" : "AM"}`;
  };

  // Frontend-only postEvent: no network calls, persist to localStorage
  const postEvent = async () => {
    const title = titleInput.trim();
    if (!title) return;
    setPosting(true);

    const newEvent: EventItem = {
      id: `tmp-${Date.now()}`,
      title,
      time: timeInput,
      duration: durationInput,
      type: typeInput,
      color: "from-sky-400 to-blue-500",
      date: undefined
    };

    // optimistic UI insert
    setEvents(prev => [newEvent, ...prev]);
    setTitleInput("");
    setTimeInput("09:00");
    setDurationInput("30m");
    setTypeInput("work");

    try {
      // simulate server-created event by assigning a client-side id
      const created: EventItem = {
        ...newEvent,
        id: Date.now() // numeric id assigned on "creation"
      };

      // replace tmp with created and persist
      setEvents(prev => {
        const replaced = prev.map(ev => (ev.id === newEvent.id ? created : ev));
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(replaced));
        } catch (e) {
          console.warn("Failed to persist events to localStorage", e);
        }
        return replaced;
      });
    } catch (err: any) {
      // rollback optimistic insert
      setEvents(prev => prev.filter(ev => ev.id !== newEvent.id));
      setError("Failed to add event (frontend).");
    } finally {
      setPosting(false);
    }
  };

  const addTask = () => {
    const t = taskInput.trim();
    if (!t) return;
    setTasks(prev => [...prev, t]);
    setTaskInput("");
  };
  const removeTask = (idx: number) => setTasks(prev => prev.filter((_, i) => i !== idx));

  // group events by time (exact match) - used for day view
  const eventsByTime = useMemo(() => {
    const map = new Map<string, EventItem[]>();
    for (const ev of events) {
      const key = ev.time;
      const arr = map.get(key) || [];
      arr.push(ev);
      map.set(key, arr);
    }
    return map;
  }, [events]);

  const EventBadge: React.FC<{ ev: EventItem }> = ({ ev }) => {
    const gradient = ev.color ? `bg-gradient-to-r ${ev.color}` : "bg-indigo-600";
    return (
      <div
        role="article"
        aria-label={ev.title}
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium text-white shadow ${gradient}`}
        style={{ minWidth: 140 }}
      >
        <div className="flex-shrink-0">
          <Briefcase className="h-4 w-4" />
        </div>
        <div className="truncate">
          <div className="font-medium truncate">{ev.title}</div>
          <div className="text-[11px] opacity-90">{normalizeTimeDisplay(ev.time)} · {ev.duration ?? "60m"}</div>
        </div>
      </div>
    );
  };

  // helper: events for a specific week day
  const eventsForDate = (d: Date) => {
    return events.filter(ev => isSameIsoDate(ev.date, d));
  };

  // quick actions - fixed icons & gradient
  const quickActions = [
    { icon: Video, label: "Schedule Meeting", gradient: "from-blue-500 to-cyan-500" },
    { icon: Target, label: "Set Goal", gradient: "from-green-500 to-emerald-500" },
    { icon: MessageSquare, label: "Team Chat", gradient: "from-purple-500 to-pink-500" },
    { icon: TrendingUp, label: "View Reports", gradient: "from-orange-400 to-red-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 text-slate-900 relative">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#e6f0ff_0%,_transparent_30%)] opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_#fff7ed_0%,_transparent_30%)] opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 ring-2 ring-indigo-200 bg-white">
              <AvatarImage src="https://picsum.photos/seed/avatar/200" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Welcome back, User</h1>
              <p className="text-sm text-slate-600 italic">"{currentQuote}"</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={loadEvents} className="flex items-center gap-2">
              <Clock className="h-4 w-4" /> Refresh
            </Button>

            <Button size="sm" onClick={() => setView(v => (v === "day" ? "week" : "day"))} className="hidden sm:inline-flex">
              <CalendarIcon className="h-4 w-4" /> <span className="ml-2">{view === "day" ? "Switch to Week" : "Switch to Day"}</span>
            </Button>

            <Button size="sm" onClick={() => onBackToLogin()}>
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </Button>
          </div>
        </header>

        <div className="grid lg:grid-cols-4 gap-6">
          <main className="lg:col-span-3 space-y-6">
            <Card className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/95 border border-slate-100 rounded-xl shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-indigo-600 text-white h-10 w-10 flex items-center justify-center font-semibold">
                  {date.getDate()}
                </div>
                <div>
                  <div className="text-sm text-indigo-600 font-semibold uppercase">{date.toLocaleString(undefined, { weekday: "short" })}</div>
                  <div className="text-lg font-bold">{date.toLocaleString(undefined, { month: "long", year: "numeric" })}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Tabs value={view} onValueChange={(v) => setView(v as "day" | "week" | "month")}>
                  <TabsList className="hidden sm:flex gap-2 bg-slate-100 rounded-md p-1">
                    <TabsTrigger value="day" className={`px-3 py-1 rounded ${view === "day" ? "bg-indigo-600 text-white" : "text-slate-700"}`}>Day</TabsTrigger>
                    <TabsTrigger value="week" className={`px-3 py-1 rounded ${view === "week" ? "bg-indigo-600 text-white" : "text-slate-700"}`}>Week</TabsTrigger>
                    <TabsTrigger value="month" className={`px-3 py-1 rounded ${view === "month" ? "bg-indigo-600 text-white" : "text-slate-700"}`}>Month</TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" onClick={() => setDate(d => { const nd = new Date(d); nd.setDate(nd.getDate() - 1); return nd; })}><ArrowLeft className="h-4 w-4" /></Button>
                  <Button size="sm" variant="ghost" onClick={() => setDate(new Date())}>Today</Button>
                  <Button size="sm" variant="ghost" onClick={() => setDate(d => { const nd = new Date(d); nd.setDate(nd.getDate() + 1); return nd; })}><ArrowRight className="h-4 w-4" /></Button>
                </div>
              </div>
            </Card>

            <Card className="p-4 space-y-4 bg-white/95 border border-slate-100 rounded-xl shadow-sm">
              {loading && <div className="text-sm text-slate-500">Loading events…</div>}
              {error && <div className="text-sm text-red-500">{error}</div>}

              <Tabs value={view} onValueChange={(v) => setView(v as "day"|"week"|"month")}>
                <TabsContent value="month">
                  <div className="grid grid-cols-7 gap-0 text-sm">
                    {["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map(d => (
                      <div key={d} className="text-center py-2 font-semibold text-slate-600 bg-slate-50 border-b border-r last:border-r-0">
                        {d}
                      </div>
                    ))}

                    <MonthGrid referenceDate={date} events={events} />
                  </div>
                </TabsContent>

                <TabsContent value="day">
                  <div className="flex gap-4">
                    <div className="w-20 text-right pr-3 select-none">
                      {times.map((t) => (
                        <div key={t} className="h-14 text-xs text-slate-500 flex items-start justify-end pr-2">{t}</div>
                      ))}
                    </div>

                    <div className="flex-1 border rounded-md overflow-auto bg-gradient-to-b from-white to-slate-50" style={{ maxHeight: "560px" }}>
                      <div className="relative">
                        <div className="space-y-0">
                          {Array.from({ length: DAY_END_HOUR - DAY_START_HOUR + 1 }).map((_, idx) => (
                            <div key={idx} className="h-14 border-b px-3" />
                          ))}
                        </div>
                        <div className="absolute inset-0 pointer-events-none">
                          {events.map(ev => {
                            if (!ev.time) return null;
                            const start = timeToMinutes(ev.time);
                            const top = ((start - DAY_START_HOUR * 60) / 60) * HOUR_HEIGHT;
                            const height = (durationToMinutes(ev.duration) / 60) * HOUR_HEIGHT;
                            if (start < DAY_START_HOUR * 60 || start >= DAY_END_HOUR * 60) return null;
                            return (
                              <div key={ev.id} style={{ top, height }} className="absolute left-4 right-4 rounded-md border shadow-sm px-3 py-1"
                                aria-label={ev.title}>
                                <div className={`w-full h-full flex items-center gap-3 ${ev.color ? `bg-gradient-to-r ${ev.color}` : "bg-indigo-600"} text-white`}>
                                  <div className="p-2">
                                    <Briefcase className="h-4 w-4" />
                                  </div>
                                  <div className="flex-1 pr-2">
                                    <div className="font-medium truncate">{ev.title}</div>
                                    <div className="text-[11px] opacity-90">{normalizeTimeDisplay(ev.time)} · {ev.duration ?? "60m"}</div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="week">
                  <div className="grid grid-cols-7 gap-3">
                    {Array.from({ length: 7 }).map((_, i) => {
                      const day = new Date(date);
                      day.setDate(date.getDate() - date.getDay() + i);
                      const label = day.toLocaleString(undefined, { weekday: "short", day: "numeric" });
                      const dayEvents = eventsForDate(day);

                      return (
                        <div key={i} className="border rounded-md p-3 min-h-[140px] bg-white/95">
                          <div className="flex items-center justify-between mb-3">
                            <div className="font-semibold text-slate-800">{label}</div>
                          </div>

                          {dayEvents.length === 0 ? (
                            <div className="text-sm text-slate-500 mt-2">No scheduled events</div>
                          ) : (
                            <div className="space-y-2">
                              {dayEvents.map(ev => (
                                <div key={ev.id} className="flex items-center justify-between p-2 rounded border">
                                  <div className="flex items-center gap-2">
                                    <div className={`w-8 h-8 rounded-md flex items-center justify-center text-white ${ev.color ? `bg-gradient-to-r ${ev.color}` : "bg-indigo-600"}`}>
                                      <Briefcase className="h-4 w-4" />
                                    </div>
                                    <div className="text-sm">
                                      <div className="font-medium truncate">{ev.title}</div>
                                      <div className="text-xs text-slate-500">{normalizeTimeDisplay(ev.time)}</div>
                                    </div>
                                  </div>
                                  <div className="text-xs text-slate-500">{ev.duration ?? "60m"}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {quickActions.map((act, idx) => {
                const Icon = act.icon;
                return (
                  <Card key={idx} className="p-3 flex flex-col items-center text-center hover:shadow-md transition">
                    <div className={`p-3 rounded-2xl mb-3 bg-gradient-to-r ${act.gradient} text-white inline-flex items-center justify-center`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="font-medium text-sm">{act.label}</div>
                  </Card>
                );
              })}
            </div>
          </main>

          <aside className="space-y-6">
            <Card className="p-4 bg-white/95 border border-slate-100 rounded-xl shadow-sm">
              <div>
                <h3 className="font-semibold mb-3">Add Event</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input className="px-3 py-2 border rounded" placeholder="Title" value={titleInput} onChange={e => setTitleInput(e.target.value)} />
                  <input className="px-3 py-2 border rounded" type="time" value={timeInput} onChange={e => setTimeInput(e.target.value)} />
                  <input className="px-3 py-2 border rounded" placeholder="Duration" value={durationInput} onChange={e => setDurationInput(e.target.value)} />
                  <select className="px-3 py-2 border rounded" value={typeInput} onChange={e => setTypeInput(e.target.value)}>
                    <option value="work">Work</option>
                    <option value="meeting">Meeting</option>
                    <option value="personal">Personal</option>
                    <option value="social">Social</option>
                  </select>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Button onClick={postEvent} disabled={posting} className="inline-flex items-center gap-2 bg-indigo-600 text-white">
                    <Plus className="h-4 w-4" /> {posting ? "Adding..." : "Add Event"}
                  </Button>
                  <Button variant="ghost" onClick={() => { setTitleInput(""); setTimeInput(""); setDurationInput(""); }}>Clear</Button>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-white/95 border border-slate-100 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-indigo-600" />
                  <h4 className="font-semibold">Today's Schedule</h4>
                </div>
                <Badge variant="secondary">{mockEvents.length}</Badge>
              </div>

              <div className="space-y-3">
                {mockEvents.map((ev) => (
                  <div key={ev.id} className="p-3 rounded-lg border hover:shadow-sm transition bg-white">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg text-white ${ev.color ? `bg-gradient-to-r ${ev.color}` : "bg-indigo-600"}`}>
                        <CalendarIcon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{ev.title}</div>
                          <div className="text-xs text-slate-500">{normalizeTimeDisplay(ev.time)}</div>
                        </div>
                        <div className="text-xs text-slate-500 mt-1">{ev.location}</div>
                        <div className="text-xs text-slate-500 mt-2 flex items-center gap-2">
                          <Users className="h-3 w-3" /> <span>{ev.participants ?? 1} participants</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4 bg-white/95 border border-slate-100 rounded-xl shadow-sm">
              <h4 className="font-semibold mb-3">This Week</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Meetings</span>
                  <Badge variant="secondary">12</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Personal Time</span>
                  <Badge variant="secondary">18h</Badge>
                </div>
                <div>
                  <div className="text-sm text-slate-600 mb-2">Goals Progress</div>
                  <Progress value={70} className="h-2" />
                </div>
                <div>
                  <div className="text-sm text-slate-600 mb-2">Productivity</div>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-indigo-600">87%</div>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <Progress value={87} className="h-2 mt-2" />
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-white/95 border border-slate-100 rounded-xl shadow-sm">
              <h4 className="font-semibold mb-3">Categories</h4>
              <div className="space-y-2">
                {[
                  { name: "Work", count: 8, color: "bg-blue-500" },
                  { name: "Personal", count: 5, color: "bg-green-500" },
                  { name: "Social", count: 3, color: "bg-orange-400" },
                  { name: "Health", count: 4, color: "bg-purple-500" }
                ].map((c) => (
                  <div key={c.name} className="flex items-center justify-between p-2 rounded border">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${c.color}`} />
                      <div className="text-sm">{c.name}</div>
                    </div>
                    <Badge variant="secondary">{c.count}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </aside>
        </div>
      </div>

      {/* Footer: left exactly as you provided (untouched) */}
      <footer className="w-full mt-16">
        <Card className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-sm border-t-2 border-primary/30 p-8 shadow-2xl transition-all duration-500 rounded-none">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-gradient-primary">
                    <CalendarIcon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Omni-Calendar</h3>
                </div>
                <p className="text-slate-300 mb-4 max-w-md">
                  Transform your productivity with intelligent time management.
                  Where plans meet action, and every minute counts.
                </p>
                <div className="flex gap-4">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-700 hover:bg-primary/20 transition-colors">
                    <svg className="h-5 w-5 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-700 hover:bg-primary/20 transition-colors">
                    <svg className="h-5 w-5 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.047-1.852-3.047-1.853 0-2.136 1.445-2.136 2.939v5.677H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a href="https://www.google.com/maps/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-700 hover:bg-primary/20 transition-colors">
                    <svg className="h-5 w-5 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Team Members */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Development Team</h4>
                <div className="space-y-2 text-slate-300">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Pranav Trivedi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Rahul K. Singh</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Ashraf Ali</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Diksha Murari</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">About</h4>
                <div className="space-y-2 text-slate-300">
                  <a href="#" className="block hover:text-primary transition-colors">About Us</a>
                  <a href="#" className="block hover:text-primary transition-colors">Premium</a>
                  <a href="#" className="block hover:text-primary transition-colors">Support</a>
                  <a href="https://www.google.com/maps/" className="block hover:text-primary transition-colors">Maps</a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400 text-sm">
                &copy; 2025 FSD Group 10. All rights reserved.
              </p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="omnicaltnc.html"
                  className="text-slate-400 hover:text-primary text-sm transition-colors hover:underline cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer">
                  Privacy Policy</a>
                <a href="omnicaltnc.html"
                  className="text-slate-400 hover:text-primary text-sm transition-colors hover:underline cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer">
                  Terms of Service</a>
                <a href="omnicaltnc.html"
                  className="text-slate-400 hover:text-primary text-sm transition-colors hover:underline cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer">Cookie Policy</a>
              </div>
            </div>
          </div>
        </Card>
      </footer>
    </div>
  );
};

export default MainCalendar;

/* MonthGrid helper kept but refined for consistent look */
const MonthGrid: React.FC<{ referenceDate: Date; events: EventItem[] }> = ({ referenceDate, events }) => {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDaysInMonth = new Date(year, month, 0).getDate();

  const cells: { d: number | null; isCurrentMonth: boolean; date: Date | null }[] = [];

  for (let i = startWeekday - 1; i >= 0; i--) {
    const d = prevDaysInMonth - i;
    const dt = new Date(year, month - 1, d);
    cells.push({ d, isCurrentMonth: false, date: dt });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dt = new Date(year, month, d);
    cells.push({ d, isCurrentMonth: true, date: dt });
  }

  while (cells.length % 7 !== 0) {
    const idx = cells.length - (startWeekday + daysInMonth);
    const d = idx + 1;
    const dt = new Date(year, month + 1, d);
    cells.push({ d, isCurrentMonth: false, date: dt });
  }
  while (cells.length < 42) {
    const idx = cells.length - (startWeekday + daysInMonth);
    const d = idx + 1;
    const dt = new Date(year, month + 1, d);
    cells.push({ d, isCurrentMonth: false, date: dt });
  }

  return (
    <>
      {cells.map((cell, idx) => {
        const isToday = cell.isCurrentMonth && cell.date && isSameDay(cell.date, new Date());
        const evCount = events.filter(e => e.date && cell.date && isSameIsoDate(e.date, cell.date)).length;

        return (
          <div key={idx} className={`min-h-[90px] p-2 border-r border-b last:border-r-0 ${cell.isCurrentMonth ? "bg-white" : "bg-slate-50 text-slate-400"}`}>
            <div className={`flex items-center justify-between`}>
              <div className={`text-sm font-medium ${isToday ? "text-indigo-600 font-bold" : "text-slate-700"}`}>{cell.d}</div>
              {evCount > 0 && <Badge variant="secondary">{evCount}</Badge>}
            </div>
            <div className="mt-2 space-y-1">
              <div className="h-2 rounded bg-slate-100 opacity-60" />
              <div className="h-2 rounded bg-slate-100 opacity-40" />
            </div>
          </div>
        );
      })}
    </>
  );
};

function isSameDay(a?: Date, b?: Date) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
