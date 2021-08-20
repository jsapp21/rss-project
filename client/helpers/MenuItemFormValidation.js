import * as yup from "yup";

let schema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().required().positive().integer(),
  createdOn: yup.date().default(function () {
    return new Date();
  }),
});

schema
  .isValid({
    name: 'Large Pizza',
    price: 24.00,
  })
  .then(valid => valid);

// you can try and type cast objects to the defined schema
// LOOK into this 
// schema.cast({
//   name: 'Large Pizza',
//   price: '24.00',
//   createdOn: '2014-09-23T19:25:25Z',
// });

// TODO: wire this up