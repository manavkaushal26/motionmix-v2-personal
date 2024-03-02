"use client";

import { formatNumber } from "@/lib/utils";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

type ColorProp = keyof typeof COLORS;

interface LineWithTooltipProps<T> {
  data: T[];
  xKey: keyof T;
  yKey: keyof T;
  xLabel?: string;
  yLabel?: string;
  loading: boolean;
  color?: ColorProp;
  legends?: { color: ColorProp; text: string }[];
}

const COLORS = {
  blue: d3.color("#6366f1").toString(),
  red: d3.color("#F76C5E").toString(),
  text: d3.color("#e4e4e7").toString(),
};

interface ChartDimensions {
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
  innerWidth: number;
  innerHeight: number;
}

function setupChartDimensions(svg: SVGSVGElement): ChartDimensions {
  const width = svg.clientWidth;
  const height = svg.clientHeight;

  const margin = { top: 20, right: 50, bottom: 50, left: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  return { width, height, margin, innerWidth, innerHeight };
}

function createXScale<T>(
  data: T[],
  innerWidth: number,
  xKey: keyof T
): d3.ScaleTime<number, number> {
  return d3
    .scaleTime()
    .domain(d3.extent(data, (d) => new Date(d[xKey] as any)) as [Date, Date])
    .range([0, innerWidth]);
}

function createYScale<T>(
  data: T[],
  innerHeight: number,
  yKey: keyof T
): d3.ScaleLinear<number, number> {
  return d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d[yKey] as number) as number])
    .range([innerHeight, 0]);
}

function createLine<T>(
  x: d3.ScaleTime<number, number>,
  y: d3.ScaleLinear<number, number>,
  xKey: keyof T,
  yKey: keyof T
): d3.Line<T> {
  return d3
    .line<T>()
    .x((d) => x(new Date(d[xKey] as any)))
    .y((d) => y(d[yKey] as number));
}

function renderAxes(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  x: d3.ScaleTime<number, number>,
  y: d3.ScaleLinear<number, number>,
  width: number,
  height: number,
  innerHeight: number,
  margin: { top: number; right: number; bottom: number; left: number },
  xLabel?: string,
  yLabel?: string
) {
  // x-axis label
  if (xLabel) {
    svg
      .append("text")
      .attr("fill", COLORS.text)
      .attr(
        "transform",
        `translate(${width / 2},${height - margin.bottom + 20})`
      )
      .attr("text-anchor", "middle")
      .text(xLabel);
  }

  // y-axis label
  if (yLabel) {
    svg
      .append("text")
      .attr("fill", COLORS.text)
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2.5)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(yLabel);
  }

  svg
    .append("g")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(x));

  svg
    .append("g")
    .attr("transform", `translate(0,0)`)
    .call(d3.axisLeft(y).ticks(height / 40))
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .selectAll(".tick line")
        .clone()
        .attr("x2", width - margin.left - margin.right)
        .attr("stroke-opacity", 0.1)
    )
    .call((g) =>
      g
        .append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
    );
}

function renderLine<T>(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  data: T[],
  line: d3.Line<T>,
  xKey: keyof T,
  yKey: keyof T,
  color: ColorProp
) {
  svg
    .append("path")
    .data([data])
    .attr("class", "line")
    .attr("d", line)
    .style("stroke", COLORS[color])
    .style("fill", "none")
    .attr("stroke-width", 2.0)
    .style("opacity", 0)
    .transition()
    .delay(200)
    .duration(500)
    .style("opacity", 1);
}

function renderCircles<T>(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  data: T[],
  x: d3.ScaleTime<number, number>,
  y: d3.ScaleLinear<number, number>,
  xKey: keyof T,
  yKey: keyof T,
  color: ColorProp
) {
  const linePath = svg.append("g").attr("class", "line");

  const circles = linePath
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => x(new Date(d[xKey] as any)))
    .attr("cy", (d) => y(d[yKey] as any))
    .attr("r", 8)
    .attr("fill", COLORS[color])
    .attr("opacity", 0);

  circles
    .transition()
    .delay((d, i) => i * 50) // Delay based on data point index
    .duration(200)
    .attr("opacity", 0.5);

  // Zoom in
  // circles.on("mouseover", function () {
  //   d3.select(this)
  //     .transition()
  //     .duration(200)
  //     .attr("r", 8)
  //     .style("opacity", 0.75);
  // });

  // Zoom out
  // circles.on("mouseout", function () {
  //   d3.select(this)
  //     .transition()
  //     .duration(200)
  //     .attr("r", 6)
  //     .style("opacity", 0.5);
  // });
}

