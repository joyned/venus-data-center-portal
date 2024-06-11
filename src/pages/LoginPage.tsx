import styled from 'styled-components';
import Input from '../components/Input';
import Button from '../components/Button';
import Panel from '../components/Panel';
import { useNavigate } from 'react-router-dom';

const LoginPageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    img {
        position: absolute;
        width: 100vw;
        height: 100vh;
    }
`;

const LoginPagePanel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border-radius: 5px;
`;

const LoginPageForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export default function LoginPage() {
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/home');
    }

    return (
        <LoginPageContainer>
            <img src="/login-background.svg" alt="" />
            <LoginPagePanel>
                <Panel style={{ padding: '50px' }}>
                    <LoginPageForm onSubmit={handleSubmit}>
                        <Input type='text' placeholder='Username'></Input>
                        <Input type='password' placeholder='Password'></Input>
                        <Button label='Login'></Button>
                    </LoginPageForm>
                </Panel>
            </LoginPagePanel>
        </LoginPageContainer>
    )
}