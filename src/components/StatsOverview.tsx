
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Sample data for our charts
const productivityData = [
  { name: 'Mon', ratio: 75 },
  { name: 'Tue', ratio: 82 },
  { name: 'Wed', ratio: 68 },
  { name: 'Thu', ratio: 79 },
  { name: 'Fri', ratio: 85 },
  { name: 'Sat', ratio: 90 },
  { name: 'Sun', ratio: 72 },
];

const subjectTimeData = [
  { name: 'Physics', value: 35 },
  { name: 'Math', value: 25 },
  { name: 'Chemistry', value: 20 },
  { name: 'Biology', value: 15 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#E5DEFF', '#1A1F2C'];

const StatsOverview: React.FC = () => {
  const formatTooltipValue = (value: number) => `${value}%`;

  return (
    <Card className="shadow-lg border-karna-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold">Weekly Overview</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Productivity Ratio</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={productivityData}
                  margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={formatTooltipValue} />
                  <Bar dataKey="ratio" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Time by Subject</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subjectTimeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    innerRadius={40}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {subjectTimeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border-t border-border">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">Tasks Completed</p>
            <p className="text-2xl font-bold">24</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground text-sm">Total Work Time</p>
            <p className="text-2xl font-bold">14h 32m</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground text-sm">Avg. Session</p>
            <p className="text-2xl font-bold">45m</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground text-sm">Productivity</p>
            <p className="text-2xl font-bold">79%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsOverview;
