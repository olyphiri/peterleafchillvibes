"use client"

import { SheetContent, SheetHeader, SheetTitle, Sheet } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CartDrawerProps {
  open: boolean
  setOpen: (open: boolean) => void
  cartItems: CartItem[]
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
}

export default function CartDrawer({ open, setOpen, cartItems, removeFromCart, updateQuantity }: CartDrawerProps) {
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md bg-black/90 border-yellow-600/20 text-yellow-100">
        <SheetHeader>
          <SheetTitle className="text-yellow-100">Your Shopping Cart</SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <p className="text-yellow-100/70">Your cart is empty</p>
            <Button
              variant="outline"
              className="mt-4 border-yellow-600/50 text-yellow-100 hover:bg-yellow-600/20 hover:text-yellow-400"
              onClick={() => {
                setOpen(false)
                const shopSection = document.getElementById("shop")
                if (shopSection) {
                  setTimeout(() => {
                    shopSection.scrollIntoView({ behavior: "smooth" })
                  }, 100)
                }
              }}
            >
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="mt-8 flex flex-col h-[calc(100vh-10rem)]">
            <div className="flex-1 overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div key={item.id} className="mb-4">
                  <div className="flex gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-yellow-600/30">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between text-base font-medium text-yellow-100">
                        <h3>{item.name}</h3>
                        <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-yellow-100/70">${item.price.toFixed(2)} each</p>
                      <div className="flex items-center mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 border-yellow-600/30 text-yellow-100"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="mx-2 w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 border-yellow-600/30 text-yellow-100"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-auto h-7 w-7 text-red-400 hover:text-red-500 hover:bg-red-500/10"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-4 bg-yellow-600/20" />
                </div>
              ))}
            </div>

            <div className="border-t border-yellow-600/20 pt-4">
              <div className="flex justify-between text-base font-medium text-yellow-100">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-yellow-100/70">Shipping and taxes calculated at checkout</p>
              <div className="mt-4">
                <Button className="w-full bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 hover:from-green-500 hover:via-yellow-500 hover:to-red-500 text-black font-bold">
                  Checkout
                </Button>
              </div>
              <div className="mt-2 flex justify-center text-center text-sm text-yellow-100/70">
                <p>
                  or{" "}
                  <button
                    type="button"
                    className="font-medium text-yellow-400 hover:text-yellow-300"
                    onClick={() => setOpen(false)}
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
