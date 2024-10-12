import { Button } from "@/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { LucideUser } from "lucide-react";
import Link from "next/link";

export default function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-4xl mx-auto flex flex-col min-h-dvh">
      <header className="flex items-center p-4">
        <div className="flex justify-center items-center">
          <span className="font-mono font-bold text-2xl">Y</span>
        </div>
        <nav className="flex-1 flex justify-center items-center">
          <ul className="list-none flex gap-8">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/feed">Feed</Link>
            </li>
          </ul>
        </nav>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-full">
                <LucideUser className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Y0</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    0x0
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="px-4 flex-1">{children}</main>
      <footer className="p-4">
        <p className="uppercase text-muted-foreground text-xs">
          &copy; Y {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
