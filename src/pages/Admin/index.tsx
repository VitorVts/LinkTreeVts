/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Modal,
  IconButton,
} from "@mui/material";
import {
  Link as LinkIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import useFetchUser from "../../hooks/useFetchUser";
import useFetchLinks from "../../hooks/useFetchLinks";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../../services/firebase"; // Ajuste o caminho conforme necessário
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  justifyContent: "center",
  alignItems: "center",
};

const Admin = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const { userData, loading: userLoading, error } = useFetchUser("1");
  const { links, loading: linksLoading } = useFetchLinks("1");

  const [formData, setFormData] = useState({
    name: "",
    job: "",
    locale: "",
    phone: "",
    email: "",
  });

  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [newLink, setNewLink] = useState({ title: "", url: "" });
  const [editingLink, setEditingLink] = useState<{ title: string; url: string; id?: string } | null>(null);
  const [linkList, setLinkList] = useState(links);
  const [linkToDelete, setLinkToDelete] = useState<string | null>(null);
  const [user, setUser] = process.env.NEXT_PUBLIC_IGNORE_USER_STATE === 'true' ? [null, () => {}] : useState<User | null>(null);

  
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        navigate("/admin");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);


  useEffect(() => {
    if (user) {
      console.log("Usuário autenticado:", user);
    }
  }, [user]);
  
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        job: userData.job || "",
        locale: userData.locale || "",
        phone: userData.phone || "",
        email: userData.email || "",
      });
    }
  }, [userData]);

  useEffect(() => {
    setLinkList(links);
  }, [links]);

  const handleInputChange = (e: {
    target: { name: string; value: unknown };
  }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      await setDoc(doc(db, "users", "1"), formData);
      console.log("Dados salvos:", formData);
      alert("Dados salvos com sucesso!");
    } catch (err) {
      console.error("Erro ao salvar dados:", err);
      alert("Erro ao salvar dados.");
    }
  };

  const handleOpenModal = (link: { title: string; url: string; id?: string } | null = null) => {
    setEditingLink(link);
    setOpenModal(true);
    if (link) {
      setNewLink({ title: link.title, url: link.url });
    } else {
      setNewLink({ title: "", url: "" });
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingLink(null);
  };

  const handleNewLinkChange = (e: {
    target: { name: unknown; value: unknown };
  }) => {
    const { name, value } = e.target;
    setNewLink({ ...newLink, [name as string]: value });
  };

  const handleAddLink = async () => {
    if (newLink.title && newLink.url) {
      if (editingLink) {
        const updatedLinks = linkList.map((link) =>
          link.id === editingLink.id ? { ...link, ...newLink } : link
        );
        setLinkList(updatedLinks);
        if (editingLink.id) {
          await setDoc(doc(db, "links", editingLink.id), { ...newLink });
        } else {
          console.error("Link ID is undefined");
        }
      } else {
        const newLinkObj = { id: Date.now().toString(), ...newLink };
        setLinkList([...linkList, newLinkObj]);
        await setDoc(doc(db, "links", newLinkObj.id), newLinkObj);
      }
      setNewLink({ title: "", url: "" });
      handleCloseModal();
    }
  };


  const handleOpenDeleteModal = (linkId: string) => {
    setLinkToDelete(linkId);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setLinkToDelete(null);
    setOpenDeleteModal(false);
  };

  const handleDeleteLink = async () => {
    if (linkToDelete) {
      const updatedLinks = linkList.filter((link) => link.id !== linkToDelete);
      setLinkList(updatedLinks);
      await deleteDoc(doc(db, "links", linkToDelete));
      handleCloseDeleteModal();
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Erro ao fazer logout");
    }
  };

  if (loading) return <Typography>Carregando...</Typography>;
  if (userLoading) return <Typography>Carregando usuário...</Typography>;
  if (error)
    return <Typography>Erro ao carregar os dados do usuário.</Typography>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        padding: 4,
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <Box sx={{ flex: 1, padding: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", mb: 4 }}
        >
          Formulário de Edição
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            label="Nome"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Profissão"
            name="job"
            value={formData.job}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Localização"
            name="locale"
            value={formData.locale}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Telefone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Salvar Alterações
          </Button>
        </Box>
      </Box>
      <Box sx={{ flex: 1, padding: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Links Adicionados
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ mb: 2 }}
          onClick={() => handleOpenModal()}
        >
          Adicionar Link
        </Button>
        {linksLoading ? (
          <CircularProgress />
        ) : (
          <List>
            {linkList.length > 0 ? (
              linkList.map((link) => (
                <ListItem key={link.id}>
                  <ListItemIcon>
                    <LinkIcon />
                  </ListItemIcon>
                  <ListItemText primary={link.title} />
                  <IconButton onClick={() => handleOpenModal(link)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDeleteModal(link.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))
            ) : (
              <Typography>Nenhum link cadastrado.</Typography>
            )}
          </List>
        )}
      </Box>

      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Tem certeza que deseja excluir este link?
          </Typography>
          <Button variant="contained" color="error" onClick={handleDeleteLink}>
            Excluir
          </Button>
          <Button
            variant="contained"
            onClick={handleCloseDeleteModal}
            sx={{ ml: 2 }}
          >
            Cancelar
          </Button>
        </Box>
      </Modal>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            {editingLink ? "Editar Link" : "Adicionar Novo Link"}
          </Typography>
          <TextField
            label="Título"
            name="title"
            value={newLink.title}
            onChange={handleNewLinkChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="URL"
            name="url"
            value={newLink.url}
            onChange={handleNewLinkChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleAddLink}>
            {editingLink ? "Salvar Alterações" : "Salvar"}
          </Button>
        </Box>
      </Modal>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        sx={{ marginTop: 3, position: "absolute", top: 0, right: 20 }}
      >
        Sair
      </Button>
    </Box>
  );
};

export default Admin;
