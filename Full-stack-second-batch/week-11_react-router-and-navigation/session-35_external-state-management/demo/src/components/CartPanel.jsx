import React from "react";
import { useCartStore, useCartTotal, useCartCount } from "../state/cartStore";

const sampleProducts = [
  { id: "p1", name: "Book", price: 12 },
  { id: "p2", name: "Headphones", price: 48 },
  { id: "p3", name: "Coffee", price: 5 },
];

export const CartPanel = () => {
  const items = useCartStore((s) => s.items);
  const add = useCartStore((s) => s.add);
  const remove = useCartStore((s) => s.remove);
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);
  const clear = useCartStore((s) => s.clear);

  const total = useCartTotal();
  const count = useCartCount();

  return (
    <div className="panel">
      <h2>Cart Store</h2>
      <p>
        {count} item(s) – Total: <strong>${total.toFixed(2)}</strong>
      </p>
      <div
        style={{
          display: "flex",
          gap: ".5rem",
          flexWrap: "wrap",
          marginBottom: ".5rem",
        }}
      >
        {sampleProducts.map((p) => (
          <button key={p.id} onClick={() => add(p)}>
            Add {p.name}
          </button>
        ))}
        <button onClick={clear}>Clear</button>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((i) => (
          <li
            key={i.id}
            style={{ display: "flex", alignItems: "center", gap: ".5rem" }}
          >
            <span>
              {i.name} (${i.price}) x {i.qty}
            </span>
            <button onClick={() => increment(i.id)}>+</button>
            <button onClick={() => decrement(i.id)}>-</button>
            <button onClick={() => remove(i.id)}>Remove</button>
          </li>
        ))}
        {items.length === 0 && <li>No items yet.</li>}
      </ul>
      <small>
        Totals derived via selectors; not stored to avoid duplication.
      </small>
    </div>
  );
};
