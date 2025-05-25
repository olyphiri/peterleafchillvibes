"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
}

interface ShopSectionProps {
  products: Product[]
  addToCart: (product: Product) => void
}

export default function ShopSection({ products, addToCart }: ShopSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="overflow-hidden bg-black/70 border-yellow-600/30 hover:border-green-500/50 transition-all duration-300 text-yellow-100"
        >
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-all hover:scale-105"
            />
          </div>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-yellow-100">{product.name}</CardTitle>
              <Badge className="bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 text-black">
                ${product.price.toFixed(2)}
              </Badge>
            </div>
            <CardDescription className="text-yellow-100/70">{product.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              className="w-full bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 hover:from-green-500 hover:via-yellow-500 hover:to-red-500 text-black font-bold"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
