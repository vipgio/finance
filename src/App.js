import Activity from "./components/Activity";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
// import MyChart from "./components/Chart";
import TransactionContextProvider from "./contexts/TransactionContext";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
	return (
		<Router>
			<div className='App'>
				<div className='content'>
					<div className='box-effect'></div>
					<div className='box'>
						<TransactionContextProvider>
							<Sidebar />
							<Main />
							<Activity />
						</TransactionContextProvider>
					</div>
				</div>
			</div>
		</Router>
	);
}

export default App;
