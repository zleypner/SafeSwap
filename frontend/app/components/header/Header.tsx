"use client";
import { SafeSwapLogo } from "@/app/components/ui/SafeSwapLogo";
import { Button } from "@/app/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Input } from "@/app/components/ui/input";
import {
	History,
	List,
	Search,
	Settings,
	ShoppingCart,
	User,
	Wallet,
	X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";

export default function Header() {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [isSearchExpanded, setIsSearchExpanded] = useState(false);
	const [dark, setDark] = useState(false);

	useEffect(() => {
		const darkMode = localStorage.getItem("darkMode");
		if (darkMode) {
			setDark(JSON.parse(darkMode));
		}

		// Add keyboard event listener
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setIsSearchExpanded(true);
			} else if (e.key === "Escape") {
				setIsSearchExpanded(false);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	useEffect(() => {
		if (typeof window !== "undefined") {
			document.documentElement.classList.toggle("dark", dark);
			localStorage.setItem("darkMode", JSON.stringify(dark));
		}
	}, [dark]);

	const handleSearchClose = () => {
		setIsSearchExpanded(false);
		setSearchTerm("");
	};

	return (
		<>
			<header className="flex items-center justify-between px-6 py-4 border-b relative">
				<div className="flex items-center gap-4 min-w-max">
					<Link href={"/"}>
						<SafeSwapLogo width={150} height={40} />
					</Link>
				</div>
				{isSearchExpanded && (
					<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[500px] max-w-[calc(100vw-32px)]">
						<div className="relative flex items-center w-full bg-background border rounded-md shadow-lg">
							<Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search products, categories..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-9 pr-9 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
								autoFocus
							/>
							<Button
								variant="ghost"
								size="icon"
								className="absolute right-1 h-7 w-7"
								onClick={handleSearchClose}
							>
								<X className="h-4 w-4" />
								<span className="sr-only">Close search</span>
							</Button>
						</div>
					</div>
				)}
				<div className="flex gap-4">
					<Button
						variant="ghost"
						size="icon"
						className="h-9 w-9"
						onClick={() => setIsSearchExpanded(true)}
					>
						<Search className="h-5 w-5" />
						<span className="sr-only">Search</span>
					</Button>
					<Button size="lg" className="group">
						<Wallet className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
						Connect Wallet
					</Button>
					<Button className="group h-auto">
						<ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button className="group h-auto">
								<User className="h-5 w-5 transition-transform group-hover:scale-110" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-48">
							<DropdownMenuItem>
								<User className="mr-2 h-4 w-4" />
								Profile
							</DropdownMenuItem>
							<DropdownMenuItem>
								<List className="mr-2 h-4 w-4" />
								My Listings
							</DropdownMenuItem>
							<DropdownMenuItem>
								<History className="mr-2 h-4 w-4" />
								Transaction History
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Settings className="mr-2 h-4 w-4" />
								Settings
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<button
						onClick={() => setDark(!dark)}
						className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
						aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
					>
						{dark ? (
							<IoSunny className="w-6 h-6" />
						) : (
							<IoMoon className="w-6 h-6" />
						)}
					</button>
				</div>
			</header>
		</>
	);
}
