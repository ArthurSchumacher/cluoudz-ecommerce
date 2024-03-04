import Breadcrumb from "@/components/common/Breadcrumbs";

export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Breadcrumb />
      {children}
    </section>
  );
}
