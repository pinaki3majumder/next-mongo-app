import React from "react";

type ProfileProp = {
  params: { id: string };
};

const ProfileSubPAGE = ({ params }: ProfileProp) => {
  return (
    <div>
      ProfileSubPAGE{" "}
      <span className="bg-orange-500 text-white font-bold px-3 py-2 rounded">
        {params.id}
      </span>
    </div>
  );
};

export default ProfileSubPAGE;
