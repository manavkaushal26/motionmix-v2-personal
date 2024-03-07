"use client";

import DatePickerWithRange from "@/components/dashboard/DatePickerWithRange";
import PageHeader from "@/components/dashboard/PageHeader";
import SlackTrace from "@/components/dashboard/errors/SlackTrace";
import { DataTable } from "@/components/global/DataTable";
import FadeUp from "@/components/global/FadeUp";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SingleError } from "@/lib/types";
import { api } from "@/services/api";
import { ResponsiveLine } from "@nivo/line";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { ExternalLink, ShieldX } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

dayjs.extend(utc);

type Props = { params: { appId: string }; searchParams: {} };

function generateFakeData(count: number) {
  const data = [];
  const today = new Date();
  const endDate = new Date();
  const startDate = new Date(today.setDate(today.getDate() - 7)); // Calculate start date

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
  const [stats, setStats] = useState<{ events: Partial<SingleError>[] }>({
    events: [],
  });
  const [fetchingErrorsList, setFetchingErrorsList] = useState<boolean>(false);
  const [errorsList, setErrorsList] = useState<SingleError[]>([]);

  const graphData = useMemo(() => {
    return [
      {
        id: "Errors",
        data: stats.events.map((stat) => {
          return { x: stat.createdAt, y: stat.count };
        }),
      },
      // {
      //   id: "Users Effected",
      //   data: generateFakeData(30), // 1 to 30
      // },
    ];
  }, [stats.events]);

  const fetchErrorStats = async () => {
    setFetchingStats(true);
    try {
      const res = await api.getErrorStats(appId);
      if (res.kind === "ok") {
        setStats(res.data);
      } else {
        throw new Error(res.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setFetchingStats(false);
    }
  };
  const fetchErrors = async () => {
    setFetchingErrorsList(true);
    try {
      const res = await api.getErrors(appId);
      if (res.kind === "ok") {
        setErrorsList(res.data.events);
      } else {
        throw new Error(res.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setFetchingErrorsList(false);
    }
  };

  const columns: ColumnDef<SingleError>[] = [
    {
      accessorKey: "name",
      header: "Name",
      size: 250,
      cell: ({ row }) => {
        const name = row.original.name.split(":")[0];
        return (
          <div>
            <p>{name}</p>
            <div className="mt-1 flex items-center space-x-2">
              <SlackTrace errorId={row.original._id} />

              <Link href={`/session/${row.original.session}`} target="_blank">
                <Badge
                  variant="secondary"
                  className="text-muted-foreground hover:text-foreground duration-200"
                >
                  <ExternalLink size={12} className="mr-1" />
                  <span>Session</span>
                </Badge>
              </Link>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "count",
      header: "Count",
    },
    {
      accessorKey: "createdAt",
      header: "First Log",
      cell: ({ row }) => {
        const date = dayjs(row.original.createdAt).format("DD MMM, YYYY");
        const time = dayjs(row.original.createdAt).format("hh:mm a");
        return (
          <div>
            <p>{date}</p>
            <p className="text-xs text-zinc-500">{time}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Last Log",
      cell: ({ row }) => {
        const date = dayjs(row.original.updatedAt).format("DD MMM, YYYY");
        const time = dayjs(row.original.updatedAt).format("hh:mm a");
        return (
          <div>
            <p>{date}</p>
            <p className="text-xs text-zinc-500">{time}</p>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchAsyncData = async () => {
      await Promise.all([fetchErrorStats(), fetchErrors()]);
    };

    fetchAsyncData();
  }, []);

  return (
    <FadeUp>
      <section className="flex items-center justify-between">
        <PageHeader Icon={ShieldX} title="Error Dashboard" />
        <DatePickerWithRange />
      </section>
      <Separator className="my-4" />
      {/* Graph */}
      <section>
        <Card className="bg-[#161616]">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Errors</CardTitle>
            {/* <div>
              <p className="text-muted-foreground">Last 7 Days</p>
            </div> */}
          </CardHeader>
          <CardContent>
            <div className="w-full h-[400px]">
              <ResponsiveLine
                data={graphData}
                colors={{ scheme: "nivo" }}
                // curve="monotoneX"
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
                  format: function (value) {
                    return dayjs.utc(value).format("DD-MMM-YY");
                  },
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
                            {dayjs.utc(point?.data?.x).format("DD-MMM-YY")}
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
          <CardContent className="p-6">
            <DataTable
              columns={columns}
              data={errorsList}
              loading={fetchingErrorsList}
            />
          </CardContent>
        </Card>
      </section>
    </FadeUp>
  );
};

export default ErrorsPage;
