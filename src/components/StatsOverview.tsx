import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line 
} from 'recharts';
import { motion } from 'framer-motion';

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

const workBreakTimeData = [
  { name: 'Mon', work: 240, break: 45 },
  { name: 'Tue', work: 300, break: 60 },
  { name: 'Wed', work: 180, break: 30 },
  { name: 'Thu', work: 240, break: 45 },
  { name: 'Fri', work: 360, break: 75 },
  { name: 'Sat', work: 420, break: 90 },
  { name: 'Sun', work: 180, break: 30 },
];

const subjectMasteryData = [
  { subject: 'Physics', mastery: 80, fullMark: 100 },
  { subject: 'Math', mastery: 85, fullMark: 100 },
  { subject: 'Chemistry', mastery: 65, fullMark: 100 },
  { subject: 'Biology', mastery: 75, fullMark: 100 },
  { subject: 'Other', mastery: 90, fullMark: 100 },
];

const taskCompletionTrend = [
  { day: 'Mon', completed: 8, target: 10 },
  { day: 'Tue', completed: 12, target: 10 },
  { day: 'Wed', completed: 7, target: 10 },
  { day: 'Thu', completed: 9, target: 10 },
  { day: 'Fri', completed: 11, target: 10 },
  { day: 'Sat', completed: 15, target: 10 },
  { day: 'Sun', completed: 6, target: 10 },
];

const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#E5DEFF', '#1A1F2C'];

const StatsOverview: React.FC = () => {
  const formatTooltipValue = (value: number) => `${value}%`;
  const formatMinutes = (minutes: number) => `${Math.floor(minutes / 60)}h ${minutes % 60}m`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg border-karna-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold">Weekly Overview</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {/* Productivity Ratio Chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
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
                    <Bar dataKey="ratio" fill="#9b87f5" radius={[4, 4, 0, 0]}>
                      {productivityData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Time by Subject Chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
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
            </motion.div>

            {/* Work vs Break Time Trend */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-lg font-medium mb-2">Work vs Break Time</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={workBreakTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={formatMinutes} />
                    <Area
                      type="monotone"
                      dataKey="work"
                      stackId="1"
                      stroke="#9b87f5"
                      fill="#9b87f5"
                    />
                    <Area
                      type="monotone"
                      dataKey="break"
                      stackId="1"
                      stroke="#E5DEFF"
                      fill="#E5DEFF"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Subject Mastery Radar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="text-lg font-medium mb-2">Subject Mastery</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={subjectMasteryData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Mastery"
                      dataKey="mastery"
                      stroke="#9b87f5"
                      fill="#9b87f5"
                      fillOpacity={0.6}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Task Completion Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="p-4 border-t border-border"
          >
            <h3 className="text-lg font-medium mb-2">Task Completion Trend</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={taskCompletionTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="#9b87f5"
                    strokeWidth={2}
                    dot={{ fill: '#9b87f5' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#E5DEFF"
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border-t border-border"
          >
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
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatsOverview;
