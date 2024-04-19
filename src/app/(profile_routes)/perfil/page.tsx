import * as queries from "@/queries";
import ClientProfile from "@/components/profile/ClientProfile";
import React from "react";
import { User } from "@/types/user";
import SmallContainer from "@/components/common/SmallContainer";
import Title from "@/components/Title";

async function ProfilePage() {
  const user: User = await queries.userProfile();
  return (
    <section>
      <SmallContainer>
        <Title isUpperCase label="Meus Dados" />
        <ClientProfile user={user} />
      </SmallContainer>
    </section>
  );
}

export default ProfilePage;
