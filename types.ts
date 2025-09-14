export interface ConnectionDetails {
  url: string;
  apiKey: string;
}

// FIX: Define and export UserRecord interface to be used for database records.
export interface UserRecord {
  id: number;
  name: string;
  email: string;
  created_at: string;
}
