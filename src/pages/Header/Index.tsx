import React, { useState } from "react";
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
import Profile from "../../assets/Perfil.jpg";
import { Typography, Modal, Box, IconButton } from "@mui/material";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import useFetchUser from "../../hooks/useFetchUser";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion"; // Importe Framer Motion

const Header = () => {
  const userId = "1";
  const { userData, loading, error } = useFetchUser(userId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  return (
    <StyledContainer>
      <BannerContainer>
        <Banner src={logo} alt="Banner" />
        <Avatar
          src={Profile}
          alt="Avatar"
          onClick={handleOpenModal}
          style={{ cursor: "pointer" }}
        />
      </BannerContainer>

      {/* Modal para exibir o avatar em tamanho maior */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="avatar-modal"
        aria-describedby="avatar-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            outline: "none",
            borderRadius: "8px",
          }}
        >
          <IconButton
            onClick={handleCloseModal}
            sx={{ position: "absolute", top: 8, right: 8, color: "#ffff" }}
          >
            <CloseIcon />
          </IconButton>
          <AnimatePresence>
            {isModalOpen && (
              <motion.img
                src={Profile}
                alt="Avatar ampliado"
                style={{ maxWidth: "100%", maxHeight: "90vh", borderRadius: "8px" }}
                initial={{ scale: 0 }} // Começa com escala 0 (invisível)
                animate={{ scale: 1 }} // Anima para escala 1 (tamanho normal)
                exit={{ scale: 0 }} // Anima de volta para escala 0 ao fechar
                transition={{ duration: 0.3 }} // Duração da animação
              />
            )}
          </AnimatePresence>
        </Box>
      </Modal>

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