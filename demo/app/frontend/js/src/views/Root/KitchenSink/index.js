import React, { useState } from 'react';

import useForm from 'useForm';

export default function KitchenSink() {
  const methodOptions = [
    {
      value: 0,
      displayValue: 'Ground',
    },
    {
      value: 1,
      displayValue: 'Two Day Select',
    },
  ];

  const destinationOptions = [
    {
      value: 0,
      displayValue: 'Domestic',
    },
    {
      value: 1,
      displayValue: 'International',
    },
  ];

  const {
    fields,
    handleChange,
    setFields,
    replaceFields,
    handleSubmit
  } = useForm({
    firstName: {
      value: '',
      placeholder: 'John'
    },
    lastName: {
      value: '',
      placeholder: 'Smith'
    },
    orderItems: [
      {
        sku: {
          label: 'SKU',
          value: '',
          serialize: ({ value }) => {
            return `sku_${value}`;
          },
        },
        quantity: {
          value: '',
          placeholder: 1,
          type: 'number',
          validate: ({ value, field }) => {
            if (Number.isInteger(value) && value >= 1) {
              return {
                isValid: true,
                value,
                error: null
              };

            }

            return {
              isValid: false,
              value,
              error: `${field.label} must be greater than 0`
            };
          }
        },
      }
    ],
    contact: {
      email: {
        value: ''
      },
      phone: {
        value: '',
        label: 'Phone Number'
      }
    },
    shipping: {
      destination: {
        value: 0,
        displayValue: 'Domestic',
        preValidate: false,
        validate: false,
        serialize: ({ field }) => {
          return field.displayValue;
        }
      },
      method: {
        value: 0,
        displayValue: 'Ground',
        preValidate: false,
        validate: false,
        serialize: ({ field }) => {
          return field.displayValue;
        }
      },
    },
    subscribeForUpdates: {
      value: false,
      type: 'boolean',
    },
    feedback: {
      value: '',
      required: false,
      includeEmpty: true
    }
  });

  const [ valuesDisplay, setValuesDisplay ] = useState({});
  const [ fieldsDisplay, setFieldsDisplay ] = useState({});

  return (
    <div
      style={{
        margin: '0 auto',
        maxWidth: '800px',
        padding: '24px',
        display: 'grid',
        gridTemplateColumns: '1fr',
        rowGap: '48px'
      }}>

      {/* Form */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          columnGap: '8px',
          rowGap: '16px'
        }}>

        <div
          style={{
            gridColumn: '1 / -1'
          }}>

          <span>Basics</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            rowGap: '8px'
          }}>

          <label style={{fontSize: '12px'}}>
            {fields.firstName.label}
          </label>

          <input
            name="firstName"
            placeholder={fields.firstName.placeholder}
            value={fields.firstName.value}
            onChange={handleChange}
          />

          <span style={{color: 'red'}}>{fields.firstName.error}</span>

        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            rowGap: '8px'
          }}>

          <label style={{fontSize: '12px'}}>
            {fields.lastName.label}
          </label>

          <input
            name="lastName"
            placeholder={fields.lastName.placeholder}
            value={fields.lastName.value}
            onChange={handleChange}
          />

          <span style={{color: 'red'}}>{fields.lastName.error}</span>

        </div>

        <div
          style={{
            gridColumn: '1 / -1'
          }}>

          <span>Order Items</span>
        </div>

        {fields.orderItems.map((o, i) => {
          return (
            <React.Fragment key={i}>
              {Object.entries(o).map(([ name, field ], j) => {
                return (
                  <div
                    key={j}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr',
                      rowGap: '8px'
                    }}>

                    <label style={{fontSize: '12px'}}>
                      {field.label}
                    </label>

                    <input
                      name={field.path}
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={handleChange}
                    />

                    <span style={{color: 'red'}}>{field.error}</span>

                  </div>
                );
              })}
            </React.Fragment>
          );
        })}

        <button
          type="button"
          disabled={fields.orderItems.length < 2}
          onClick={() => {
            const x = fields.orderItems
              .slice(0, fields.orderItems.length - 1);

            replaceFields({
              orderItems: x
            });
          }}>

          - Remove item
        </button>

        <button
          type="button"
          onClick={() => {
            replaceFields({
              orderItems: [
                ...fields.orderItems,
                {
                  sku: {
                    value: '',
                    serialize: ({ value }) => {
                      return `sku_${value}`;
                    }
                  },
                  quantity: {
                    value: '',
                    placeholder: 1,
                    type: 'number',
                    validate: ({ value, field }) => {
                      if (Number.isInteger(value) && value >= 1) {
                        return {
                          isValid: true,
                          value,
                          error: null
                        };

                      }

                      return {
                        isValid: false,
                        value,
                        error: `${field.label} must be greater than 0`
                      };
                    }
                  },
                }
              ]
            })
          }}>

          + Add item
        </button>

        <div
          style={{
            gridColumn: '1 / -1'
          }}>

          <span>Contact</span>
        </div>

        {Object.entries(fields.contact).map(([ name, field ], i) => {
          return (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                rowGap: '8px'
              }}>

              <label style={{fontSize: '12px'}}>
                {field.label}
              </label>

              <input
                name={field.path}
                value={field.value}
                onChange={handleChange}
              />

              <span style={{color: 'red'}}>{field.error}</span>

            </div>
          );
        })}

        <div
          style={{
            gridColumn: '1 / -1'
          }}>

          <span>Shipping</span>
        </div>

        {Object.entries(fields.shipping).map(([ name, field ], i) => {
          return (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                rowGap: '8px'
              }}>

              <label style={{fontSize: '12px'}}>
                {field.label}
              </label>

              <select
                value={field.value}
                onChange={(e) => {
                  const index = e.target.value;

                  setFields([
                    {
                      path: `${field.path}.value`,
                      value: index
                    },
                    {
                      path: `${field.path}.displayValue`,
                      value: methodOptions[index].displayValue
                    },
                  ]);
                }}>

                {(name === 'destination' ? destinationOptions : methodOptions)
                  .map((o, i) => {
                    return <option key={i} value={i}>{o.displayValue}</option>;;
                  })
                }

              </select>

            </div>
          );
        })}

        <div
          style={{
            gridColumn: '1 / -1'
          }}>

          <span>Updates</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'max-content max-content',
            columnGap: '8px'
          }}>

          <input
            type="checkbox"
            name="subscribeForUpdates"
            value={fields.subscribeForUpdates.value}
            checked={fields.subscribeForUpdates.value}
            onChange={handleChange}
          />

          <label>
            {fields.subscribeForUpdates.label}
          </label>

          <span style={{color: 'red'}}>{fields.subscribeForUpdates.error}</span>

        </div>

        <div
          style={{
            gridColumn: '1 / -1'
          }}>

          <span>Feedback</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            rowGap: '8px'
          }}>

          <label style={{fontSize: '12px'}}>
            {fields.feedback.label}
          </label>

          <input
            name="feedback"
            value={fields.feedback.value}
            onChange={handleChange}
          />

          <span style={{color: 'red'}}>{fields.feedback.error}</span>

        </div>

        <div
          style={{
            gridColumn: '1 / -1',
            display: 'grid',
            paddingTop: '24px'
          }}>

          <button
            type="button"
            style={{width: '50%'}}
            onClick={() => {
              const { isValid, values } = handleSubmit();
              setValuesDisplay(values);
            }}>

            Submit
          </button>
        </div>
      </div>

      {/* Serialized Values */}
      <div>
        <span>Serialized Values:</span>
        <pre>{JSON.stringify(valuesDisplay, null, 2)}</pre>
      </div>

      {/* Fields */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          rowGap: '16px'
        }}>

        <button
          type="button"
          style={{width: '25%'}}
          onClick={() => {
            console.log(fields);
            setFieldsDisplay(fields);
          }}>

          View Fields
        </button>

        <span>Fields:</span>
        <pre>{JSON.stringify(fieldsDisplay, null, 2)}</pre>
      </div>

    </div>
  );
}
