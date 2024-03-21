"use client";

import DatePickerWithRange from "@/components/dashboard/DatePickerWithRange";
import PageHeader from "@/components/dashboard/PageHeader";
import SlackTrace from "@/components/dashboard/errors/SlackTrace";
import { DataTable } from "@/components/global/DataTable";
import FadeUp from "@/components/global/FadeUp";
import Spinner from "@/components/global/Spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SingleError } from "@/lib/types";
import { api } from "@/services/api";
import { ResponsiveLine } from "@nivo/line";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { toJpeg, toPng } from "html-to-image";
import { Download, ExternalLink, RefreshCcw, ShieldX } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

dayjs.extend(utc);

type Props = { params: { appId: string }; searchParams: {} };

// function filter(node) {
//   return node.tagName !== "i";
// }

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
  const chartRef = useRef<HTMLDivElement>(null);

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

  const exportButtonClick = useCallback(
    (type: "png" | "jpeg" | "svg" = "png") => {
      if (chartRef.current === null) {
        return;
      }

      const downloadToast = toast.loading(
        "Creating download link. Please wait..."
      );

      if (type === "png") {
        toPng(chartRef.current, { cacheBust: true })
          .then((dataUrl) => {
            const link = document.createElement("a");
            link.download = `app_errors_${new Date().getTime()}.png`;
            link.href = dataUrl;
            link.click();
            toast.success("Your PNG is ready to be downloaded!", {
              description: "Download should start automatically...",
            });
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            toast.dismiss(downloadToast);
          });
      }

      if (type === "jpeg") {
        toJpeg(chartRef.current, { quality: 0.95 })
          .then(function (dataUrl) {
            var link = document.createElement("a");
            link.download = `app_errors_${new Date().getTime()}.jpeg`;
            link.href = dataUrl;
            link.click();
            toast.success("Your JPEG is ready to be downloaded!", {
              description: "Download should start automatically...",
            });
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            toast.dismiss(downloadToast);
          });
      }

      // if (type === "svg") {
      //   toSvg(chartRef.current, { filter: filter })
      //     .then(function (dataUrl) {
      //       var link = document.createElement("a");
      //       link.download = `app_errors_${new Date().getTime()}.svg`;
      //       link.href = dataUrl;
      //       link.click();
      //       toast.success("Your SVG is ready to be downloaded!", {
      //         description: "Download should start automatically...",
      //       });
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     })
      //     .finally(() => {
      //       toast.dismiss(downloadToast);
      //     });
      // }
    },
    [chartRef]
  );

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
            <div>
              <CardTitle>Errors</CardTitle>
              <CardDescription>Past 30 Days</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => {
                        fetchErrorStats();
                      }}
                      disabled={fetchingStats}
                    >
                      <RefreshCcw size={18} aria-hidden="true" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Refresh data</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="secondary"
                    disabled={fetchingStats || graphData[0].data?.length === 0}
                  >
                    <Download size={18} aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-24">
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => exportButtonClick("png")}>
                      <span>PNG</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => exportButtonClick("jpeg")}>
                      <span>JPEG</span>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem
                        onClick={() => exportButtonClick("svg")}
                      >
                        <span>SVG</span>
                      </DropdownMenuItem> */}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-[400px]">
              <div ref={chartRef} className="w-full h-full">
                <ResponsiveLine
                  data={graphData}
                  colors={{ scheme: "nivo" }}
                  curve="monotoneX"
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
                    legend: "Timeline",
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
                    legendOffset: -50,
                    legendPosition: "middle",
                    truncateTickAt: 0,
                  }}
                  pointSize={10}
                  pointColor={{ theme: "background" }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: "serieColor" }}
                  pointLabelYOffset={-12}
                  useMesh={true}
                  enableArea={false}
                  enableGridX={false}
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
              {fetchingStats ? (
                <div className="text-sm absolute inset-0 top-[15px] left-[60px] bottom-[50px] right-[110px] bg-transparent text-muted-foreground flex items-center justify-center">
                  <Spinner />
                </div>
              ) : null}
              {!fetchingStats && graphData[0].data?.length === 0 ? (
                <div className="text-sm absolute inset-0 top-[15px] left-[60px] bottom-[50px] right-[110px] bg-transparent text-muted-foreground flex items-center justify-center">
                  No results.
                </div>
              ) : null}
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
