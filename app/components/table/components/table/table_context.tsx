import {
	ReactNode,
	createContext,
	createRef,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";

const TableContext = createContext<{
	hiddenColumns: (number | null)[];
	addCellRefs: (ref: HTMLTableCellElement | null, idx: number) => void;
	columns: number;
}>({
	hiddenColumns: [],
	addCellRefs: () => {
		return;
	},
	columns: 0,
});

export const useTableContent = () => useContext(TableContext);

export const TableContentProvider = ({ children }: { children: ReactNode }) => {
	const [hiddenColumns, setHiddenColumns] = useState<(number | null)[]>([]);
	const [breakpoints, setBreakpoints] = useState<number[]>([]);
	const columnRefs = useRef<HTMLTableCellElement[]>([]);
	const ref = createRef<HTMLDivElement>();

	const handleResize = useCallback(() => {
		if (!ref.current) return;
		const clientWidth = ref.current.clientWidth;
		const columns = [...columnRefs.current];
		let width = Math.abs(ref.current.clientWidth - ref.current.scrollWidth);

		for (let i = columns.length - 1; i >= 1; i--) {
			if (
				hiddenColumns.includes(i) &&
				breakpoints.findLast((breakpoint) => breakpoint <= clientWidth)
			) {
				const column = breakpoints.findLastIndex(
					(breakpoint) => breakpoint <= clientWidth
				);
				setHiddenColumns((prev) => {
					const hiddenColumns = [...prev];
					hiddenColumns.forEach((_, i) => {
						if (i <= column) hiddenColumns[i] = null;
					});
					return hiddenColumns;
				});
				continue;
			}
			if (hiddenColumns.includes(i)) continue;
			if (width <= 0) break;
			const column = columns[i];
			setBreakpoints((prev) => {
				const breakpoints = [...prev];
				breakpoints[i - 1] = clientWidth + Math.abs(width);
				return breakpoints;
			});
			setHiddenColumns((prev) => {
				const hiddenColumns = [...prev];
				hiddenColumns[i - 1] = i;
				return hiddenColumns;
			});
			width -= column.offsetWidth;
		}
	}, [hiddenColumns, columnRefs, ref, breakpoints]);

	useEffect(() => {
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [ref, columnRefs]);

	useEffect(() => {
		handleResize();
	}, []);

	const addCellRefs = useCallback(
		(ref: HTMLTableCellElement | null, idx: number) => {
			if (!ref || columnRefs.current.includes(ref)) return;
			columnRefs.current[idx] = ref;
		},
		[columnRefs]
	);

	return (
		<TableContext.Provider
			value={{
				hiddenColumns,
				addCellRefs,
				columns: columnRefs.current.length,
			}}
		>
			<div className="row" ref={ref}>
				{children}
			</div>
		</TableContext.Provider>
	);
};
