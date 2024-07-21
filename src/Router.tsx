import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import TypingGamePage from './pages/TypingGame.page';
import TestPage from './pages/Test.page';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/typing',
        element: <TypingGamePage />
    },
    {
        path: '/test',
        element: <TestPage />
    }
]);

const Router: React.FC = () => {
    return (
        <RouterProvider router={router} />
    );
}

export default Router;
