import styles from './styles/register/register.module.css'
import logoAxios from './styles/register/images/logoAxios.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import {api} from '../api/admin/api_admin_user';
import { validateDiferentText, getErrorMessage,  emailValidate, pass_validate, confirm_pass} from '../assets/validators/validator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookSquare, faTelegram, faWhatsappSquare } from '@fortawesome/free-brands-svg-icons';




export const Register = () => {
    const [addName, setAddName] = useState('');
    const [addEmail, setAddEmail] = useState('');
    const [addPassword, setAddPassword] = useState('');
    const [addConfirmPassword, setAddConfirmPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [accept, setAccept] = useState(false);
    const [acceptError, setAcceptError] = useState('');


    const handleAddName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddName(event.target.value);
    }

    const handleAddEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddEmail(event.target.value);
    }

    const handleAddPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddPassword(event.target.value);
    }

    const handleAddConfirmPass = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddConfirmPassword(event.target.value);
    }

    const handleAccept = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAccept(event.target.checked);
    }


    const handleAddUser = async () => {
        const verifyName = validateDiferentText(addName, true, true);
        let nameError = '';

        if (typeof verifyName === 'object' && Object.keys(verifyName).length > 0) {
            nameError = getErrorMessage(verifyName);
        }

        const verifyEmail = emailValidate(addEmail);
        let emailError = '';

        if (!verifyEmail) {
            emailError = 'Email inválido.';
        }

        const verifyPassword = pass_validate(addPassword);
        let passwordError = '';

        if (!verifyPassword) {
            passwordError = 'A senha deve conter 8 caracteres ou mais, letras maiúsculas e um ou mais carcateres especiais.';
        }

        const verifyConfirmPassword = confirm_pass(addPassword, addConfirmPassword);
        let confirmPasswordError = '';

        if (!verifyConfirmPassword) {
            confirmPasswordError = 'As senhas não coincidem.';
        }

        
        let acceptError = '';
        if (!nameError && !emailError && !passwordError && !confirmPasswordError) {
            if (!accept) {
               acceptError = 'Você deve aceitar os termos de uso.'
            } else {
                await api.registerUser(addName, addEmail, addPassword);
                window.location.href = '/login';
            }
        }


        setNameError(nameError);
        setEmailError(emailError);
        setPasswordError(passwordError);
        setConfirmPasswordError(confirmPasswordError);
        setAcceptError(acceptError);
    }


    return (
        <div className={styles.bgWall}>
            <Container fluid className={`${styles.container} ${styles.containerStyle}`}>
                <Row className={styles.bodyCard}>
                    <Col className={styles.leftCard}>
                        <Row className={styles.titleArea}>
                        <Col className={styles.titleLeft}><img className={styles.logo} src={logoAxios} width={168} height={167} alt="Logo Axios" ></img></Col>
                        </Row>

                        <Row className={styles.infoRegister}>
                        <Col className={`${styles.textArea} mt-5`}>
                            <p>Conheça a maior plataforma e-commerce de tecnologia do mercado e conecte-se com tudo o que há de novo!</p>
                        </Col>
                        </Row>

                        <Row className={styles.infoLogin}>
                        <Col className={`${styles.textArea} mt-4`}>
                            <p className="text-center mt-4">Já possui uma conta? <a href="#" className={styles.linkLogin}>Faça o login</a></p>
                        </Col>
                        </Row>

                        <Row className={styles.secionSocial}>
                        <Col className={`${styles.socialArea} mt-5`}>
                            <Row className={styles.iconsArea}>
                            <Col><FontAwesomeIcon className={styles.iconSocial} icon={faInstagram} /></Col>
                            <Col><FontAwesomeIcon className={styles.iconSocial} icon={faFacebookSquare} /></Col>
                            <Col><FontAwesomeIcon className={styles.iconSocial} icon={faTelegram} /></Col>
                            <Col><FontAwesomeIcon className={styles.iconSocial} icon={faWhatsappSquare} /></Col>
                            </Row>
                        </Col>
                        </Row>
                    </Col>

                    <Col className={styles.rightCard}>
                        <Row className={styles.titleRegisterArea}>
                            <Col className={styles.colRegister}>
                            <p className={styles.titleRegister}>Registre-se</p>
                            </Col>
                        </Row>
                        <Row className={styles.formArea}>
                            <div className={styles.inputArea}>
                                <Row className={styles.inputField}>
                                    <Col>
                                        <p className={styles.titleInput}>Nome</p>
                                        <input value={addName} onChange={handleAddName} className={styles.inputDefault} type="text" placeholder="Digite seu nome" required />
                                        {nameError && (
                                        <Row className={styles.errorMessage}>
                                            <Col>{nameError}</Col>
                                        </Row>
                                        )}                            
                                    </Col>
                                </Row>
                            </div>
                            <div className={styles.inputArea}>
                                <Row>
                                <Col>                    
                                    <p className={styles.titleInput}>Email</p>
                                    <input value={addEmail} onChange={handleAddEmail} className={styles.inputDefault} type="email" placeholder="Digite seu email" required />
                                    {emailError && (
                                        <Row className={styles.errorMessage}>
                                            <Col>{emailError}</Col>
                                        </Row>
                                        )}      
                                </Col>
                                </Row>
                            </div>
                            <div className={styles.inputArea}>
                                <Row>
                                    <Col>
                                        <p className={styles.titleInput}>Senha</p>
                                        <input value={addPassword} onChange={handleAddPassword} className={styles.inputDefault} type="password" placeholder="Escolha uma senha" required />
                                    </Col>
                                    {passwordError && (
                                        <Row className={styles.errorMessage}>
                                            <Col>{passwordError}</Col>
                                        </Row>
                                        )}  
                                </Row>
                            </div>
                            <div className={styles.inputArea}>
                                <Row>
                                    <Col>
                                        <p className={styles.titleInput}>Confirmação de senha</p>
                                        <input value={addConfirmPassword} onChange={handleAddConfirmPass} className={styles.inputDefault} type="password" placeholder="Confirme sua senha" required />
                                        {confirmPasswordError && (
                                        <Row className={styles.errorMessage}>
                                            <Col>{confirmPasswordError}</Col>
                                        </Row>
                                        )}  
                                    </Col>
                                </Row>
                            </div>
                            <div className={styles.buttonArea}>
                                <Col className={styles.checkboxCol}>
                                <Form.Check className={styles.checkBox} onChange={handleAccept} required label={<span>Eu aceito os <a href="https://example.com/termos-e-condicoes">termos e condições</a></span>}/>
                                {acceptError && (
                                        <Row className={styles.errorMessage}>
                                            <Col>{acceptError}</Col>
                                        </Row>
                                        )}         
                                </Col>
                                <Col className={styles.buttonCol}>
                                <button  className={styles.loginButton} onClick={handleAddUser} type="submit">Cadastrar</button>
                                </Col>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Container>
    </div>
    )

}

