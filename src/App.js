import Activity from "./components/Activity";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import TransactionContextProvider from "./contexts/TransactionContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import IncomePage from "./components/IncomePage";
import ExpensePage from "./components/ExpensePage";

function App() {
	return (
		<Router>
			<div className='App'>
				<div className='content'>
					<div className='box-effect'></div>
					<div className='box'>
						<TransactionContextProvider>
							<Sidebar />
							<Switch>
								<Route exact path='/'>
									<>
										<Main />
										<Activity />
									</>
								</Route>
								<Route path='/income'>
									<IncomePage />
								</Route>
								<Route path='/expense'>
									<ExpensePage />
								</Route>
								<Route>
									<div>WRONG</div>
								</Route>
							</Switch>
						</TransactionContextProvider>
					</div>
				</div>
			</div>
		</Router>
	);
}

export default App;
