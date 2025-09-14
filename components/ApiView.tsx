import React, { useState, useCallback } from 'react';
import { CopyIcon, CheckIcon } from './icons';

interface ApiViewProps {
  token: string;
  connectionHost: string;
}

const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }, [code]);

  return (
    <div className="relative">
      <pre className="bg-supabase-dark p-4 rounded-md text-sm text-gray-300 overflow-x-auto">
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 bg-supabase-dark-3 rounded-md hover:bg-supabase-dark-2 transition-colors"
        aria-label="Copy code"
      >
        {isCopied ? (
          <CheckIcon className="h-5 w-5 text-supabase-green" />
        ) : (
          <CopyIcon className="h-5 w-5 text-gray-400" />
        )}
      </button>
    </div>
  );
};

export const ApiView: React.FC<ApiViewProps> = ({ token, connectionHost }) => {
  const apiUrl = `${window.location.origin}/api/v1/data/{table_name}`;

  const curlGet = `curl "${window.location.origin}/api/v1/data/users?limit=10" \\\n  -H "Authorization: Bearer YOUR_API_TOKEN"`;
  const curlPost = `curl -X POST "${window.location.origin}/api/v1/data/users" \\\n  -H "Authorization: Bearer YOUR_API_TOKEN" \\\n  -H "Content-Type: application/json" \\\n  -d '{"name": "Jane Doe", "email": "jane@example.com"}'`;

  return (
    <div className="w-full p-4 md:p-8 space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-gray-100">Your API is Ready</h2>
        <p className="text-supabase-gray-light mt-1">
          Connected to <span className="text-supabase-green font-mono">{connectionHost}</span>. Use the token below to query your new API.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-200">API Access Token</h3>
        <p className="text-sm text-supabase-gray-light">
          This token is valid for 1 hour. Keep it secure and do not expose it on the client-side of any public application.
        </p>
        <CodeBlock code={token} />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-200">API Endpoints</h3>
        <div className="space-y-2">
            <div>
                <span className="inline-flex items-center rounded-md bg-green-900 px-2 py-1 text-xs font-medium text-supabase-green ring-1 ring-inset ring-green-600/20">GET</span>
                <span className="ml-2 font-mono text-supabase-gray-light">{apiUrl}</span>
            </div>
            <div>
                <span className="inline-flex items-center rounded-md bg-blue-900 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-600/20">POST</span>
                <span className="ml-2 font-mono text-supabase-gray-light">{apiUrl}</span>
            </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-200">Usage Examples</h3>
        <p className="text-sm text-supabase-gray-light">
          Replace `YOUR_API_TOKEN` in the examples with your token above.
        </p>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-300 mb-2">cURL: Get Records</h4>
            <CodeBlock code={curlGet} />
          </div>
          <div>
            <h4 className="font-semibold text-gray-300 mb-2">cURL: Create Record</h4>
            <CodeBlock code={curlPost} />
          </div>
        </div>
      </div>
    </div>
  );
};
