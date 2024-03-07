import Breadcrumb from "@/components/common/Breadcrumbs";
import Container from "@/components/common/Container";
import ProfileNav from "@/components/profile/ProfileNav";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Container>
        <Breadcrumb />
        <ProfileNav />
        {children}
      </Container>
    </section>
  );
}
