import { Visible } from "./RequireAuth";

export const PerfilPage = () => {
  return (
    <>
      <p>Mi perfil</p>
      <Visible rol="admin">
        <p>Es admin!</p>
      </Visible>
      <Visible rol="user">
        <p>Es usuario!</p>
      </Visible>
    </>
  );
};
