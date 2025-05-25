"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Music, Film, ImageIcon, Menu, Volume2, VolumeX, ShoppingCart, Phone, Mail, User, Package } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import ShopSection from "@/components/shop-section"
import CartDrawer from "@/components/cart-drawer"

export default function Home() {
  const [isMuted, setIsMuted] = useState(true)
  const [showPlayer, setShowPlayer] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<any[]>([])

  // Animation states
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const addToCart = (product: any) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prev, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
      return
    }

    setCartItems((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)))
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background with parallax effect */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/images/background.jpeg')",
          transform: `translateY(${scrollY * 0.2}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <header className="sticky top-0 z-40 w-full border-b border-yellow-600/20 bg-black/70 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="items-center space-x-2 flex">
              <span className="font-bold text-2xl bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 bg-clip-text text-transparent">
                PeterLeafChillVibes
              </span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link
                href="#gallery"
                className="flex items-center text-lg font-medium text-yellow-100 transition-colors hover:text-green-400"
              >
                <ImageIcon className="mr-1 h-4 w-4" />
                Gallery
              </Link>
              <Link
                href="#movies"
                className="flex items-center text-lg font-medium text-yellow-100 transition-colors hover:text-green-400"
              >
                <Film className="mr-1 h-4 w-4" />
                Movies
              </Link>
              <Link
                href="#best-of-best"
                className="flex items-center text-lg font-medium text-yellow-100 transition-colors hover:text-green-400"
              >
                <Film className="mr-1 h-4 w-4" />
                Best of Best
              </Link>
              <Link
                href="#sounds"
                className="flex items-center text-lg font-medium text-yellow-100 transition-colors hover:text-green-400"
              >
                <Music className="mr-1 h-4 w-4" />
                Sounds
              </Link>
              <Link
                href="#shop"
                className="flex items-center text-lg font-medium text-yellow-100 transition-colors hover:text-green-400"
              >
                <Package className="mr-1 h-4 w-4" />
                Shop
              </Link>
              <Link
                href="#about"
                className="flex items-center text-lg font-medium text-yellow-100 transition-colors hover:text-green-400"
              >
                <User className="mr-1 h-4 w-4" />
                About
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="border-yellow-600/50 text-yellow-100 hover:bg-yellow-600/20 hover:text-yellow-400"
              onClick={() => setShowPlayer(!showPlayer)}
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="relative border-yellow-600/50 text-yellow-100 hover:bg-yellow-600/20 hover:text-yellow-400"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white text-xs">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </Badge>
              )}
            </Button>
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-yellow-600/50 text-yellow-100 hover:bg-yellow-600/20 hover:text-yellow-400"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-black/90 border-yellow-600/20 text-yellow-100">
                <SheetHeader>
                  <SheetTitle className="text-yellow-100">Menu</SheetTitle>
                  <SheetDescription className="text-yellow-100/70">
                    Navigate to different sections of the site
                  </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-4">
                  <Link
                    href="#gallery"
                    className="flex items-center text-lg font-medium transition-colors hover:text-green-400"
                  >
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Gallery
                  </Link>
                  <Link
                    href="#movies"
                    className="flex items-center text-lg font-medium transition-colors hover:text-green-400"
                  >
                    <Film className="mr-2 h-4 w-4" />
                    Movies
                  </Link>
                  <Link
                    href="#best-of-best"
                    className="flex items-center text-lg font-medium transition-colors hover:text-green-400"
                  >
                    <Film className="mr-2 h-4 w-4" />
                    Best of Best
                  </Link>
                  <Link
                    href="#sounds"
                    className="flex items-center text-lg font-medium transition-colors hover:text-green-400"
                  >
                    <Music className="mr-2 h-4 w-4" />
                    Sounds
                  </Link>
                  <Link
                    href="#shop"
                    className="flex items-center text-lg font-medium transition-colors hover:text-green-400"
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Shop
                  </Link>
                  <Link
                    href="#about"
                    className="flex items-center text-lg font-medium transition-colors hover:text-green-400"
                  >
                    <User className="mr-2 h-4 w-4" />
                    About
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* YouTube Player - Fixed position */}
      {showPlayer && (
        <div className="fixed bottom-0 right-0 z-50 p-4 transition-all duration-500 ease-in-out animate-fade-in">
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              className="absolute -top-3 -right-3 z-10 bg-black/80 border-yellow-600/50 text-yellow-100 hover:bg-yellow-600/20 hover:text-yellow-400"
              onClick={() => {
                setShowPlayer(false)
                setIsMuted(true)
              }}
            >
              <span className="sr-only">Close player</span>×
            </Button>
            <div className="rounded-lg overflow-hidden border-2 border-yellow-600/50 shadow-lg shadow-red-500/20">
              <iframe
                width="300"
                height="169"
                src={`https://www.youtube.com/embed/EjqdC7sj2Tc?si=IpangS6XUuvzPPnR&autoplay=1&mute=${isMuted ? 1 : 0}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                onLoad={() => setIsMuted(false)}
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Cart Drawer */}
      <CartDrawer
        open={cartOpen}
        setOpen={setCartOpen}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div
                className="space-y-2 animate-float"
                style={{
                  animation: "float 6s ease-in-out infinite",
                }}
              >
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 bg-clip-text text-transparent">
                  Welcome to PeterLeafChillVibes
                </h1>
                <p className="mx-auto max-w-[700px] text-yellow-100 md:text-xl">
                  Your ultimate destination for relaxation, entertainment, and good vibes
                </p>
                <p className="text-sm text-yellow-100/70 mt-2">Designed by Peter Olympus Phiri, Founder of Olytech</p>
              </div>
              <div className="space-x-4">
                <Button
                  className="bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 hover:from-green-500 hover:via-yellow-500 hover:to-red-500 text-black font-bold"
                  onClick={() => {
                    setShowPlayer(true)
                    setIsMuted(false)
                  }}
                >
                  Play Amapiano Mix
                </Button>
                <Button
                  variant="outline"
                  className="border-yellow-600/50 text-yellow-100 hover:bg-yellow-600/20 hover:text-yellow-400"
                  onClick={() => {
                    const shopSection = document.getElementById("shop")
                    if (shopSection) {
                      shopSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Floating particles animation */}
        <FloatingParticles />

        {/* Gallery Section */}
        <section id="gallery" className="w-full py-12 md:py-24 lg:py-32 bg-black/70 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 bg-clip-text text-transparent">
                  Visual Escapes
                </h2>
                <p className="mx-auto max-w-[700px] text-yellow-100 md:text-xl">
                  Explore our curated collection of mesmerizing visuals
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              {[
                { src: "/images/gallery-1.jpeg", alt: "Rasta vibes with dreadlocks and sunglasses" },
                { src: "/images/gallery-2.jpeg", alt: "Peaceful sunset over water with thatched roof" },
                { src: "/images/gallery-3.jpeg", alt: "Bob Marley wall art in golden tones" },
                { src: "/images/gallery-4.jpeg", alt: "Tropical reggae art with palm trees and vibrant colors" },
                { src: "/images/entergalactic-1.jpeg", alt: "Entergalactic chill moment" },
                { src: "/images/entergalactic-2.jpeg", alt: "Entergalactic relaxation scene" },
              ].map((image, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl border-2 border-yellow-600/30 hover:border-green-500/50 transition-all duration-300 transform hover:scale-105 hover:rotate-1"
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    width={800}
                    height={600}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-10">
              <Button className="bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 hover:from-green-500 hover:via-yellow-500 hover:to-red-500 text-black font-bold">
                View Full Gallery
              </Button>
            </div>
          </div>
        </section>

        {/* Movie Recommendations */}
        <section id="movies" className="w-full py-12 md:py-24 lg:py-32 bg-black/80 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 bg-clip-text text-transparent">
                  Movie Recommendations
                </h2>
                <p className="mx-auto max-w-[700px] text-yellow-100 md:text-xl">
                  Perfect films for your relaxation sessions
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              {[
                {
                  title: "The Big Lebowski",
                  description: "A case of mistaken identity leads to a wild adventure",
                  year: "1998",
                },
                { title: "Pineapple Express", description: "A stoner comedy with action elements", year: "2008" },
                { title: "Dazed and Confused", description: "A coming-of-age comedy set in the 1970s", year: "1993" },
                {
                  title: "Half Baked",
                  description: "Friends selling special goods to bail out their friend",
                  year: "1998",
                },
                {
                  title: "Harold & Kumar Go to White Castle",
                  description: "A munchies-fueled adventure",
                  year: "2004",
                },
                {
                  title: "Smiley Face",
                  description: "A comedy about an actress who accidentally consumes too many edibles",
                  year: "2007",
                },
              ].map((movie, index) => (
                <Card
                  key={index}
                  className="overflow-hidden bg-black/70 border-yellow-600/30 hover:border-green-500/50 transition-all duration-300 transform hover:scale-105 hover:rotate-1 text-yellow-100"
                >
                  <Image
                    src={`/placeholder.svg?height=400&width=600&text=Movie+${index + 1}`}
                    alt={movie.title}
                    width={600}
                    height={400}
                    className="aspect-video w-full object-cover"
                  />
                  <CardHeader>
                    <CardTitle className="text-yellow-100">{movie.title}</CardTitle>
                    <CardDescription className="text-yellow-100/70">{movie.year}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{movie.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full border-yellow-600/50 text-yellow-100 hover:bg-yellow-600/20 hover:text-yellow-400"
                    >
                      Read Reviews
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Best of Best Section */}
        <section
          id="best-of-best"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-black/90 via-black/80 to-black/90 backdrop-blur-sm"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 bg-clip-text text-transparent">
                  The Best of Best
                </h2>
                <p className="mx-auto max-w-[700px] text-yellow-100 md:text-xl">
                  Legendary moments that define the culture
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-7xl mt-10 space-y-16">
              {/* How High */}
              <Card className="overflow-hidden bg-black/70 border-yellow-600/30 hover:border-green-500/50 transition-all duration-300 text-yellow-100">
                <div className="grid md:grid-cols-2 gap-8 p-6">
                  <div className="relative h-96 md:h-full overflow-hidden rounded-xl">
                    <Image
                      src="/images/how-high.jpeg"
                      alt="How High - Jamal and Silas at Harvard"
                      fill
                      className="object-cover transition-all hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-center space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 bg-clip-text text-transparent mb-2">
                        How High
                      </h3>
                      <p className="text-yellow-100/70 text-lg">Starring Method Man & Redman</p>
                    </div>

                    <div className="space-y-4 text-yellow-100">
                      <p>
                        How High is packed with hilarious moments, but one of the most iconic scenes is when Jamal and
                        Silas use their special herbal blend to ace their college entrance exams, landing them at
                        Harvard. Their unconventional approach to academia leads to wild antics, including turning a
                        dorm room into a party hub, outsmarting professors, and challenging the Ivy League status quo.
                      </p>

                      <p>
                        One standout moment is when Silas and Jamal confidently stroll into a classroom, completely
                        unprepared, yet manage to outwit the professor with their street-smart logic. Their ability to
                        mix humor with unexpected wisdom makes this scene unforgettable.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 text-black">
                        Comedy Classic
                      </Badge>
                      <Badge className="bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 text-black">
                        Harvard Adventures
                      </Badge>
                      <Badge className="bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 text-black">
                        Street Smart
                      </Badge>
                    </div>

                    <div className="flex gap-4">
                      <Button className="bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 hover:from-green-500 hover:via-yellow-500 hover:to-red-500 text-black font-bold">
                        Watch Highlights
                      </Button>
                      <Button
                        variant="outline"
                        className="border-yellow-600/50 text-yellow-100 hover:bg-yellow-600/20 hover:text-yellow-400"
                      >
                        Read More
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Entergalactic */}
              <Card className="overflow-hidden bg-black/70 border-yellow-600/30 hover:border-green-500/50 transition-all duration-300 text-yellow-100">
                <div className="grid md:grid-cols-2 gap-8 p-6">
                  <div className="relative h-96 md:h-full overflow-hidden rounded-xl">
                    <Image
                      src="/images/entergalactic-promo.jpeg"
                      alt="Entergalactic - Kid Cudi's Animated Masterpiece"
                      fill
                      className="object-cover transition-all hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-center space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 bg-clip-text text-transparent mb-2">
                        Entergalactic
                      </h3>
                      <p className="text-yellow-100/70 text-lg">Kid Cudi's Animated Masterpiece</p>
                    </div>

                    <div className="space-y-4 text-yellow-100">
                      <p>
                        Entergalactic isn't just an animated love story—it's a vibe, a feeling, a full-blown experience.
                        At the center is Jabari, a chill creative trying to find love, balance, and meaning in a noisy
                        world. The most memorable scenes are when Jabari lights up, relaxes, and lets his thoughts
                        float.
                      </p>

                      <p>
                        One standout scene is when Jabari sparks up on his rooftop, the city skyline stretching behind
                        him. The visuals melt into a dreamy haze, and you're floating right there with him. Kid Cudi's
                        soundtrack creates a soundscape that makes each moment feel personal, warm, and endlessly
                        cosmic.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 text-black">
                        Kid Cudi
                      </Badge>
                      <Badge className="bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 text-black">
                        Animated Series
                      </Badge>
                      <Badge className="bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 text-black">
                        Cosmic Vibes
                      </Badge>
                      <Badge className="bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 text-black">
                        Netflix Original
                      </Badge>
                    </div>

                    <div className="flex gap-4">
                      <Button className="bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 hover:from-green-500 hover:via-yellow-500 hover:to-red-500 text-black font-bold">
                        Watch on Netflix
                      </Button>
                      <Button
                        variant="outline"
                        className="border-yellow-600/50 text-yellow-100 hover:bg-yellow-600/20 hover:text-yellow-400"
                      >
                        Listen to Soundtrack
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Gallery Section */}
                <div className="p-6 pt-0 space-y-6">
                  <Separator className="bg-yellow-600/30" />

                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 bg-clip-text text-transparent">
                      Chill Moments with Jabari
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { src: "/images/entergalactic-1.jpeg", alt: "Jabari chilling on the couch" },
                        { src: "/images/entergalactic-8.jpeg", alt: "Jabari relaxing by the window" },
                        { src: "/images/entergalactic-2.jpeg", alt: "Intimate moment with plants" },
                        { src: "/images/entergalactic-4.jpeg", alt: "Greenhouse chill session" },
                        { src: "/images/entergalactic-5.jpeg", alt: "Rooftop city views" },
                        { src: "/images/entergalactic-6.jpeg", alt: "Walking through the city" },
                        { src: "/images/entergalactic-7.jpeg", alt: "Close intimate moment" },
                      ].map((image, index) => (
                        <div
                          key={index}
                          className="relative h-48 overflow-hidden rounded-xl border-2 border-yellow-600/30 hover:border-green-500/50 transition-all duration-300 transform hover:scale-105"
                        >
                          <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Bob Marley Collection */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black/80 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 bg-clip-text text-transparent">
                  Bob Marley Collection
                </h2>
                <p className="mx-auto max-w-[700px] text-yellow-100 md:text-xl">The Legend's Greatest Herb Anthems</p>
              </div>
            </div>

            <div className="mx-auto max-w-7xl mt-10">
              <Card className="overflow-hidden bg-black/70 border-yellow-600/30 hover:border-green-500/50 transition-all duration-300 text-yellow-100">
                <div className="grid md:grid-cols-2 gap-8 p-6">
                  <div className="relative h-96 md:h-full overflow-hidden rounded-xl">
                    <Image
                      src="/images/bob-marley-portrait.jpeg"
                      alt="Bob Marley - The Legend"
                      fill
                      className="object-cover transition-all hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-center space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 bg-clip-text text-transparent mb-2">
                        Bob Marley
                      </h3>
                      <p className="text-yellow-100/70 text-lg">The King of Reggae & Herb Wisdom</p>
                    </div>

                    <div className="space-y-4 text-yellow-100">
                      <p>
                        Bob Marley wasn't just a musician; he was a spiritual guide who used cannabis as a sacrament.
                        His songs about herb and consciousness opened minds worldwide, spreading the message of peace,
                        love, and natural healing through his iconic reggae rhythms.
                      </p>

                      <div className="space-y-3">
                        <h4 className="text-xl font-semibold text-green-400">Best Herb Songs:</h4>
                        <ul className="space-y-2 text-yellow-100/90">
                          <li>
                            • <strong>"Kaya"</strong> - A celebration of the healing herb
                          </li>
                          <li>
                            • <strong>"Easy Skanking"</strong> - Smooth vibes and natural highs
                          </li>
                          <li>
                            • <strong>"Ganja Gun"</strong> - Raw and powerful herb anthem
                          </li>
                          <li>
                            • <strong>"Herb"</strong> - The spiritual significance of cannabis
                          </li>
                          <li>
                            • <strong>"Three Little Birds"</strong> - Peace and positivity
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 text-black">
                        Reggae Legend
                      </Badge>
                      <Badge className="bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 text-black">
                        Rastafarian
                      </Badge>
                      <Badge className="bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 text-black">
                        Herb Advocate
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Three Little Birds Lyrics */}
                <div className="p-6 pt-0 space-y-6">
                  <Separator className="bg-yellow-600/30" />

                  <div className="bg-black/50 rounded-xl p-6 border border-green-500/30">
                    <h4 className="text-2xl font-bold text-center bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 bg-clip-text text-transparent mb-6">
                      "Three Little Birds" - Lyrics
                    </h4>

                    <div className="text-yellow-100 space-y-4 text-center max-w-2xl mx-auto">
                      <div className="space-y-2">
                        <p className="italic text-green-400">Don't worry about a thing</p>
                        <p className="italic text-green-400">'Cause every little thing gonna be alright</p>
                        <p className="italic text-green-400">Singin' don't worry about a thing</p>
                        <p className="italic text-green-400">'Cause every little thing gonna be alright</p>
                      </div>

                      <div className="space-y-2">
                        <p>Rise up this mornin'</p>
                        <p>Smiled with the risin' sun</p>
                        <p>Three little birds</p>
                        <p>Pitch by my doorstep</p>
                        <p>Singin' sweet songs</p>
                        <p>Of melodies pure and true</p>
                        <p>Sayin', this is my message to you-ou-ou</p>
                      </div>

                      <div className="space-y-2">
                        <p className="italic text-green-400">Singin' don't worry 'bout a thing</p>
                        <p className="italic text-green-400">'Cause every little thing gonna be alright</p>
                        <p className="italic text-green-400">Don't worry 'bout a thing</p>
                        <p className="italic text-green-400">'Cause every little thing gonna be alright</p>
                      </div>
                    </div>

                    <div className="flex justify-center gap-4 mt-6">
                      <Button className="bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 hover:from-green-500 hover:via-yellow-500 hover:to-red-500 text-black font-bold">
                        Listen on Spotify
                      </Button>
                      <Button
                        variant="outline"
                        className="border-yellow-600/50 text-yellow-100 hover:bg-yellow-600/20 hover:text-yellow-400"
                      >
                        View Full Discography
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Sound Clips Section */}
        <section id="sounds" className="w-full py-12 md:py-24 lg:py-32 bg-black/70 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 bg-clip-text text-transparent">
                  Sounds for Your Soul
                </h2>
                <p className="mx-auto max-w-[700px] text-yellow-100 md:text-xl">
                  Audio experiences to enhance your relaxation
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 gap-8 mt-10">
              {[
                { title: "Amapiano Soulful Chill Mix", duration: "45:00", type: "Amapiano" },
                { title: "Ambient Nature Sounds", duration: "30:00", type: "Relaxation" },
                { title: "Pink Floyd - Dark Side of the Moon", duration: "42:49", type: "Classic Album" },
                { title: "Bob Marley - Legend", duration: "50:22", type: "Reggae" },
                { title: "Atmospheric Synth Wave", duration: "38:15", type: "Electronic" },
                { title: "Classical Guitar Melodies", duration: "27:30", type: "Acoustic" },
              ].map((sound, index) => (
                <Card
                  key={index}
                  className="flex flex-col bg-black/70 border-yellow-600/30 hover:border-green-500/50 transition-all duration-300 text-yellow-100"
                >
                  <CardHeader>
                    <CardTitle className="text-yellow-100">{sound.title}</CardTitle>
                    <CardDescription className="text-yellow-100/70">
                      {sound.type} • {sound.duration}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="w-full h-12 bg-black/50 rounded-md flex items-center px-4 overflow-hidden">
                      <div className="relative w-full h-2 bg-yellow-900/30 rounded-full">
                        <div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full animate-pulse"
                          style={{
                            width: index === 0 ? "75%" : `${Math.random() * 60 + 20}%`,
                            animationDuration: `${Math.random() * 3 + 2}s`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-yellow-600/50 text-yellow-100 hover:bg-yellow-600/20 hover:text-yellow-400"
                      onClick={() => {
                        if (index === 0) {
                          setShowPlayer(true)
                          setIsMuted(false)
                        }
                      }}
                    >
                      <Music className="h-4 w-4" />
                      <span className="sr-only">Play</span>
                    </Button>
                    <span className="text-sm text-yellow-100/70">Perfect for relaxation</span>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Shop Section */}
        <section id="shop" className="w-full py-12 md:py-24 lg:py-32 bg-black/80 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 bg-clip-text text-transparent">
                  Shop Our Collection
                </h2>
                <p className="mx-auto max-w-[700px] text-yellow-100 md:text-xl">
                  Premium reggae merchandise and quality accessories
                </p>
              </div>
            </div>

            <Tabs defaultValue="accessories" className="w-full max-w-5xl mx-auto mt-10">
              <TabsList className="grid w-full grid-cols-2 bg-black/50 border border-yellow-600/30">
                <TabsTrigger
                  value="accessories"
                  className="text-yellow-100 data-[state=active]:bg-yellow-600/20 data-[state=active]:text-yellow-400"
                >
                  Accessories
                </TabsTrigger>
                <TabsTrigger
                  value="reggae"
                  className="text-yellow-100 data-[state=active]:bg-yellow-600/20 data-[state=active]:text-yellow-400"
                >
                  Reggae Collection
                </TabsTrigger>
              </TabsList>

              <TabsContent value="accessories">
                <ShopSection
                  products={[
                    {
                      id: "acc1",
                      name: "RAW Natural Rolling Papers",
                      price: 24.99,
                      image: "/images/premium-leaf-rollers.jpeg",
                      description: "Premium RAW natural unrefined rolling papers in convenient cone format",
                    },
                    {
                      id: "acc2",
                      name: "Galaxy Wooden Grinder",
                      price: 19.99,
                      image: "/images/wooden-grinder.jpeg",
                      description: "Premium metal grinder with cosmic galaxy design and sharp grinding teeth",
                    },
                    {
                      id: "acc3",
                      name: "Glass Storage Jar Set",
                      price: 15.99,
                      image: "/images/glass-storage-jar.jpeg",
                      description: "Airtight glass jars with wooden lids, includes 420 branded options",
                    },
                    {
                      id: "acc4",
                      name: "Bamboo Rolling Tray Collection",
                      price: 29.99,
                      image: "/images/bamboo-rolling-tray.jpeg",
                      description: "Handcrafted bamboo rolling trays with multiple compartments and organization",
                    },
                    {
                      id: "acc5",
                      name: "Hemp Wick Lighter Sleeve",
                      price: 12.99,
                      image: "/images/hemp-wick-dispenser.jpeg",
                      description: "Green hemp wick dispenser sleeve for natural, clean lighting",
                    },
                    {
                      id: "acc6",
                      name: "Premium Smell-Proof Bag",
                      price: 34.99,
                      image: "/images/smell-proof-bag.jpeg",
                      description: "Organized travel case with multiple compartments and odor-proof technology",
                    },
                  ]}
                  addToCart={addToCart}
                />
              </TabsContent>

              <TabsContent value="reggae">
                <ShopSection
                  products={[
                    {
                      id: "reg1",
                      name: "Bob Marley Vinyl Collection",
                      price: 89.99,
                      image: "/placeholder.svg?height=300&width=300&text=Vinyl+Collection",
                      description: "Complete vinyl collection of Bob Marley's greatest hits",
                    },
                    {
                      id: "reg2",
                      name: "Rasta Beanie",
                      price: 19.99,
                      image: "/placeholder.svg?height=300&width=300&text=Rasta+Beanie",
                      description: "Authentic rasta colors beanie, perfect for cold weather",
                    },
                    {
                      id: "reg3",
                      name: "Reggae Drum Set",
                      price: 299.99,
                      image: "/placeholder.svg?height=300&width=300&text=Drum+Set",
                      description: "Professional percussion set for authentic reggae rhythms",
                    },
                    {
                      id: "reg4",
                      name: "Rasta Flag Tapestry",
                      price: 24.99,
                      image: "/placeholder.svg?height=300&width=300&text=Tapestry",
                      description: "Large wall tapestry with traditional rasta colors",
                    },
                    {
                      id: "reg5",
                      name: "Reggae History Book",
                      price: 35.99,
                      image: "/placeholder.svg?height=300&width=300&text=History+Book",
                      description: "Comprehensive guide to reggae music and culture",
                    },
                    {
                      id: "reg6",
                      name: "Portable Speaker",
                      price: 79.99,
                      image: "/placeholder.svg?height=300&width=300&text=Speaker",
                      description: "Bluetooth speaker with enhanced bass for reggae music",
                    },
                  ]}
                  addToCart={addToCart}
                />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-black/70 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 bg-clip-text text-transparent">
                  About The Designer
                </h2>
                <p className="mx-auto max-w-[700px] text-yellow-100 md:text-xl">
                  Meet the creative mind behind ChillVibes
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-3xl mt-10 bg-black/50 rounded-xl p-6 border border-yellow-600/30">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0">
                  <Avatar className="h-32 w-32 border-2 border-yellow-600/50">
                    <AvatarImage
                      src="/placeholder.svg?height=128&width=128&text=Peter+Phiri"
                      alt="Peter Olympus Phiri"
                    />
                    <AvatarFallback className="bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 text-black font-bold">
                      PP
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-yellow-100">Peter Olympus Phiri</h3>
                  <p className="text-yellow-100/70">Founder of Olytech</p>
                  <p className="mt-4 text-yellow-100">
                    Peter is a visionary designer and entrepreneur with a passion for creating immersive digital
                    experiences. As the founder of Olytech, he combines his love for music, culture, and technology to
                    build platforms that bring communities together.
                  </p>
                  <div className="mt-4 flex flex-col md:flex-row gap-2 md:gap-4">
                    <div className="flex items-center justify-center md:justify-start gap-2 text-yellow-100">
                      <Phone className="h-4 w-4 text-green-400" />
                      <span>+263 784 140 899</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-yellow-100">
                      <Mail className="h-4 w-4 text-green-400" />
                      <span>contact@olytech.com</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-6 bg-yellow-600/30" />

              <div className="text-yellow-100">
                <h4 className="text-xl font-semibold mb-4">Our Mission</h4>
                <p>
                  At PeterLeafChillVibes, we're dedicated to creating a space where enthusiasts can explore, connect,
                  and find premium products that enhance their experience. Our carefully curated collection of
                  accessories and reggae merchandise represents our commitment to quality and authenticity.
                </p>
                <p className="mt-4">
                  All products are personally selected by Peter to ensure they meet our high standards. We believe in
                  supporting sustainable practices and ethical sourcing for all our merchandise.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black/80 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 bg-clip-text text-transparent">
                  Stay Connected
                </h2>
                <p className="mx-auto max-w-[700px] text-yellow-100 md:text-xl">
                  Subscribe to our newsletter for the latest updates and exclusive offers
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-yellow-600/30 bg-black/50 px-3 py-2 text-sm text-yellow-100 ring-offset-background placeholder:text-yellow-100/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 hover:from-green-500 hover:via-yellow-500 hover:to-red-500 text-black font-bold"
                  >
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 md:py-0 border-t border-yellow-600/20 bg-black/90 backdrop-blur-sm">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-24 px-4">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-sm text-yellow-100/70">© 2025 PeterLeafChillVibes. All rights reserved.</p>
            <p className="text-sm text-yellow-100/70">Designed by Peter Olympus Phiri, Founder of Olytech</p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <p className="text-sm text-yellow-100/70">Contact: +263 784 140 899</p>
            <nav className="flex gap-4 md:gap-6 mt-2">
              <Link href="#" className="text-sm text-yellow-100 hover:text-green-400">
                Terms
              </Link>
              <Link href="#" className="text-sm text-yellow-100 hover:text-green-400">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-yellow-100 hover:text-green-400">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Floating particles component
function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {Array.from({ length: 20 }).map((_, i) => {
        const size = Math.random() * 6 + 2
        const duration = Math.random() * 20 + 10
        const delay = Math.random() * 10
        const initialX = Math.random() * 100
        const initialY = Math.random() * 100

        return (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 opacity-30"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${initialX}vw`,
              top: `${initialY}vh`,
              animation: `float-particle ${duration}s ease-in-out ${delay}s infinite`,
              boxShadow: "0 0 10px rgba(255, 215, 0, 0.7)",
            }}
          />
        )
      })}
    </div>
  )
}
