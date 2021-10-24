import React from 'react';
import { useParams } from 'react-router-dom';
import { flatten, map } from 'lodash';
import DashboardInsider from 'components/Dashboard/DashboardInsider';
import { IntersectionObserver } from 'components';
import {
  useAccountTransactionsInfinity,
  useCashflowAccounts,
  useAccount,
} from 'hooks/query';

const AccountTransactionsContext = React.createContext();

function flattenInfinityPages(data) {
  return flatten(map(data.pages, (page) => page.cashflow_transactions));
}

/**
 * Account transctions provider.
 */
function AccountTransactionsProvider({ query, ...props }) {
  const { id } = useParams();
  const accountId = parseInt(id, 10);

  // Fetch cashflow account transactions list
  const {
    data: cashflowTransactionsPages,
    isFetching: isCashFlowTransactionsFetching,
    isLoading: isCashFlowTransactionsLoading,
    isSuccess: isCashflowTransactionsSuccess,
    fetchNextPage: fetchNextTransactionsPage,
    isFetchingNextPage,
  } = useAccountTransactionsInfinity(accountId, {
    page_size: 50,
  });

  const cashflowTransactions = React.useMemo(
    () =>
      isCashflowTransactionsSuccess
        ? flattenInfinityPages(cashflowTransactionsPages)
        : [],
    [cashflowTransactionsPages, isCashflowTransactionsSuccess],
  );

  // Fetch cashflow accounts.
  const {
    data: cashflowAccounts,
    isFetching: isCashFlowAccountsFetching,
    isLoading: isCashFlowAccountsLoading,
  } = useCashflowAccounts(query, { keepPreviousData: true });

  // Retrieve specific account details.
  const {
    data: currentAccount,
    isFetching: isCurrentAccountFetching,
    isLoading: isCurrentAccountLoading,
  } = useAccount(accountId, { keepPreviousData: true });

  const handleObserverInteract = React.useCallback(() => {
    if (!isFetchingNextPage) {
      fetchNextTransactionsPage();
    }
  }, [isFetchingNextPage, fetchNextTransactionsPage]);

  // Provider payload.
  const provider = {
    accountId,
    cashflowTransactions,
    cashflowAccounts,
    currentAccount,
    isCashFlowTransactionsFetching,
    isCashFlowTransactionsLoading,
    isCashFlowAccountsFetching,
    isCashFlowAccountsLoading,
    isCurrentAccountFetching,
    isCurrentAccountLoading,
  };

  return (
    <DashboardInsider name={'account-transactions'}>
      <AccountTransactionsContext.Provider value={provider} {...props} />
      <IntersectionObserver
        onIntersect={handleObserverInteract}
        // enabled={!isFetchingNextPage}
      />
    </DashboardInsider>
  );
}

const useAccountTransactionsContext = () =>
  React.useContext(AccountTransactionsContext);

export { AccountTransactionsProvider, useAccountTransactionsContext };