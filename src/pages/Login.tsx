import { Row, Col, Container } from "react-bootstrap";
import styles from './styles/login/login.module.css'
import logoAxios from './styles/login/images/logoAxios.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTelegram, faWhatsappSquare } from '@fortawesome/free-brands-svg-icons';
import React, { useState } from 'react';
import {api} from '../api/admin/api_admin_user';
import { emailValidate, pass_validate} from '../assets/validators/validator'

export const Login = () => {    
    const [insertEmail, setInsertEmail] = useState('');
    const [insertPassword, setInsertPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');


    const handleInsertEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInsertEmail(event.target.value);
    };

    const handleInsertPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInsertPassword(event.target.value);
    };



    const actionLogin = async () => {
        const verifyEmail = emailValidate(insertEmail);
        let emailError = ''
    
        if(!verifyEmail){
            emailError = 'Email inválido.*'
        } 
    
        const verifyPassword = pass_validate(insertPassword);
        let passwordError = ''
    
        if(!verifyPassword){
            passwordError = 'Senha inválida*'
        } 


        if (!emailError && !passwordError) {
            try {
                const response = await api.loginUser(insertEmail, insertPassword);
                if (response.code >= 200 && response.code < 300) {
                  localStorage.setItem('token', response.data.access_token);
                  localStorage.setItem('refreshToken', response.data.refresh_token);
                  window.location.href = '/axiosadmin';
                }
                
                if (response.code === 401) {
                    if (emailError) {
                        setEmailError(emailError)
                    } else {
                        setEmailError('')
                    }
                    setPasswordError('Usuário ou senha inválido(s)*');
                } 

              } catch (error) {
                setPasswordError('Usuário ou senha inválido(s)*');
              }
        } 

        if (emailError || passwordError) {
            setEmailError(emailError);
            setPasswordError(passwordError);
            
        }
    }

  return (
    <div className={styles.bgWall}>
        <Container className={styles.containerStyle}>
            <div className={styles.bgImage}>
            <Row className={styles.cardBody}>
                <Row>
                <Col className={styles.col1130}>
                    <Row className={styles.leftArea}>
                    <Col>
                        <Row className={styles.titleRowArea}>
                        <Col>
                            <p className={styles.title}>Login</p>
                        </Col>
                        </Row>
                        <Row className={styles.formArea}>
                            <Row className={styles.InputArea}>
                                <Col>
                                <p className={styles.titleInput}>Email</p>
                                <input
                                    className={styles.inputDefault} value={insertEmail} onChange={handleInsertEmail}
                                    type="text"
                                    placeholder="Digite seu email"
                                />
                                        {emailError && (
                                            <div className={styles.errorMessage}>
                                                <p>{emailError}</p>
                                            </div>
                                        )}  
                                </Col>
                            </Row>
                        </Row>
                        <Row className={`${styles.formArea} mt-4`}>
                            <Row className={styles.InputArea}>
                                <Col>
                                <p className={styles.titleInput}>Senha</p>
                                <input
                                    className={styles.inputDefault} value={insertPassword} onChange={handleInsertPassword}
                                    type="password"
                                    placeholder="Digite sua senha"
                                />
                                        {passwordError && (
                                            <div className={styles.errorMessage}>
                                                <p>{passwordError}</p>
                                            </div>
                                        )}  
                                </Col>
                            </Row>
                        </Row>
                        <Row className={styles.formArea}>
                            <Col className={styles.submitArea}>
                                <button className={`${styles.submitButton} mt-4`} type="submit" onClick={actionLogin}>
                                Logar
                                </button>
                            </Col>
                            </Row>
                            <Row className={styles.titleRegisterArea}>
                                <Col className={`${styles.titleRegister} mt-5`}>
                                    <p className={styles.titleRegisterText}>
                                    Precisa de ajuda?
                                    </p>
                                </Col>
                            </Row>
                        <Row>
                        <Col className={styles.buttonArea}>
                            <button className={styles.registerButton} type="button">
                            Contate-nos
                            </button>
                        </Col>
                        </Row>
                    </Col>
                    </Row>
                </Col>
                <Col className={styles.alignCol}>
                    <Row className={styles.rightArea}>
                    <Col>
                        <Row className={styles.ImgArea}>
                        <img
                            className={`${styles.logoImg}`}
                            src={logoAxios}
                        />
                        </Row>
                    </Col>
                    </Row>
                    <Row className={styles.socialMediaArea}>
                        <Col className={styles.iconArea}>
                            <FontAwesomeIcon icon={faInstagram} className={`${styles.fab} ${styles.hoverIcon}`} />
                        </Col>
                        <Col className={styles.iconArea}>
                            <FontAwesomeIcon icon={faFacebook} className={`${styles.fab} ${styles.hoverIcon}`} />
                        </Col>
                        <Col className={styles.iconArea}>
                            <FontAwesomeIcon icon={faTelegram} className={`${styles.fab} ${styles.hoverIcon}`} />
                        </Col>
                        <Col className={styles.iconArea}>
                            <FontAwesomeIcon icon={faWhatsappSquare} className={`${styles.fab} ${styles.hoverIcon}`} />
                        </Col>
                    </Row>
                </Col>
                </Row>
            </Row>
            </div>
        </Container>
    </div>
  );
};

