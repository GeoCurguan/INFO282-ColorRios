import ResolveGenderIcon from "../ResolveGenderIcon";
import Image from "next/image";

const ProfileCard = ({ user }) => {
  return (
    <div className="flex flex-col justify-center items-center bg-[#434343] text-[#D9D9D9] rounded-md w-[250px] drop-shadow-md">
      <ProfileHeader user={user} />
      <hr className="w-full border-[#D9D9D9]" />
      <ProfileBody user={user} />
      <ProfileFooter user={user} />
    </div>
  );
};

const ProfileHeader = ({ user }) => {
  const { username, gender, region, job } = user;
  return (
    <section className="mb-4 max-w-full w-full flex flex-row items-center pt-4 px-4 justify-between">
      {/* Icon/Image */}
      <div className="w-1/3">
        <Image src={user.image} alt={username} width={100} height={100} className="rounded-full" />
      </div>
      {/* Username && Gender */}
      <div className="w-2/3 px-4 max-w-full flex-col flex justify-center items-center">
        <div className="w-full flex flex-row justify-start items-center gap-2">
          <h1
            title={username}
            className="max-w-[80%] text-2xl font-bold text-center overflow-hidden overflow-ellipsis whitespace-nowrap"
          >
            {username}
          </h1>
          <ResolveGenderIcon className="w-6 h-6" gender={gender} />
        </div>
        <h2 className="w-full text-left text-sm text-gray-300">{job}</h2>
      </div>
    </section>
  );
};

const ProfileBody = ({ user }) => {
  return <section className="pt-4 px-4 w-full text-center">{user.region}</section>;
};

const ProfileFooter = ({ user }) => {
  return <div className="pb-4 w-full"></div>;
};

export default ProfileCard;
