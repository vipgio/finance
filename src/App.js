import Activity from "./components/Activity";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";

function App() {
	return (
		<div className='App'>
			<div className='content'>
				<div className='box-effect'></div>
				<div className='box'>
					<Sidebar />
					<Main />
					<Activity />
				</div>
			</div>
		</div>
	);
}

export default App;
