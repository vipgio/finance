import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
const data = [
	{ name: "Page A", uv: 400 },
	{ name: "Page B", uv: 200 },
	{ name: "Page C", uv: 300 },
];

const MyChart = () => {
	return (
		<LineChart
			width={350}
			height={200}
			data={data}
			margin={{ top: 5, right: 40, bottom: 5, left: 0 }}
		>
			<Line type='monotone' dataKey='uv' stroke='#8884d8' />
			{/* <CartesianGrid stroke='#ccc' strokeDasharray='5 5' /> */}
			<XAxis dataKey='name' />
			<YAxis />
			<Tooltip />
		</LineChart>
	);
};

export default MyChart;
