/**
 * A template re-mounts on every navigation, so this wrapper gives each route
 * change a fade-rise entrance. (Layout stays mounted; only the page animates.)
 */
export default function Template({ children }: { children: React.ReactNode }) {
  // `app-page` restores the page-level column gap (the wrapper would otherwise
  // collapse the spacing between page children, e.g. breadcrumb ↔ detail).
  return <div className="anim-fade app-page h-full">{children}</div>;
}
