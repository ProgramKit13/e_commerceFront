import { Row, Col } from 'react-bootstrap';
import CustomDropdown from '../../controls/dropdowm_buttoms/CustomDropdown';
import { faBell, faUserCircle, faCog, faHistory, faShoppingCart, faHeart, faMapMarkerAlt, faCreditCard, faTag, faReceipt, faCommentDots, faUndo, faQuestionCircle,
  faLock, faFileContract, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const alertItems = [
    { text: "First Item", href: "#" },
    { text: "Second Item", href: "#" },
    { text: "Third Item", href: "#" },
  ];
  
  const userItems = [
    { text: "Perfil", icon: faUserCircle, href: "#" },
    { text: "Configurações", icon: faCog, href: "#" },
    { text: "Histórico de pedidos", icon: faHistory, href: "#" },
    { text: "Carrinho de compras", icon: faShoppingCart, href: "#" },
    { text: "Lista de desejos", icon: faHeart, href: "#" },
    { text: "Gerenciamento de endereços", icon: faMapMarkerAlt, href: "#" },
    { text: "Gerenciamento de pagamento", icon: faCreditCard, href: "#" },
    { text: "Cupons e descontos", icon: faTag, href: "#" },
    { text: "Subscrições", icon: faReceipt, href: "#" },
    { text: "Revisões/Avaliações", icon: faCommentDots, href: "#" },
    { text: "Pedidos de devoluções", icon: faUndo, href: "#" },
    { text: "Ajuda e suporte", icon: faQuestionCircle, href: "#" },
    { text: "Política e privacidade", icon: faLock, href: "#" },
    { text: "Termos e condições", icon: faFileContract, href: "#" },
    { text: "Sair", icon: faSignOutAlt, href: "#" },
  ]


export const ThirdMenu = () => {
    return (
        <Row className="aligItem3">
        <Col className="colItems3" sm={6}>
          <div className="alertArea">
            <span className="badge bg-primary badgeOs">1</span>
            <CustomDropdown icon={faBell} items={alertItems} />
          </div>
        </Col>
        <Col sm={6} className="colItems3">
          <CustomDropdown icon={faUserCircle} items={userItems} />
        </Col>
        </Row>
    )
}