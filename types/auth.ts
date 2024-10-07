// types/auth.ts
export interface Profile {
  code: number;
  info_member: {
    address: string,
    avatar: string,
    bank_code: any,
    bank_name: any,
    bank_number: any,
    banner: string,
    birthday: string,
    coin: number,
    create_agency: string,
    create_order_agency: boolean,
    created_at: number,
    deadline: number,
    description: string,
    discount_position: string,
    display_info: number,
    email: string,
    facebook: string,
    id: number,
    id_father: number,
    id_position: number,
    id_system: number,
    image_qr_pay: string,
    img_card_member: null,
    img_logo: string,
    instagram: string,
    last_login: number,
    linkedin: string,
    list_theme_info:string,
    name: string,
    name_position: string,
    noti_checkin_campaign: boolean,
    noti_new_customer: boolean,
    noti_new_order: boolean,
    noti_product_warehouse: boolean,
    noti_reg_campaign: boolean,
    otp: any,
    phone: string,
    portrait: string,
    status: any,
    tiktok: string,
    token: string,
    token_device: string,
    twitter: string,
    verify: any,
    view: number,
    web: string,
    youtube: string,
    zalo: string 
  }
}

export interface AuthState {
  account: Profile | null;
  loggedIn: boolean;
  loading: boolean;
  error: string | null;
}
