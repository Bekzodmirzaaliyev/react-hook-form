import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { IOption, IShippingFields } from './app.interface'
import ReactSelect from 'react-select'

export const options: IOption[] = [
	{
		value: 'russia',
		label: 'Russia',
	},
	{
		value: 'kazakhistan',
		label: 'Kazakhistan',
	},
	{
		value: 'uzbekistan',
		label: 'Uzbekistan',
	},
	{
		value: 'tadjikistan',
		label: 'Tadjikistan',
	},
]

export const getValue = (value: string) =>
	value ? options.find(option => option.value === value) : ''

function App() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
		control,
	} = useForm<IShippingFields>({
		mode: 'onChange',
	})

	const onSubmit: SubmitHandler<IShippingFields> = data => {
		alert(`Ваше страна ${data.address.country}`)
		reset()
	}

	return (
		<div style={{ textAlign: 'center' }}>
			<h1>Введите информацию о доставке</h1>
			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{ width: '50%', margin: '0 auto' }}
			>
				<div>
					<input
						{...register('name', {
							required: 'Имя обязательное поле!',
						})}
						placeholder='Ф.И.О'
					/>
					{errors?.name && (
						<div style={{ color: 'red', marginBottom: 10 }}>
							{errors.name.message}
						</div>
					)}
				</div>
				<div>
					<input
						{...register('email', {
							required: 'Электронная почта обязательное поле!',
							pattern: {
								value:
									/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
								message: 'Пожалуйста, введите действительный адрес электронной почты!',
							},
						})}
						placeholder='Почта'
					/>
					{errors?.email && (
						<div style={{ color: 'red', marginBottom: 10 }}>
							{errors.email.message}
						</div>
					)}
				</div>		
				
				<div>
					<input
						{...register('address.city', {
							required: 'Город обязательное поле!',
						})}
						placeholder='Город'
					/>
					{errors?.address?.city && (
						<div style={{ color: 'red', marginBottom: 10 }}>
							{errors.address.city.message}
						</div>
					)}
				</div>

				<div>
					<input
						{...register('address.street', {
							required: 'Улица обязательное поле!',
						})}
						placeholder='Улица'
					/>
					{errors?.address?.street && (
						<div style={{ color: 'red', marginBottom: 10 }}>
							{errors.address.street.message}
						</div>
					)}
				</div>
				<div>
					<input
						{...register('address.house', {
							required: 'Дом обязательное поле!',
						})}
						placeholder='Дом'
					/>
					{errors?.address?.house && (
						<div style={{ color: 'red', marginBottom: 10 }}>
							{errors.address.house.message}
						</div>
					)}
				</div>

				<div style={{marginLeft: '32px', width: '93%'}}>
					<Controller
						control={control}
						name='address.country'
						rules={{
							required: 'Страна обязательна!',
						}}
						render={({ field: { onChange, value }, fieldState: { error } }) => (
							<div>
								<ReactSelect
									placeholder='Страна'
									options={options}
									value={getValue(value)}
									onChange={newValue => onChange((newValue as IOption).value)}
								/>
								{error && (
									<div style={{ color: 'red', marginBottom: 10 }}>
										{error.message}
									</div>
								)}
							</div>
						)}
					/>
				</div>

				<button>Send</button>
			</form>
		</div>
	)
}

export default App
