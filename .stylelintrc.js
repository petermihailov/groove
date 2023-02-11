const { propertyOrdering, selectorOrdering } = require('stylelint-semantic-groups');

module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: ['stylelint-order', 'stylelint-use-logical'],
  rules: {
    'csstools/use-logical': 'always',
    'order/order': selectorOrdering,
    'order/properties-order': propertyOrdering,
    'custom-property-empty-line-before': 'never',
    'property-case': 'lower',
    'property-no-vendor-prefix': [true, { ignoreProperties: ['mask'] }],
    'selector-class-pattern': [
      '^[a-z][a-zA-Z0-9]+$',
      { message: 'Expected class name to be lowerCamelCase' },
    ],
  },
};
