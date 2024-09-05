"use client";

import CustomImage from "@/components/image";
import { ProductType } from "@/interfaces";
import Link from "next/link";
import { useEffect, useState } from "react";

const ShoppingCart = () => {
  const [total, settotal] = useState(0);
  const [products, setproducts] = useState<ProductType[]>(
    JSON.parse(localStorage.getItem("carts") as string) || []
  );

  const removeProduct = (id: number) => {
    const updatedCart = products.filter((product) => product.id !== id);
    localStorage.setItem("carts", JSON.stringify(updatedCart));
    setproducts(updatedCart);
  };

  const handleIncrement = (id: number) => {
    const updatedCart = products.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      }
      return product;
    });
    localStorage.setItem("carts", JSON.stringify(updatedCart));
    setproducts(updatedCart);
  };
  const handleDecrement = (id: number) => {
    const existProduct = products.find((c) => c.id === id);
    if (existProduct?.quantity === 1) {
      removeProduct(existProduct.id);
    } else {
      const updatedCart = products.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }
        return product;
      });
      localStorage.setItem("carts", JSON.stringify(updatedCart));
      setproducts(updatedCart);
    }
  };

  useEffect(() => {
    const total = products.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    settotal(total);
  }, [products]);

  return (
    <>
      {products.length ? (
        <div className="h-screen bg-gray-100 pt-20 mt-5">
          <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            {products.map((product) => (
              <div className="rounded-lg md:w-2/3" key={product.id}>
                <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                  <div className="relative w-52 ">
                    <CustomImage product={product} fill />
                  </div>
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">
                        {product.title}
                      </h2>
                      <p className="mt-1 text-xs text-gray-700">36EU - 4US</p>
                    </div>
                    <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
                        <span
                          className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          onClick={() => handleDecrement(product.id)}
                        >
                          {" "}
                          -{" "}
                        </span>
                        <input
                          className="h-8 w-8 border bg-white text-center text-xs outline-none"
                          type="number"
                          value={product.quantity}
                          min="1"
                        />
                        <span
                          className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          onClick={() => handleIncrement(product.id)}
                        >
                          {" "}
                          +{" "}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm">
                          {(product.price * product.quantity).toLocaleString(
                            "en-US",
                            {
                              style: "currency",
                              currency: "usd",
                            }
                          )}
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                          onClick={() => removeProduct(product.id)}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* <!-- Sub total --> */}
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">
                  {total.toLocaleString("en-US", {
                    currency: "USD",
                    style: "currency",
                  })}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">
                  {(10).toLocaleString("en-US", {
                    currency: "USD",
                    style: "currency",
                  })}
                </p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">
                    {(total + 10).toLocaleString("en-US", {
                      currency: "USD",
                      style: "currency",
                    })}
                  </p>
                  <p className="text-sm text-gray-700">including VAT</p>
                </div>
              </div>
              <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                Check out
              </button>
            </div>
          </div>
        </div>
      ) : (
        <section className="bg-white ">
          <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
            <div className="flex flex-col items-center max-w-sm mx-auto text-center">
              <p className="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 dark:bg-blue-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
              </p>
              <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
                Shopping cart is empty
              </h1>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Your bag is empty. Please add some products to your bag. Here are some useful links:
              </p>
              <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                <Link href={"/products"} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 rtl:rotate-180"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                    />
                  </svg>

                  <span>Products</span>
                </Link>

                <Link href={"/"} className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                  Take me home
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ShoppingCart;
