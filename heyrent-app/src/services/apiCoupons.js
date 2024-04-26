import supabase from "./supabase";

export async function getCoupons() {
  const { data, error } = await supabase.from("coupons").select("*");

  if (error) {
    console.error(error);
    throw new Error("coupons could not be loaded");
  }

  return data;
}

export async function createCoupon(newCoupon) {
  // 1. Create/edit Car
  let query = supabase.from("coupons");

  // A) CREATE
  query = query.insert([{ ...newCoupon }]);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Coupon could not be created");
  }

  return data;
}

export async function editCoupon(newCoupon, id) {
  let query = supabase.from("coupons");

  // B) EDIT
  query = query.update({ ...newCoupon }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Coupon could not be created");
  }

  return data;
}

export async function deleteCoupon(id) {
  const { data, error } = await supabase.from("coupons").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Coupon could not be deleted");
  }

  return data;
}
