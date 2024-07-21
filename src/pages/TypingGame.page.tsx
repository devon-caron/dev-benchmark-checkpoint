import ColorSchemeToggle from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';
import TypingGame from '@/components/TypingGame/TypingGame';

const TypingGamePage: React.FC = () => {
    return (
        <>
            <TypingGame textToType={'Goodbye, this is a test.'} />
        </>
    );
}

export default TypingGamePage;