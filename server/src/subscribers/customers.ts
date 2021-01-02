import { Container } from 'typedi';
import { EventSubscriber, On } from 'event-dispatch';
import events from 'subscribers/events';
import TenancyService from 'services/Tenancy/TenancyService';
import CustomersService from 'services/Contacts/CustomersService';

@EventSubscriber()
export default class CustomersSubscriber {
  logger: any;
  tenancy: TenancyService;
  customersService: CustomersService;

  constructor() {
    this.logger = Container.get('logger');
    this.customersService = Container.get(CustomersService);
  }

  /**
   * Handles the writing opening balance journal entries once the customer created.
   */
  @On(events.customers.onCreated)
  async handleWriteOpenBalanceEntries({
    tenantId,
    customerId,
    customer,
    authorizedUser,
  }) {
    // Writes the customer opening balance journal entries.
    if (customer.openingBalance) {
      await this.customersService.writeCustomerOpeningBalanceJournal(
        tenantId,
        customer.id,
        customer.openingBalance,
        customer.openingBalanceAt,
        authorizedUser.id
      );
    }
  }

  /**
   * Handles the deleting opeing balance journal entrise once the customer deleted.
   */
  @On(events.customers.onDeleted)
  async handleRevertOpeningBalanceEntries({
    tenantId,
    customerId,
    authorizedUser,
  }) {
    await this.customersService.revertOpeningBalanceEntries(
      tenantId,
      customerId
    );
  }

  /**
   * Handles the deleting opening balance journal entries once the given
   * customers deleted.
   */
  @On(events.customers.onBulkDeleted)
  async handleBulkRevertOpeningBalanceEntries({
    tenantId,
    customersIds,
    authorizedUser,
  }) {
    await this.customersService.revertOpeningBalanceEntries(
      tenantId,
      customersIds
    );
  }
}
