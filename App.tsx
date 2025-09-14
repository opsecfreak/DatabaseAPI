
import React, { useState, useCallback } from 'react';
import type { ConnectionDetails, UserRecord } from './types';
import { MOCK_USER_DATA } from './constants';
import { ConnectionForm } from './components/ConnectionForm';
import { DatabaseView } from './components/DatabaseView';
import { SupabaseIcon } from './components/icons';

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [connectionDetails, setConnectionDetails] = useState<ConnectionDetails | null>(null);
  const [dbData, setDbData] = useState<UserRecord[]>([]);

  const handleConnect = useCallback((details: ConnectionDetails) => {
    setIsLoading(true);
    setError(null);
    
    // Simulate network delay
    setTimeout(() => {
      // Simulate a failed connection
      if (details.apiKey.toLowerCase() === 'fail') {
        setError('Connection failed. Please check your credentials.');
        setIsLoading(false);
        return;
      }
      
      setConnectionDetails(details);
      setIsConnected(true);
      setIsLoading(false);
      // Start with empty data to show the seeding option
      setDbData([]); 
    }, 2000);
  }, []);

  const handleDisconnect = useCallback(() => {
    setIsConnected(false);
    setConnectionDetails(null);
    setDbData([]);
    setError(null);
  }, []);

  const handleSeedData = useCallback(() => {
    setIsLoading(true);
    // Simulate seeding operation
    setTimeout(() => {
      setDbData(MOCK_USER_DATA);
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="min-h-screen bg-supabase-dark font-sans flex flex-col items-center justify-center p-4">
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <SupabaseIcon className="w-8 h-8 text-supabase-green" />
          <h1 className="text-2xl font-bold text-gray-200">Database Manager</h1>
        </div>
        {isConnected && connectionDetails && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-supabase-gray-light hidden md:block">{`Connected to: ${new URL(connectionDetails.url).hostname}`}</span>
            <button
              onClick={handleDisconnect}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white font-semibold transition-colors duration-200"
            >
              Disconnect
            </button>
          </div>
        )}
      </header>

      <main className="w-full max-w-6xl flex-grow flex items-center justify-center">
        {!isConnected ? (
          <ConnectionForm onConnect={handleConnect} isLoading={isLoading} error={error} />
        ) : (
          <DatabaseView
            data={dbData}
            onSeed={handleSeedData}
            isLoading={isLoading}
            connectionHost={connectionDetails ? new URL(connectionDetails.url).hostname : ''}
          />
        )}
      </main>
      
      <footer className="w-full text-center p-4 text-supabase-gray-light text-sm">
        <p>This is a UI mockup. No real database connection is made from the browser.</p>
      </footer>
    </div>
  );
};

export default App;
