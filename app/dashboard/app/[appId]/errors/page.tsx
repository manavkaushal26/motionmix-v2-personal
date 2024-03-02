"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ResponsiveLine } from "@nivo/line";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type Props = { params: { appId: string }; searchParams: {} };

function generateFakeDataLast15Days(count: number) {
  const data = [];
  const today = new Date();
  const endDate = new Date();
  const startDate = new Date(today.setDate(today.getDate() - 14)); // Calculate start date

  while (startDate <= endDate) {
    const randomCount = Math.floor(Math.random() * count) + 1; // Random count between 1 and 15
    data.push({ x: startDate.toISOString().split("T")[0], y: randomCount });
    startDate.setDate(startDate.getDate() + 1); // Move to the next day
  }

  return data;
}

const ErrorsPage = ({ params, searchParams }: Props) => {
  const { appId = "" } = params;
  const [fetchingStats, setFetchingStats] = useState<boolean>(false);
  const [stats, setStats] = useState<{ events: any[] }>({ events: [] });

  const graphData = useMemo(() => {
    return [
      {
        id: "Errors",
        data: generateFakeDataLast15Days(100), // 1 to 100
      },
      {
        id: "Users Effected",
        data: generateFakeDataLast15Days(30), // 1 to 30
      },
    ];
  }, [stats]);

  // useEffect(() => {
  //   (async () => {
  //     setFetchingStats(true);
  //     try {
  //       const res = await api.getErrorStats(appId);
  //       if (res.kind === "ok") {
  //         setStats(res.data);
  //         toast.success("Stats fetched!");
  //       } else {
  //         throw new Error(res?.message);
  //       }
  //     } catch (error: any) {
  //       console.error(error);
  //       toast.error(`Failed to fetch error`, { description: error?.message });
  //     }
  //   })();
  // }, []);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Errors Dashboard</h1>
        </div>
        <p className="text-muted-foreground">Date range selector</p>
      </section>
      <Separator className="my-4" />
      {/* Graph */}
      <section>
        <Card className="bg-[#161616]">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Errors</CardTitle>
            <div>
              <p className="text-muted-foreground">Last 16 Days</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[400px]">
              <ResponsiveLine
                data={graphData}
                colors={{ scheme: "nivo" }}
                margin={{ top: 15, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{
                  type: "linear",
                  min: "auto",
                  max: "auto",
                  stacked: false,
                  reverse: false,
                }}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "",
                  legendOffset: 36,
                  legendPosition: "middle",
                  truncateTickAt: 0,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Count",
                  legendOffset: -40,
                  legendPosition: "middle",
                  truncateTickAt: 0,
                }}
                pointSize={10}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabelYOffset={-12}
                useMesh={true}
                tooltip={(tData: any) => {
                  const point = tData?.point;
                  console.log(point);
                  return (
                    <div className="shadow-md bg-background text-foreground py-3 px-4 rounded-md text-xs">
                      <div className="flex items-start space-x-2">
                        <div
                          className="w-3 h-3 rounded-[2px]"
                          style={{ background: point.serieColor }}
                        />
                        <p>{point.serieId}</p>
                      </div>
                      <div className="mt-1">
                        <p>
                          Date:{" "}
                          <span className="text-muted-foreground">
                            {point?.data?.x}
                          </span>
                        </p>
                        <p>
                          Count:{" "}
                          <span className="text-muted-foreground">
                            {point?.data?.y}
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                }}
                theme={{
                  text: { fill: "#fafafa" },
                  axis: { domain: { line: { stroke: "#fafafa" } } },
                  grid: { line: { stroke: "#27272a" } },
                  tooltip: {
                    container: { background: "#27272a" },
                    basic: { fontSize: "12px" },
                  },
                  crosshair: { line: { stroke: "#ffffff" } },
                }}
                legends={[
                  {
                    anchor: "top-right",
                    direction: "column",
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemBackground: "rgba(0, 0, 0, .03)",
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
                sliceTooltip={function myToolTip() {
                  return <p>test</p>;
                }}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Table */}
      <section className="mt-5">
        <Card className="bg-[#161616]">
          <CardHeader>
            <CardTitle>Errors</CardTitle>
            <CardDescription>Last 30 Days</CardDescription>
          </CardHeader>
        </Card>
      </section>
    </motion.div>
  );
};

export default ErrorsPage;
