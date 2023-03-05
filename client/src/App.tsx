import './App.css';

import { Game, NoUserSection } from './components';

import { selectState } from './store';
import { useSelector } from 'react-redux';

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
