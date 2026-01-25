export interface SignUpDto {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  password_confirm: string;
}

export interface SignInDto {
  email: string;
  password: string;
}

export interface GoogleSigninDto {
  access_token: string;
  code: string;
  id_token: string;
}

export interface ChangePasswordDto {
  old_password: string;
  new_password: string;
  new_password_confirm: string;
}

export interface ResetConfirmDto {
  token: string;
  password: string;
  password_confirm: string;
}
