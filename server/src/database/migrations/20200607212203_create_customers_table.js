
exports.up = function(knex) {
  return knex.schema.createTable('customers', table => {
    table.increments();

    table.string('customer_type');
    table.decimal('balance', 13, 3).defaultTo(0);

    table.string('first_name').nullable();
    table.string('last_name').nullable();
    table.string('company_name').nullable();

    table.string('display_name');

    table.string('email').nullable();
    table.string('work_phone').nullable();
    table.string('personal_phone').nullable();

    table.string('billing_address_1').nullable();
    table.string('billing_address_2').nullable();
    table.string('billing_address_city').nullable();
    table.string('billing_address_country').nullable();
    table.string('billing_address_email').nullable();
    table.string('billing_address_zipcode').nullable();
    table.string('billing_address_phone').nullable();
    table.string('billing_address_state').nullable(),

    table.string('shipping_address_1').nullable();
    table.string('shipping_address_2').nullable();
    table.string('shipping_address_city').nullable();
    table.string('shipping_address_country').nullable();
    table.string('shipping_address_email').nullable();
    table.string('shipping_address_zipcode').nullable();
    table.string('shipping_address_phone').nullable();
    table.string('shipping_address_state').nullable();

    table.text('note');
    table.boolean('active').defaultTo(true);

    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('customers');
};
