// App.jsx - aggiunto supporto per "Torna alla Dashboard"

import { useState } from 'react';
import TabataDashboard from './components/TabataDashboard';
import WorkoutScreen from './components/WorkoutScreen';

function App() {
  const [isRunningTabata, setIsRunningTabata] = useState(false);
  const [tabataData, setTabataData] = useState(null);

  const handleStartTabata = ({ stations, rounds, work, rest }) => {
    setTabataData({ stations, rounds, work, rest });
    setIsRunningTabata(true);
  };

  const handleBackToDashboard = () => {
    setIsRunningTabata(false);
    setTabataData(null);
  };

  return (
    <>
      {isRunningTabata && tabataData ? (
        <WorkoutScreen
          stations={tabataData.stations}
          rounds={tabataData.rounds}
          work={tabataData.work}
          rest={tabataData.rest}
          onBack={handleBackToDashboard}
        />
      ) : (
        <TabataDashboard onStart={handleStartTabata} />
      )}
    </>
  );
}

export default App;
