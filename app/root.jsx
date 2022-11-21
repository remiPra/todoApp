const {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} = require("@remix-run/react");

export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

import MainNavigation from './components/MainNavigation';
import mainStyles from './styles/main.css'

export default function App() {
  return (
    <html lang="fr">
      <head>
        <link rel="stylesheet" type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" />
        <Meta />
        <Links />
        
        {/* <script src="https://cdn.tailwindcss.com"></script> */}
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}


export function links() {
  return [{ rel: 'stylesheet', href: mainStyles }]
}
