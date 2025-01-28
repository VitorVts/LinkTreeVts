import {
  StyledContainer,
  Banner,
  Avatar,
  BannerContainer,
  InfoContainer,
  PersonalInfoContainer,
  ContactInfoContainer,
  ContainerText,
} from "./styles";
import logo from "../../assets/Banner.svg";
import perfil from "../../assets/perfil.jpg";
import { Typography } from "@mui/material";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import useFetchUser from "../../hooks/useFetchUser";

const Header = () => {
  const userId = "1";
  const { userData, loading, error } = useFetchUser(userId);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  return (
    <StyledContainer>
      <BannerContainer>
        <Banner src={logo} alt="Banner" />
        <Avatar src={perfil} alt="Avatar" />
      </BannerContainer>

      <InfoContainer>
        <PersonalInfoContainer>
          <Typography variant="h5" fontWeight="bold">
            {userData?.name || "Nome não encontrado"}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {userData?.job || "Posição não encontrada"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {userData?.locale || "Localização não informada"}
          </Typography>
        </PersonalInfoContainer>

        <ContactInfoContainer>
          <Typography variant="h5" fontWeight="bold">
            Contato
          </Typography>
          <ContainerText>
            <PhoneForwardedIcon />
            <Typography
              component="a"
              href={`tel:${userData?.phone || ""}`}
              variant="body1"
              color="textSecondary"
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              {userData?.phone || "Telefone não encontrado"}
            </Typography>
          </ContainerText>
          <ContainerText>
            <ForwardToInboxIcon />
            <Typography
              component="a"
              href={`mailto:${userData?.email || ""}`}
              variant="body1"
              color="textSecondary"
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              {userData?.email || "E-mail não encontrado"}
            </Typography>
          </ContainerText>
        </ContactInfoContainer>
      </InfoContainer>
    </StyledContainer>
  );
};

export default Header;
