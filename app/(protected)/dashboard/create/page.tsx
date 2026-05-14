import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CreateAutomation } from "@/components/create-automation";

export default async function CreatePage() {
  const { user } = (await getSession()) ?? {};
  if (!user) redirect("/signin");

  return <CreateAutomation />;
}
