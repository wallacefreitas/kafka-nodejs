export function getOrdersSalesForce() {
  const orders = [
    {
      order: {
        code: "01",
        client: "000001",
        store: "0001",
        origin: "salesforce"
      },
      items: [
        {
          product: "000001",
          description: "Product A",
          quantity: 10,
          price: 5.25
        },
        {
          product: "000002",
          description: "Product B",
          quantity: 63,
          price: 8.79
        }
      ]
    },
    {
      order: {
        code: "02",
        client: "000002",
        store: "0001",
        origin: "salesforce"
      },
      items: [
        {
          product: "000003",
          description: "Product C",
          quantity: 10,
          price: 5.25
        },
        {
          product: "000004",
          description: "Product D",
          quantity: 63,
          price: 8.79
        }
      ]
    }
  ]

  return orders;
}

export function getOrdersCRM() {
  const orders = [
    {
      order: {
        code: "ABC8",
        client: "000035",
        store: "0001",
        origin: "crm"
      },
      items: [
        {
          product: "000001",
          description: "Product A",
          quantity: 10,
          price: 5.25
        },
        {
          product: "000002",
          description: "Product B",
          quantity: 63,
          price: 8.79
        }
      ]
    }
  ]

  return orders;
}

export function getOrdersSenior() {
  const orders = [
    {
      order: {
        code: "543678",
        client: "000068",
        store: "0001",
        origin: "senior"
      },
      items: [
        {
          product: "000001",
          description: "Product A",
          quantity: 10,
          price: 5.25
        },
        {
          product: "000002",
          description: "Product B",
          quantity: 63,
          price: 8.79
        }
      ]
    }
  ]

  return orders;
}