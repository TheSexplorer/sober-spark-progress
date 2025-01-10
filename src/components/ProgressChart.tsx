import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", logged: 1 },
  { day: "Tue", logged: 1 },
  { day: "Wed", logged: 1 },
  { day: "Thu", logged: 1 },
  { day: "Fri", logged: 1 },
  { day: "Sat", logged: 1 },
  { day: "Sun", logged: 1 },
];

export const ProgressChart = () => {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Weekly Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="day" />
              <YAxis hide />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="logged"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};