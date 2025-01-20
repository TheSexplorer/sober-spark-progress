import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Quote } from "lucide-react";

const stories = [
  {
    text: "After 10 years of struggling, I finally found peace in sobriety. Every morning I wake up clear-headed and grateful. My relationships have healed, and I've discovered joy in the simple moments of life.",
    author: "Sarah M."
  },
  {
    text: "Sobriety gave me back my dreams. I went from barely holding down a job to starting my own business. One day at a time really works - I'm living proof.",
    author: "Michael R."
  },
  {
    text: "The hardest part was admitting I needed help. Now, 5 years sober, I help others find their path. Every person I meet in recovery reminds me why I started this journey.",
    author: "David K."
  },
  {
    text: "I thought I needed alcohol to be social. In sobriety, I've made the most genuine friendships of my life. We laugh harder and connect deeper than I ever did while drinking.",
    author: "Emma L."
  },
  {
    text: "My kids were my motivation to get sober. Today, they have a present and engaged parent. The pride in their eyes when they talk about my recovery journey makes it all worth it.",
    author: "James P."
  }
];

export const SoberStory = () => {
  // Get a random story each day (but same for all users on that day)
  const today = new Date().toDateString();
  const index = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % stories.length;
  const story = stories[index];

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Quote className="h-5 w-5" />
          Sober Story of the Day
        </CardTitle>
      </CardHeader>
      <CardContent>
        <blockquote className="border-l-2 pl-4 italic">
          {story.text}
          <footer className="text-sm text-muted-foreground mt-2">
            - {story.author}
          </footer>
        </blockquote>
      </CardContent>
    </Card>
  );
};