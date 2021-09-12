import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./index.css";
import { ReactComponent as BellIcon } from "./icons/bell.svg";
import { ReactComponent as MessengerIcon } from "./icons/messenger.svg";
import { ReactComponent as CaretIcon } from "./icons/caret.svg";
import { ReactComponent as PlusIcon } from "./icons/plus.svg";
import { ReactComponent as CogIcon } from "./icons/cog.svg";
import { ReactComponent as ChevronIcon } from "./icons/chevron.svg";
import { ReactComponent as ArrowIcon } from "./icons/arrow.svg";
import { ReactComponent as BoltIcon } from "./icons/bolt.svg";

function App() {
	return (
		<Navbar>
			<NavItem icon={<PlusIcon />} />
			<NavItem icon={<BellIcon />} />
			<NavItem icon={<MessengerIcon />} />

			<NavItem icon={<CaretIcon />}>
				<DropdownMenu></DropdownMenu>
			</NavItem>
		</Navbar>
	);
}

function Navbar(props) {
	return (
		<div>
			<nav className="navbar">
				<ul className="navbar-nav">{props.children}</ul>
			</nav>
			<br />
			<br />
			<br />
			<br />
			<br />
			<nav className="navbar">
				<ul className="navbar-nav">
					<NavItem icon={<PlusIcon />} />
					<NavItem icon={<BellIcon />} />
					<NavItem icon={<BoltIcon />} />
					<NavItem icon={<CaretIcon />} />
					<NavItem icon={<ChevronIcon />} />
					<NavItem icon={<CogIcon />} />
					<NavItem icon={<MessengerIcon />} />
					<NavItem icon={<PlusIcon />} />
					<NavItem icon={<ArrowIcon />}>
						<p> Hello World!</p>
					</NavItem>
				</ul>
			</nav>
			<br />
			<br />
			<br />
			<br />
			<br />
			<nav className="navbar">
				<ul className="navbar-nav">
					<NavItem icon="&#128516;" />
					<NavItem icon="&#129361;" />
					<NavItem icon="&#129377;" />
					<NavItem icon="&#129379;" />
					<NavItem icon="&#128251;" />
					<NavItem icon="&#127759;" />
					<NavItem icon="&#127790;" />
					<NavItem icon="&#127815;" />
					<NavItem icon="&#127836;" />
				</ul>
			</nav>
		</div>
	);
}

function NavItem(props) {
	const [open, setOpen] = useState(false);

	return (
		<li className="nav-item">
			<a href="#" className="icon-button" onClick={() => setOpen(!open)}>
				{props.icon}
			</a>

			{open && props.children}
		</li>
	);
}

function DropdownMenu() {
	const [activeMenu, setActiveMenu] = useState("main");
	const [menuHeight, setMenuHeight] = useState(null);
	const dropdownRef = useRef(null);

	useEffect(() => {
		setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
	}, []);

	function calcHeight(el) {
		const height = el.offsetHeight;
		setMenuHeight(height);
	}

	function DropdownItem(props) {
		return (
			<a
				href="#"
				className="menu-item"
				onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
			>
				<span className="icon-button">{props.leftIcon}</span>
				{props.children}
				<span className="icon-right">{props.rightIcon}</span>
			</a>
		);
	}

	return (
		<div
			className="dropdown"
			style={{ height: menuHeight }}
			ref={dropdownRef}
		>
			<CSSTransition
				in={activeMenu === "main"}
				timeout={500}
				classNames="menu-primary"
				unmountOnExit
				onEnter={calcHeight}
			>
				<div className="menu">
					<DropdownItem leftIcon={<ChevronIcon />}>
						My Profile
					</DropdownItem>
					<DropdownItem leftIcon={<CogIcon />} goToMenu="settings">
						Settings
					</DropdownItem>
					<DropdownItem leftIcon="🦧" goToMenu="animals">
						Animals
					</DropdownItem>
				</div>
			</CSSTransition>

			<CSSTransition
				in={activeMenu === "settings"}
				timeout={500}
				classNames="menu-secondary"
				unmountOnExit
				onEnter={calcHeight}
			>
				<div className="menu">
					<DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
						<h2>My Tutorial</h2>
					</DropdownItem>
					<DropdownItem leftIcon={<BoltIcon />}>HTML</DropdownItem>
					<DropdownItem leftIcon={<BoltIcon />}>CSS</DropdownItem>
					<DropdownItem leftIcon={<BoltIcon />}>
						JavaScript
					</DropdownItem>
					<DropdownItem leftIcon={<BoltIcon />}>
						Awesome!
					</DropdownItem>
				</div>
			</CSSTransition>

			<CSSTransition
				in={activeMenu === "animals"}
				timeout={500}
				classNames="menu-secondary"
				unmountOnExit
				onEnter={calcHeight}
			>
				<div className="menu">
					<DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
						<h2>Animals</h2>
					</DropdownItem>
					<DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
					<DropdownItem leftIcon="🐸">Frog</DropdownItem>
					<DropdownItem leftIcon="🦋">Horse?</DropdownItem>
					<DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
				</div>
			</CSSTransition>
		</div>
	);
}

export default App;
