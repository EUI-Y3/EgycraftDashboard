import React from "react";
import {
  LineChart, Line,
  AreaChart, Area,
  XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer
} from "recharts";
import Heading from "../common/heading";

const revenueData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 7000 },
  { month: "May", revenue: 6000 },
];

const userData = [
  { month: "Jan", users: 1000 },
  { month: "Feb", users: 2000 },
  { month: "Mar", users: 3500 },
  { month: "Apr", users: 5000 },
  { month: "May", users: 7000 },
];

export function TicketRevenueChart() {
  return (
    <div style={{ minWidth: "48%", padding: "16px", borderRadius: "12px", border:"3px solid #0B7F7B" }} className="bg-[#1e1e1e] rounded-2xl w-full border border-[#ff29d1] shadow-md">
      <div className="p-5">
        <Heading heading="Ticket Revenue" />
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fa5e61" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#fa5e61" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.3} />

              <XAxis
                dataKey="month"
                stroke="#ccc"
                style={{ fontSize: "12px" }}
              />

              <YAxis
                stroke="#ccc"
                style={{ fontSize: "12px" }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e1e1e",
                  border: "1px solid #fa5e61",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#fa5e61"
                strokeWidth={2}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export function UserGrowthChart() {
  return (
    <div style={{ minWidth: "48%", padding: "16px", borderRadius: "12px", border: "3px solid #0B7F7B" }} className="bg-[#1e1e1e] rounded-2xl w-full border border-[#ff29d1] shadow-md">
      <div className="p-5">
        <Heading heading="User Growth" />
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={userData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.3} />

              <XAxis
                dataKey="month"
                stroke="#ccc"
                style={{ fontSize: "12px" }}
              />
              <YAxis
                stroke="#ccc"
                style={{ fontSize: "12px" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e1e1e",
                  border: "1px solid #fa5e61",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />

              <Line
                type="monotone"
                dataKey="users"
                stroke="#fa5e61"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}