import { useImportFilePreview } from '@/hooks/query/import';
import { transformToCamelCase } from '@/utils';
import React, { createContext, useContext } from 'react';

interface ImportFilePreviewBootContextValue {}

const ImportFilePreviewBootContext =
  createContext<ImportFilePreviewBootContextValue>(
    {} as ImportFilePreviewBootContextValue,
  );

export const useImportFilePreviewBootContext = () => {
  const context = useContext<ImportFilePreviewBootContextValue>(
    ImportFilePreviewBootContext,
  );

  if (!context) {
    throw new Error(
      'useImportFilePreviewBootContext must be used within an ImportFilePreviewBootProvider',
    );
  }
  return context;
};

interface ImportFilePreviewBootProps {
  importId: string;
  children: React.ReactNode;
}

export const ImportFilePreviewBootProvider = ({
  importId,
  children,
}: ImportFilePreviewBootProps) => {
  const {
    data: importPreview,
    isLoading: isImportPreviewLoading,
    isFetching: isImportPreviewFetching,
  } = useImportFilePreview(importId, {
    enabled: Boolean(importId),
  });

  const value = {
    importPreview,
    isImportPreviewLoading,
    isImportPreviewFetching,
  };
  return (
    <ImportFilePreviewBootContext.Provider value={value}>
      {isImportPreviewLoading ? 'loading' : <>{children}</>}
    </ImportFilePreviewBootContext.Provider>
  );
};