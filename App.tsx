import React, { useState, useCallback } from 'react';
import type { ConnectionDetails } from './types';
import { ConnectionForm } from './components/ConnectionForm';
import { ApiView } from './components/ApiView';
import { SupabaseIcon } from './components/icons';

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [connectionDetails, setConnectionDetails] = useState<ConnectionDetails | null>(null);
  const [apiToken, setApiToken] = useState<string | null>(null);

  const handleConnect = useCallback(async (details: ConnectionDetails) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(details),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Connection failed.');
      }

      setApiToken(data.token);
      setConnectionDetails(details);
      setIsConnected(true);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDisconnect = useCallback(() => {
    setIsConnected(false);
    setConnectionDetails(null);
    setApiToken(null);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen bg-supabase-dark font-sans flex flex-col items-center justify-center p-4">
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <SupabaseIcon className="w-8 h-8 text-supabase-green" />
          <h1 className="text-2xl font-bold text-gray-200">Database API Generator</h1>
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

      <main className="w-full max-w-5xl flex-grow flex items-center justify-center">
        {!isConnected || !apiToken ? (
          <ConnectionForm onConnect={handleConnect} isLoading={isLoading} error={error} />
        ) : (
          <ApiView 
            token={apiToken}
            connectionHost={new URL(connectionDetails!.url).hostname}
          />
        )}
      </main>
      
      <footer className="w-full text-center p-4 text-supabase-gray-light text-sm">
        <p>Your credentials are used to generate a temporary API token and are not stored.</p>
      </footer>
    </div>
  );
};

export default App;
