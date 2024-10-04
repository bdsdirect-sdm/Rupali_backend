import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  // password: string;
  // confirmPassword: string;
  // termsAndConditions: boolean;
  profilePhoto: File | null;
  appointmentLetter: File | null;
  companyAddress: string;
  companyCity: string;
  companyState: string;
  companyZip: string;
  homeAddress: string;
  homeCity: string;
  homeState: string;
  homeZip: string;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required').min(2, 'Must be 2 characters long'),
  lastName: Yup.string().required('Last name is required').min(2, 'Must be 2 characters long'),
  email: Yup.string().required('Email is required').email('Invalid email format'),
  // password: Yup.string().required('Password is required').min(6, 'Minimum 6 characters'),
  // confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Must be the same as password').required('Confirm password is required'),
  // termsAndConditions: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  profilePhoto: Yup.mixed().required('Profile photo is required'),
  appointmentLetter: Yup.mixed().required('Appointment letter is required'),
  companyAddress: Yup.string().required('Company address is required'),
  companyCity: Yup.string().required('Company city is required'),
  companyState: Yup.string().required('Company state is required'),
  companyZip: Yup.string().required('Company ZIP code is required'),
  homeAddress: Yup.string().required('Home address is required'),
  homeCity: Yup.string().required('Home city is required'),
  homeState: Yup.string().required('Home state is required'),
  homeZip: Yup.string().required('Home ZIP code is required'),
});

const AddUser: React.FC = () => {
  const navigate = useNavigate();
  const initialValues: UserData = {
    firstName: '',
    lastName: '',
    email: '',
    // password: '',
    // confirmPassword: '',
    // termsAndConditions: true,
    profilePhoto: null,
    appointmentLetter: null,
    companyAddress: '',
    companyCity: '',
    companyState: '',
    companyZip: '',
    homeAddress: '',
    homeCity: '',
    homeState: '',
    homeZip: '',
  };

  const handleSubmit = async (values: UserData, { resetForm }: { resetForm: () => void }) => {
    console.log(values, '     values in submit')
    const formData = new FormData();
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('email', values.email);
    // formData.append('password', values.password);
    formData.append('profilePhoto', values.profilePhoto!);
    formData.append('appointmentLetter', values.appointmentLetter!);
    formData.append('companyAddress', values.companyAddress);
    formData.append('companyCity', values.companyCity);
    formData.append('companyState', values.companyState);
    formData.append('companyZip', values.companyZip);
    formData.append('homeAddress', values.homeAddress);
    formData.append('homeCity', values.homeCity);
    formData.append('homeState', values.homeState);
    formData.append('homeZip', values.homeZip);

    try {
      const response = await axios.post('http://localhost:8000/api/adduser', formData);

      alert('Registration successful');
      console.log('Registration successful:', response.data);
      navigate("/profile");
      resetForm();
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h1 className="text-center mb-4">USER DETAILS</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <Field className="form-control" name="firstName" type="text" />
                <ErrorMessage name="first_name" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <Field className="form-control" name="lastName" type="text" />
                <ErrorMessage name="last_name" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field className="form-control" name="email" type="email" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <label htmlFor="profilePhoto">Profile Photo</label>
                <input
                  id="profilePhoto"
                  name="profilePhoto"
                  type="file"
                  className="form-control"
                  onChange={(event) => {
                    const file = event.currentTarget.files![0];
                    setFieldValue('profilePhoto', file);
                  }}
                />
                <ErrorMessage name="profilePhoto" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <label htmlFor="appointmentLetter">Appointment Letter</label>
                <input
                  id="appointmentLetter"
                  name="appointmentLetter"
                  type="file"
                  className="form-control"
                  onChange={(event) => {
                    const file = event.currentTarget.files![0];
                    setFieldValue('appointmentLetter', file);
                  }}
                />
                <ErrorMessage name="appointmentLetter" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <h5>Company Address</h5>
                <label htmlFor="companyAddress">Address</label>
                <Field className="form-control" name="companyAddress" type="text" />
                <ErrorMessage name="companyAddress" component="div" className="text-danger" />

                <label htmlFor="companyCity">City</label>
                <Field className="form-control" name="companyCity" type="text" />
                <ErrorMessage name="companyCity" component="div" className="text-danger" />

                <label htmlFor="companyState">State</label>
                <Field className="form-control" name="companyState" type="text" />
                <ErrorMessage name="companyState" component="div" className="text-danger" />

                <label htmlFor="companyZip">ZIP Code</label>
                <Field className="form-control" name="companyZip" type="text" />
                <ErrorMessage name="companyZip" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <h5>Home Address</h5>
                <label htmlFor="homeAddress">Address</label>
                <Field className="form-control" name="homeAddress" type="text" />
                <ErrorMessage name="homeAddress" component="div" className="text-danger" />

                <label htmlFor="homeCity">City</label>
                <Field className="form-control" name="homeCity" type="text" />
                <ErrorMessage name="homeCity" component="div" className="text-danger" />

                <label htmlFor="homeState">State</label>
                <Field className="form-control" name="homeState" type="text" />
                <ErrorMessage name="homeState" component="div" className="text-danger" />

                <label htmlFor="homeZip">ZIP Code</label>
                <Field className="form-control" name="homeZip" type="text" />
                <ErrorMessage name="homeZip" component="div" className="text-danger" />
              </div>

              <button type="submit" className="btn btn-primary btn-block mt-3">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddUser;
