import { Container, Menu, Button } from "semantic-ui-react";
interface IProp {
  handleOpenForm: (id?: string) => void;
}
const Navbar = ({ handleOpenForm }: IProp) => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item>
          <img
            src="assets/logo.png"
            alt="asdf"
            style={{ marginRight: "10px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button
            positive
            content="Create Activity"
            onClick={() => handleOpenForm()}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
