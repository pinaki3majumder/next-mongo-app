import React from "react";

type ProfileProp = {
  params: Promise<{ id: string }>;
};

const ProfileSubPAGE = async ({ params }: ProfileProp) => {
  const resolvedParams = await params;

  return (
    <div>
      ProfileSubPAGE{" "}
      <span className="bg-orange-500 text-white font-bold px-3 py-2 rounded">
        {resolvedParams.id}
      </span>
    </div>
  );
};

export default ProfileSubPAGE;
