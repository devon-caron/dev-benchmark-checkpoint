import React, { useState, useEffect } from 'react';
import './TypingGame.css'; // Import CSS file for styling
import { CourierLetter } from '../Letter/CourierLetter';
import { ThemeContext, ThemeContextFields } from '@/context/ThemeContext';

// codified props required for component
interface TypingGameProps {
    textToType: string;
}

const LetterProvider: React.FC<{ text: string, currentIndex: number }> = (props) => {

    const [textState, setTextState] = React.useState(props.text);
    const [currIndexState, setCurrIndexState] = React.useState(props.currentIndex);
    const themeContext = React.useContext(ThemeContext) as ThemeContextFields;
    const [myTheme, setMyTheme] = React.useState(themeContext.theme);

    React.useEffect(() => {
        setTextState(props.text);
        setCurrIndexState(props.currentIndex);
    }, [props.text, props.currentIndex]);

    React.useEffect(() => {
        setMyTheme(themeContext.theme);
    }, [themeContext.theme]);

    return (
        <>
            { textState.split("").map((char, index) => {
                return (
                    <CourierLetter
                        key={ `index: ${ index }, char: ${ char }` }
                        index={ index }
                        currentIndex={ currIndexState } 
                        letterColor={ myTheme === "light" ? "white" : "black" }
                        highlightedLetterColor={ myTheme === "light" ? "black" : "white" }
                        alreadyTypedColor="red"
                        initBlinkerColor={ myTheme === "light" ? "white" : "darkgray"}
                    >
                        { char }
                    </CourierLetter>
                );
            })}
        </>
    )
}

const TypingGame: React.FC<TypingGameProps> = (props) => {

    /** state variable which holds the current string */
    const [text, setText] = React.useState(props.textToType);
    /**
     * state variable storing text in the 'textToType' string that have already
     * been typed by the user
     */
    const [typedText, setTypedText] = useState<string>('');
    /**
     * State variable to store position of user in string
     */
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    /**
     * state variable tracking if user has completed the exercise or not
     */
    const [completed, setCompleted] = useState<boolean>(false);

    React.useEffect(() => {
        setText(props.textToType);
        setTypedText("");
        setCurrentIndex(0);
        setCompleted(false);
    }, [props.textToType]);

    /**
     * 
     * @param event - Key Press Down
     */
    const handleKeyDown = (event: KeyboardEvent) => {
        // setCurrentIndex(currentIndex);
        
        // if the correct next key in string is typed
        if (event.key === props.textToType[currentIndex]) {
            // local var to store updated text
            const newTypedText = typedText + event.key;
            // updates state variables
            setTypedText(newTypedText);
            setCurrentIndex(currentIndex + 1);

            // if the key presses reach end of word
            if (currentIndex + 1 === props.textToType.length) {
                setCompleted(true);
            }
        }
    };


    useEffect(() => {
        // adds an event listener to the page and removes it once finished
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });

    return (
        <div className='typing-game'>
            <div className='text-box'>
                <div>
                    <LetterProvider 
                        text={ text } 
                        currentIndex={ currentIndex }
                    />
                </div>
            </div>
            { completed && (
                <div className="completion-message">
                    Congratulations! You typed the text correctly.
                </div>
            )}
        </div>
    );
};

export default TypingGame;