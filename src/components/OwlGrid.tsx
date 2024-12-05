
import { CellState, RowColumnState } from "solved/dist/puzzles/watchers";
import "./OwlGrid.css";

const formatter = Intl.NumberFormat(undefined, { maximumSignificantDigits: 2 });

export const OwlGrid = (({
    onGridELementClicked,
    gridState,
    disabled,
    highlighted,
    progress,
}: {
    onGridELementClicked: (i: number, j: number) => void,
    gridState: RowColumnState<CellState>,
    progress: number,
    disabled?: boolean,
    highlighted?: [number, number]
}) => {
    const headers = [<th key="-1">{formatter.format(progress * 100)}%</th>];
    for (let i=0; i < gridState.length; i++) {
        const letter = String.fromCharCode("A".charCodeAt(0) + i);
        headers.push(<th key={i}>{letter}</th>);
    }
    const children = [<tr key="-1">{headers}</tr>];
    for (let i=0; i < gridState.length; i++) {
        const row = [];
        row.push(<th key={-1}>{i + 1}</th>);
        for (let j=0; j < gridState[i].length; j++) {
            const classNames = ["owl-tile"];
            if (gridState[i][j]) {
                classNames.push("placed-owl");
            }
            if (highlighted && i === highlighted[0] && j === highlighted[1]) {
                classNames.push("highlighted");
            }
            else if (disabled) {
                classNames.push("desaturated");
            }
            row.push(<td id={`owl-${i},${j}`} className={classNames.join(" ")} key={j} onClick={() => !disabled && onGridELementClicked(i, j)}></td>);
        }
        children.push(<tr className="owl-row-container" key={i}>{row}</tr>);
    }
    return <table className="owl-grid"><tbody>{children}</tbody></table>;
}) satisfies React.FunctionComponent<any>;