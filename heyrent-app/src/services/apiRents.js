import { getToday } from "../utils/helper";
import supabase from "./supabase";

export async function getAllRents() {
  const { data, error } = await supabase.from("rents").select("*");

  if (error) {
    console.error(error);
    throw new Error("دریافت اجاره ها با خطا مواجه شد");
  }

  return data;
}

export async function createRent(newRents) {
  const { data, error } = await supabase
    .from("rents")
    .insert([{ ...newRents }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("ثبت اجاره با خطا مواجه شد. لطفا مجدد تلاش کنید");
  }

  return data;
}

export async function getRent(id) {
  const { data, error } = await supabase
    .from("rents")
    .select("*, cars(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("اجاره مورد نظر یافت نشد");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// date: ISOString
export async function getRentsAfterDate(date) {
  const { data, error } = await supabase
    .from("rents")
    .select("created_at, totalPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("اجاره مورد نظر یافت نشد");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("rents")
    .select("*")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("اجاره مورد نظر یافت نشد");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("rents")
    .select("*")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.paid,endDate.eq.${getToday()})`
    )
    .order("created_at");

  console.log(data);

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("اجاره مورد نظر یافت نشد");
  }
  return data;
}

export async function updateRent(id, obj) {
  const { data, error } = await supabase
    .from("rents")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("بروزرسانی اجاره موردنظر با خطا مواجه شد");
  }
  return data;
}

export async function deleteRent(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("rents").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("حذف اجاره موردنظر با خطا مواجه شد");
  }
  return data;
}
