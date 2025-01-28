/* eslint-disable @typescript-eslint/no-unused-vars */
import useFetchLink from "../../hooks/useFetchLinks";
import LinkButton from "../../components/LinkButton";
import { Container, Typography, CircularProgress, Grid } from "@mui/material";

const LinkButtons = () => {
  const { links, loading } = useFetchLink("");

  return (
    <Container sx={{ textAlign: "center", mt: 4 }}>
      {loading ? (
        <CircularProgress />
      ) : links && links.length > 0 ? (
        <Grid container spacing={3} justifyContent="center">
          {links.map((link) => (
            <Grid item xs={12} md={6} key={link.id}>
              <LinkButton title={link.title} url={link.url} icon={link.title} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>Não há links disponíveis</Typography>
      )}
    </Container>
  );
};

export default LinkButtons;
