import React from 'react';
import intl from 'react-intl-universal';
import { DrawerHeaderContent, DashboardInsider } from 'components';
import {
  useTransactionsByReference,
  usePaymentMade,
  usePaymentMadeEditPage,
} from 'hooks/query';

const PaymentMadeDetailContext = React.createContext();

/**
 * Payment made detail provider.
 */
function PaymentMadeDetailProvider({ paymentMadeId, ...props }) {
  // Handle fetch specific payment made details.
  const { data: paymentMade, isFetching: isPaymentMadeLoading } =
    usePaymentMade(paymentMadeId, {
      enabled: !!paymentMadeId,
    });

  // Handle fetch specific payment made details.
  const {
    data: { entries: paymentEntries },
    isLoading: isPaymentLoading,
  } = usePaymentMadeEditPage(paymentMadeId, {
    enabled: !!paymentMadeId,
  });

  // Handle fetch transaction by reference.
  const {
    data: { transactions },
    isLoading: isTransactionLoading,
  } = useTransactionsByReference(
    {
      reference_id: paymentMadeId,
      reference_type: 'paymentMade',
    },
    { enabled: !!paymentMadeId },
  );

  //provider.
  const provider = {
    transactions,
    paymentMadeId,
    paymentMade,
    paymentEntries,
  };
  return (
    <DashboardInsider
      loading={isTransactionLoading || isPaymentMadeLoading || isPaymentLoading}
    >
      <DrawerHeaderContent
        name="payment-made-detail-drawer"
        title={intl.get('payment_made_details')}
      />
      <PaymentMadeDetailContext.Provider value={provider} {...props} />
    </DashboardInsider>
  );
}

const usePaymentMadeDetailContext = () =>
  React.useContext(PaymentMadeDetailContext);
export { PaymentMadeDetailProvider, usePaymentMadeDetailContext };