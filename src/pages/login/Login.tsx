import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import './login.scss';
import { useEffect, useState } from 'react';
import { loginUser, logoutUser } from '../../services';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser, resetUser, UserKey } from '../../redux/states/user';
import { clearLocalStorage } from '../../utilities';
import { PrivateRoutes, PublicRoutes } from '../../models';
import { CustomBackdropComponent } from '../../components/backdropCharge';
import LoginIcon from '@mui/icons-material/Login';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';

export const Login = () => {
	const [loginData, setLoginData] = useState({
		username: '',
		password: ''
	})

	const { CustomBackdrop, handlerOpen } = CustomBackdropComponent()
	const token = useSelector((state: AppStore) => state.user.Token);


	useEffect(() => {
		if(token != '')logOut();
		clearLocalStorage(UserKey);
		dispatch(resetUser());
		navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
	}, []);

	const logOut = async() => {
        try {
            await logoutUser(token);
        } catch (error) {
            console.error(error);
        }
	}

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		handlerOpen(true)
		login();
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginData({ ...loginData, [e.target.name]: e.target.value })
	}

	const login = async () => {
		const { username, password } = loginData
		try {
			const result = await loginUser(username, password)
			
			if (result) {
				dispatch(createUser({ ...result }))
				handlerOpen(false)
				navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true })
			}
		} catch (error) {
			console.error(error)
			handlerOpen(false)
		}
	}

	return (
		<div className='login'>
			<Container maxWidth='sm'>
				<Grid
					container
					direction="column"
					alignItems="center"
					justifyContent="center"
					sx={{ minHeight: '100vh' }}>
					<Grid item>
						<Paper sx={{ padding: "1.2em", borderRadius: "1em" }}>

							<Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}>
								<LoginIcon fontSize='large' />
								<Typography variant="h4" sx={{ mt: 1, mb: 1 }}>Iniciar Sesión</Typography>
							</Box>

							<Box component="form" onSubmit={handleSubmit}>
								<TextField
									name='username'
									margin='normal'
									fullWidth
									label="Nombre de Usuario"
									sx={{ mt: 2, mb: 1.5, color: 'red' }}
									required
									onChange={handleInputChange} />

								<TextField
									name='password'
									margin='normal'
									type='password'
									fullWidth
									label="Contraseña"
									sx={{ mt: 1.5, mb: 1.5, color: 'red' }}
									required
									onChange={handleInputChange} />

								<Button
									fullWidth
									type='submit'
									variant='contained'
									sx={{ mt: 1.5, mb: 3 }}>
									Iniciar Sesión
								</Button>

							</Box>
							<CustomBackdrop />
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</div>
	)
};

export default Login;