function setupTooltip<T>(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  data: T[],
  x: d3.ScaleTime<number, number>,
  y: d3.ScaleLinear<number, number>,
  xKey: keyof T,
  yKey: keyof T,
  color: ColorProp
) {
  const tooltip = svg.append("g").attr("class", "graph-tooltip");

  const bisect = d3.bisector((d: T) => new Date(d[xKey] as any)).center;

  svg
    .on("pointerenter pointermove", pointerMoved)
    .on("pointerleave", pointerLeft)
    .on("touchstart", (event: React.TouchEvent<SVGSVGElement>) =>
      event.preventDefault()
    );

  function pointerMoved(event: React.PointerEvent<SVGSVGElement>) {
    const i = bisect(data, x.invert(d3.pointer(event)[0]));

    tooltip
      .style("display", "block")
      .attr(
        "transform",
        `translate(${x(new Date(data[i][xKey] as any))},${
          y(data[i][yKey] as number) + 10
        })`
      );

    const path = tooltip
      .selectAll("path")
      .data([,])
      .join("path")
      .attr("fill", "#13111a")
      .attr("stroke", COLORS[color]);

    const text = tooltip
      .selectAll("text")
      .data([,])
      .join("text")
      .call((text) =>
        text
          .selectAll("tspan")
          .data([
            formatDate(new Date(data[i][xKey] as any)),
            `${yKey.toString()}: ${formatNumber(data[i][yKey] as number)}`,
          ])
          .join("tspan")
          .attr("x", 0)
          .attr("y", (_, i) => `${i * 1.1}em`)
          .attr("font-weight", (_, i) => (i ? null : "bold"))
          .attr("fill", COLORS.text)
          .text((d) => d)
      );

    size(text, path);
  }

  function pointerLeft() {
    tooltip.style("display", "none");
  }

  function formatDate(date: Date) {
    return date.toLocaleString("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  }

  // Wraps the text with a callout path of the correct size, as measured in the page.
  function size(text, path) {
    const { x, y, width: w, height: h } = text.node().getBBox();
    text.attr("transform", `translate(${-w / 2},${15 - y})`);
    path.attr(
      "d",
      `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`
    );
  }
}

function renderLegends(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  legendData: { color: ColorProp; text: string }[]
) {
  const legend = svg
    .append("g")
    .attr("class", "legend")
    .attr("transform", `translate(0, -40)`); // Adjust the initial position as needed

  const legends = legend
    .selectAll(".legend-item")
    .data(legendData)
    .enter()
    .append("g")
    .attr("class", "legend-item")
    .attr("transform", (d, i) => {
      // Calculate the total width of previous legends
      const totalWidth = legendData
        .slice(0, i)
        .reduce((sum, entry) => sum + calculateLegendWidth(entry.text), 0);
      return `translate(${totalWidth + i * 10}, 0)`; // Adjust the spacing as needed
    });

  legends
    .append("rect")
    .attr("width", 10)
    .attr("height", 10)
    .attr("fill", (d) => COLORS[d.color]);

  legends
    .append("text")
    .attr("x", 15)
    .attr("y", 10)
    .style("fill", COLORS.text)
    .text((d) => d.text);

  function calculateLegendWidth(text: string) {
    // Use a dummy SVG text element to calculate the width of the legend
    const dummyText = svg.append("text").text(text).style("opacity", 0);
    const width = dummyText.node().getBBox().width;
    dummyText.remove();
    return width + 25; // Add extra space for padding
  }
}

function renderText(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  width: number,
  height: number,
  margin: { top: number; right: number; bottom: number; left: number },
  message: string = ""
) {
  svg
    .append("text")
    .attr("x", (width - margin.left - margin.right) / 2)
    .attr("y", (height - margin.top - margin.bottom) / 2)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("fill", COLORS.text)
    .style("font-size", "18px")
    .text(message || "Not enough data to display the chart");
}

const LineWithTooltip = <T extends Record<string, any>>({
  data,
  loading,
  xKey,
  yKey,
  xLabel,
  yLabel,
  color = "blue",
  legends = [],
}: LineWithTooltipProps<T>) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current || !data || data.length === 0) {
      console.error("SVG element not found or empty data provided.");
      return;
    }

    const { width, height, margin, innerWidth, innerHeight } =
      setupChartDimensions(svgRef.current);

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr(
        "style",
        "max-width: 100%; height: auto; height: intrinsic; font-size: 12px;"
      )
      .style("-webkit-tap-highlight-color", "transparent")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .style("overflow", "visible");

    // Remove existing elements to avoid duplication on updates
    svg.selectAll("*").remove();

    const x = createXScale(data, innerWidth, xKey);
    const y = createYScale(data, innerHeight, yKey);
    const line = createLine(x, y, xKey, yKey);
    renderAxes(svg, x, y, width, height, innerHeight, margin, xLabel, yLabel);
    if (data?.length < 2 || data?.length === 0) {
      renderText(svg, width, height, margin, "No data!");
    } else {
      renderLine(svg, data, line, xKey, yKey, color);
      renderCircles(svg, data, x, y, xKey, yKey, color);
      setupTooltip(svg, data, x, y, xKey, yKey, color);
      renderLegends(svg, legends);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center aspect-[3/1]">
        <LoadingIndicator />
      </div>
    );
  }

  return <svg ref={svgRef} className="w-full aspect-[3/1]" />;
};

export default LineWithTooltip;
