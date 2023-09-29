import React, { useEffect, useRef, useState } from "react";

const ProductList = ({ category }: { category: string }) => {
  const [products, setProducts] = useState<string[]>([]);
  useEffect(() => {
    console.log("fetching products in", category);
    setProducts(["clothing", "household"]);
  }, [category]); //passing the empty array for dependencies means that this effect is dependent on nothing and therefore only runs once, not passing array means the the effect will run after EVERY render, including props or state variables will ensure it only reruns when the prop/state changes

  return (
    <>
      <div>Products List</div>
    </>
  );
};

export default ProductList;
