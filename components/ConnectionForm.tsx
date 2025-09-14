
import React, { useState } from 'react';
import type { ConnectionDetails } from '../types';
import { DatabaseIcon, KeyIcon, LoaderIcon } from './icons';

interface ConnectionFormProps {
  onConnect: (details: ConnectionDetails) => void;
  isLoading: boolean;
  error: string | null;
}

export const ConnectionForm: React.FC<ConnectionFormProps> = ({ onConnect, isLoading, error }) => {
  const [url, setUrl] = useState('');
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url && apiKey) {
      onConnect({ url, apiKey });
    }
  };

  return (
    <div className="w-full max-w-md bg-supabase-dark-2 p-8 rounded-lg shadow-2xl border border-supabase-dark-3">
      <h2 className="text-3xl font-bold text-center text-gray-100 mb-2">Connect to Database</h2>
      <p className="text-center text-supabase-gray-light mb-8">Enter your Supabase project details.</p>
      
      {error && (
        <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-md relative mb-6" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="url" className="text-sm font-medium text-gray-300">Project URL</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
              <DatabaseIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-project-ref.supabase.co"
              required
              className="block w-full bg-supabase-dark-3 border-supabase-dark-3 rounded-md py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-supabase-green focus:border-supabase-green"
            />
          </div>
        </div>
        <div>
          <label htmlFor="apiKey" className="text-sm font-medium text-gray-300">API Key (anon public)</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
              <KeyIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="your-anon-public-key"
              required
              className="block w-full bg-supabase-dark-3 border-supabase-dark-3 rounded-md py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-supabase-green focus:border-supabase-green"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-supabase-green hover:bg-supabase-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-supabase-green focus:ring-offset-supabase-dark-2 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? (
              <>
                <LoaderIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Connecting...
              </>
            ) : (
              'Connect Securely'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
