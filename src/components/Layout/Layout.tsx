import React, { PropsWithChildren } from "react";
import { Account } from "./Account";

export const Layout: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col">
      <header className="flex items-center p-4">
        <div className="flex items-center justify-center">
          <div className="flex size-8 items-center justify-center bg-primary">
            <span className="font-mono text-2xl font-bold text-white">Y</span>
          </div>
        </div>
        <nav className="flex flex-1 items-center justify-center">
          <ul className="flex list-none gap-8"></ul>
        </nav>
        <div>
          <Account />
        </div>
      </header>
      <main className="flex-1 px-4">{children}</main>
      <footer className="p-4">
        <p className="text-xs uppercase text-muted-foreground">
          &copy; Y {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};
