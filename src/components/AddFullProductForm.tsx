import React, { useState } from "react";
import axios from "axios";
import { _postRequest } from "../utils/request";

const AddFullProductForm = () => {
  const [product, setProduct] = useState({
    productName: "",
    price: 0,
    components: [
      {
        componentName: "",
        quantity: 0,
        subcomponents: [
          {
            subcomponentName: "",
            material: "",
            customNotes: "",
            count: 0,
            totalQuantity: 0,
            detailLength: 0,
            detailWidth: 0,
            detailThickness: 0,
            cuttingLength: 0,
            cuttingThickness: 0,
            finalLength: 0,
            finalWidth: 0,
            finalThickness: 0,
            veneerInner: "",
            veneerOuter: "",
          },
        ],
      },
    ],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await _postRequest("Product/AddFullProduct", product);
      alert("Product added!");
    } catch (error) {
      console.error("Failed to submit:", error);
    }
  };

  const updateComponent = (index: number, field: string, value: any) => {
    const updated = [...product.components];
    (updated[index] as any)[field] = value; // <- fix here
    setProduct({ ...product, components: updated });
  };

  const updateSubcomponent = (
    compIndex: number,
    subIndex: number,
    field: string,
    value: any
  ) => {
    const updated = [...product.components];
    const sub = {
      ...updated[compIndex].subcomponents[subIndex],
      [field]: value,
    };

    // Auto-calculate totalQuantity
    if (field === "count") {
      sub.totalQuantity = sub.count * updated[compIndex].quantity;
    } else if (field === "quantity") {
      sub.totalQuantity = sub.count * value;
    }

    updated[compIndex].subcomponents[subIndex] = sub;
    setProduct({ ...product, components: updated });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={product.productName}
        onChange={(e) => {
          const value = e.target.value;
          // Prevent input if it contains only numbers
          if (!/^\d+$/.test(value)) {
            setProduct({ ...product, productName: e.target.value });
          }
        }}
      />
      <input
        type="number"
        placeholder="Price"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: +e.target.value })}
      />

      <hr />
      <h3>Components</h3>
      {product.components.map((component, compIndex) => (
        <div
          key={compIndex}
          style={{ border: "1px solid gray", padding: "10px" }}
        >
          <input
            type="text"
            placeholder="Component Name"
            value={component.componentName}
            onChange={(e) => {
              const value = e.target.value;
              // Prevent input if it contains only numbers
              if (!/^\d+$/.test(value)) {
                updateComponent(compIndex, "componentName", e.target.value);
              }
            }}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={component.quantity}
            onChange={(e) =>
              updateComponent(compIndex, "quantity", +e.target.value)
            }
          />

          <h4>Subcomponents</h4>
          {component.subcomponents.map((sub, subIndex) => (
            <div key={subIndex} style={{ marginLeft: "20px" }}>
              <input
                type="text"
                placeholder="Subcomponent Name"
                value={sub.subcomponentName}
                onChange={(e) =>
                    {
              const value = e.target.value;
                  // Prevent input if it contains only numbers
                  if (!/^\d+$/.test(value)) {
                  updateSubcomponent(
                    compIndex,
                    subIndex,
                    "subcomponentName",
                    e.target.value
                  )
                }}
                }
              />
              <input
                type="text"
                placeholder="Material"
                value={sub.material}
                onChange={(e) => {
                  const value = e.target.value;
                  // Prevent input if it contains only numbers
                  if (!/^\d+$/.test(value)) {
                    updateSubcomponent(compIndex, subIndex, "material", value);
                  }
                }}
              />
              <input
                type="text"
                placeholder="Custom Notes"
                value={sub.customNotes}
                onChange={(e) => {
                  const value = e.target.value;
                  // Prevent input if it contains only numbers
                  if (!/^\d+$/.test(value)) {
                    updateSubcomponent(
                      compIndex,
                      subIndex,
                      "customNotes",
                      e.target.value
                    );
                  }
                }}
              />
              <input
                type="number"
                placeholder="Count"
                min={1}
                value={sub.count}
                onChange={(e) =>
                  updateSubcomponent(
                    compIndex,
                    subIndex,
                    "count",
                    +e.target.value
                  )
                }
              />
              <input
                type="number"
                min={1}
                placeholder="Total Quantity"
                value={sub.totalQuantity}
                onChange={(e) =>
                  updateSubcomponent(
                    compIndex,
                    subIndex,
                    "totalQuantity",
                    +e.target.value
                  )
                }
              />
              <input
                type="number"
                min={1}
                placeholder="Detail Length"
                value={sub.detailLength}
                onChange={(e) =>
                  updateSubcomponent(
                    compIndex,
                    subIndex,
                    "detailLength",
                    +e.target.value
                  )
                }
              />
              <input
                type="number"
                placeholder="Detail Width"
                min={1}
                value={sub.detailWidth}
                onChange={(e) =>
                  updateSubcomponent(
                    compIndex,
                    subIndex,
                    "detailWidth",
                    +e.target.value
                  )
                }
              />
              <input
                type="number"
                placeholder="Detail Thickness"
                min={1}
                value={sub.detailThickness}
                onChange={(e) =>
                  updateSubcomponent(
                    compIndex,
                    subIndex,
                    "detailThickness",
                    +e.target.value
                  )
                }
              />
              <input
                type="number"
                placeholder="Cutting Length"
                min={1}
                value={sub.cuttingLength}
                onChange={(e) =>
                  updateSubcomponent(
                    compIndex,
                    subIndex,
                    "cuttingLength",
                    +e.target.value
                  )
                }
              />
              <input
                type="number"
                placeholder="Cutting Thickness"
                min={1}
                value={sub.cuttingThickness}
                onChange={(e) =>
                  updateSubcomponent(
                    compIndex,
                    subIndex,
                    "cuttingThickness",
                    +e.target.value
                  )
                }
              />
              <input
                type="number"
                placeholder="Final Length"
                min={1}
                value={sub.finalLength}
                onChange={(e) =>
                  updateSubcomponent(
                    compIndex,
                    subIndex,
                    "finalLength",
                    +e.target.value
                  )
                }
              />
              <input
                type="number"
                placeholder="Final Width"
                min={1}
                value={sub.finalWidth}
                onChange={(e) =>
                  updateSubcomponent(
                    compIndex,
                    subIndex,
                    "finalWidth",
                    +e.target.value
                  )
                }
              />
              <input
                type="number"
                placeholder="Final Thickness"
                min={1}
                value={sub.finalThickness}
                onChange={(e) =>
                  updateSubcomponent(
                    compIndex,
                    subIndex,
                    "finalThickness",
                    +e.target.value
                  )
                }
              />
              <input
                type="text"
                placeholder="Veneer Inner"
                value={sub.veneerInner}
                onChange={(e) =>
                  updateSubcomponent(
                    compIndex,
                    subIndex,
                    "veneerInner",
                    e.target.value
                  )
                }
              />
              <input
                type="text"
                placeholder="Veneer Outer"
                value={sub.veneerOuter}
                onChange={(e) =>
                  updateSubcomponent(
                    compIndex,
                    subIndex,
                    "veneerOuter",
                    e.target.value
                  )
                }
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              const updated = [...product.components];
              updated[compIndex].subcomponents.push({
                subcomponentName: "",
                material: "",
                customNotes: "",
                count: 0,
                totalQuantity: 0,
                detailLength: 0,
                detailWidth: 0,
                detailThickness: 0,
                cuttingLength: 0,
                cuttingThickness: 0,
                finalLength: 0,
                finalWidth: 0,
                finalThickness: 0,
                veneerInner: "",
                veneerOuter: "",
              });
              setProduct({ ...product, components: updated });
            }}
          >
            Add Subcomponent
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          setProduct({
            ...product,
            components: [
              ...product.components,
              {
                componentName: "",
                quantity: 0,
                subcomponents: [],
              },
            ],
          })
        }
      >
        Add Component
      </button>

      <br />
      <button type="submit">Submit Product</button>
    </form>
  );
};

export default AddFullProductForm;
