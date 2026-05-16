import React, { useEffect, useState } from "react";
import {
  LineChart, Line,
  AreaChart, Area,
  XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer
} from "recharts";
import Heading from "../common/heading";
import { supabase } from "../../supabase";

const revenueData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 7000 },
  { month: "May", revenue: 6000 },
];

export function TicketRevenueChart() {
  return (
    <div
      style={{ minWidth: "48%", padding: "16px", borderRadius: "12px", border: "3px solid #0B7F7B" }}
      className="bg-[#1e1e1e] rounded-2xl w-full border border-[#ff29d1] shadow-md"
    >
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
                stroke="#2a2929"
                style={{ fontSize: "12px" }}
              />

              <YAxis
                stroke="#2a2929"
                style={{ fontSize: "12px" }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#b09898",
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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStarRatings() {
      const { data: rows, error } = await supabase
        .from("feedback")
        .select("stars");

      if (error) {
        console.error("Error fetching feedback:", error);
        setLoading(false);
        return;
      }

      const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      rows.forEach(({ stars }) => {
        if (stars >= 1 && stars <= 5) counts[stars]++;
      });

      const chartData = Object.entries(counts).map(([star, count]) => ({
        star: `${star}★`,
        count,
      }));

      setData(chartData);
      setLoading(false);
    }

    fetchStarRatings();
  }, []);

  return (
    <div
      style={{ minWidth: "48%", padding: "16px", borderRadius: "12px", border: "3px solid #0B7F7B" }}
      className="bg-[#1e1e1e] rounded-2xl w-full border border-[#ff29d1] shadow-md"
    >
      <div className="p-5">
        <Heading heading="Star Ratings" />
        <div className="w-full h-[400px]">
          {loading ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              Loading...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.3} />

                <XAxis
                  dataKey="star"
                  stroke="#2a2929"
                  style={{ fontSize: "12px" }}
                />
                <YAxis
                  stroke="#2a2929"
                  style={{ fontSize: "12px" }}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#b09898",
                    border: "1px solid #fa5e61",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#fa5e61"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}