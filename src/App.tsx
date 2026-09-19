import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import PreviousEvents from "./pages/PreviousEvents";
import EventFebruary2026 from "./pages/EventFebruary2026";
import EventMarch2026 from "./pages/EventMarch2026";
import EventApril2026 from "./pages/EventApril2026";
import EventMay2026 from "./pages/EventMay2026";
import GopherAIConference from "./pages/GopherAIConference";
import ShowAndTell from "./pages/ShowAndTell";
import Afterparty from "./pages/Afterparty";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AdminShowAndTell from "./pages/AdminShowAndTell";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Location from "./pages/Location";
import Chapters from "./pages/Chapters";
import ChapterPage from "./pages/ChapterPage";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Speak from "./pages/Speak";
import Sponsor from "./pages/Sponsor";
import StartAChapter from "./pages/StartAChapter";
import About from "./pages/About";
import Press from "./pages/Press";
import Join from "./pages/Join";
import NotFound from "./pages/NotFound";

// Create a new client outside of the component to avoid recreation on each render
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/events/february-2026" element={<EventFebruary2026 />} />
                <Route path="/events/march-2026" element={<EventMarch2026 />} />
                <Route path="/events/april-2026" element={<EventApril2026 />} />
                <Route path="/events/may-2026" element={<EventMay2026 />} />
                <Route path="/events/gopher-ai-demo-night" element={<GopherAIConference />} />
                <Route path="/events/gopher-ai-conference" element={<GopherAIConference />} />
                <Route path="/show-and-tell" element={<ShowAndTell />} />
                <Route path="/past-events" element={<PreviousEvents />} />
                <Route path="/location" element={<Location />} />
                <Route path="/locations" element={<Location />} />
                <Route path="/afterparty" element={<Afterparty />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/admin/show-and-tell" element={<AdminShowAndTell />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/chapters" element={<Chapters />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:slug" element={<EventDetail />} />
                <Route path="/speak" element={<Speak />} />
                <Route path="/sponsor" element={<Sponsor />} />
                <Route path="/start-a-chapter" element={<StartAChapter />} />
                <Route path="/about" element={<About />} />
                <Route path="/press" element={<Press />} />
                <Route path="/join" element={<Join />} />
                <Route path="/:city" element={<ChapterPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
};

export default App;
