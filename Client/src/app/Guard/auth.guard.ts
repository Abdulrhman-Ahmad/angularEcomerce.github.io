import { jwtDecode } from 'jwt-decode';
import { CanActivateFn } from '@angular/router';
import { jwtPayload } from 'jwt-payloader';
import { IData } from '../Interfaces/idata';


export const authGuard: CanActivateFn = (route, state) => {

//---------------------------------------------
const jwt = localStorage.getItem('token');
// ---------------------------------------------



  if (state.url === '/login' || state.url === '/signup') {
    return jwt == null
  }

  if (state.url ==='/products')
  {
    if (jwt)
    return true
  }


  if (state.url === '/dashboard' || state.url === '/product') {

    if (jwt)
    {
      const token :IData = jwtDecode(jwt);
      return token.user == 'admin'
    }
    else
    return false
  }



  //default
  return !jwt == null
};
