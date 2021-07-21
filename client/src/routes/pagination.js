import React, {useMemo} from "react";

export function PageButton(props){
    return(
        <div onClick = {()=>{props.onClick(props.i)}} className = {props.className}><span>{props.i}</span></div>
    )
}
export function BackButton(props){
    return(
        <div onClick = {props.onClick} className = {props.className}><span>&laquo;</span></div>
    )
}

export function NextButton(props){
    return(
        <div onClick = {props.onClick} className = {props.className}><span>&raquo;</span></div>
    )
}

const range = (start, end) => {
    let length = end - start + 1;

    return Array.from({ length }, (_, idx) => idx + start);
};

const usePages = (current, total, siblingCount = 1)=>{
    const pages = useMemo(()=>{
        let size = siblingCount + 5;

        if(total < size){
            return range(1, total);
        }
        let leftSibling = Math.max(current-siblingCount, 1);
        let rightSibling = Math.min(current+siblingCount, total);
        console.log(leftSibling, rightSibling)

        let showLeftDots = leftSibling > 2;
        let showRightDots = rightSibling < total-2;
        console.log(showLeftDots, showRightDots);


        if(!showLeftDots && showRightDots){
            let leftItem = 3+siblingCount;
            let leftRange = range(1, leftItem);

            return [...leftRange, -1, total];
        }
        if(showLeftDots && !showRightDots){
            let rightItem = 3+siblingCount;
            console.log(rightItem)
            let rightRange = range(
                total - rightItem+1,
                total
            );
            return [1, -1, ...rightRange];
        }

        if(showLeftDots && showRightDots){
            let middleRange = range(leftSibling, rightSibling);
            return [1, -1, ...middleRange, -1, total];
        }
        console.log("OK, and?")

    }, [current, total, siblingCount]);
    return pages;
}

export default function Pagination(props){
    let curr = props.currentPage;
    let total = props.pages;
    const pages = usePages(curr, total);
    console.log(pages);

    return(
        <div className = "pagination">
            {total>1 ?
            <>
            <BackButton 
                onClick = {curr > 1 ? ()=>{props.onPageButtonClick(curr-1)} : null }
                className = "page-button"
            />
            {pages.map((i)=>{
                return(
                    i == -1 ?
                    "..."
                    :
                    <PageButton
                        className={`page-button ${i == curr ? "active" : ""}`}
                        i={i}
                        onClick={() => { props.onPageButtonClick(i) }}
                    />
                )
            })}
            <NextButton 
                onClick = {curr<total ? ()=>{props.onPageButtonClick(curr+1)} : null }
                className = "page-button"
            />
            </>
            :
            null
            }
        </div>
    )
}

