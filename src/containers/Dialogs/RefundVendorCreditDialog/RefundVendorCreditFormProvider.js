import React from 'react';
import { DialogContent } from 'components';
import { pick } from 'lodash';

import {
  useAccounts,
  useVendorCredit,
  useCreateRefundVendorCredit,
} from 'hooks/query';

const RefundVendorCreditContext = React.createContext();

function RefundVendorCreditFormProvider({
  vendorCreditId,
  dialogName,
  ...props
}) {
  // Handle fetch accounts data.
  const { data: accounts, isLoading: isAccountsLoading } = useAccounts();

  // Handle fetch vendor credit details.
  const { data: vendorCredit, isLoading: isVendorCreditLoading } =
    useVendorCredit(vendorCreditId, {
      enabled: !!vendorCreditId,
    });

  // Create refund vendor credit mutations.
  const { mutateAsync: createRefundVendorCreditMutate } =
    useCreateRefundVendorCredit();

  // State provider.
  const provider = {
    vendorCredit: {
      ...pick(vendorCredit, ['id', 'credits_remaining', 'currency_code']),
      amount: vendorCredit.credits_remaining,
    },
    accounts,
    dialogName,
    createRefundVendorCreditMutate,
  };

  return (
    <DialogContent isLoading={isAccountsLoading || isVendorCreditLoading}>
      <RefundVendorCreditContext.Provider value={provider} {...props} />
    </DialogContent>
  );
}

const useRefundVendorCreditContext = () =>
  React.useContext(RefundVendorCreditContext);

export { RefundVendorCreditFormProvider, useRefundVendorCreditContext };