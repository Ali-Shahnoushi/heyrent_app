import supabase, { supabaseUrl } from "./supabase";

export async function getCars() {
  const { data, error } = await supabase.from("cars").select("*");

  if (error) {
    console.error(error);
    throw new Error("cars could not be loaded");
  }

  return data;
}

export async function createCar(newCar) {
  const hasImagePath = newCar.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCar.image.name}`.replaceAll("/", "");
  const imagePath = hasImagePath
    ? newCar.image
    : `${supabaseUrl}/storage/v1/object/public/cars-image/${imageName}`;

  // 1. Create/edit Car
  let query = supabase.from("cars");

  // A) CREATE
  query = query.insert([{ ...newCar, image: imagePath }]);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("خودرویی یافت نشد");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cars-image")
    .upload(imageName, newCar.image);

  // 3. Delete the Car IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("cars").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("تصویر خودرو آپلود نشد. مجدد تلاش کنید!");
  }

  return data;
}

export async function editCar(newCar, id) {
  const hasImagePath = newCar.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCar.image.name}`.replaceAll("/", "");
  const imagePath = hasImagePath
    ? newCar.image
    : `${supabaseUrl}/storage/v1/object/public/cars-image/${imageName}`;

  // 1. Create/edit Car
  let query = supabase.from("cars");

  // B) EDIT
  query = query.update({ ...newCar, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  console.log(data, id);
  if (error) {
    console.error(error);
    throw new Error("مشکلی در اضافه کردن خودرو وجود دارد. مجدد تلاش کنید");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cars-image")
    .upload(imageName, newCar.image);

  // 3. Delete the car IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("cars").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("تصویر خودرو آپلود نشد. مجدد تلاش کنید!");
  }

  return data;
}

export async function deleteCar(id) {
  const { error, data } = await supabase.from("cars").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("مشکلی در حذف خودرو بوجود آمده. مجدد تلاش کنید!");
  }

  return data;
}

export async function getCar(id) {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("خودرو یافت نشد");
  }

  return data;
}
