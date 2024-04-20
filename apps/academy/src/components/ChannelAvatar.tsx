import { Avatar, AvatarFallback, AvatarImage, Icons } from "ui";
interface ChannelAvatarProps {
  image?: string;
}

const ChannelAvatar = ({ image }: ChannelAvatarProps) => {
  return (
    <Avatar className="mr-2">
      <AvatarImage src={image} />
      <AvatarFallback className="bg-primary">
        <Icons.user_icon className="text-secondary" />
      </AvatarFallback>
    </Avatar>
  );
};

export default ChannelAvatar;
