import './App.css';
import { NoUserSection, Game } from './components';
import { useSelector } from 'react-redux';
import { selectState } from './store';

function App() {
    const rawState = useSelector(selectState());
    const { game } = rawState.gameState;
    if (!game) {
        return (
            <>
                <NoUserSection />
            </>
        );
    }
    return (
        <>
            <Game game={game} />
        </>
    );
}

export default App;
