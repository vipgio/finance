import { ResponsiveLine } from "@nivo/line";

const data = [
	{
		id: "balance:",
		color: "hsl(169, 70%, 50%)",
		data: [
			{
				x: "JAN",
				y: 227,
			},
			{
				x: "FEB",
				y: 204,
			},
			{
				x: "MAR",
				y: 26,
			},
			{
				x: "APR",
				y: 18,
			},
			{
				x: "MAY",
				y: 189,
			},
			{
				x: "JUN",
				y: 118,
			},
			{
				x: "JUL",
				y: 186,
			},
			{
				x: "AUG",
				y: 248,
			},
		],
	},
];

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const Chart = () => (
	<ResponsiveLine
		data={data}
		margin={{ top: 50, right: 30, bottom: 150, left: 60 }}
		xScale={{ type: "point" }}
		yScale={{ type: "linear", min: 0, max: "auto", stacked: true, reverse: false }}
		yFormat=' >-.2f'
		axisTop={null}
		axisRight={null}
		axisLeft={null}
		enableGridX={false}
		enableGridY={false}
		curve='monotoneX'
		enableArea={true}
		enablePoints={false}
		enableCrosshair={false}
		axisBottom={{
			orient: "bottom",
			tickSize: 0,
			tickPadding: 5,
			tickRotation: 0,
			legendOffset: 36,
			legendPosition: "middle",
		}}
		pointSize={10}
		pointColor={{ theme: "background" }}
		pointBorderWidth={2}
		pointBorderColor={{ from: "serieColor" }}
		pointLabelYOffset={-12}
		useMesh={true}
		enableSlices='x'
	/>
);

export default Chart;
