import * as queries from "@/queries";
import ClientProfile from "@/components/profile/ClientProfile";
import React from "react";
import { User } from "@/types/user";

async function ProfilePage() {
  const user: User = await queries.userProfile();
  return (
    <div>
      <ClientProfile user={user} />
    </div>
  );
}

export default ProfilePage;
