import { supabase } from "@/lib/supabase";

/** Cuenta compartida de empleados (solo se pide la contraseña). */
export const INTRANET_EMAIL = "empleados@idc.es";

async function rpcTrue(fn: "is_intranet_user" | "is_admin"): Promise<boolean> {
  const { data, error } = await supabase.rpc(fn);
  return !error && data === true;
}

/** true si el usuario con sesión es la cuenta de intranet o un administrador (respeta RLS). */
export async function checkIntranetAccess(): Promise<boolean> {
  if (await rpcTrue("is_intranet_user")) return true;
  return rpcTrue("is_admin");
}
