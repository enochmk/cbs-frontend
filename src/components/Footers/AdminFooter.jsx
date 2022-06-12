import { Row, Col, Nav, NavItem, NavLink } from "reactstrap";

const Footer = () => (
  <footer className="footer">
    <Row className="align-items-center justify-content-xl-between">
      <Col xl="6">
        <div className="copyright text-center text-xl-left text-muted">
          © {new Date().getFullYear()} Copyright
        </div>
      </Col>

      <Col xl="6">
        <Nav className="nav-footer justify-content-center justify-content-xl-end">
          <NavItem>
            <NavLink>Solutions Team</NavLink>
          </NavItem>
        </Nav>
      </Col>
    </Row>
  </footer>
);

export default Footer;
