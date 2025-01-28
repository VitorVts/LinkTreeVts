import { Button } from "@mui/material";
import {
  GitHub,
  Twitter,
  LinkedIn,
  Facebook,
  Instagram,
  QueueMusic,
  
} from "@mui/icons-material";
import CodeIcon from "@mui/icons-material/Code";
import GamepadIcon from '@mui/icons-material/Gamepad';
import { linkButtonStyles } from "./styles";

interface LinkButtonProps {
  title: string;
  url: string;
  icon: string;
}

const iconComponents = {
  GitHub: GitHub,
  Twitter: Twitter,
  LinkedIn: LinkedIn,
  Facebook: Facebook,
  Instagram: Instagram,
  Playlist: QueueMusic,
  PortFólio: CodeIcon,
  Discord: GamepadIcon,
};

const LinkButton: React.FC<LinkButtonProps> = ({ title, url }) => {
  const IconComponent = iconComponents[title as keyof typeof iconComponents];

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={
        IconComponent ? (
          <IconComponent sx={{ width: "40px", height: "40px" }} />
        ) : null
      }
      fullWidth
      href={url}
      target="_blank"
      sx={linkButtonStyles}
    >
      {title}
    </Button>
  );
};

export default LinkButton;
