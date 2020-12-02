import React from 'react';
import { Form, FastField, Field, ErrorMessage, useFormikContext } from 'formik';
import classNames from 'classnames';
import { FormattedMessage as T } from 'react-intl';
import {
  Button,
  Classes,
  FormGroup,
  InputGroup,
  Intent,
  TextArea,
  Checkbox,
} from '@blueprintjs/core';
import {
  If,
  FieldRequiredHint,
  Hint,
  AccountsSelectList,
  AccountsTypesSelect,
} from 'components';
import withAccounts from 'containers/Accounts/withAccounts';

import { inputIntent } from 'utils';
import { compose } from 'redux';
import { useAutofocus } from 'hooks';

/**
 * Account form dialogs fields.
 */
function AccountFormDialogFields({
  // #ownPropscl
  onClose,
  isNewMode,

  // #withAccounts
  accounts,
  accountsTypes,
}) {
  const { values, isSubmitting } = useFormikContext();
  const accountNameFieldRef = useAutofocus();

  return (
    <Form>
      <div className={Classes.DIALOG_BODY}>
        <FastField name={'account_type_id'}>
          {({ form, field: { value }, meta: { error, touched } }) => (
            <FormGroup
              label={<T id={'account_type'} />}
              labelInfo={<FieldRequiredHint />}
              className={classNames('form-group--account-type', Classes.FILL)}
              inline={true}
              helperText={<ErrorMessage name="account_type_id" />}
              intent={inputIntent({ error, touched })}
            >
              <AccountsTypesSelect
                accountsTypes={accountsTypes}
                selectedTypeId={value}
                defaultSelectText={<T id={'select_account_type'} />}
                onTypeSelected={(account) => {
                  form.setFieldValue('account_type_id', account.id);
                }}
                disabled={!isNewMode}
                popoverProps={{ minimal: true }}
                popoverFill={true}
              />
            </FormGroup>
          )}
        </FastField>

        <FastField name={'name'}>
          {({ field, meta: { error, touched } }) => (
            <FormGroup
              label={<T id={'account_name'} />}
              labelInfo={<FieldRequiredHint />}
              className={'form-group--account-name'}
              intent={inputIntent({ error, touched })}
              helperText={<ErrorMessage name="name" />}
              inline={true}
            >
              <InputGroup
                medium={true}
                inputRef={(ref) => (accountNameFieldRef.current = ref)}
                {...field}
              />
            </FormGroup>
          )}
        </FastField>

        <FastField name={'code'}>
          {({ form, field, meta: { error, touched } }) => (
            <FormGroup
              label={<T id={'account_code'} />}
              className={'form-group--account-code'}
              intent={inputIntent({ error, touched })}
              helperText={<ErrorMessage name="code" />}
              inline={true}
              labelInfo={<Hint content={<T id="account_code_hint" />} />}
            >
              <InputGroup medium={true} {...field} />
            </FormGroup>
          )}
        </FastField>

        <Field name={'subaccount'} type={'checkbox'}>
          {({ field, meta: { error, touched } }) => (
            <FormGroup
              label={' '}
              className={classNames('form-group--subaccount')}
              intent={inputIntent({ error, touched })}
              inline={true}
            >
              <Checkbox
                inline={true}
                label={
                  <>
                    <T id={'sub_account'} />
                    <Hint />
                  </>
                }
                name={'subaccount'}
                {...field}
              />
            </FormGroup>
          )}
        </Field>

        <If condition={values.subaccount}>
          <FastField name={'parent_account_id'}>
            {({ form, field: { value }, meta: { error, touched } }) => (
              <FormGroup
                label={<T id={'parent_account'} />}
                className={classNames(
                  'form-group--parent-account',
                  Classes.FILL,
                )}
                inline={true}
                intent={inputIntent({ error, touched })}
              >
                <AccountsSelectList
                  accounts={accounts}
                  onAccountSelected={(account) => {
                    form.setFieldValue('parent_account_id', account.id);
                  }}
                  defaultSelectText={<T id={'select_parent_account'} />}
                  selectedAccountId={value}
                  popoverFill={true}
                />
              </FormGroup>
            )}
          </FastField>
        </If>

        <FastField name={'description'}>
          {({ field, meta: { error, touched } }) => (
            <FormGroup
              label={<T id={'description'} />}
              className={'form-group--description'}
              intent={inputIntent({ error, touched })}
              helperText={<ErrorMessage name={'description'} />}
              inline={true}
            >
              <TextArea growVertically={true} height={280} {...field} />
            </FormGroup>
          )}
        </FastField>
      </div>

      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={onClose} style={{ minWidth: '75px' }}>
            <T id={'close'} />
          </Button>

          <Button
            intent={Intent.PRIMARY}
            disabled={isSubmitting}
            style={{ minWidth: '75px' }}
            type="submit"
          >
            {!isNewMode ? <T id={'edit'} /> : <T id={'submit'} />}
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default compose(
  withAccounts(({ accountsTypes, accountsList }) => ({
    accountsTypes,
    accounts: accountsList,
  })),
)(AccountFormDialogFields);
