import { ControlButton } from '../../assets/components/Gestao/ControlButtomDefault';
import './produtos/css/styles.css'
export const GroupControlsGestao = () => {
    return (
        <>
            <div className="groupControlGestaoButtons">
                <ControlButton to="produtos" label="Produtos" />
                <ControlButton to="clientes" label="Clientes" />
                <ControlButton to="financeiro" label="Financeiro" />
                <ControlButton to="fornecedores" label="Fornecedores" />
            </div>
        </>
    );
};
