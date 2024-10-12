import { User } from "./User";

export default function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-4xl mx-auto flex flex-col w-full">
      <header className="flex items-center p-4">
        <div className="flex justify-center items-center">
          <div className="bg-primary size-8 flex items-center justify-center">
            <span className="font-mono font-bold text-2xl text-white">Y</span>
          </div>
        </div>
        <nav className="flex-1 flex justify-center items-center">
          <ul className="list-none flex gap-8"></ul>
        </nav>
        <div>
          <User />
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
