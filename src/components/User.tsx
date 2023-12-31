type userInfo = {
  photoURL: string | null | undefined;
  displayName: string | null | undefined;
};

const User = ({ photoURL, displayName }: userInfo) => {
  return (
    <div className="flex items-center shrink-0">
      <img
        className="w-10 h-10 rounded-full mr-2"
        src={photoURL ? photoURL : ""}
        alt={displayName ? displayName : ""}
      />
      {/* md 사이즈 이상이면 보이고, 미만이면 안 보이게 설정 (반응형) */}
      <span className="hidden md:block">{displayName}</span>
    </div>
  );
};

export default User;
