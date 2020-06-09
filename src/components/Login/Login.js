import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Input from '../commonComponents/Input';
import Button from '../commonComponents/Button';
import postData from '../../services/postData';
import login from '../../resources/login.svg';
import '../../style.css';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: 'student',
      email: '',
      password: '',
    };
    this.handleFormData = this.handleFormData.bind(this);
    this.submitFormData = this.submitFormData.bind(this);
  }

  handleFormData(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitFormData(e) {
    e.preventDefault();
    const { role, email, password } = this.state;
    const { changeLoggedStatus } = this.props;
    postData('users', {
      role,
      email,
      password,
    })
      .then((res) => {
        const {
          status,
          data: {
            data: { userData },
          },
        } = res;
        if (userData.length > 0 && status === 200) {
          toast.success('Logged-in Successfully', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        }
        const { role: roleLogged, name } = userData[0];
        changeLoggedStatus(true, roleLogged, name);
      })
      .catch((err) => {
        toast.error('Invalid Email or Password !', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        console.error(err);
      });
  }

  render() {
    const { email, password } = this.state;
    return (
      <>
        <div className="flex flex-col items-center text-sm">
          <p>Login Credentials</p>
          <p className="flex justify-center">Student - Email: student@gmail.com Password: 123</p>
          <p className="flex justify-center">Teacher - Email: teacher@gmail.com Password: admin</p>
        </div>
        <section className="flex items-center justify-around login-height login-direction my-4">
          <figure className="flex flex-col items-center">
            <img src={login} alt="login" className="w-10/12 h-64 image-width" />
            <figcaption className="text-3xl py-1 text-center">
              An online platform for conducting quiz
              <span role="img" aria-label="book" className="text-3xl">
                {' '}
                🧠
              </span>
              .
            </figcaption>
          </figure>
          <form className="flex flex-col w-6/12 items-center justify-around h-64 py-1 form-width">
            <p className="font-mono text-4xl text-pink-600">Login In</p>
            <select
              name="role"
              className="border-2 w-2/5 py-2 outline-none shadow"
              onChange={this.handleFormData}
              defaultValue="ROLE"
            >
              <option value="ROLE" disabled>
                Select a role
              </option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              func={this.handleFormData}
              className="border-2 w-2/5 py-2 outline-none shadow"
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              func={this.handleFormData}
              className="border-2 w-2/5 py-2 outline-none shadow"
            />
            <Button
              func={this.submitFormData}
              buttonClass="bg-pink-600 py-2 px-4 hover:bg-pink-400 rounded-full outline-none btn-margin"
              textClass="text-white"
              text="submit"
            />
          </form>
        </section>
      </>
    );
  }
}

Login.propTypes = {
  changeLoggedStatus: PropTypes.func.isRequired,
};

export default Login;
