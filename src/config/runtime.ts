export interface RuntimeConfig {
  isDemoMode: boolean;
  apiBaseUrl: string;
  mockDataEnabled: boolean;
  backendConfigured: boolean;
  authConfigured: boolean;
  storageConfigured: boolean;
  appEnv: string;
}

const apiBaseUrl = (import.meta as any).env?.VITE_API_BASE_URL || '';
const enableMockDataStr = (import.meta as any).env?.VITE_ENABLE_MOCK_DATA;

// Centralized rule:
// isDemoMode / mockDataEnabled defaults to true unless explicitly set to 'false'
const mockDataEnabled = enableMockDataStr !== 'false';
const backendConfigured = !!apiBaseUrl && apiBaseUrl !== '';

export const runtimeConfig: RuntimeConfig = {
  isDemoMode: mockDataEnabled,
  apiBaseUrl,
  mockDataEnabled,
  backendConfigured,
  authConfigured: false, // Auth is not connected yet
  storageConfigured: false, // Storage/Database is not connected yet
  appEnv: (import.meta as any).env?.VITE_APP_ENV || 'development',
};
