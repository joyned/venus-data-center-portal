import styled from 'styled-components';
import Input from '../components/Input';
import Button from '../components/Button';
import Panel from '../components/Panel';

const LoginPageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
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
    return (
        <LoginPageContainer>
            <LoginPagePanel>
                <Panel style={{ padding: '50px' }}>
                    <LoginPageForm>
                        <Input type='text' placeholder='Username'></Input>
                        <Input type='password' placeholder='Password'></Input>
                        <Button label='Login'></Button>
                    </LoginPageForm>
                </Panel>
            </LoginPagePanel>
        </LoginPageContainer>
    )
}