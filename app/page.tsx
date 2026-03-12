import { redirect } from "next/navigation";
import { localizePath } from "@/lib/i18n-routing";
import { getRequestLanguage } from "@/lib/request-language";

export default function HomePage() {
  redirect(localizePath("/", getRequestLanguage()));
}
