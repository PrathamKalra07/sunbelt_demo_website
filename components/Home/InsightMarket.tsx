"use client";

import { INSIGHT_MARKET_DATA } from "@/lib/contants";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// const GRAYS = ["#000000", "#525252", "#A3A3A3", "#D4D4D4"];

// Replace GRAYS with per-chart palettes
const LINE_COLOR = "#378ADD";
const PIE_COLORS = ["#378ADD", "#1D9E75", "#BA7517", "#D4537E"];
const BAR_COLORS = ["#378ADD", "#1D9E75", "#BA7517", "#D4537E", "#534AB7", "#1D9E75"];

const InsightMarket = () => {
  const data = INSIGHT_MARKET_DATA;

  return (
    <section className="px-6 md:px-12 py-14 bg-white" style={{ borderTop: "1px solid #E5E5E5" }}>
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-3">
          <div>
            <h2 className="text-xl font-bold text-black">{data.heading}</h2>
            <p className="text-xs text-black/40 mt-1">{data.subheading}</p>
          </div>
          <select
            className="text-xs px-3 py-2 rounded-lg outline-none cursor-pointer"
            style={{ border: "1px solid #E5E5E5", color: "#000", background: "#fff" }}
          >
            <option>Last 6 Months</option>
            <option>Last Year</option>
          </select>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {data.stats.map((item: any, idx: number) => (
            <div
              key={idx}
              className="rounded-xl p-5"
              style={{ border: "1px solid #E5E5E5" }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-black/40 mb-3">
                {item.title}
              </p>
              <p className="text-2xl font-bold text-black">{item.value}</p>
              <p className="text-xs mt-1.5 text-black/50">{item.growth}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-8">

          {/* Line chart */}
          <div className="rounded-xl p-5" style={{ border: "1px solid #E5E5E5", height: "260px" }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-black/40 mb-5">
              Sales Overview
            </p>
            <ResponsiveContainer width="100%" height="80%">
              <LineChart data={data.salesData}>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#A3A3A3" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#A3A3A3" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ border: "1px solid #E5E5E5", borderRadius: "8px", fontSize: "11px", boxShadow: "none" }}
                  cursor={{ stroke: "#E5E5E5" }}
                />
                <Line type="monotone" dataKey="sales" stroke={LINE_COLOR} strokeWidth={1.5} dot={false} fill="rgba(55,138,221,0.08)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie chart */}
          <div className="rounded-xl p-5" style={{ border: "1px solid #E5E5E5", height: "260px" }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-black/40 mb-5">
              Property Distribution
            </p>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie data={data.propertyTypes} dataKey="value" nameKey="name" outerRadius={72} innerRadius={36} strokeWidth={0}>
                  {data.propertyTypes.map((_: any, index: number) => (
                    <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ border: "1px solid #E5E5E5", borderRadius: "8px", fontSize: "11px", boxShadow: "none" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar chart */}
          <div className="rounded-xl p-5" style={{ border: "1px solid #E5E5E5", height: "260px" }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-black/40 mb-5">
              Monthly Revenue
            </p>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={data.revenueData} barSize={10}>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#A3A3A3" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#A3A3A3" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ border: "1px solid #E5E5E5", borderRadius: "8px", fontSize: "11px", boxShadow: "none" }}
                  cursor={{ fill: "#F5F5F5" }}
                />
                <Bar dataKey="revenue" radius={[3, 3, 0, 0]}>
                  {data.revenueData.map((_: any, index: number) => (
                    <Cell key={index} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {data.insights.map((item: any, idx: number) => (
            <div
              key={idx}
              className="rounded-xl p-5"
              style={{ border: "1px solid #E5E5E5" }}
            >
              <p className="text-sm font-semibold text-black mb-2">{item.title}</p>
              <p className="text-xs leading-relaxed text-black/50">{item.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default InsightMarket;