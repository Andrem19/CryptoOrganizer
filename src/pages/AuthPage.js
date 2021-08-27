import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';

const AuthPage = () => {
    const auth = useContext(AuthContext)
    const [form, setForm] = useState ({
        name: '', email: '', password: ''
    })
       
    useEffect(() => {
    window.M.updateTextFields()
    }, []);

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        axios.post('http://localhost:5000/user/register', {...form})
           .then(res => console.log(res.data));
    }

    const loginHandler = async () => {
        axios.post('http://localhost:5000/user/login', {...form})
           .then(res => auth.login(res.data.token, res.data.userId));
           console.log("userId: ", auth.userId)
       }

    return (
        <div className="row">
      <div className="col s6 offset-s3">
        <h1>Trade Organizer</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>

            <div className="input-field">
                <input
                  placeholder="Введите имя"
                  id="text"
                  type="text"
                  name="name"
                  className="yellow-input"
                  value={form.name}
                  onChange={changeHandler}
                  
                />
                <label htmlFor="name">Name</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите email"
                  id="email"
                  type="text"
                  name="email"
                  className="yellow-input"
                  value={form.email}
                  onChange={changeHandler}
                  
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  value={form.password}
                  onChange={changeHandler}
                  
                />
                <label htmlFor="email">Пароль</label>
              </div>

            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4" 
              style={{marginRight: 10}}
              onClick={loginHandler}
              
            >
              Войти
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}

            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
    );
}
  
export default AuthPage;