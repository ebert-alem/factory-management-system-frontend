import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { loginUser, logoutUser } from '../../services';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser, resetUser} from '../../redux/states/user';
import { clearLocalStorage } from '../../utilities';
import { PrivateRoutes, PublicRoutes } from '../../models';
import { CustomBackdropComponent } from '../../components/backdropCharge';
import LoginIcon from '@mui/icons-material/Login';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';
import { CustomAlert } from '../../components/customAlert';

export const Login = () => {
	const [loginData, setLoginData] = useState({
		username: '',
		password: ''
	})

	const { CustomBackdrop, handlerOpen } = CustomBackdropComponent()
	const token = useSelector((state: AppStore) => state.user.Token);
	const [alert, setAlert] = useState({
		severity: "error",
		isOpen: false,
		text: '',
	})

	useEffect(() => {
		if (token != '') logOut();
		clearLocalStorage('user');
		dispatch(resetUser());
		navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
	}, []);

	const logOut = async () => {
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
			setAlert({
				severity: 'error',
				isOpen: true,
				text: 'Usuario o contraseña incorrectos',
			})
			handlerOpen(false)
		}
	}

	return (
		<Box bgcolor='background.paper' height='100vh' >
			<Box padding={3} display='flex' alignItems='center' justifyContent={{ xs: 'center', sm: 'space-between'}} gap={3} position='sticky' mb='20vh'>
				<img style={{ width: '48px' }} src="/bravaLogo.png" alt="logo" />
				<Typography variant="h5" sx={{ color: "primary.main",  }}>
					BRAVA STOCKS
				</Typography>
			</Box>
			
			<Container maxWidth='sm'>
				<Grid
					height='100%'
					>
					<Grid item display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
						<Paper sx={{ padding: "1.2em", borderRadius: "1em", backgroundColor: 'background.default'}}>
							<Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}>
								<LoginIcon color='primary' fontSize='large' />
								<Typography color='primary' variant="h4" sx={{ mt: 1, mb: 1 }}>Iniciar Sesión</Typography>
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
									sx={{ mt: 1.5, mb: 1.5 }}>
									Iniciar Sesión
								</Button>
							</Box>
							<CustomBackdrop />
						</Paper>
					</Grid>
				<CustomAlert severity={alert.severity as unknown as "success" | "info" | "warning" | "error"} text={alert.text} isOpen={alert.isOpen} onClose={() => { setAlert((alert) => ({ ...alert, isOpen: false })); }} />
				</Grid>
			</Container>
		</Box>
	)
};

export default Login;


