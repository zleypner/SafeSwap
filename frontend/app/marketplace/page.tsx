'use client';
import { useState, Dispatch, SetStateAction } from 'react';
import { Slider } from "@/app/components/ui/slider";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider, SidebarTrigger } from "@/app/components/ui/sidebar";
import { Search, Menu as HamIcon } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

interface SidebarComponentProps {
  priceRange: [number, number];
  setPriceRange: Dispatch<SetStateAction<[number, number]>>;
  selectedCategories: string[];
  handleCategoryChange: (category: string) => void;
}

interface HeaderComponentProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

interface ProductListProps {
  products: Product[];
}

const products: Product[] = [
  { id: 1, name: "Laptop Pro", price: 1299, category: "Electronics" },
  { id: 2, name: "Smartphone X", price: 699, category: "Electronics" },
  { id: 3, name: "Ergonomic Chair", price: 299, category: "Furniture" },
  { id: 4, name: "Coffee Maker", price: 89, category: "Appliances" },
  { id: 5, name: "Running Shoes", price: 129, category: "Sports" },
  { id: 6, name: "Wireless Earbuds", price: 159, category: "Electronics" },
];

export default function Marketplace() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = products.filter(product => 
    (searchTerm === "" || product.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
    product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <SidebarComponent 
          priceRange={priceRange} 
          setPriceRange={setPriceRange} 
          selectedCategories={selectedCategories} 
          handleCategoryChange={handleCategoryChange} 
        />
        <div className="flex-1 overflow-auto">
          <HeaderComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </SidebarProvider>
  );
}

function SidebarComponent({ priceRange, setPriceRange, selectedCategories, handleCategoryChange }: SidebarComponentProps) {
  return (
    <Sidebar>
      <SidebarHeader className="p-6 border-b">
        <h2 className="text-xl font-semibold">Filters</h2>
      </SidebarHeader>
      <SidebarContent className="p-6">
        <div className="space-y-8">
          <div>
            <h3 className="mb-3 text-lg font-medium">Price range</h3>
            <Slider
              min={0}
              max={1500}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mb-4"
            />
            <div className="flex justify-between text-lg">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-medium">Categories</h3>
            <div className="space-y-3">
              {["Electronics", "Furniture", "Appliances", "Sports"].map((category) => (
                <div key={category} className="flex items-center">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <label htmlFor={category} className="ml-3 text-lg">{category}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

function HeaderComponent({ searchTerm, setSearchTerm }: HeaderComponentProps) {
  return (
    <header className="flex items-center justify-between p-6 border-b">
      <SidebarTrigger>
        <Button variant="outline" size="icon" className="text-purple-900">
          <HamIcon size={50} />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SidebarTrigger>
      <div className="flex items-center space-x-3">
        <Input
          type="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-80 text-lg"
        />
        <Button size="icon" variant="ghost" className="text-purple-900">
          <Search className="h-6 w-6" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
    </header>
  );
}

function ProductList({ products }: ProductListProps) {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-purple-900">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products?.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle className="text-purple-900 text-2xl">{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-lg">{product.category}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <span className="text-xl font-semibold text-purple-900">${product.price}</span>
              <Button variant="outline" className="text-purple-900 text-[1.1rem]">Add to cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
