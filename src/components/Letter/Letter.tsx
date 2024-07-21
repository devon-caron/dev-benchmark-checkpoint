import React from "react";

interface LetterProps {
    isHighlighted: boolean,
    letterColor: string,
    highlightedColor: string,
    highlightedBlinkColor1: string,
    highlightedBlinkColor2: string,
    fontFamily: string,
    fontWeight: string,
    typed: "before" | "on" | "after",
    children: any
}
const Letter: React.FC<LetterProps> = (props) => {

    const [toggled, setToggled] = React.useState(false);

    React.useEffect(() => {
        
        let interval: NodeJS.Timeout;
        if (props.isHighlighted) {
            interval = setInterval(() => {
                setToggled(prev => !prev);
            }, 700);
        }

        return () => clearInterval(interval);
    }, [props.isHighlighted]);

    const stylesNotTyped: React.CSSProperties = {
        backgroundColor: 'transparent',
        color: props.letterColor,
        fontWeight: props.fontWeight,
        fontFamily: props.fontFamily,
        padding: "0px"
    }

    const stylesHighlighted: React.CSSProperties = {
        backgroundColor: 
                (toggled ? 
                    props.highlightedBlinkColor1 : 
                    props.highlightedBlinkColor2
                ),
        color: props.highlightedColor,
        fontWeight: props.fontWeight,
        fontFamily: props.fontFamily,
        padding: "0px"
    }

    const stylesTyped: React.CSSProperties = {
        backgroundColor: 'transparent',
        color: props.letterColor,
        fontWeight: props.fontWeight,
        fontFamily: props.fontFamily,
        padding: "0px"
    }

    const [styleState, setStyleState] = React.useState<React.CSSProperties>(stylesNotTyped);
    const [, forceUpdate] = React.useReducer(x => x + 1, 0);

    React.useEffect(() => {
        if (props.typed === "before") {
            setStyleState(stylesNotTyped);
        } else if (props.typed === "on") {
            setStyleState(stylesHighlighted);
        } else if (props.typed === "after") {
            setStyleState(stylesTyped);
        }

        forceUpdate();
    }, [toggled, props.typed]);

    return (
        <span
            style={ styleState }
        >
            { props.children }
        </span>
    );
}

export default Letter;