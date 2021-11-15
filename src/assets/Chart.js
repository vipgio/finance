import { ResponsiveLine } from "@nivo/line";
import { DateTime } from "luxon";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const Chart = ({ transactionData, balance }) => {
	const chartData = [
		{ x: DateTime.now().plus({ months: -0 }).toFormat("LLL"), y: balance },
	];
	for (let i = 0; i <= 4; i++) {
		let folan = {
			x: DateTime.now()
				.plus({ months: -i - 1 })
				.toFormat("LLL"),
			y: transactionData
				?.filter(
					(transaction) =>
						DateTime.fromISO(transaction.fields.date).toFormat("LLL yy") ===
						DateTime.now().plus({ months: -i }).toFormat("LLL yy")
				)
				.reduce(
					(acc, cur) =>
						(acc = cur.fields.isIncome
							? acc - cur.fields.amount
							: acc + cur.fields.amount),
					chartData[i].y
				),
		};
		chartData.push(folan);
	}

	const data = [
		{
			id: "balance:",
			color: "hsl(169, 70%, 50%)",
			data: chartData.reverse(),
		},
	];
	return (
		<ResponsiveLine
			data={data}
			margin={{ top: 50, right: 30, bottom: 150, left: 60 }}
			xScale={{ type: "point" }}
			yScale={{ type: "linear", min: "auto", max: "auto", stacked: true, reverse: false }}
			yFormat=' >-.2f'
			axisTop={null}
			axisRight={null}
			enableGridX={false}
			enableGridY={false}
			curve='monotoneX'
			enableArea={true}
			enablePoints={false}
			// enableCrosshair={false}
			axisBottom={{
				orient: "bottom",
				tickSize: 0,
				tickPadding: 5,
				tickRotation: 0,
				legendOffset: 36,
				legendPosition: "middle",
			}}
			axisLeft={{
				orient: "left",
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: "balance",
				legendOffset: -40,
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
};

export default Chart;
