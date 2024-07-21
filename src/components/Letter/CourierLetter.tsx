import React from "react";
import Letter from "./Letter";

interface CourierLetterProps {
    letterColor: string,
    highlightedLetterColor: string,
    alreadyTypedColor: string,
    initBlinkerColor: "darkgray" | "white",
    index: number, 
    currentIndex: number,
    children: any
}

export const CourierLetter: React.FC<CourierLetterProps> = (props) => {

    const [, forceUpdate] = React.useReducer(x => x + 1, 0);
    
    const [typedState, setTypedState] = React.useState<"before" | "on" | "after">("before");
    const [highlightedState, setHighlightedState] = React.useState(props.index === props.currentIndex);


    React.useEffect(() => {
        let newTypedState: "before" | "on" | "after";
        if (props.index < props.currentIndex) {
            newTypedState = "before";
        } else if (props.index === props.currentIndex) {
            newTypedState = "on";
        } else {
            newTypedState = "after";
        }

        forceUpdate();
        setTypedState(newTypedState);
        setHighlightedState(props.index === props.currentIndex);
        console.log("test: " + props.currentIndex);
        
    }, [props.currentIndex]);

    return (
        <Letter
            isHighlighted={ highlightedState }
            letterColor={ (typedState === "before") ? 
                props.alreadyTypedColor : 
                props.letterColor 
            } 
            highlightedColor={ props.highlightedLetterColor } 
            highlightedBlinkColor1={ "gray" } 
            highlightedBlinkColor2={ props.initBlinkerColor } 
            fontFamily={ "Courier New, monospace" } 
            fontWeight={ "bold" } 
            typed={ typedState }        
        >
            { props.children }
        </Letter>
    )
}