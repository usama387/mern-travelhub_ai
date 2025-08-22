// Create a new file: components/ChartDialog.jsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

// Chart data for seasonal trips with area information (revenue removed)
const seasonalData = [
  { season: "Spring 2023", trips: 245, area: "Hunza Valley" },
  { season: "Summer 2023", trips: 420, area: "Fairy Meadows" },
  { season: "Autumn 2023", trips: 380, area: "Swat Valley" },
  { season: "Winter 2023", trips: 180, area: "Skardu" },
  { season: "Spring 2024", trips: 290, area: "Kaghan Valley" },
  { season: "Summer 2024", trips: 485, area: "Fairy Meadows" },
];

// Custom tooltip for the chart (revenue removed)
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-md">
        <p className="font-bold text-gray-800">{label}</p>
        <p className="text-green-600">Trips: {data.trips}</p>
        <p className="text-purple-600">Popular Area: {data.area}</p>
      </div>
    );
  }
  return null;
};

const PackagesStats = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 text-white hover:bg-green-700">
          <BarChart3 className="mr-2 h-4 w-4" />
          View Travel Trends
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-green-700">
            Travel Trends & Statistics
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-700">
                Seasonal Trip Statistics
              </CardTitle>
              <CardDescription>
                Number of trips completed across different seasons with popular areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  trips: {
                    label: "Number of Trips",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={seasonalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="season" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="trips" fill="#16a34a" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PackagesStats;