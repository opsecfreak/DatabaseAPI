
import React from 'react';
import type { UserRecord } from '../types';
import { LoaderIcon, EmptyBoxIcon } from './icons';

interface DatabaseViewProps {
  data: UserRecord[];
  onSeed: () => void;
  isLoading: boolean;
  connectionHost: string;
}

const EmptyState: React.FC<{ onSeed: () => void; isLoading: boolean }> = ({ onSeed, isLoading }) => (
  <div className="text-center p-12 bg-supabase-dark-2 rounded-lg border-2 border-dashed border-supabase-dark-3">
    <EmptyBoxIcon className="mx-auto h-16 w-16 text-supabase-gray-light" />
    <h3 className="mt-4 text-xl font-semibold text-gray-200">Database is Empty</h3>
    <p className="mt-2 text-base text-supabase-gray-light">
      There is no data to display. You can seed the database with sample data.
    </p>
    <div className="mt-6">
      <button
        type="button"
        onClick={onSeed}
        disabled={isLoading}
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-supabase-green hover:bg-supabase-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-supabase-green focus:ring-offset-supabase-dark-2 disabled:bg-gray-600 transition-colors"
      >
        {isLoading ? (
          <>
            <LoaderIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
            Seeding...
          </>
        ) : (
          'Seed with Sample Data'
        )}
      </button>
    </div>
  </div>
);

const DataTable: React.FC<{ data: UserRecord[] }> = ({ data }) => (
  <div className="overflow-x-auto">
    <div className="inline-block min-w-full align-middle">
      <div className="overflow-hidden shadow-2xl ring-1 ring-supabase-dark-3 ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-supabase-dark-3">
          <thead className="bg-supabase-dark-2">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-supabase-gray-light uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-supabase-gray-light uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-supabase-gray-light uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-supabase-gray-light uppercase tracking-wider">Created At</th>
            </tr>
          </thead>
          <tbody className="bg-supabase-dark-2 divide-y divide-supabase-dark-3">
            {data.map((record) => (
              <tr key={record.id} className="hover:bg-supabase-dark-3 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">{record.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{record.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{record.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{new Date(record.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export const DatabaseView: React.FC<DatabaseViewProps> = ({ data, onSeed, isLoading, connectionHost }) => {
  return (
    <div className="w-full p-4 md:p-8 space-y-6">
      <div>
          <h2 className="text-3xl font-bold text-gray-100">Database Data</h2>
          <p className="text-supabase-gray-light">Viewing data from <span className="text-supabase-green font-mono">{connectionHost}</span></p>
      </div>
      {data.length === 0 ? (
        <EmptyState onSeed={onSeed} isLoading={isLoading} />
      ) : (
        <DataTable data={data} />
      )}
    </div>
  );
};
