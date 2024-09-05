import CustomImage from '@/components/image';
import { StarIcon } from '@heroicons/react/16/solid';
import { notFound } from 'next/navigation';
import React from 'react'
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
interface Props {
    params: {
        id: string;
    }
}

const ProductDetailPage = async ({params: {id}}: Props) => {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const product = await res.json();
        return (
            <section className="text-gray-600 body-font overflow-hidden mt-10">
            <div className="container px-5 py-24 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <CustomImage product={product} />
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">SIDKODIROV NEW BRAND</h2>
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-1"> {product.title} </h1>
                  <div className="flex mb-4">
                    <span className="flex items-center">
                   {Array.from(
                          {
                            length: Math.floor(product.rating.rate),
                          },
                          (_,i) => (
                          <StarIcon key={i} className="h-4 w-4 text-yellow-500" />
                        ))}
                        {Array.from(
                          {
                            length: 5-Math.floor(product.rating.rate),
                          },
                          (_,i) => (
                            <StarIconOutline key={i} className="h-4 w-4 text-yellow-500"  />
                      ))}
                      <span className="text-gray-600 ml-3">{product?.rating.count} Reviews</span>
                    </span>
                  </div>
                  <p className="leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                    
                   </div>
                  <div className="flex">
                    <span className="title-font font-medium text-2xl text-gray-900">${product.price}</span>
                    <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Buy</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
    } catch (error) {
        notFound();
    }
}

export default ProductDetailPage;