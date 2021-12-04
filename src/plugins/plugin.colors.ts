import React, { useRef, useEffect, useState } from "react";
import type { ChartData, ChartArea } from "chart.js";

export const YELLOW = "#f1bf15";
export const PINK = "#f8507d";

export const getGradient = (
	ctx: CanvasRenderingContext2D,
	chartArea: ChartArea
) => {
	const gradient = ctx.createLinearGradient(
		0,
		chartArea.bottom,
		0,
		chartArea.top
	);
	gradient.addColorStop(0, YELLOW);
	gradient.addColorStop(1, PINK);
	return gradient;
};

export const defaultGradient = (
	ctx: CanvasRenderingContext2D,
	chartArea: ChartArea
) => {
	return getGradient(ctx, chartArea);
};
