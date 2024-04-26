import React from "react";
import LoginForm from "../features/authentication/LoginForm";

export default function Login() {
  // Function to randomly select an image URL from the array
  function getRandomImageUrl() {
    const imageUrls = [
      "url('https://okiyilgeinfscqjhoefj.supabase.co/storage/v1/object/public/car-image-background/bg-1.webp')",
      "url('https://okiyilgeinfscqjhoefj.supabase.co/storage/v1/object/public/car-image-background/bg-2.webp')",
      "url('https://okiyilgeinfscqjhoefj.supabase.co/storage/v1/object/public/car-image-background/bg-3.webp')",
      "url('https://okiyilgeinfscqjhoefj.supabase.co/storage/v1/object/public/car-image-background/bg-4.webp')",
      "url('https://okiyilgeinfscqjhoefj.supabase.co/storage/v1/object/public/car-image-background/bg-5.webp')",
      "url('https://okiyilgeinfscqjhoefj.supabase.co/storage/v1/object/public/car-image-background/bg-6.webp')",
      "url('https://okiyilgeinfscqjhoefj.supabase.co/storage/v1/object/public/car-image-background/bg-7.webp')",
      "url('https://okiyilgeinfscqjhoefj.supabase.co/storage/v1/object/public/car-image-background/bg-8.webp')",
    ];

    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
  }
  return (
    <div
      style={{
        backgroundImage: getRandomImageUrl(),
        backgroundSize: "cover",
        backgroundPosition: "center",
        // opacity: "0.2",
      }}
      id="bg-login"
      className="relative min-h-screen grid content-center justify-center gap-14"
    >
      <LoginForm />
    </div>
  );
}
