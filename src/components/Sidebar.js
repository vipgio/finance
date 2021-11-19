import React from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import { SiSamsungpay } from "react-icons/si";
import { BsBoxArrowInLeft, BsBoxArrowRight } from "react-icons/bs";

const Sidebar = () => {
	return (
		<div className='sidebar'>
			<div className='sidebar-options'>
				<div className='sidebar-logo'>
					<SiSamsungpay size='1.5em' style={{ paddingBottom: "10px" }} />
				</div>
				<div className='sidebar-list'>
					<div className='sidebar-dashboard'>
						<HiOutlineHome style={{ marginRight: "15px" }} />
						<NavLink
							to='/'
							exact={true}
							activeStyle={{ color: "rgb(75, 49, 83)", fontSize: "0.9em" }}
						>
							Dashboard
						</NavLink>
					</div>
					<div className='sidebar-income'>
						<BsBoxArrowInLeft style={{ marginRight: "15px", color: "green" }} />
						<NavLink
							to='/income'
							activeStyle={{ color: "rgb(75, 49, 83)", fontSize: "0.9em" }}
						>
							Income
						</NavLink>
					</div>
					<div className='sidebar-expanse'>
						<BsBoxArrowRight style={{ marginRight: "15px", color: "red" }} />
						<NavLink
							to='/expense'
							activeStyle={{ color: "rgb(75, 49, 83)", fontSize: "0.9em" }}
						>
							Expense
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
