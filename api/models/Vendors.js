// api/models/Vendor.js
module.exports = {
  attributes: {
    id: {
      type: 'number',
      columnName: 'vendor_id',
      autoIncrement: true,
      unique: true,
    },
    companyName: {
      type: 'string',
      maxLength: 255,
      columnName: 'company_name',
      required: true
    },
    contactName: {
      type: 'string',
      maxLength: 255,
      columnName: 'contact_name',
      allowNull: true // Assuming this field is optional
    },
    addressId: {
      model: 'addresses', // Assuming you have an Address model defined
      columnName: 'address_id',
    },
    phoneNumber: {
      type: 'string',
      maxLength: 50,
      columnName: 'phone_number',
      allowNull: true // Assuming this field is optional
    },
    email: {
      type: 'string',
      isEmail: true, // This ensures the email entered is valid
      maxLength: 255,
      columnName: 'email',
      allowNull: true // Assuming this field is optional
    },

  },
};
