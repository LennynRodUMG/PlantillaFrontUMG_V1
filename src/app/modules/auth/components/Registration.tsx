/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {getUserByToken, register} from '../core/_requests'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {PasswordMeterComponent} from '../../../../_metronic/assets/ts/components'
import {useAuth} from '../core/Auth'

const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  changepassword: '',
  acceptTerms: false,
}

const registrationSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('First name is required'),
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  lastname: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Last name is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  changepassword: Yup.string()
    .required('Password confirmation is required')
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
    }),
  acceptTerms: Yup.bool().required('You must accept the terms and conditions'),
})

export function Registration() {
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        const {data: auth} = await register(
          values.email,
          values.firstname,
          values.lastname,
          values.password,
          values.changepassword
        )
        saveAuth(auth)
        const {data: user} = await getUserByToken(auth.api_token)
        setCurrentUser(user)
      } catch (error) {
        console.error(error)
        saveAuth(undefined)
        setStatus('The registration details is incorrect')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  useEffect(() => {
    PasswordMeterComponent.bootstrap()
  }, [])

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_signup_form'
      onSubmit={formik.handleSubmit}
    >
      {/* begin::Heading */}
      <div className='text-center mb-3'>
        {/* begin::Title */}
        <h1 className='text-dark fw-bolder mb-6'>Registrarse</h1>
        {/* end::Title */}
      </div>

      {/* begin::Form group Firstname */}

      <div className='fv-row mb-8'>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <div style={{ flex: 1 }}>
      <label className='form-label fw-bolder text-dark fs-6'>Nombre</label>
      <input
        placeholder='Nombre'
        type='text'
        autoComplete='off'
        {...formik.getFieldProps('firstname')}
        className={clsx(
          'form-control bg-transparent',
          {
            'is-invalid': formik.touched.firstname && formik.errors.firstname,
          },
          {
            'is-valid': formik.touched.firstname && !formik.errors.firstname,
          }
        )}
      />
      {formik.touched.firstname && formik.errors.firstname && (
        <div className='fv-plugins-message-container'>
          <div className='fv-help-block'>
            <span role='alert'>{formik.errors.firstname}</span>
          </div>
        </div>
      )}
    </div>
    <div style={{ flex: 1, marginLeft: '10px' }}>
      <label className='form-label fw-bolder text-dark fs-6'>Apellidos</label>
      <input
        placeholder='Apellidos'
        type='text'
        autoComplete='off'
        {...formik.getFieldProps('lastname')}
        className={clsx(
          'form-control bg-transparent',
          {
            'is-invalid': formik.touched.lastname && formik.errors.lastname,
          },
          {
            'is-valid': formik.touched.lastname && !formik.errors.lastname,
          }
        )}
      />
      {formik.touched.lastname && formik.errors.lastname && (
        <div className='fv-plugins-message-container'>
          <div className='fv-help-block'>
            <span role='alert'>{formik.errors.lastname}</span>
          </div>
        </div>
     ) }
    </div>
  </div>
</div>


      {/* begin::Form group Email */}
      <div className='fv-row mb-8'>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <div style={{ flex: 1 }}>
      <label className='form-label fw-bolder text-dark fs-6'>Correo electrónico</label>
      <input
        placeholder='Correo electrónico'
        type='email'
        autoComplete='off'
        {...formik.getFieldProps('email')}
        className={clsx(
          'form-control bg-transparent',
          {
            'is-invalid': formik.touched.email && formik.errors.email,
          },
          {
            'is-valid': formik.touched.email && !formik.errors.email,
          }
        )}
      />
      {formik.touched.email && formik.errors.email && (
        <div className='fv-plugins-message-container'>
          <div className='fv-help-block'>
            <span role='alert'>{formik.errors.email}</span>
          </div>
        </div>
      )}
    </div>
    <div style={{ flex: 1, marginLeft: '10px' }}>
      <label className='form-label fw-bolder text-dark fs-6'>Usuario</label>
      <input
        placeholder='Usuario'
        type='text'
        autoComplete='off'
        {...formik.getFieldProps('lastname')}
        className={clsx(
          'form-control bg-transparent',
          {
            'is-invalid': formik.touched.lastname && formik.errors.lastname,
          },
          {
            'is-valid': formik.touched.lastname && !formik.errors.lastname,
          }
        )}
      />
      {formik.touched.lastname && formik.errors.lastname && (
        <div className='fv-plugins-message-container'>
          <div className='fv-help-block'>
            <span role='alert'>{formik.errors.lastname}</span>
          </div>
        </div>
      )}
    </div>
  </div>
</div>





      {/* begin::Form group Password */}
      <div className='fv-row mb-8' data-kt-password-meter='true'>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <div style={{ flex: 1 }}>
      <label className='form-label fw-bolder text-dark fs-6'>Contraseña</label>
      <div className='position-relative mb-3'>
        <input
          type='password'
          placeholder='contraseña'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
       ) }
      </div>


      
      {/* begin::Meter */}
      <div
        className='d-flex align-items-center mb-3'
        data-kt-password-meter-control='highlight'
      >
        <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
        <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
        <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
        <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px'></div>
      </div>
      {/* end::Meter */}
    </div>
    <div style={{ flex: 1, marginLeft: '10px' }}>
      <label className='form-label fw-bolder text-dark fs-6'>Confirmar contraseña</label>
      <input
        type='password'
        placeholder='confirmación de contraseña'
        autoComplete='off'
        {...formik.getFieldProps('changepassword')}
        className={clsx(
          'form-control bg-transparent',
          {
            'is-invalid': formik.touched.changepassword && formik.errors.changepassword,
          },
          {
            'is-valid': formik.touched.changepassword && !formik.errors.changepassword,
          }
        )}
      />
         <div className='text-muted'>
         {'-----------------------------------'}
        </div>
      {formik.touched.changepassword && formik.errors.changepassword && (
        <div className='fv-plugins-message-container'>
          <div className='fv-help-block'>
            <span role='alert'>{formik.errors.changepassword}</span>
          </div>
        </div>
      )}
    </div>
  </div>
</div>

      {/* end::Form group */}
      <div className='text-muted'>
          Utilice 8 o más caracteres con una combinación de letras, números y símbolos.
        </div>
        
      {/* begin::Form group */}
      <div className='fv-row mb-8 mt-8'>
        <label className='form-check form-check-inline' htmlFor='kt_login_toc_agree'>
          <input
            className='form-check-input'
            type='checkbox'
            id='kt_login_toc_agree'
            {...formik.getFieldProps('acceptTerms')}
          />
          <span>
          Acepto los{' '}
            <a
              href='https://keenthemes.com/metronic/?page=faq'
              target='_blank'
              className='ms-1 link-primary'
            >
             términos
            </a>
            .
          </span>
        </label>
        {formik.touched.acceptTerms && formik.errors.acceptTerms && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.acceptTerms}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_up_submit'
          className='btn btn-lg  w-100 mb-5'
          style={{background: 'linear-gradient(to right, #F2AC29, #FF5733)',color: 'white'}}
          disabled={formik.isSubmitting || !formik.isValid || !formik.values.acceptTerms}
        >
          {!loading && <span className='indicator-label'>Registrarse</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Espere por favor...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        <Link to='/auth/login'>
          <button
            type='button'
            id='kt_login_signup_form_cancel_button'
            
            className='btn btn-lg btn-light-primary w-100 mb-5'
            style={{background: 'linear-gradient(to right, #260101, #FF5733)',color: 'white'}}
          >
            Cancelar
          </button>
        </Link>
      </div>
      {/* end::Form group */}
    </form>
  )
}
